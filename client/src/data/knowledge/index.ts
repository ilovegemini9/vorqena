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
  dryerNotHeating,
  phoneNotCharging,
  wifiNotWorking,
  laptopWontTurnOn,
  washingMachineNotDraining,
  carWontStart,
  refrigeratorNotCooling,
  dishwasherNotDraining,
  ovenNotHeating,
  tvNoSignal,
  printerNotPrinting,
  bluetoothNotConnecting,
  fuelCost,
  electricityCost,
  carTripCost,
  movingCost,
  repairOrReplace,
  repairOrReplacePhone,
  rentOrBuy,
  percentage,
  salesTax,
  average,
  unitPrice,
  tip,
  discount,
  changeCarOil,
  replaceAirFilter,
  changeSmokeAlarmBattery,
];

export function getKnowledge(idOrSlug: string) {
  const normalized = idOrSlug.replace(/^\//, "");
  return knowledge.find(item => item.id === normalized || item.slug.replace(/^\//, "") === normalized);
}

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "it", "my", "me", "i", "to", "for", "of", "on", "in",
  "and", "or", "can", "how", "what", "should", "do", "does", "with", "this", "that",
]);

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function tokens(value: string) {
  return normalize(value).split(" ").filter(Boolean).filter(token => !STOP_WORDS.has(token));
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
      const haystack = [
        title,
        normalize(item.answer),
        ...aliases,
        ...(item.factors ?? []).map(normalize),
        ...(item.causes ?? []).map(normalize),
      ];
      let score = 0;

      if (title === normalized) score += 120;
      if (aliases.includes(normalized)) score += 110;
      if (title.includes(normalized)) score += 55;
      if (aliases.some(alias => alias.includes(normalized) || normalized.includes(alias))) score += 45;

      for (const token of queryTokens) {
        if (title.split(" ").includes(token)) score += 22;
        else if (title.includes(token)) score += 12;
        if (aliases.some(alias => alias.split(" ").includes(token))) score += 16;
        else if (aliases.some(alias => alias.includes(token))) score += 9;
        if (haystack.some(value => value.includes(token))) score += 4;
      }

      const matched = queryTokens.filter(token => haystack.some(value => value.includes(token))).length;
      if (queryTokens.length > 1 && matched === queryTokens.length) score += 30;
      if (queryTokens.length > 1 && matched < Math.ceil(queryTokens.length / 2)) score = 0;

      return { item, score };
    })
    .filter(result => result.score >= 18)
    .sort((a, b) => b.score - a.score)
    .map(result => result.item);
}

export function knowledgeForIntent(intent: Intent) {
  return knowledge.filter(item => item.intent === intent);
}
