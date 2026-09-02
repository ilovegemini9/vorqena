import type { KnowledgeRecord } from "../types";

export const wifiNotWorking: KnowledgeRecord = {
  id: "fix/wifi-not-working",
  intent: "fix",
  title: "Wi-Fi Not Working",
  slug: "/fix/wifi-not-working",
  aliases: ["wifi not working", "internet not working", "wifi won't connect", "wireless not working"],
  answer: "Start by checking whether the problem affects one device or every device, then restart the affected device and network equipment before changing settings.",
  causes: ["Router or modem connection problem", "Device Wi-Fi setting or software issue", "Weak signal or interference", "Internet service outage"],
  steps: ["Check another device to see whether the problem is local or network-wide.", "Make sure Wi-Fi is enabled and the device is not in airplane mode.", "Restart the device, then restart the modem and router if the problem affects multiple devices.", "Move closer to the router and retry; if other devices also fail, check the internet provider's outage guidance.", "If only one device fails, forget and reconnect to the Wi-Fi network or check its network settings."],
  warnings: ["Do not reset a router to factory settings unless you know the setup information you will need afterward."],
  whenToGetHelp: ["Multiple devices stay offline after restarting the network equipment.", "The router repeatedly loses connection or shows a hardware fault.", "Only one device fails even after network settings are repaired."],
  sources: [
    { label: "Google Android Help — Connect to Wi-Fi", url: "https://support.google.com/android/answer/9075847" },
    { label: "Microsoft Support — Fix Wi-Fi connection issues", url: "https://support.microsoft.com/windows/fix-wi-fi-connection-issues-in-windows" },
  ],
  related: ["fix/phone-not-charging", "cost/electricity-cost"],
  seo: {
    indexable: true,
    title: "Wi-Fi Not Working: Causes & Troubleshooting | Vorqena",
    description: "Troubleshoot Wi-Fi that will not connect, from device settings and signal problems to router and service issues.",
  },
};
