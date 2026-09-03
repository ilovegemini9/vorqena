import type { KnowledgeRecord } from "../types";

export const repairOrReplace: KnowledgeRecord = {
  id: "repair-or-replace",
  intent: "decide",
  title: "Repair or Replace?",
  slug: "/decide/repair-or-replace",
  aliases: ["fix or replace", "should I repair", "is repair worth it"],
  answer: "Compare repair cost with replacement cost, age, remaining useful life, reliability, and safety—not price alone. A repair can make sense when the item is otherwise reliable and the fix restores useful life, while replacement may be better when failures repeat or safety risks remain.",
  factors: ["Repair estimate", "Age and condition", "Expected remaining life", "Reliability and safety", "Cost of a comparable replacement"],
  steps: ["Get a realistic repair estimate.", "Estimate how long the repaired item is likely to remain useful.", "Compare that total value with a reliable replacement, including setup or delivery costs.", "Choose replacement when safety or repeated failures make repair a poor tradeoff."],
  warnings: ["Do not keep using equipment that presents an immediate electrical, fire, gas, or mechanical safety hazard."],
  sources: [
    { label: "Consumer Reports — Repair or Replace", url: "https://www.consumerreports.org/repair-replace/" },
    { label: "Consumer Reports — Cost Considerations Drive Consumer Repair Decisions", url: "https://innovation.consumerreports.org/cost-considerations-drive-consumer-repair-decisions/" },
  ],
  related: ["/fix/phone-not-charging", "/fix/dryer-not-heating"],
  seo: { indexable: true, title: "Repair or Replace? A Practical Decision Guide | Vorqena", description: "Compare repair cost, age, reliability, useful life, and safety before deciding whether to repair or replace something." }
};
