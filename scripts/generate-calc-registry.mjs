import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const routes = readFileSync(resolve(root, "public-routes.txt"), "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

const financialTerms = ["mortgage", "loan", "payment", "interest", "investment", "finance", "financial", "tax", "salary", "income", "401k", "retirement", "pension", "annuity", "ira", "rmd", "apr", "credit", "debt", "rent", "real-estate", "auto", "lease", "savings", "bond", "mutual", "return", "irr", "roi", "payback", "present-value", "future-value", "cash-back", "down-payment", "equity", "refinance", "property", "budget", "commission", "margin", "discount", "depreciation", "college", "business", "personal", "boat", "repayment", "currency", "inflation", "sales-tax", "vat", "fha", "va-"];
const healthTerms = ["bmi", "bmr", "calorie", "body-fat", "body-surface", "body-type", "ideal-weight", "pregnancy", "tdee", "tdee", "pace", "running", "army-body", "anorexic", "macro", "protein", "fat-intake", "carbohydrate", "lean-body", "weight-watchers", "target-heart", "bac"];
const mathTerms = ["scientific", "basic", "big-number", "binary", "fraction", "percentage", "random-number", "triangle", "standard-deviation", "statistics", "permutation", "combination", "z-score", "confidence-interval", "matrix", "ratio", "gcf", "lcm", "prime", "log", "hex", "octal", "area", "volume", "surface-area", "length", "height", "weight", "temperature", "numbers", "average", "time-duration", "bandwidth", "voltage", "tile", "concrete", "roofing", "mulch", "stairs", "circle", "quadratic", "exponent", "fraction"];

function classify(file) {
  const slug = file.replace(/\.html$/, "");
  if (healthTerms.some((term) => slug.includes(term))) return "Fitness & Health";
  if (financialTerms.some((term) => slug.includes(term))) return "Financial";
  if (mathTerms.some((term) => slug.includes(term))) return "Math";
  return "Other";
}

function titleize(file) {
  const slug = file.replace(/\.html$/, "");
  const acronyms = new Map([["bmi", "BMI"], ["bmr", "BMR"], ["tdee", "TDEE"], ["gpa", "GPA"], ["roi", "ROI"], ["irr", "IRR"], ["apr", "APR"], ["vat", "VAT"], ["fha", "FHA"], ["rmd", "RMD"], ["ira", "IRA"], ["gcf", "GCF"], ["lcm", "LCM"], ["gpa", "GPA"], ["bac", "BAC"], ["url", "URL"], ["base64", "Base64"]]);
  return slug.split("-").map((word) => acronyms.get(word) ?? `${word[0]?.toUpperCase() ?? ""}${word.slice(1)}`).join(" ");
}

function family(file, category) {
  const slug = file.replace(/\.html$/, "");
  if (slug.includes("scientific")) return "scientific";
  if (slug.includes("mortgage")) return "mortgage";
  if (slug.includes("bmi")) return "bmi";
  if (slug === "age-calculator") return "age";
  if (slug.includes("percentage")) return "percentage";
  if (slug.includes("tip")) return "tip";
  if (slug.includes("discount")) return "discount";
  if (slug.includes("compound-interest")) return "compound-interest";
  if (slug.includes("simple-interest")) return "simple-interest";
  if (slug.includes("calorie")) return "calorie";
  if (slug.includes("bmr")) return "bmr";
  if (slug.includes("ideal-weight")) return "ideal-weight";
  if (slug.includes("body-fat")) return "body-fat";
  if (slug.includes("fraction")) return "fraction";
  if (slug.includes("average")) return "average";
  if (slug.includes("standard-deviation")) return "standard-deviation";
  if (slug.includes("random-number")) return "random-number";
  if (slug.includes("date")) return "date";
  if (slug.includes("time")) return "time";
  if (slug.includes("conversion") || slug.includes("converter")) return "conversion";
  if (slug.includes("area")) return "area";
  if (slug.includes("volume")) return "volume";
  if (slug.includes("triangle")) return "triangle";
  if (category === "Financial") return "financial";
  if (category === "Fitness & Health") return "health";
  if (category === "Math") return "math";
  return "other";
}

const entries = routes.map((url) => {
  const file = url.split("/").pop();
  const category = classify(file);
  return {
    slug: file.replace(/\.html$/, ""),
    route: `/${file}`,
    title: titleize(file),
    category,
    family: family(file, category),
    description: `Use this ${titleize(file).toLowerCase()} to work through the inputs and get a clear estimate.`,
  };
});

const output = `/**\n * Public route registry generated from sitemap.xml.\n * Style reminder — Utilitarian Calculation Desk: dense index, practical titles, direct routes.\n */\nexport type CalculatorCategory = "Financial" | "Fitness & Health" | "Math" | "Other";\n\nexport type CalculatorDefinition = {\n  slug: string;\n  route: string;\n  title: string;\n  category: CalculatorCategory;\n  family: string;\n  description: string;\n};\n\nexport const calculatorRegistry: CalculatorDefinition[] = ${JSON.stringify(entries, null, 2)};\n\nexport function getCalculatorDefinition(slug: string) {\n  const normalized = slug.replace(/^\\//, "").replace(/\\.html$/, "");\n  return calculatorRegistry.find((definition) => definition.slug === normalized);\n}\n\nexport function getCalculatorRoute(slug: string) {\n  const definition = getCalculatorDefinition(slug);\n  return definition?.route ?? "/" + slug;\n}\n`;

writeFileSync(resolve(root, "client/src/lib/calculators.ts"), output);
console.log(`Generated ${entries.length} calculator definitions.`);
