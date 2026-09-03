import type { KnowledgeRecord } from "../types";

export const refrigeratorNotCooling: KnowledgeRecord = {
  id: "refrigerator-not-cooling",
  intent: "fix",
  title: "Refrigerator Not Cooling",
  slug: "/fix/refrigerator-not-cooling",
  aliases: ["fridge not cooling", "refrigerator is warm", "fridge is warm", "refrigerator not getting cold"],
  answer: "If a refrigerator is running but not cooling properly, start with the temperature setting, airflow, door seals, and whether the unit has adequate space around it. Persistent cooling problems can involve fans, sensors, the compressor, or the sealed system and may need service.",
  causes: [
    "Temperature setting changed accidentally",
    "Blocked internal airflow or vents",
    "Door not closing or sealing correctly",
    "Heavy frost or ice restricting airflow",
    "Fan, sensor, compressor, or sealed-system fault",
  ],
  steps: [
    "Check the refrigerator and freezer temperature settings and make sure cooling has not been disabled by a vacation or similar mode.",
    "Make sure food is not blocking the interior vents and that air can circulate around stored items.",
    "Check that the doors close fully and that the door gaskets are clean and sealing against the cabinet.",
    "Confirm the refrigerator has the clearance recommended by its manufacturer and that exterior vents are not blocked.",
    "If you see heavy frost, follow the manufacturer's defrost guidance rather than removing ice with sharp tools or heat.",
    "If the refrigerator remains warm or repeatedly develops frost, use the model's diagnostic guidance or arrange qualified appliance service.",
  ],
  warnings: [
    "Do not chip ice with a knife or other sharp object.",
    "Do not use an improvised heat source to defrost the appliance.",
    "Move perishable food to safe cold storage if the refrigerator cannot maintain a safe temperature.",
  ],
  whenToGetHelp: [
    "Food is not staying safely cold despite normal settings and airflow.",
    "The refrigerator repeatedly develops heavy frost or loses cooling.",
    "There is an unusual burning smell, damaged wiring, or repeated electrical tripping.",
    "Cooling does not return after the basic checks recommended by the manufacturer.",
  ],
  factors: [
    "Whether the freezer is also warm",
    "Whether the compressor or fans appear to run",
    "Whether interior vents are blocked",
    "Whether frost is covering a large area",
    "Whether the problem followed a move, power outage, or setting change",
  ],
  cost: ["Service cost varies widely by the failed component; diagnose the cause before replacing parts."],
  sources: [
    { label: "Whirlpool Product Help — Refrigerator Not Cooling", url: "https://producthelp.whirlpool.com/Refrigeration/Full-Size_Refrigerators/Product_Assistance/Refrigerator_is_Not_Cooling" },
    { label: "Samsung Support — Refrigerator is not cooling", url: "https://www.samsung.com/us/support/troubleshooting/TSG01001013/" },
  ],
  related: ["/fix/dryer-not-heating", "/decide/repair-or-replace"],
  seo: { indexable: true, title: "Refrigerator Not Cooling: Causes & Safe Checks | Vorqena", description: "Troubleshoot a refrigerator that is warm with safe checks for settings, airflow, door seals, frost, and when service is needed." }
};
