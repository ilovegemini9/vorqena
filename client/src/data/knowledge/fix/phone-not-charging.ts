import type { KnowledgeRecord } from "../types";

export const phoneNotCharging: KnowledgeRecord = {
  id: "phone-not-charging",
  intent: "fix",
  title: "Phone Won't Charge",
  slug: "/fix/phone-not-charging",
  aliases: ["phone isn't charging", "phone not charging", "phone won't charge"],
  answer: "Start with the cable, charger, outlet, and charging port before assuming the battery is bad.",
  causes: ["Damaged cable or power adapter", "Debris or damage in the charging port", "A software, battery, or charging-system fault"],
  steps: ["Try a known-good cable, charger, and outlet.", "Inspect the charging port with a light; do not insert metal objects.", "Restart the phone and try charging again.", "If the issue persists, check the manufacturer's support guidance or seek repair."],
  warnings: ["If the phone or battery is swollen, unusually hot, smoking, or damaged, stop using it and seek professional help."],
  whenToGetHelp: ["The device becomes unusually hot while charging.", "The battery appears swollen or physically damaged."],
  sources: [],
  related: ["/decide/repair-or-replace", "/cost/electricity-cost"],
  seo: { indexable: true, title: "Phone Won't Charge: Causes & Safe Troubleshooting | Vorqena", description: "Work through safe checks for a phone that will not charge, from the cable and outlet to the charging port and repair." }
};
