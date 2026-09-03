import type { Intent } from "../knowledge";

export type CandidateStatus =
  | "new"
  | "matched"
  | "needs-research"
  | "ready-for-review"
  | "rejected"
  | "published";

export type CandidateRecord = {
  id: string;
  query: string;
  normalizedQuery: string;
  intent?: Intent;
  status: CandidateStatus;
  canonicalTopic?: string;
  confidence: "high" | "medium" | "low";
  createdAt: string;
  updatedAt: string;
  demandCount: number;
  source: "search";
};
