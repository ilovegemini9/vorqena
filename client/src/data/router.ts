import type { Intent, KnowledgeRecord } from "./knowledge";
import { knowledge, searchKnowledge } from "./knowledge";
import { searchTools, type Tool } from "./vorqena";

export type RouteKind = "knowledge" | "tool" | "unknown";

export type QuestionRoute = {
  kind: RouteKind;
  intent?: Intent;
  knowledge?: KnowledgeRecord;
  tool?: Tool;
  confidence: "high" | "medium" | "low";
};

const intentHints: Record<Intent, string[]> = {
  fix: ["fix", "broken", "not working", "won't", "doesn't", "noise", "problem", "repair"],
  calculate: ["calculate", "how much is", "percent", "percentage", "loan", "mortgage", "age", "total"],
  decide: ["can i", "should i", "is it safe", "worth it", "repair or replace", "freeze"],
  when: ["when", "how long", "how many days", "date", "deadline", "days between"],
  cost: ["cost", "price", "how much does", "fuel", "electricity", "repair cost"],
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function inferIntent(query: string): Intent | undefined {
  const value = normalize(query);
  let best: { intent: Intent; score: number } | undefined;
  for (const [intent, hints] of Object.entries(intentHints) as [Intent, string[]][]) {
    const score = hints.reduce((total, hint) => total + (value.includes(hint) ? (hint.includes(" ") ? 3 : 1) : 0), 0);
    if (!best || score > best.score) best = { intent, score };
  }
  return best && best.score > 0 ? best.intent : undefined;
}

export function routeQuestion(query: string): QuestionRoute {
  const value = normalize(query);
  if (!value) return { kind: "unknown", confidence: "low" };

  const knowledgeMatches = searchKnowledge(value);
  const topKnowledge = knowledgeMatches[0];
  if (topKnowledge) {
    const second = knowledgeMatches[1];
    const clearLead = !second || knowledgeMatches.indexOf(topKnowledge) === 0;
    const confidence = clearLead && (topKnowledge.aliases.some(a => normalize(a) === value) || normalize(topKnowledge.title) === value)
      ? "high"
      : "medium";
    return { kind: "knowledge", intent: topKnowledge.intent, knowledge: topKnowledge, confidence };
  }

  const tools = searchTools(value);
  const tool = tools[0];
  if (tool) return { kind: "tool", intent: tool.intent, tool, confidence: "medium" };

  return { kind: "unknown", intent: inferIntent(value), confidence: "low" };
}

export function canonicalTopics() {
  return knowledge.filter(item => item.seo.indexable);
}
