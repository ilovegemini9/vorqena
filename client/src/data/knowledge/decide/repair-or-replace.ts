import type { KnowledgeRecord } from "../types";

export const repairOrReplace: KnowledgeRecord = {
  id: "repair-or-replace",
  intent: "decide",
  title: "Repair or Replace?",
  slug: "/decide/repair-or-replace",
  aliases: ["fix or replace", "should I repair", "is repair worth it"],
  answer: "Compare repair cost with replacement cost, age, remaining useful life, reliability, and safety—not price alone.",
  factors: ["Repair estimate", "Age and condition", "Expected remaining life", "Reliability and safety", "Cost of a comparable replacement"],
  steps: ["Get a realistic repair estimate.", "Estimate how long the repaired item is likely to remain useful.", "Compare that total value with a reliable replacement, including setup or delivery costs.", "Choose replacement when safety or repeated failures make repair a poor tradeoff."],
  warnings: ["Do not keep using equipment that presents an immediate electrical, fire, gas, or mechanical safety hazard."],
  sources: [],
  related: ["/fix/phone-not-charging", "/fix/dryer-not-heating", "/fix/car-clicking-noise"],
  seo: { indexable: true, title: "Repair or Replace? A Practical Decision Guide | Vorqena", description: "Compare repair cost, age, reliability, useful life, and safety before deciding whether to repair or replace something." }
};
