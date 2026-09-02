export type Tool = {
  slug: string;
  title: string;
  description: string;
  intent: "fix" | "calculate" | "decide" | "when" | "cost";
  keywords: string[];
};

export const tools: Tool[] = [
  { slug: "percentage-calculator", title: "Percentage Calculator", description: "Calculate percentages, increases, decreases, and percentage change.", intent: "calculate", keywords: ["percent", "percentage", "increase", "decrease", "change"] },
  { slug: "tip-calculator", title: "Tip Calculator", description: "Calculate a tip and split the total between people.", intent: "calculate", keywords: ["tip", "restaurant", "bill", "split"] },
  { slug: "days-between-dates", title: "Days Between Dates", description: "Find the exact number of days between two dates.", intent: "when", keywords: ["days", "between", "dates", "date difference"] },
  { slug: "date-after-days", title: "Date After Days", description: "Find the date a chosen number of days from another date.", intent: "when", keywords: ["date", "days", "from", "after", "deadline"] },
  { slug: "age-calculator", title: "Age Calculator", description: "Calculate an exact age in years, months, and days.", intent: "calculate", keywords: ["age", "birthday", "born"] },
  { slug: "loan-payment", title: "Loan Payment Calculator", description: "Estimate monthly payments and total interest for a loan.", intent: "calculate", keywords: ["loan", "payment", "interest", "monthly"] },
  { slug: "mortgage-payment", title: "Mortgage Payment Calculator", description: "Estimate principal and interest payments for a mortgage.", intent: "calculate", keywords: ["mortgage", "home", "house", "payment"] },
  { slug: "fuel-cost", title: "Fuel Cost Calculator", description: "Estimate trip fuel cost from distance, efficiency, and fuel price.", intent: "cost", keywords: ["gas", "fuel", "petrol", "trip", "car"] },
  { slug: "electricity-cost", title: "Electricity Cost Calculator", description: "Estimate the electricity cost of running an appliance.", intent: "cost", keywords: ["electricity", "power", "appliance", "kwh", "energy"] },
  { slug: "break-even", title: "Break-Even Calculator", description: "Find the sales volume or price needed to break even.", intent: "calculate", keywords: ["break even", "business", "profit", "fixed cost"] },
  { slug: "phone-not-charging", title: "Phone Won't Charge", description: "A safe troubleshooting path for a phone that is not charging.", intent: "fix", keywords: ["phone", "charging", "charger", "battery", "usb"] },
  { slug: "dryer-not-heating", title: "Dryer Not Heating", description: "Check the common causes before calling for service.", intent: "fix", keywords: ["dryer", "heating", "laundry", "not hot"] },
  { slug: "car-clicking-noise", title: "Car Making a Clicking Noise", description: "Narrow down common causes by when and where the clicking happens.", intent: "fix", keywords: ["car", "clicking", "noise", "engine", "wheel"] },
  { slug: "freeze-food", title: "Can I Freeze This Food?", description: "A practical decision guide for freezing common foods safely and well.", intent: "decide", keywords: ["freeze", "freezer", "food", "frozen", "leftovers"] },
  { slug: "repair-or-replace", title: "Repair or Replace?", description: "Compare repair cost, age, reliability, and replacement value.", intent: "decide", keywords: ["repair", "replace", "replacement", "worth it"] },
];

export function searchTools(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return tools;
  const terms = q.split(/\s+/);
  return tools.map(t => ({ t, score: terms.reduce((n, term) => n + (t.title.toLowerCase().includes(term) ? 5 : t.description.toLowerCase().includes(term) ? 2 : t.keywords.some(k => k.includes(term) || term.includes(k)) ? 3 : 0), 0) })).filter(x => x.score > 0).sort((a,b) => b.score-a.score).map(x => x.t);
}
