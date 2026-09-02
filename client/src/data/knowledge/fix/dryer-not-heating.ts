import type { KnowledgeRecord } from "../types";

export const dryerNotHeating: KnowledgeRecord = {
  id: "dryer-not-heating",
  intent: "fix",
  title: "Dryer Not Heating",
  slug: "/fix/dryer-not-heating",
  aliases: ["dryer isn't heating", "dryer not getting hot", "dryer runs but no heat", "dryer blows cold air"],
  answer: "If a dryer tumbles normally but does not produce heat, first check airflow, the cycle settings, and the power or gas supply. If those checks do not explain the problem, a heating component may need service.",
  causes: [
    "Blocked lint filter, vent, or exhaust airflow",
    "Air-fluff or another no-heat cycle selected accidentally",
    "Electrical supply problem on an electric dryer",
    "Failed thermal fuse, thermostat, heating element, or related control",
    "Gas supply or ignition problem on a gas dryer",
  ],
  steps: [
    "Confirm the selected cycle is intended to heat and that the dryer is not set to an air-only or no-heat option.",
    "Clean the lint filter and check the exhaust vent and outside flap for lint or other blockage.",
    "Run the dryer briefly and check whether it tumbles while the exhaust air remains cold.",
    "For an electric dryer, check the household breaker and make sure the dryer is receiving its required power; do not repeatedly reset a tripping breaker.",
    "For a gas dryer, confirm the gas supply is available. If you smell gas, stop immediately and follow local gas-safety guidance.",
    "If airflow and basic supply checks are normal, use the appliance manual for model-specific diagnostics or arrange qualified service rather than bypassing safety components.",
  ],
  warnings: [
    "Disconnect power before opening panels or servicing internal parts.",
    "Do not bypass a thermal fuse, thermostat, door switch, or other safety device.",
    "Do not operate a gas dryer if you smell gas; leave the area and contact the appropriate gas utility or qualified professional.",
    "Stop using the dryer if there is a burning smell, smoke, damaged wiring, or repeated breaker trips.",
  ],
  whenToGetHelp: [
    "The dryer still has no heat after airflow and cycle checks.",
    "The dryer repeatedly overheats, trips a breaker, or shows a fault code.",
    "There is a burning smell, smoke, damaged wiring, or unusual noise.",
    "A gas dryer has an ignition problem or any suspected gas leak.",
  ],
  factors: [
    "Whether the drum tumbles normally",
    "Whether the selected cycle should produce heat",
    "Whether airflow is strong at the outside exhaust",
    "Whether the dryer is electric or gas",
    "Whether the problem began after a vent blockage, move, repair, or power event",
  ],
  cost: ["Repair cost depends on the dryer type and failed component; diagnose the fault before buying replacement parts."],
  sources: [
    { label: "Whirlpool Product Help — Dryer is Not Heating", url: "https://producthelp.whirlpool.com/Laundry/Dryers/Product_Info/Dryer_Product_Assistance/Dryer_is_Not_Heating" },
    { label: "Consumer Reports — Most Common Appliance Problems and Repairs", url: "https://www.consumerreports.org/appliances/most-common-appliance-problems-and-repairs-a5550122416/" },
  ],
  related: ["/fix/washing-machine-not-draining", "/decide/repair-or-replace"],
  seo: { indexable: true, title: "Dryer Not Heating: Causes, Checks & Next Steps | Vorqena", description: "Find why a dryer runs but stays cold, including airflow, cycle, power or gas checks, safety warnings, and when to get service." }
};
