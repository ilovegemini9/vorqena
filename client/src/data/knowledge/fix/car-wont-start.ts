import type { KnowledgeRecord } from "../types";

export const carWontStart: KnowledgeRecord = {
  id: "fix/car-wont-start",
  intent: "fix",
  title: "Car Won't Start",
  slug: "/fix/car-wont-start",
  aliases: ["car won't start", "car not starting", "engine won't start", "car has no start"],
  answer: "Pay attention to what happens when you turn the key or press the start button: silence, clicking, or an engine that cranks but does not run point to different problem areas.",
  causes: ["Weak or discharged 12-volt battery", "Starter or electrical connection problem", "Fuel or ignition issue", "Key, immobilizer, or control-system issue"],
  steps: ["Make sure the transmission is in the required position and the parking brake is set.", "Notice whether the starter is silent, clicks, or cranks the engine normally.", "Check whether the dashboard and interior lights behave normally.", "If the battery appears discharged, use the vehicle manufacturer's approved jump-start procedure or roadside assistance.", "If the engine cranks normally but will not run, avoid repeated attempts and consult the vehicle's manual or a qualified technician."],
  warnings: ["Do not attempt a jump start if the battery is visibly damaged, leaking, or frozen. Follow the vehicle manufacturer's procedure."],
  whenToGetHelp: ["The battery is damaged or the vehicle shows electrical burning smells.", "A jump start does not restore normal starting.", "The engine cranks but will not run and the cause is unclear."],
  sources: [
    { label: "AAA — Car won't start troubleshooting", url: "https://www.aaa.com/autorepair/codereader" },
    { label: "NHTSA — Vehicle safety resources", url: "https://www.nhtsa.gov/vehicle-safety" },
  ],
  related: ["cost/fuel-cost", "decide/repair-or-replace"],
  seo: {
    indexable: true,
    title: "Car Won't Start: What to Check First | Vorqena",
    description: "A practical checklist for a car that will not start, based on clicking, silence, cranking, battery, and safety symptoms.",
  },
};
