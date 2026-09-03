import type { KnowledgeRecord } from "../types";

export const carWontStart: KnowledgeRecord = {
  id: "fix/car-wont-start",
  intent: "fix",
  title: "Car Won't Start",
  slug: "/fix/car-wont-start",
  aliases: ["car won't start", "car not starting", "engine won't start", "car has no start", "car clicks but won't start", "car cranks but won't start", "car won't turn over"],
  answer: "Pay attention to what happens when you turn the key or press the start button. Silence, clicking, slow cranking, and an engine that cranks normally but does not run point to different problem areas, so identify the symptom before replacing parts.",
  causes: ["Weak or discharged 12-volt battery", "Loose or faulty battery connection", "Starter or electrical connection problem", "Fuel or ignition issue", "Key, immobilizer, or control-system issue", "Engine or sensor fault"],
  factors: ["Whether the starter is silent, clicks, cranks slowly, or cranks normally", "Whether dashboard and interior lights are dim or normal", "Whether the vehicle recently sat unused or had electrical work", "Whether there is a fuel, burning, or unusual mechanical smell", "Whether warning lights or immobilizer messages appear"],
  steps: ["Make sure the transmission is in the required position, the parking brake is set, and the key or start system is being used as described in the vehicle manual.", "Notice whether the starter is silent, clicks, cranks slowly, or cranks the engine normally.", "Check whether dashboard and interior lights behave normally; very dim lights can point toward a discharged battery.", "If the battery appears discharged and is safe to handle, use the vehicle manufacturer's approved jump-start procedure or roadside assistance.", "If the engine cranks normally but will not run, avoid repeated long attempts and consult the vehicle manual or a qualified technician.", "If a jump start does not restore normal starting, arrange roadside assistance or professional diagnosis rather than repeatedly replacing parts without testing."],
  warnings: ["Do not attempt a jump start if the battery is visibly damaged, leaking, or frozen; follow the vehicle manufacturer's procedure.", "Do not work around fuel leaks, smoke, damaged wiring, or strong burning smells. Move to a safe location and seek professional or roadside assistance.", "Do not repeatedly crank an engine for long periods, especially if the vehicle manual gives a shorter limit."],
  whenToGetHelp: ["The battery is damaged or the vehicle shows electrical burning smells.", "A jump start does not restore normal starting.", "The engine cranks but will not run and the cause is unclear.", "The vehicle has a fuel leak, damaged wiring, or repeated starting-system faults."],
  cost: ["A discharged battery may only require charging or replacement, while starter, electrical, fuel, or engine faults can require diagnosis and more expensive repairs."],
  sources: [
    { label: "AAA — Car care and repair resources", url: "https://www.aaa.com/autorepair/" },
    { label: "NHTSA — Vehicle safety resources", url: "https://www.nhtsa.gov/vehicle-safety" },
  ],
  related: ["cost/fuel-cost", "decide/repair-or-replace"],
  seo: {
    indexable: true,
    title: "Car Won't Start: Causes & What to Check First | Vorqena",
    description: "Troubleshoot a car that will not start by distinguishing silence, clicking, slow cranking, and normal cranking, with safe next steps.",
  },
};
