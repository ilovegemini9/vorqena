import type { KnowledgeRecord } from "../types";

export const washingMachineNotDraining: KnowledgeRecord = {
  id: "fix/washing-machine-not-draining",
  intent: "fix",
  title: "Washing Machine Not Draining",
  slug: "/fix/washing-machine-not-draining",
  aliases: ["washing machine not draining", "washer won't drain", "washer full of water", "washing machine water won't drain"],
  answer: "Check for a blocked drain path before assuming the pump has failed. Unplug the machine, then inspect the drain hose and any user-accessible filter according to the manufacturer's instructions.",
  causes: ["Blocked drain hose or filter", "Kinked drain hose", "Drain pump or control fault", "Drain installation problem"],
  steps: ["Stop the cycle and unplug the machine before inspecting accessible parts.", "Check the drain hose for kinks or obvious blockage.", "If the model has a user-accessible pump filter, clean it using the manufacturer's procedure and expect trapped water.", "Run a short drain or spin test if the manufacturer allows it.", "If the machine still will not drain, arrange service rather than repeatedly running a full cycle."],
  warnings: ["Water may be hot or contaminated; use the manufacturer's draining procedure and keep hands away from moving parts."],
  whenToGetHelp: ["The pump makes unusual noises but water remains.", "The machine leaks after the drain path is checked.", "Cleaning the accessible filter does not restore draining."],
  sources: [
    { label: "Whirlpool Support — Washer troubleshooting", url: "https://producthelp.whirlpool.com/Laundry/Washers" },
    { label: "Samsung Support — Washer troubleshooting", url: "https://www.samsung.com/us/support/troubleshooting/TSG01000974/" },
  ],
  related: ["fix/dryer-not-heating", "decide/repair-or-replace"],
  seo: {
    indexable: true,
    title: "Washing Machine Not Draining: Causes & Fixes | Vorqena",
    description: "Find the common reasons a washing machine will not drain and the safe checks to make before calling for service.",
  },
};
