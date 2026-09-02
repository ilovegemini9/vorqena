import type { KnowledgeRecord } from "../types";

export const dryerNotHeating: KnowledgeRecord = {
  id: "dryer-not-heating",
  intent: "fix",
  title: "Dryer Not Heating",
  slug: "/fix/dryer-not-heating",
  aliases: ["dryer isn't heating", "dryer not getting hot", "dryer runs but no heat"],
  answer: "A dryer that tumbles but stays cold commonly needs an airflow check or inspection of its heating components.",
  causes: ["Blocked airflow or lint buildup", "A failed thermal fuse or thermostat", "A heating element or gas ignition problem"],
  steps: ["Clean the lint filter.", "Check that the outside exhaust flap opens and the vent path is not blocked.", "Run the dryer briefly and confirm whether it tumbles but produces no heat.", "If internal parts need inspection, disconnect power first and use the appliance manual or a qualified technician."],
  warnings: ["Disconnect power before opening panels or servicing internal parts.", "If you smell gas, stop using the dryer and contact the appropriate gas utility or qualified professional."],
  whenToGetHelp: ["The dryer repeatedly overheats or trips a breaker.", "There is a burning smell, damaged wiring, or a gas smell."],
  cost: ["Repair cost varies by dryer type and failed component; get a diagnosis before buying parts."],
  sources: [
    { label: "Whirlpool Product Help — Dryer is Not Heating", url: "https://producthelp.whirlpool.com/Laundry/Dryers/Product_Info/Dryer_Product_Assistance/Dryer_is_Not_Heating" },
    { label: "Consumer Reports — Most Common Appliance Problems and Repairs", url: "https://www.consumerreports.org/appliances/most-common-appliance-problems-and-repairs-a5550122416/" },
  ],
  related: ["/fix/phone-not-charging", "/decide/repair-or-replace"],
  seo: { indexable: true, title: "Dryer Not Heating: Causes, Checks & Next Steps | Vorqena", description: "Find the common reasons a dryer runs but does not heat, safe checks to try, warnings, and when to call for service." }
};
