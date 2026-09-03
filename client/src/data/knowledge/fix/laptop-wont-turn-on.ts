import type { KnowledgeRecord } from "../types";

export const laptopWontTurnOn: KnowledgeRecord = {
  id: "fix/laptop-wont-turn-on",
  intent: "fix",
  title: "Laptop Won't Turn On",
  slug: "/fix/laptop-wont-turn-on",
  aliases: ["laptop won't turn on", "computer won't start", "laptop no power", "laptop not powering on", "laptop has no power", "laptop screen won't turn on"],
  answer: "Start with power delivery: test the outlet and charger, look for charging or power indicators, disconnect accessories, and then use the manufacturer's documented restart procedure if the laptop remains unresponsive. A completely dead laptop and a laptop that powers on with a blank screen can have different causes.",
  causes: ["Empty or failing battery", "Faulty charger, cable, connector, or outlet", "USB device, dock, or accessory interfering with startup", "System stuck during startup or wake", "Display or internal hardware fault"],
  factors: ["Whether charging or power lights appear", "Whether the charger or connector is damaged or unusually hot", "Whether the laptop was dropped, exposed to liquid, or recently repaired", "Whether fans, sounds, keyboard lights, or an external display show signs of power", "Whether the problem is no power at all or power with a blank display"],
  steps: ["Connect the original or manufacturer-approved charger directly to a known-working wall outlet; avoid relying on a dock for the first test.", "Check the charging or power indicator and inspect the charger, cable, and connector for visible damage.", "Disconnect nonessential USB devices, memory cards, docks, and external accessories, then try starting again.", "If the laptop shows signs of power but the screen stays blank, check display brightness and use the manufacturer's supported display troubleshooting procedure.", "If the laptop is completely unresponsive, follow the manufacturer's documented power or restart procedure rather than repeatedly trying random key combinations.", "If there is still no response with known-good power equipment, use the manufacturer's support or repair guidance."],
  warnings: ["Stop using a swollen, leaking, physically damaged, or unusually hot battery.", "Do not open or service a built-in battery unless you are following a manufacturer-approved repair procedure.", "If you smell burning, see smoke, or notice damaged wiring or a hot power adapter, disconnect power when it is safe to do so and seek professional help."],
  whenToGetHelp: ["There are no power or charging indicators after testing known-good power equipment.", "The laptop repeatedly shuts down, overheats, or shows signs of hardware failure.", "The battery or charger is swollen, leaking, physically damaged, or unusually hot.", "The laptop powers on but the display remains blank after the manufacturer's troubleshooting steps."],
  sources: [
    { label: "Microsoft Support — Troubleshoot problems with your device", url: "https://support.microsoft.com/windows/troubleshoot-problems-with-your-device" },
    { label: "Apple Support — If your Mac doesn't turn on", url: "https://support.apple.com/102623" },
  ],
  related: ["fix/phone-not-charging", "decide/repair-or-replace"],
  seo: {
    indexable: true,
    title: "Laptop Won't Turn On: Causes & What to Check | Vorqena",
    description: "Troubleshoot a laptop that will not turn on with safe checks for power, charging, accessories, blank screens, battery problems, and repair signs.",
  },
};
