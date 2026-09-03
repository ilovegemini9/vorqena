import type { KnowledgeRecord } from "../types";

export const dishwasherNotDraining: KnowledgeRecord = {
  id: "dishwasher-not-draining",
  intent: "fix",
  title: "Dishwasher Not Draining",
  slug: "/fix/dishwasher-not-draining",
  aliases: ["dishwasher has water in bottom", "dishwasher leaves water", "dishwasher won't drain", "dishwasher not emptying"],
  answer: "If a dishwasher finishes with water left in the bottom, first check the cycle, filter, drain path, and garbage-disposal connection if one is present. A persistent blockage or pump problem may require service.",
  causes: [
    "Blocked or dirty filter",
    "Kinked or blocked drain hose",
    "Food debris in the drain area",
    "Garbage-disposal connection not opened after installation",
    "Drain pump or control fault",
  ],
  steps: [
    "Cancel the cycle and disconnect power before inspecting accessible parts.",
    "Remove standing water as safely as practical and clean the dishwasher filter according to the owner's manual.",
    "Check the accessible drain area for debris without forcing objects into the pump or drain opening.",
    "Inspect the drain hose for kinks and confirm its routing matches the manufacturer's installation guidance.",
    "If the dishwasher drains through a garbage disposal, confirm the drain connection is installed correctly; newly installed disposals may require removal of a knockout plug.",
    "Run a short drain or rinse test. If water remains after the basic checks, use the model's service guidance or arrange repair.",
  ],
  warnings: [
    "Disconnect power before working inside the dishwasher or near the pump.",
    "Water may be hot; allow the appliance to cool before handling standing water.",
    "Do not bypass safety switches or disassemble sealed components unless the manufacturer specifically permits it.",
  ],
  whenToGetHelp: [
    "The dishwasher repeatedly leaves water after cleaning the filter and checking the hose.",
    "The pump makes unusual noises or does not run during draining.",
    "There is a leak, damaged wiring, or an electrical fault.",
  ],
  factors: [
    "How much water remains after the cycle",
    "Whether the pump makes a draining sound",
    "Whether the filter is visibly blocked",
    "Whether the dishwasher was recently installed or moved",
  ],
  cost: ["A simple blockage may cost little to resolve; pump or control repairs depend on the model and diagnosis."],
  sources: [
    { label: "Whirlpool Product Help — Dishwasher Not Draining", url: "https://producthelp.whirlpool.com/Dishwashers/Product_Assistance/Dishwasher_Does_Not_Drain" },
    { label: "GE Appliances — Dishwasher Does Not Drain", url: "https://products.geappliances.com/appliance/gea-support-search-content?contentId=16240" },
  ],
  related: ["/fix/washing-machine-not-draining", "/decide/repair-or-replace"],
  seo: { indexable: true, title: "Dishwasher Not Draining: Causes & Safe Checks | Vorqena", description: "Find why a dishwasher leaves water in the bottom with safe checks for the filter, drain hose, disposal connection, and pump." }
};
