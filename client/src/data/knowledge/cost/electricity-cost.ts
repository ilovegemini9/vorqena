import type { KnowledgeRecord } from "../types";

export const electricityCost: KnowledgeRecord = {
  id: "cost/electricity-cost",
  intent: "cost",
  title: "Electricity Cost",
  slug: "/cost/electricity-cost",
  aliases: ["electricity cost calculator", "electric bill estimate", "cost of electricity", "energy cost"],
  answer: "Estimate electricity cost by multiplying an appliance's energy use in kilowatt-hours by the electricity price, then account for the rest of the bill separately.",
  factors: ["Power draw", "Hours of use", "Electricity rate", "Billing structure", "Other fixed or variable charges"],
  cost: ["For an appliance: watts ÷ 1000 × hours used = kWh.", "Multiply kWh by the applicable energy rate.", "For a household bill, add the other usage and any fixed, delivery, taxes, or service charges that apply."],
  steps: ["Find the appliance's power rating in watts or its measured energy use.", "Estimate how many hours it operates during the billing period.", "Convert watt-hours to kilowatt-hours by dividing watts by 1000.", "Multiply the resulting kWh by the applicable electricity rate.", "For a bill estimate, add other charges shown by your utility."],
  warnings: ["Real bills may use tiered, time-of-use, demand, taxes, or fixed charges, so appliance cost is not always the same as the full bill increase."],
  sources: [
    { label: "U.S. Department of Energy — Energy Saver", url: "https://www.energy.gov/energysaver" },
    { label: "ENERGY STAR — Home energy use", url: "https://www.energystar.gov/saveathome" },
  ],
  related: ["cost/fuel-cost", "calculate/unit-price"],
  seo: {
    indexable: true,
    title: "How to Calculate Electricity Cost: kWh Formula | Vorqena",
    description: "Calculate appliance electricity cost from watts, hours, and your electricity rate, while accounting for real bill charges.",
  },
};
