import type { KnowledgeRecord } from "../types";

export const ovenNotHeating: KnowledgeRecord = {
  id: "oven-not-heating",
  intent: "fix",
  title: "Oven Not Heating",
  slug: "/fix/oven-not-heating",
  aliases: ["oven won't heat", "oven not getting hot", "oven stays cold", "oven runs but does not heat"],
  answer: "If an oven powers on but does not reach the expected temperature, check the cooking mode, temperature setting, door behavior, and power or gas supply first. A failed heating element, igniter, sensor, or control may require qualified service.",
  causes: [
    "Wrong cooking mode or temperature setting",
    "Electrical supply or breaker problem",
    "Failed heating element or igniter",
    "Temperature sensor or control fault",
    "Gas supply or ignition problem on a gas oven",
  ],
  steps: [
    "Confirm the oven is set to the intended cooking mode and temperature, then allow the normal preheat period recommended by the manufacturer.",
    "Check whether the display, interior light, and other oven functions have normal power.",
    "For an electric oven, check the household breaker once; do not repeatedly reset a breaker that trips again.",
    "For a gas oven, confirm the gas supply is available. If you smell gas, stop and follow local gas-safety guidance.",
    "If the oven heats poorly, compare its behavior with the manufacturer's troubleshooting guidance for the model rather than opening the appliance unnecessarily.",
    "Arrange qualified appliance service if the oven remains cold or shows a fault code after the basic checks.",
  ],
  warnings: [
    "Disconnect power before any manufacturer-approved internal inspection.",
    "Do not bypass safety controls or attempt gas repairs unless you are qualified and local rules permit it.",
    "Stop using the oven for smoke, burning smells, damaged wiring, or repeated breaker trips.",
  ],
  whenToGetHelp: [
    "The oven remains cold after normal preheating and basic supply checks.",
    "A heating element is visibly damaged or a gas igniter repeatedly fails.",
    "The oven displays a fault code or repeatedly trips the breaker.",
    "There is a gas smell, smoke, or burning odor.",
  ],
  factors: [
    "Whether the display and controls have power",
    "Whether the oven is electric or gas",
    "Whether only one cooking mode fails",
    "Whether the oven reaches some heat but not the set temperature",
  ],
  cost: ["Repair cost depends on whether the fault is a simple supply issue or a heating, ignition, sensor, or control component."],
  sources: [
    { label: "Whirlpool Product Help — Oven Not Heating", url: "https://producthelp.whirlpool.com/Cooking/Wall_Ovens_and_Ranges/Product_Assistance/Oven_is_Not_Heating" },
    { label: "GE Appliances — Oven Not Heating", url: "https://products.geappliances.com/appliance/gea-support-search-content?contentId=16241" },
  ],
  related: ["/fix/dryer-not-heating", "/decide/repair-or-replace"],
  seo: { indexable: true, title: "Oven Not Heating: Causes & Safe Checks | Vorqena", description: "Troubleshoot an oven that stays cold with safe checks for settings, power or gas supply, heating parts, and service." }
};
