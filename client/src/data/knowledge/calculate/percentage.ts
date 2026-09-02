import type { KnowledgeRecord } from "../types";

export const percentage: KnowledgeRecord = {
  id: "percentage-calculator",
  intent: "calculate",
  title: "Percentage Calculator",
  slug: "/calculate/percentage",
  aliases: ["what is X percent of Y", "percentage increase", "percentage decrease", "percent change"],
  answer: "Enter the values you want to compare and Vorqena will calculate the percentage result from those inputs.",
  factors: ["Original value", "New or target value", "Percentage rate", "Whether the question asks for a percentage of a value or percentage change"],
  steps: ["Choose the percentage operation you need.", "Enter the relevant values.", "Review the result and the operation used."],
  sources: [],
  related: ["/calculate/tip-calculator", "/calculate/break-even"],
  seo: { indexable: true, title: "Percentage Calculator: Percent, Increase & Change | Vorqena", description: "Calculate percentages, percentage change, increases, and decreases with clear inputs and formulas." }
};
