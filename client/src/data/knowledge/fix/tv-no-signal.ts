import type { KnowledgeRecord } from "../types";

export const tvNoSignal: KnowledgeRecord = {
  id: "tv-no-signal",
  intent: "fix",
  title: "TV Has No Signal",
  slug: "/fix/tv-no-signal",
  aliases: ["tv says no signal", "television no signal", "tv has no picture", "tv input not working"],
  answer: "If a TV shows No Signal, first confirm the correct input and then check the source device, cable connection, and whether another input works. If only one source fails, the problem is usually upstream of the TV.",
  causes: [
    "Wrong HDMI or input selected",
    "Loose or damaged HDMI or video cable",
    "Source device is off, asleep, or outputting incorrectly",
    "Receiver, streaming device, console, or set-top box problem",
    "TV input or hardware fault",
  ],
  steps: [
    "Press the TV input/source control and select the HDMI or input used by the source device.",
    "Make sure the source device is powered on and awake, then restart the source device if appropriate.",
    "Reseat the video cable at both ends and check for visible damage.",
    "Try another compatible HDMI cable or another TV input if available.",
    "If possible, test a different source device on the same TV input to separate a TV problem from a source problem.",
    "If every input and source fails, use the TV manufacturer's troubleshooting guidance or arrange service.",
  ],
  warnings: [
    "Disconnect equipment from power before inspecting damaged cables or making extensive connections.",
    "Do not force HDMI connectors into ports.",
    "If a device is unusually hot, smoking, or electrically damaged, stop using it and seek qualified help.",
  ],
  whenToGetHelp: [
    "Multiple known-good sources fail on multiple TV inputs.",
    "The TV repeatedly loses signal after cables and sources are confirmed good.",
    "There is visible port damage, smoke, or an electrical smell.",
  ],
  factors: [
    "Whether the TV displays No Signal or a blank/black screen",
    "Which input is selected",
    "Whether another source works",
    "Whether the source device shows a normal display elsewhere",
  ],
  sources: [
    { label: "Sony Support — No Signal on TV", url: "https://www.sony.com/electronics/support/articles/00032637" },
    { label: "Samsung Support — TV has no signal", url: "https://www.samsung.com/us/support/troubleshooting/TSG01202530/" },
  ],
  related: ["/fix/wifi-not-working", "/fix/laptop-wont-turn-on"],
  seo: { indexable: true, title: "TV Says No Signal: Causes & Fixes | Vorqena", description: "Fix a TV showing No Signal by checking the input, source device, cables, alternate ports, and when service is needed." }
};
