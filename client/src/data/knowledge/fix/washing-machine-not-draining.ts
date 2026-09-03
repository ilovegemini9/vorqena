import type { KnowledgeRecord } from "../types";

export const washingMachineNotDraining: KnowledgeRecord = {
  id: "fix/washing-machine-not-draining",
  intent: "fix",
  title: "Washing Machine Not Draining",
  slug: "/fix/washing-machine-not-draining",
  aliases: ["washing machine not draining", "washer won't drain", "washer full of water", "washing machine water won't drain", "washer stops with water inside", "washer not spinning or draining"],
  answer: "Check the drain path before assuming the pump has failed. Stop the machine, disconnect power, then inspect the drain hose and any user-accessible filter using the manufacturer's procedure. A kink, blockage, unbalanced load, or installation issue can prevent draining without a failed pump.",
  causes: ["Blocked drain hose or pump filter", "Kinked or incorrectly positioned drain hose", "Overloaded or unbalanced load", "Drain pump or control fault", "Drain installation problem"],
  factors: ["Whether the machine stops with water still inside", "Whether the pump makes a hum, buzz, or unusual noise", "Whether the drain hose is kinked or inserted incorrectly", "Whether the problem started after moving or installing the machine", "Whether cleaning the accessible filter changes the behavior"],
  steps: ["Stop the cycle and disconnect power before inspecting accessible parts.", "If the machine contains water, follow the manufacturer's safe emergency-drain procedure; expect water to spill and use a suitable container or towels.", "Check the drain hose for kinks, crushing, visible blockage, and correct installation according to the manual.", "If the model has a user-accessible pump filter, clean it using the manufacturer's procedure and check for trapped debris.", "Check that the load is not severely unbalanced or overloaded, then run a short drain or spin test if the manufacturer allows it.", "If the machine still will not drain, arrange service rather than repeatedly running full cycles."],
  warnings: ["Water may be hot or contaminated; allow it to cool when practical and use the manufacturer's draining procedure.", "Keep hands away from moving parts and disconnect power before opening user-accessible service areas.", "Do not bypass safety switches or open sealed components unless the manufacturer specifically provides a user procedure."],
  whenToGetHelp: ["The pump makes unusual noises but water remains after the drain path is checked.", "The machine leaks after the hose and accessible filter are checked.", "Cleaning the accessible filter does not restore draining.", "The machine repeatedly stops with water inside or trips electrical protection."],
  cost: ["Simple hose or filter blockages may require little more than cleaning, while a failed pump, control, or installation issue can require a service visit and replacement parts."],
  sources: [
    { label: "Whirlpool Support — Washer troubleshooting", url: "https://producthelp.whirlpool.com/Laundry/Washers" },
    { label: "Samsung Support — Washer troubleshooting", url: "https://www.samsung.com/us/support/troubleshooting/TSG01000974/" },
  ],
  related: ["fix/dryer-not-heating", "decide/repair-or-replace"],
  seo: {
    indexable: true,
    title: "Washing Machine Not Draining: Causes & Safe Fixes | Vorqena",
    description: "Find common reasons a washing machine will not drain, from hose and filter blockages to pump problems, with safe checks before service.",
  },
};
