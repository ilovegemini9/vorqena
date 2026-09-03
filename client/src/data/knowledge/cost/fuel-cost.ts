import type { KnowledgeRecord } from "../types";

export const fuelCost: KnowledgeRecord = {
  id: "fuel-cost",
  intent: "cost",
  title: "Fuel Cost Calculator",
  slug: "/cost/fuel-cost",
  aliases: ["trip fuel cost", "gas cost", "petrol cost", "how much fuel will my trip cost"],
  answer: "Trip fuel cost depends on distance, vehicle efficiency, and the fuel price you pay. For a US-MPG calculation, divide the trip distance by MPG to estimate gallons used, then multiply by the price per gallon.",
  factors: ["Trip distance", "Vehicle fuel economy", "Current fuel price", "Traffic, weather, load, and driving conditions", "Whether the distance is one-way or round-trip"],
  steps: ["Enter the trip distance.", "Enter your vehicle's fuel economy in a matching unit such as MPG or L/100 km.", "Enter the price per gallon or litre using the same fuel-volume unit.", "Review the estimate and adjust for real-world driving conditions if needed."],
  warnings: ["Fuel prices and real-world fuel economy vary, so treat the result as an estimate. Make sure distance, fuel economy, and fuel price use compatible units."],
  cost: ["The calculator estimates fuel expense; it does not include tolls, parking, maintenance, insurance, or depreciation."],
  sources: [
    { label: "U.S. Department of Energy & EPA — FuelEconomy.gov", url: "https://www.fueleconomy.gov/" },
    { label: "NIST — Guide to the SI, Chapter 7", url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-7-rules-and-style-conventions-expressing-values" },
  ],
  related: ["/cost/electricity-cost", "/cost/car-trip-cost", "/decide/repair-or-replace"],
  seo: { indexable: true, title: "Fuel Cost Calculator: Estimate Trip Gas Cost | Vorqena", description: "Estimate trip fuel cost using distance, fuel economy, and fuel price, with clear assumptions and practical next steps." }
};
