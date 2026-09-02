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

export function searchKnowledge(query: string) {
  const normalized = query.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
  if (!normalized) return [];
  const tokens = normalized.split(" ").filter(Boolean);

  return knowledge
    .map(item => {
      const haystack = [item.title, item.answer, ...item.aliases, ...(item.factors ?? []), ...(item.causes ?? [])]
        .join(" ").toLowerCase();
      let score = item.title.toLowerCase() === normalized ? 100 : 0;
      if (item.aliases.some(alias => alias.toLowerCase() === normalized)) score += 80;
      if (item.title.toLowerCase().includes(normalized)) score += 45;
      for (const token of tokens) if (haystack.includes(token)) score += 8;
      return { item, score };
    })
    .filter(result => result.score >= Math.max(12, tokens.length * 6))
    .sort((a, b) => b.score - a.score)
    .map(result => result.item);
}

export function knowledgeForIntent(intent: Intent) {
  return knowledge.filter(item => item.intent === intent);
}
