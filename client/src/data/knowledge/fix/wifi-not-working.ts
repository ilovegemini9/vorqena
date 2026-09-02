import type { KnowledgeRecord } from "../types";

export const wifiNotWorking: KnowledgeRecord = {
  id: "fix/wifi-not-working",
  intent: "fix",
  title: "Wi-Fi Not Working",
  slug: "/fix/wifi-not-working",
  aliases: ["wifi not working", "internet not working", "wifi won't connect", "wireless not working", "wifi connected but no internet"],
  answer: "First determine whether Wi-Fi fails on one device or every device. Then check the device settings, signal, router connection, and internet service in that order. This helps separate a device problem from a network or provider problem.",
  causes: [
    "Router or modem connection problem",
    "Device Wi-Fi setting, saved-network, or software issue",
    "Weak signal, interference, or being too far from the router",
    "Internet service outage or upstream connection problem",
    "Incorrect network configuration or authentication failure",
  ],
  steps: [
    "Check another device on the same Wi-Fi network. If only one device fails, focus on that device; if several devices fail, focus on the router, modem, or internet service.",
    "Make sure Wi-Fi is enabled and airplane mode is off, then check that the device is connected to the intended network.",
    "Move closer to the router and retry. If the connection improves nearby, signal strength or interference may be contributing.",
    "Restart the affected device. If multiple devices are offline, restart the modem and router according to the manufacturer's normal procedure.",
    "If the device connects to Wi-Fi but has no internet access, check whether other devices have internet and look for an outage or service notice from the provider.",
    "If only one device still fails, forget the saved Wi-Fi network and reconnect with the correct password; use the device manufacturer's network-reset guidance if needed.",
    "If the router repeatedly drops the connection or reports a hardware fault, check its status lights and documentation before considering replacement or professional support.",
  ],
  warnings: [
    "Do not reset a router to factory settings unless you know the setup information you will need afterward.",
    "Avoid changing advanced router settings unless you understand what the setting controls or have the manufacturer's guidance.",
    "Do not repeatedly reboot equipment if it becomes unusually hot, smells burnt, or shows visible damage; disconnect it safely and seek service.",
  ],
  whenToGetHelp: [
    "Multiple devices stay offline after a normal restart of the network equipment.",
    "The router repeatedly loses connection, overheats, or shows a hardware fault.",
    "The internet service appears to be down and the provider has not restored it.",
    "Only one device fails even after reconnecting to Wi-Fi and repairing its network settings.",
  ],
  factors: [
    "Whether one device or multiple devices are affected",
    "Whether the device connects to Wi-Fi but has no internet",
    "Whether the connection improves closer to the router",
    "Whether the router or modem shows an error or unusual status light",
    "Whether the issue started after a router change, software update, outage, or move",
  ],
  sources: [
    { label: "Google Android Help — Connect to Wi-Fi", url: "https://support.google.com/android/answer/9075847" },
    { label: "Microsoft Support — Fix Wi-Fi connection issues in Windows", url: "https://support.microsoft.com/windows/fix-wi-fi-connection-issues-in-windows" },
  ],
  related: ["/fix/phone-not-charging", "/cost/electricity-cost"],
  seo: {
    indexable: true,
    title: "Wi-Fi Not Working: Causes & Troubleshooting | Vorqena",
    description: "Troubleshoot Wi-Fi that will not connect or has no internet, with device, signal, router, outage, and safety checks.",
  },
};
