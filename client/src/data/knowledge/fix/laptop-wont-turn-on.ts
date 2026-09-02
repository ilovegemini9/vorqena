import type { KnowledgeRecord } from "../types";

export const laptopWontTurnOn: KnowledgeRecord = {
  id: "fix/laptop-wont-turn-on",
  intent: "fix",
  title: "Laptop Won't Turn On",
  slug: "/fix/laptop-wont-turn-on",
  aliases: ["laptop won't turn on", "computer won't start", "laptop no power", "laptop not powering on"],
  answer: "Check power delivery first: connect the charger, look for charging indicators, and try a forced restart only after ruling out obvious power or accessory problems.",
  causes: ["Empty battery or charger problem", "Power outlet or cable issue", "System stuck during startup", "Hardware fault"],
  steps: ["Connect the original or compatible charger directly to a working outlet.", "Check the charging indicator and inspect the cable and connector for visible damage.", "Disconnect nonessential accessories such as USB devices and docks.", "If the manufacturer provides a documented forced-restart procedure, follow it and then try a normal startup.", "If there is still no power or the device repeatedly shuts down, use the manufacturer's repair guidance."],
  warnings: ["Stop using a damaged, swollen, or unusually hot battery or charger."],
  whenToGetHelp: ["There are no power indicators after using a known-good charger.", "The laptop repeatedly powers off or shows signs of hardware failure.", "The battery is swollen or physically damaged."],
  sources: [
    { label: "Microsoft Support — Troubleshoot problems with your device", url: "https://support.microsoft.com/windows/troubleshoot-problems-with-your-device" },
    { label: "Apple Support — If your Mac doesn't turn on", url: "https://support.apple.com/102623" },
  ],
  related: ["fix/phone-not-charging", "decide/repair-or-replace"],
  seo: {
    indexable: true,
    title: "Laptop Won't Turn On: What to Check | Vorqena",
    description: "A practical checklist for a laptop that will not turn on, including power, charging, accessories, restart steps, and repair signs.",
  },
};
