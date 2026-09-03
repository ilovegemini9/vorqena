import type { KnowledgeRecord } from "../types";

export const bluetoothNotConnecting: KnowledgeRecord = {
  id: "bluetooth-not-connecting",
  intent: "fix",
  title: "Bluetooth Not Connecting",
  slug: "/fix/bluetooth-not-connecting",
  aliases: ["bluetooth won't connect", "bluetooth not pairing", "bluetooth device not found", "phone won't connect to bluetooth"],
  answer: "If a Bluetooth device will not connect, first make sure both devices have Bluetooth enabled, are close enough to pair, and the accessory is in pairing mode. Removing an old pairing and restarting both devices often resolves connection problems.",
  causes: [
    "Accessory is not in pairing mode",
    "Devices are too far apart or affected by interference",
    "Old or incorrect pairing information",
    "Accessory is already connected to another device",
    "Bluetooth software or device compatibility issue",
  ],
  steps: [
    "Keep the devices close together and confirm Bluetooth is enabled on the phone, tablet, computer, or other host.",
    "Put the accessory into its documented pairing mode and make sure it has enough battery power.",
    "Check whether the accessory is already connected to another nearby device and disconnect it if necessary.",
    "If the device appears in saved Bluetooth connections but will not connect, forget or remove the old pairing and pair it again.",
    "Restart both devices and retry the pairing process.",
    "If only one accessory fails while others connect normally, check the accessory manufacturer's compatibility and support guidance.",
  ],
  warnings: [
    "Use the manufacturer's reset procedure for the accessory; do not guess at undocumented button combinations if they could erase settings.",
    "Do not install drivers or pairing software from untrusted sources.",
  ],
  whenToGetHelp: [
    "The accessory cannot enter pairing mode or is not detected by any compatible device.",
    "Bluetooth repeatedly disconnects after successful pairing.",
    "The issue affects multiple Bluetooth accessories after restarting and re-pairing.",
  ],
  factors: [
    "Whether the accessory appears in the Bluetooth device list",
    "Whether it is already paired with another device",
    "Whether other Bluetooth accessories connect successfully",
    "Whether the issue began after an operating-system update or accessory reset",
  ],
  sources: [
    { label: "Apple Support — Connect a Bluetooth device to your iPhone or iPad", url: "https://support.apple.com/guide/iphone/connect-a-bluetooth-device-iph3c50f191/ios" },
    { label: "Google Android Help — Connect through Bluetooth", url: "https://support.google.com/android/answer/9075925" },
  ],
  related: ["/fix/wifi-not-working", "/fix/phone-not-charging"],
  seo: { indexable: true, title: "Bluetooth Not Connecting: Pairing Fixes | Vorqena", description: "Fix Bluetooth pairing problems by checking pairing mode, saved connections, distance, battery, restarts, and compatibility." }
};
