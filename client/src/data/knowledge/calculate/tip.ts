import type { KnowledgeRecord } from "../types";

export const tip: KnowledgeRecord = {
  id: "tip",
  intent: "calculate",
  title: "Tip Calculator",
  slug: "/calculate/tip",
  aliases: ["calculate a tip", "how much should I tip", "tip percentage", "restaurant tip"],
  answer: "To calculate a tip, multiply the bill by the tip percentage as a decimal. For example, a 20% tip on a $50 bill is $10, making the total $60 before any other charges.",
  factors: [
    "The pre-tip bill amount",
    "The percentage you choose",
    "Whether the bill already includes a service charge",
    "Whether you want to split the total among people",
  ],
  steps: [
    "Choose the bill amount before the tip.",
    "Choose the tip percentage, such as 15%, 18%, 20%, or another amount appropriate to the situation.",
    "Convert the percentage to a decimal by dividing it by 100.",
    "Multiply the bill by that decimal to get the tip amount.",
    "Add the tip to the bill to get the total, then divide by the number of people if you are splitting it evenly.",
  ],
  sources: [
    { label: "Consumer Financial Protection Bureau — Managing your money", url: "https://www.consumerfinance.gov/consumer-tools/" },
    { label: "NIST — SI Units and measurement guidance", url: "https://www.nist.gov/pml/owm/metric-si/si-units" },
  ],
  related: ["/calculate/percentage", "/calculate/average"],
  seo: { indexable: true, title: "Tip Calculator: How to Calculate a Tip | Vorqena", description: "Calculate a restaurant tip from the bill and percentage, then work out the total or an even split between people." }
};
