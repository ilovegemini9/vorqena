import type { QuestionRoute } from "../router";
import type { CandidateRecord } from "./types";

const STORAGE_KEY = "vorqena:candidates:v1";

export function normalizeCandidateQuery(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readCandidates(): CandidateRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as CandidateRecord[]) : [];
  } catch {
    return [];
  }
}

function writeCandidates(records: CandidateRecord[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Candidate capture must never block answering a question.
  }
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `candidate-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getCandidates() {
  return readCandidates();
}

export function upsertCandidate(query: string, route: QuestionRoute): CandidateRecord | null {
  const normalizedQuery = normalizeCandidateQuery(query);
  if (!normalizedQuery || route.kind !== "unknown") return null;

  const now = new Date().toISOString();
  const records = readCandidates();
  const existing = records.find(candidate => candidate.normalizedQuery === normalizedQuery);

  if (existing) {
    const updated: CandidateRecord = {
      ...existing,
      intent: existing.intent ?? route.intent,
      confidence: route.confidence,
      updatedAt: now,
      demandCount: existing.demandCount + 1,
    };
    writeCandidates(records.map(candidate => candidate.id === existing.id ? updated : candidate));
    return updated;
  }

  const candidate: CandidateRecord = {
    id: createId(),
    query: query.trim(),
    normalizedQuery,
    intent: route.intent,
    status: "new",
    confidence: route.confidence,
    createdAt: now,
    updatedAt: now,
    demandCount: 1,
    source: "search",
  };

  writeCandidates([candidate, ...records]);
  return candidate;
}
