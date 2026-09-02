import type { KnowledgeRecord } from "../types";

export const changeCarOil: KnowledgeRecord = {
  id: "when/change-car-oil",
  intent: "when",
  title: "When to Change Car Oil",
  slug: "/when/change-car-oil",
  aliases: ["when to change oil", "oil change interval", "how often change car oil", "engine oil change"],
  answer: "Use the vehicle manufacturer's maintenance schedule as the primary guide. The correct interval depends on the vehicle, oil specification, driving conditions, and sometimes time as well as mileage.",
  factors: ["Manufacturer maintenance schedule", "Oil specification", "Mileage", "Time since the last change", "Severe driving conditions"],
  steps: ["Find the maintenance schedule for the exact vehicle and engine.", "Confirm the required oil type and specification.", "Track both mileage and time since the last service.", "Use the severe-service schedule if the manufacturer says your driving conditions qualify.", "Record the service date and mileage for the next interval."],
  warnings: ["Do not rely on a generic mileage number when the manufacturer's schedule specifies a different interval."],
  sources: [
    { label: "U.S. Department of Energy — Fuel economy and maintenance", url: "https://www.fueleconomy.gov/feg/maintain.shtml" },
    { label: "NHTSA — Vehicle safety resources", url: "https://www.nhtsa.gov/vehicle-safety" },
  ],
  related: ["fix/car-wont-start", "cost/fuel-cost"],
  seo: {
    indexable: true,
    title: "When Should You Change Your Car Oil? | Vorqena",
    description: "Learn what determines an oil-change interval and why your vehicle's maintenance schedule matters more than a generic mileage rule.",
  },
};
