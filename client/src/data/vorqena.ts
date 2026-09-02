export type Tool = {
  slug: string;
  title: string;
  description: string;
  intent: "fix" | "calculate" | "decide" | "when" | "cost";
  keywords: string[];
};

export const tools: Tool[] = [
  { slug: "percentage-calculator", title: "Percentage Calculator", description: "Calculate percentages, increases, decreases, and percentage change.", intent: "calculate", keywords: ["percent", "percentage", "increase", "decrease", "change", "calculate percent"] },
  { slug: "tip-calculator", title: "Tip Calculator", description: "Calculate a tip and split the total between people.", intent: "calculate", keywords: ["tip", "tips", "gratuity", "restaurant", "bill", "split", "dinner"] },
  { slug: "days-between-dates", title: "Days Between Dates", description: "Find the exact number of days between two dates.", intent: "when", keywords: ["days between", "between dates", "date difference", "date duration", "how many days"] },
  { slug: "date-after-days", title: "Date After Days", description: "Find the date a chosen number of days from another date.", intent: "when", keywords: ["date", "days", "from", "after", "deadline", "days from now", "what date"] },
  { slug: "age-calculator", title: "Age Calculator", description: "Calculate an exact age in years, months, and days.", intent: "calculate", keywords: ["age", "birthday", "born", "how old"] },
  { slug: "loan-payment", title: "Loan Payment Calculator", description: "Estimate monthly payments and total interest for a loan.", intent: "calculate", keywords: ["loan", "payment", "interest", "monthly", "borrow", "apr"] },
  { slug: "mortgage-payment", title: "Mortgage Payment Calculator", description: "Estimate principal and interest payments for a mortgage.", intent: "calculate", keywords: ["mortgage", "home loan", "house", "home", "payment", "principal", "interest"] },
  { slug: "fuel-cost", title: "Fuel Cost Calculator", description: "Estimate trip fuel cost from distance, efficiency, and fuel price.", intent: "cost", keywords: ["gas", "fuel", "petrol", "trip", "car", "driving", "road trip", "mileage"] },
  { slug: "electricity-cost", title: "Electricity Cost Calculator", description: "Estimate the electricity cost of running an appliance.", intent: "cost", keywords: ["electricity", "power", "appliance", "kwh", "energy", "electric bill"] },
  { slug: "break-even", title: "Break-Even Calculator", description: "Find the sales volume or price needed to break even.", intent: "calculate", keywords: ["break even", "break-even", "business", "profit", "fixed cost", "sales"] },
  { slug: "phone-not-charging", title: "Phone Won't Charge", description: "A safe troubleshooting path for a phone that is not charging.", intent: "fix", keywords: ["phone", "charging", "charge", "charger", "battery", "usb", "iphone", "android", "not charging"] },
  { slug: "dryer-not-heating", title: "Dryer Not Heating", description: "Check the common causes before calling for service.", intent: "fix", keywords: ["dryer", "heating", "heat", "laundry", "not hot", "not heating"] },
  { slug: "car-clicking-noise", title: "Car Making a Clicking Noise", description: "Narrow down common causes by when and where the clicking happens.", intent: "fix", keywords: ["car", "clicking", "click", "noise", "engine", "wheel", "vehicle"] },
  { slug: "freeze-food", title: "Can I Freeze This Food?", description: "A practical decision guide for freezing common foods safely and well.", intent: "decide", keywords: ["freeze", "freezer", "food", "frozen", "leftovers", "can i freeze", "storage"] },
  { slug: "repair-or-replace", title: "Repair or Replace?", description: "Compare repair cost, age, reliability, and replacement value.", intent: "decide", keywords: ["repair", "replace", "replacement", "worth it", "fix or replace", "should i repair"] },
];

const STOP_WORDS = new Set(["a", "an", "the", "is", "it", "my", "me", "i", "to", "for", "of", "on", "in", "and", "or", "can", "how", "what", "should", "do", "does", "with"]);

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function tokens(value: string) {
  return normalize(value).split(" ").filter(Boolean).filter(token => !STOP_WORDS.has(token));
}

export function searchTools(query: string) {
  const normalized = normalize(query);
  if (!normalized) return tools;

  const queryTokens = tokens(normalized);
  if (!queryTokens.length) return tools;

  return tools
    .map(tool => {
      const title = normalize(tool.title);
      const description = normalize(tool.description);
      const keywordText = tool.keywords.map(normalize);
      const haystack = [title, description, ...keywordText];
      let score = 0;

      if (title === normalized) score += 100;
      if (keywordText.includes(normalized)) score += 80;
      if (title.includes(normalized)) score += 45;
      if (keywordText.some(keyword => keyword.includes(normalized) || normalized.includes(keyword))) score += 30;

      for (const token of queryTokens) {
        if (title.split(" ").includes(token)) score += 18;
        else if (title.includes(token)) score += 10;
        if (keywordText.some(keyword => keyword.split(" ").includes(token))) score += 12;
        else if (keywordText.some(keyword => keyword.includes(token))) score += 7;
        if (description.includes(token)) score += 3;
      }

      const uniqueMatchedTokens = queryTokens.filter(token => haystack.some(value => value.includes(token))).length;
      if (queryTokens.length > 1 && uniqueMatchedTokens === queryTokens.length) score += 20;
      if (queryTokens.length > 1 && uniqueMatchedTokens < Math.ceil(queryTokens.length / 2)) score = 0;

      return { tool, score };
    })
    .filter(result => result.score >= 12)
    .sort((a, b) => b.score - a.score)
    .map(result => result.tool);
}
