import type { KnowledgeRecord } from "../types";

export const average: KnowledgeRecord = {
  id: "calculate/average",
  intent: "calculate",
  title: "Average",
  slug: "/calculate/average",
  aliases: ["average calculator", "mean", "calculate average", "average of numbers"],
  answer: "The arithmetic average, or mean, is the sum of the values divided by how many values there are.",
  factors: ["All included values", "Number of values", "Whether a weighted average is actually required"],
  steps: ["Add all values together.", "Count how many values are included.", "Divide the sum by the count.", "If some values have different importance, use a weighted-average method instead of the simple mean."],
  warnings: ["A simple average can be misleading when values have very different weights or when the data contains extreme outliers."],
  sources: [
    { label: "NIST — Engineering Statistics Handbook", url: "https://www.itl.nist.gov/div898/handbook/" },
  ],
  related: ["calculate/percentage", "calculate/sales-tax"],
  seo: {
    indexable: true,
    title: "How to Calculate an Average: Formula & Steps | Vorqena",
    description: "Learn how to calculate the arithmetic average and when a weighted average may be more appropriate.",
  },
};
