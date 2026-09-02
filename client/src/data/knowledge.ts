export type KnowledgeItem = {
  slug: string;
  title: string;
  intent: "fix" | "calculate" | "decide" | "when" | "cost";
  answer: string;
  nextAction: string;
  warnings?: string[];
  related: string[];
};

export const knowledge: KnowledgeItem[] = [
  { slug: "phone-not-charging", title: "Phone Won't Charge", intent: "fix", answer: "Start with the cable, charger, outlet, and charging port before assuming the battery is bad.", nextAction: "Try a known-good cable and charger, then inspect the port for debris without inserting metal objects.", warnings: ["If the phone or battery is swollen, unusually hot, smoking, or damaged, stop using it and seek professional help."], related: ["repair-or-replace", "electricity-cost"] },
  { slug: "dryer-not-heating", title: "Dryer Not Heating", intent: "fix", answer: "A dryer that tumbles but stays cold commonly needs an airflow check or inspection of its heating components.", nextAction: "Clean the lint filter and verify the exhaust path is clear before deeper troubleshooting.", warnings: ["Disconnect power before opening panels or servicing internal parts."], related: ["repair-or-replace", "electricity-cost"] },
  { slug: "car-clicking-noise", title: "Car Making a Clicking Noise", intent: "fix", answer: "The timing and location of the clicking matter: clicking while turning, accelerating, or starting can point to different causes.", nextAction: "Note when the sound occurs and whether it changes with steering, speed, or engine RPM before driving farther.", warnings: ["If the noise comes with loss of control, braking problems, smoke, or a warning light, stop and get the vehicle checked."], related: ["repair-or-replace", "fuel-cost"] },
  { slug: "freeze-food", title: "Can I Freeze This Food?", intent: "decide", answer: "Most foods can be frozen safely when handled and stored correctly, but quality and texture can change substantially.", nextAction: "Identify the food, whether it is cooked, and how long it has been refrigerated before deciding how to store it.", related: ["repair-or-replace"] },
  { slug: "repair-or-replace", title: "Repair or Replace?", intent: "decide", answer: "Compare the repair cost with replacement cost, age, remaining useful life, reliability, and safety—not price alone.", nextAction: "Get the repair estimate and compare it with the realistic cost of a reliable replacement.", related: ["phone-not-charging", "dryer-not-heating", "car-clicking-noise"] },
  { slug: "percentage-calculator", title: "Percentage Calculator", intent: "calculate", answer: "Use the calculator to find a percentage, percentage change, increase, or decrease with the exact inputs you provide.", nextAction: "Enter the values and review the formula shown with the result.", related: ["tip-calculator", "break-even"] },
  { slug: "tip-calculator", title: "Tip Calculator", intent: "calculate", answer: "Calculate the tip, total bill, and per-person amount from the bill, tip rate, and group size.", nextAction: "Enter the bill total, desired tip percentage, and number of people.", related: ["percentage-calculator"] },
  { slug: "loan-payment", title: "Loan Payment Calculator", intent: "calculate", answer: "Estimate the regular payment and total interest from principal, rate, and term.", nextAction: "Enter the loan amount, annual interest rate, and term.", related: ["mortgage-payment", "break-even"] },
  { slug: "mortgage-payment", title: "Mortgage Payment Calculator", intent: "calculate", answer: "Estimate principal-and-interest mortgage payments from the loan amount, rate, and term.", nextAction: "Enter the mortgage amount, annual rate, and term, then review assumptions.", related: ["loan-payment", "break-even"] },
  { slug: "fuel-cost", title: "Fuel Cost Calculator", intent: "cost", answer: "Trip fuel cost depends on distance, vehicle efficiency, and fuel price.", nextAction: "Enter your trip distance, fuel economy, and current fuel price.", related: ["electricity-cost", "repair-or-replace"] },
  { slug: "electricity-cost", title: "Electricity Cost Calculator", intent: "cost", answer: "Appliance electricity cost depends on power draw, usage time, and your electricity rate.", nextAction: "Enter wattage, hours used, and electricity price per kWh.", related: ["fuel-cost", "dryer-not-heating"] },
  { slug: "break-even", title: "Break-Even Calculator", intent: "calculate", answer: "Break-even is where revenue covers fixed and variable costs; the required sales volume depends on contribution margin.", nextAction: "Enter fixed costs, variable cost per unit, and selling price per unit.", related: ["percentage-calculator", "loan-payment"] },
  { slug: "age-calculator", title: "Age Calculator", intent: "calculate", answer: "Calculate an exact age from a birth date and a target date.", nextAction: "Enter the birth date and target date.", related: ["days-between-dates", "date-after-days"] },
  { slug: "days-between-dates", title: "Days Between Dates", intent: "when", answer: "Find the exact number of calendar days between two dates.", nextAction: "Enter the start and end dates and choose whether you need inclusive counting.", related: ["date-after-days", "age-calculator"] },
  { slug: "date-after-days", title: "Date After Days", intent: "when", answer: "Find the calendar date that falls a chosen number of days after a starting date.", nextAction: "Enter the start date and number of days.", related: ["days-between-dates", "age-calculator"] }
];

export function getKnowledge(slug: string) {
  return knowledge.find(item => item.slug === slug);
}
