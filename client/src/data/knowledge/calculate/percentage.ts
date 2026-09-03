import type { KnowledgeRecord } from "../types";

export const percentage: KnowledgeRecord = {
  id: "percentage-calculator",
  intent: "calculate",
  title: "Percentage Calculator",
  slug: "/calculate/percentage",
  aliases: ["what is X percent of Y", "percentage increase", "percentage decrease", "percent change"],
  answer: "Enter the values you want to compare and Vorqena will calculate the percentage result from those inputs. A percentage represents a ratio expressed per hundred, so the operation depends on whether you want a percentage of a value or the change between two values.",
  factors: ["Original value", "New or target value", "Percentage rate", "Whether the question asks for a percentage of a value, percentage change, increase, or decrease"],
  steps: ["Choose the percentage operation you need.", "Enter the relevant values.", "Review the result and the operation used.", "Keep the original and new values clearly identified when calculating percentage change."],
  sources: [
    { label: "NIST — Guide to the SI, Chapter 7: Percentage and the symbol %", url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-7-rules-and-style-conventions-expressing-values" },
  ],
  related: ["calculate/sales-tax", "calculate/average", "calculate/discount"],
  seo: { indexable: true, title: "Percentage Calculator: Percent, Increase & Change | Vorqena", description: "Calculate percentages, percentage change, increases, and decreases with clear inputs and formulas." }
};
