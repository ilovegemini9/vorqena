import type { Intent, KnowledgeRecord } from "./types";
import { dryerNotHeating } from "./fix/dryer-not-heating";
import { phoneNotCharging } from "./fix/phone-not-charging";
import { wifiNotWorking } from "./fix/wifi-not-working";
import { laptopWontTurnOn } from "./fix/laptop-wont-turn-on";
import { washingMachineNotDraining } from "./fix/washing-machine-not-draining";
import { carWontStart } from "./fix/car-wont-start";
import { refrigeratorNotCooling } from "./fix/refrigerator-not-cooling";
import { dishwasherNotDraining } from "./fix/dishwasher-not-draining";
import { ovenNotHeating } from "./fix/oven-not-heating";
import { tvNoSignal } from "./fix/tv-no-signal";
import { printerNotPrinting } from "./fix/printer-not-printing";
import { bluetoothNotConnecting } from "./fix/bluetooth-not-connecting";
import { fuelCost } from "./cost/fuel-cost";
import { electricityCost } from "./cost/electricity-cost";
import { carTripCost } from "./cost/car-trip-cost";
import { movingCost } from "./cost/moving-cost";
import { repairOrReplace } from "./decide/repair-or-replace";
import { repairOrReplacePhone } from "./decide/repair-or-replace-phone";
import { rentOrBuy } from "./decide/rent-or-buy";
import { percentage } from "./calculate/percentage";
import { salesTax } from "./calculate/sales-tax";
import { average } from "./calculate/average";
import { unitPrice } from "./calculate/unit-price";
import { tip } from "./calculate/tip";
import { discount } from "./calculate/discount";
import { changeCarOil } from "./when/change-car-oil";
import { replaceAirFilter } from "./when/replace-air-filter";
import { changeSmokeAlarmBattery } from "./when/change-smoke-alarm-battery";

export type { Intent, KnowledgeRecord, Source } from "./types";

export const knowledge: KnowledgeRecord[] = [
  dryerNotHeating, phoneNotCharging, wifiNotWorking, laptopWontTurnOn,
  washingMachineNotDraining, carWontStart, refrigeratorNotCooling,
  dishwasherNotDraining, ovenNotHeating, tvNoSignal, printerNotPrinting,
  bluetoothNotConnecting, fuelCost, electricityCost, carTripCost, movingCost,
  repairOrReplace, repairOrReplacePhone, rentOrBuy, percentage, salesTax,
  average, unitPrice, tip, discount, changeCarOil, replaceAirFilter,
  changeSmokeAlarmBattery,
];

export function getKnowledge(idOrSlug: string) {
  const normalized = idOrSlug.replace(/^\//, "");
  return knowledge.find(item => item.id === normalized || item.slug.replace(/^\//, "") === normalized);
}

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "it", "my", "me", "i", "to", "for", "of", "on", "in",
  "and", "or", "can", "how", "what", "should", "do", "does", "with", "this", "that",
  "why", "will", "would", "could", "please", "help", "need", "want", "some", "any",
]);

const NORMALIZATION_RULES: Array<[RegExp, string]> = [
  [/\bwon t\b/g, "wont"], [/\bdoesn t\b/g, "doesnt"], [/\bdon t\b/g, "dont"],
  [/\bcan t\b/g, "cant"], [/\bisn t\b/g, "isnt"], [/\baren t\b/g, "arent"],
  [/\bcouldn t\b/g, "couldnt"], [/\bwouldn t\b/g, "wouldnt"], [/\bshouldn t\b/g, "shouldnt"],
];

function normalize(value: string) {
  let result = value.toLowerCase().replace(/[’']/g, " ").replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
  for (const [pattern, replacement] of NORMALIZATION_RULES) result = result.replace(pattern, replacement);
  return result;
}

function tokens(value: string) {
  return normalize(value).split(" ").filter(Boolean).filter(token => !STOP_WORDS.has(token));
}

function singularForms(token: string) {
  const forms = new Set([token]);
  if (token.length > 4 && token.endsWith("ies")) forms.add(`${token.slice(0, -3)}y`);
  if (token.length > 4 && token.endsWith("s") && !token.endsWith("ss")) forms.add(token.slice(0, -1));
  return forms;
}

function tokenMatches(queryToken: string, textToken: string) {
  if (queryToken === textToken) return true;
  const queryForms = singularForms(queryToken);
  const textForms = singularForms(textToken);
  return [...queryForms].some(form => textForms.has(form));
}

function phraseMatch(query: string, phrase: string) {
  return phrase === query || phrase.includes(query) || query.includes(phrase);
}

export function searchKnowledge(query: string) {
  const normalized = normalize(query);
  if (!normalized) return [];
  const queryTokens = tokens(normalized);
  if (!queryTokens.length) return [];

  return knowledge
    .map(item => {
      const title = normalize(item.title);
      const aliases = item.aliases.map(normalize);
      const titleTokens = tokens(title);
      const aliasTokens = aliases.map(tokens);
      let score = 0;

      if (title === normalized) score += 180;
      if (aliases.includes(normalized)) score += 170;
      if (aliases.some(alias => phraseMatch(normalized, alias))) score += 85;
      if (phraseMatch(normalized, title)) score += 75;

      const matchedQueryTokens = new Set<string>();
      for (const queryToken of queryTokens) {
        const titleMatch = titleTokens.some(textToken => tokenMatches(queryToken, textToken));
        const aliasMatch = aliasTokens.some(tokensForAlias => tokensForAlias.some(textToken => tokenMatches(queryToken, textToken)));
        if (titleMatch) { score += 28; matchedQueryTokens.add(queryToken); }
        else if (aliasMatch) { score += 24; matchedQueryTokens.add(queryToken); }
      }

      const coverage = matchedQueryTokens.size / queryTokens.length;
      if (coverage === 1) score += queryTokens.length > 1 ? 45 : 12;
      else if (coverage >= 0.75) score += 12;
      else if (coverage < 0.5) score = 0;
      if (queryTokens.length >= 3 && coverage < 0.67) score = 0;

      return { item, score, coverage };
    })
    .filter(result => result.score >= (queryTokens.length === 1 ? 35 : 55))
    .sort((a, b) => b.score - a.score || b.coverage - a.coverage)
    .map(result => result.item);
}

export function knowledgeForIntent(intent: Intent) {
  return knowledge.filter(item => item.intent === intent);
}
