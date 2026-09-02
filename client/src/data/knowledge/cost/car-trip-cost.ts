import type { KnowledgeRecord } from "../types";

export const carTripCost: KnowledgeRecord = {
  id: "cost/car-trip-cost",
  intent: "cost",
  title: "Car Trip Cost",
  slug: "/cost/car-trip-cost",
  aliases: ["trip cost", "driving cost", "road trip cost", "fuel trip cost", "cost to drive"],
  answer: "Estimate a car trip by separating fuel from other costs. Fuel cost is distance divided by fuel economy, multiplied by fuel price; tolls, parking, maintenance, and depreciation can be added separately.",
  factors: ["Trip distance", "Fuel economy", "Fuel price", "Tolls", "Parking", "Maintenance and depreciation"],
  cost: ["Fuel: distance ÷ fuel economy × fuel price.", "Add known tolls and parking costs.", "For a fuller ownership estimate, add an appropriate per-distance allowance for maintenance and depreciation."],
  steps: ["Choose a consistent distance and fuel-economy unit.", "Estimate the fuel required for the trip.", "Multiply fuel required by the expected fuel price.", "Add tolls, parking, and any other predictable trip costs.", "If comparing driving with another transport option, compare total trip costs rather than fuel alone."],
  sources: [
    { label: "U.S. Department of Energy — Fuel economy", url: "https://www.fueleconomy.gov/" },
    { label: "AAA — Your Driving Costs", url: "https://exchange.aaa.com/automotive/automotive-maintenance/driving-costs/" },
  ],
  related: ["cost/fuel-cost", "calculate/unit-price"],
  seo: {
    indexable: true,
    title: "How to Calculate Car Trip Cost: Fuel, Tolls & More | Vorqena",
    description: "Estimate the cost of a drive using distance, fuel economy, fuel price, tolls, parking, and broader vehicle costs.",
  },
};
