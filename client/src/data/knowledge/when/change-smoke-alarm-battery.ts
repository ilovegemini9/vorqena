import type { KnowledgeRecord } from "../types";

export const changeSmokeAlarmBattery: KnowledgeRecord = {
  id: "change-smoke-alarm-battery",
  intent: "when",
  title: "When to Change a Smoke Alarm Battery",
  slug: "/when/change-smoke-alarm-battery",
  aliases: ["when to replace smoke alarm battery", "smoke detector battery change", "how often change smoke alarm battery", "smoke alarm chirping"],
  answer: "Follow the alarm manufacturer's instructions and replace the battery on the schedule it specifies; many alarms use an annual battery-change reminder. A chirping alarm can indicate a low battery, but it can also signal another condition, so check the manual rather than assuming.",
  factors: [
    "Whether the alarm uses replaceable batteries or a sealed long-life battery",
    "The manufacturer's recommended replacement interval",
    "Whether the alarm is chirping, showing a warning light, or reporting another fault",
    "The alarm's age and replacement date",
  ],
  steps: [
    "Check the alarm label or manual for the battery type and replacement instructions.",
    "If the battery is replaceable, install the specified battery when the alarm indicates replacement is due.",
    "Test the alarm using its test button after replacing the battery.",
    "Record the replacement date so future maintenance is easy to track.",
    "If the alarm continues to chirp or reports a fault with a fresh battery, follow the manufacturer's troubleshooting guidance.",
    "Replace the entire alarm when the manufacturer says it has reached the end of its service life; do not treat a new battery as a substitute for an expired alarm.",
  ],
  warnings: [
    "Never remove a smoke alarm battery just to silence a nuisance alarm without addressing the cause and restoring protection.",
    "Use only the battery type specified by the manufacturer.",
    "Do not disable required smoke alarms or leave a sleeping area without working alarms.",
  ],
  whenToGetHelp: [
    "The alarm continues to chirp after the specified battery is replaced.",
    "The alarm cannot be tested or shows a persistent fault.",
    "You are unsure whether an alarm is still within its service life.",
  ],
  sources: [
    { label: "U.S. Fire Administration — Smoke Alarms", url: "https://www.usfa.fema.gov/prevention/home-fires/at-risk/smoke-alarms/" },
    { label: "National Fire Protection Association — Smoke Alarms", url: "https://www.nfpa.org/education-and-research/home-fire-safety/smoke-alarms" },
  ],
  related: ["/when/change-car-oil", "/fix/dryer-not-heating"],
  seo: { indexable: true, title: "When to Change a Smoke Alarm Battery | Vorqena", description: "Learn when to replace a smoke alarm battery, what chirping can mean, how to test the alarm, and when the whole alarm should be replaced." }
};
