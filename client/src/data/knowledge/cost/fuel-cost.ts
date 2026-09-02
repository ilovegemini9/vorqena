import type { KnowledgeRecord } from "../types";

export const fuelCost: KnowledgeRecord = {
  id: "fuel-cost",
  intent: "cost",
  title: "Fuel Cost Calculator",
  slug: "/cost/fuel-cost",
  aliases: ["trip fuel cost", "gas cost", "petrol cost", "how much fuel will my trip cost"],
  answer: "Trip fuel cost depends on distance, vehicle efficiency, and the fuel price you pay.",
  factors: ["Trip distance", "Vehicle fuel economy", "Current fuel price", "Traffic, weather, and driving conditions"],
  steps: ["Enter the trip distance.", "Enter your vehicle's fuel economy.", "Enter the price per gallon or litre.", "Review the estimate and adjust for real-world driving conditions if needed."],
  warnings: ["Fuel prices and real-world fuel economy vary, so treat the result as an estimate."],
  cost: ["The calculator estimates fuel expense; it does not include tolls, parking, maintenance, or depreciation."],
  sources: [],
  related: ["/cost/electricity-cost", "/decide/repair-or-replace"],
  seo: { indexable: true, title: "Fuel Cost Calculator: Estimate Trip Gas Cost | Vorqena", description: "Estimate trip fuel cost using distance, fuel economy, and fuel price, with clear assumptions and practical next steps." }
};
