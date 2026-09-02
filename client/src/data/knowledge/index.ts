import type { Intent, KnowledgeRecord } from "./types";
import { dryerNotHeating } from "./fix/dryer-not-heating";
import { phoneNotCharging } from "./fix/phone-not-charging";
import { fuelCost } from "./cost/fuel-cost";
import { repairOrReplace } from "./decide/repair-or-replace";
import { percentage } from "./calculate/percentage";

export type { Intent, KnowledgeRecord, Source } from "./types";

export const knowledge: KnowledgeRecord[] = [
  dryerNotHeating,
  phoneNotCharging,
  fuelCost,
  repairOrReplace,
  percentage,
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
