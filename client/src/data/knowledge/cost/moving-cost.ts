import type { KnowledgeRecord } from "../types";

export const movingCost: KnowledgeRecord = {
  id: "cost/moving-cost",
  intent: "cost",
  title: "Moving Cost",
  slug: "/cost/moving-cost",
  aliases: ["moving cost calculator", "cost to move", "moving expenses", "how much does moving cost"],
  answer: "A useful moving budget separates transport or movers from packing, supplies, deposits, storage, travel, cleaning, and other one-time costs. The final amount depends on distance, belongings, access conditions, timing, and which services are included in a quote.",
  factors: ["Distance", "Volume and weight of belongings", "Professional movers or self-move", "Packing supplies", "Storage", "Travel and cleaning", "Deposits and setup costs"],
  cost: ["Get written quotes for professional moving services when possible.", "Estimate packing and supply costs separately.", "Add travel, storage, cleaning, and utility or housing setup costs that apply to your move.", "Keep a contingency amount for unexpected expenses."],
  steps: ["List every one-time cost before comparing quotes.", "Measure the main drivers: distance, amount of belongings, access conditions, and moving date.", "Request comparable quotes that state what is included.", "Add costs that quotes exclude, such as packing materials, storage, or cleaning.", "Keep a small contingency rather than assuming the lowest quote is the final cost."],
  warnings: ["A quote that looks cheaper can become more expensive if important services or fees are excluded."],
  sources: [
    { label: "Federal Motor Carrier Safety Administration — Moving resources", url: "https://www.fmcsa.dot.gov/protect-your-move" },
  ],
  related: ["calculate/percentage", "cost/car-trip-cost"],
  seo: {
    indexable: true,
    title: "How to Estimate Moving Costs: Complete Checklist | Vorqena",
    description: "Build a realistic moving budget by accounting for movers, transport, packing, storage, travel, cleaning, and setup costs.",
  },
};
