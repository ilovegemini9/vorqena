import type { KnowledgeRecord } from "../types";

export const repairOrReplacePhone: KnowledgeRecord = {
  id: "decide/repair-or-replace-phone",
  intent: "decide",
  title: "Repair or Replace a Phone",
  slug: "/decide/repair-or-replace-phone",
  aliases: ["repair or replace phone", "fix or replace phone", "should I repair my phone", "new phone or repair"],
  answer: "Compare the repair cost with the phone's remaining useful life, battery condition, software support, damage beyond the current fault, and the cost of a suitable replacement.",
  factors: ["Repair quote", "Age and condition", "Battery health or battery condition", "Software and security support", "Replacement cost", "Whether the repair restores reliable daily use"],
  steps: ["Get a realistic repair estimate rather than guessing from the original purchase price.", "Check the phone's age, overall condition, and remaining manufacturer support.", "Consider whether the battery or other major components are also near replacement.", "Compare the repair with the price of a replacement that genuinely meets your needs.", "Choose repair when it provides good remaining value and reliability; replace when repair cost and broader condition make continued ownership poor value."],
  warnings: ["A low repair price is not a good deal if the device has a damaged or swollen battery or other safety-critical damage."],
  sources: [
    { label: "Google — Pixel phone help", url: "https://support.google.com/pixelphone/" },
    { label: "Apple — iPhone repair and service", url: "https://support.apple.com/iphone/repair" },
  ],
  related: ["fix/phone-not-charging", "decide/repair-or-replace"],
  seo: {
    indexable: true,
    title: "Repair or Replace Your Phone? A Practical Decision Guide | Vorqena",
    description: "Compare repair cost, phone age, battery condition, software support, and replacement price before deciding what to do.",
  },
};
