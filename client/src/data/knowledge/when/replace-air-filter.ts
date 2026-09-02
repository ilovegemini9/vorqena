import type { KnowledgeRecord } from "../types";

export const replaceAirFilter: KnowledgeRecord = {
  id: "when/replace-air-filter",
  intent: "when",
  title: "When to Replace an Air Filter",
  slug: "/when/replace-air-filter",
  aliases: ["when to replace air filter", "air filter replacement", "how often change air filter", "engine air filter"],
  answer: "Replace an engine air filter according to the vehicle manufacturer's schedule and inspect it sooner if driving conditions are unusually dusty or dirty.",
  factors: ["Vehicle manufacturer's schedule", "Driving environment", "Dust and debris exposure", "Filter condition"],
  steps: ["Check the vehicle's maintenance schedule for the specified interval.", "Inspect the filter when the service schedule or symptoms call for it.", "If the vehicle is used in unusually dusty conditions, follow the manufacturer's severe-use guidance.", "Install the correct filter and make sure the housing is sealed properly."],
  warnings: ["A dirty filter is not by itself proof that the engine needs a different service interval; follow the vehicle-specific guidance."],
  sources: [
    { label: "U.S. Department of Energy — Vehicle maintenance", url: "https://www.fueleconomy.gov/feg/maintain.shtml" },
  ],
  related: ["when/change-car-oil", "cost/fuel-cost"],
  seo: {
    indexable: true,
    title: "When to Replace a Car Air Filter | Vorqena",
    description: "Find out what determines engine air-filter replacement timing and when dusty driving conditions can change the schedule.",
  },
};
