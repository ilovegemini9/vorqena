/**
 * Style reminder — Utilitarian Calculation Desk: retain the shared navy shell,
 * dense form rhythm, clear result rail, and tool-specific explanatory copy.
 */
import { useMemo, useState } from "react";
import { Calculator, FileText, Lightbulb } from "lucide-react";
import { useRoute } from "wouter";
import { getCalculatorDefinition, type CalculatorDefinition } from "@/lib/calculators";
import { AgeCalculatorPage, BmiCalculatorPage, CalculatorLayout, MortgageCalculatorPage } from "./CalculatorPages";

const formatNumber = (value: number, maximumFractionDigits = 2) => new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(Number.isFinite(value) ? value : 0);
const formatCurrency = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(Number.isFinite(value) ? value : 0);

function NumericField({ label, value, onChange, suffix, hint }: { label: string; value: number; onChange: (value: number) => void; suffix?: string; hint?: string }) {
  return <label className="field"><span>{label} {hint && <small>{hint}</small>}</span><div className="input-unit"><input type="number" value={value} onChange={(event) => onChange(Number(event.target.value) || 0)} /><em>{suffix}</em></div></label>;
}

function topicFrom(definition: CalculatorDefinition) {
  return definition.title.replace(/ Calculator$/i, "").replace(/ Calculator For Your Site$/i, "");
}

function inputPlan(definition: CalculatorDefinition) {
  const topic = topicFrom(definition);
  const title = definition.title.toLowerCase();
  if (definition.family === "calorie") return { labels: ["Age", "Weight", "Height"], suffixes: ["years", "kg", "cm"] };
  if (definition.family === "bmr") return { labels: ["Age", "Weight", "Height"], suffixes: ["years", "kg", "cm"] };
  if (definition.family === "ideal-weight") return { labels: ["Height", "Age", "Reference weight"], suffixes: ["cm", "years", "kg"] };
  if (definition.family === "body-fat") return { labels: ["Waist circumference", "Neck circumference", "Height"], suffixes: ["cm", "cm", "cm"] };
  if (definition.family === "triangle") return { labels: ["Side A", "Side B", "Side C"], suffixes: ["", "", ""] };
  if (definition.family === "standard-deviation") return { labels: ["Value one", "Value two", "Value three"], suffixes: ["", "", ""] };
  if (definition.family === "fraction") return { labels: ["Numerator", "Denominator", "Second value"], suffixes: ["", "", ""] };
  if (definition.family === "random-number") return { labels: ["Minimum", "Maximum", "Number of results"], suffixes: ["", "", ""] };
  if (definition.family === "percentage") return { labels: ["Base amount", "Percentage rate", "Reference amount"], suffixes: ["", "%", ""] };
  if (definition.family === "tip") return { labels: ["Bill amount", "Tip rate", "Number of people"], suffixes: ["$", "%", ""] };
  if (definition.family === "discount") return { labels: ["Original price", "Discount rate", "Quantity"], suffixes: ["$", "%", ""] };
  if (definition.family === "compound-interest") return { labels: ["Starting principal", "Annual interest rate", "Investment period"], suffixes: ["$", "%", "years"] };
  if (definition.family === "simple-interest") return { labels: ["Principal amount", "Annual interest rate", "Time period"], suffixes: ["$", "%", "years"] };
  if (definition.family === "average") return { labels: ["First number", "Second number", "Third number"], suffixes: ["", "", ""] };
  if (definition.family === "area") return { labels: ["Length", "Width", "Quantity"], suffixes: ["", "", ""] };
  if (definition.family === "volume") return { labels: ["Length", "Width", "Height"], suffixes: ["", "", ""] };
  if (definition.family === "conversion") return { labels: ["Value to convert", "Conversion rate", "Precision"], suffixes: ["", "", "decimals"] };
  if (definition.category === "Financial" || /loan|mortgage|payment|interest|investment|retirement|tax|salary|credit|debt|savings|budget/i.test(title)) return { labels: [`${topic} amount`, "Annual rate", "Term or period"], suffixes: ["$", "%", "years"] };
  if (definition.category === "Fitness & Health" || /calorie|body|weight|heart|pace|pregnancy|protein|carbohydrate|nutrition|bmr|tdee/i.test(title)) return { labels: ["Age or quantity", "Height or rate", "Weight or target"], suffixes: ["", "", ""] };
  if (definition.category === "Math" || /number|fraction|triangle|area|volume|statistics|standard deviation|ratio|equation|matrix|angle/i.test(title)) return { labels: [`${topic} value`, "Second value", "Precision or count"], suffixes: ["", "", ""] };
  return { labels: [`${topic} value`, `${topic} rate or factor`, `${topic} period or quantity`], suffixes: ["", "", ""] };
}

function resultLabel(definition: CalculatorDefinition) {
  const topic = topicFrom(definition).toLowerCase();
  if (definition.family === "calorie" || definition.family === "bmr") return `${topic} estimate`;
  if (definition.family === "ideal-weight") return "Ideal weight estimate";
  if (definition.family === "body-fat") return "Body fat estimate";
  if (definition.family === "triangle") return "Triangle area";
  if (definition.family === "standard-deviation") return "Standard deviation";
  if (definition.family === "fraction") return "Fraction result";
  if (definition.family === "random-number") return "Random value";
  if (definition.family === "percentage") return `${topic} amount`;
  if (definition.family === "tip") return "Total bill";
  if (definition.family === "discount") return "Price after discount";
  if (definition.family === "compound-interest" || definition.family === "simple-interest") return "Future value";
  if (definition.category === "Financial") return `${topic} estimate`;
  if (definition.category === "Fitness & Health") return `${topic} estimate`;
  if (definition.category === "Math") return `${topic} result`;
  return `${topic} result`;
}

function DateTool({ definition }: { definition: CalculatorDefinition }) {
  const today = new Date().toISOString().slice(0, 10);
  const [start, setStart] = useState("2026-01-01");
  const [end, setEnd] = useState(today);
  const days = Math.max(0, Math.round((new Date(`${end}T00:00:00`).getTime() - new Date(`${start}T00:00:00`).getTime()) / 86400000));
  return <>
    <div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Choose the two calendar dates to compare.</p><label className="field"><span>Start date</span><input type="date" value={start} onChange={(event) => setStart(event.target.value)} /></label><label className="field"><span>End date</span><input type="date" value={end} onChange={(event) => setEnd(event.target.value)} /></label><button type="button" className="calculate-button">Calculate date difference</button></form><section className="result-rail" aria-live="polite"><p>Days between dates</p><strong>{formatNumber(days)}</strong><span>{definition.title} calendar interval</span><dl className="result-breakdown"><div><dt>Weeks</dt><dd>{formatNumber(days / 7)}</dd></div><div><dt>Months (approx.)</dt><dd>{formatNumber(days / 30.4375)}</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>How this date calculation works</h2><span>Calendar interval</span></div><div className="explanation-body"><Lightbulb size={22} /><p>This date tool counts the elapsed calendar days between the selected start and end dates. Review the dates when a month boundary or leap year matters.</p></div></section>
  </>;
}

function TimeTool({ definition }: { definition: CalculatorDefinition }) {
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(30);
  const totalMinutes = Math.max(0, hours * 60 + minutes);
  return <div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Enter the duration you want to convert.</p><NumericField label="Hours" value={hours} onChange={setHours} suffix="hours" /><NumericField label="Minutes" value={minutes} onChange={setMinutes} suffix="minutes" /><button type="button" className="calculate-button">Calculate duration</button></form><section className="result-rail" aria-live="polite"><p>{topicFrom(definition)} result</p><strong>{formatNumber(totalMinutes)}</strong><span>Total minutes</span><dl className="result-breakdown"><div><dt>Total hours</dt><dd>{formatNumber(totalMinutes / 60)}</dd></div><div><dt>Total seconds</dt><dd>{formatNumber(totalMinutes * 60)}</dd></div></dl></section></div>;
}

function GenericCalculator({ definition }: { definition: CalculatorDefinition }) {
  const plan = inputPlan(definition);
  const defaults = definition.family === "calorie" || definition.family === "bmr" ? [30, 70, 175] : definition.family === "ideal-weight" ? [175, 30, 70] : definition.family === "body-fat" ? [90, 40, 175] : definition.family === "triangle" ? [3, 4, 5] : definition.family === "standard-deviation" ? [10, 12, 15] : definition.family === "fraction" ? [3, 4, 2] : definition.family === "random-number" ? [1, 100, 1] : definition.family === "percentage" ? [100, 15, 0] : definition.family === "tip" ? [50, 20, 2] : definition.family === "discount" ? [100, 20, 1] : definition.family === "compound-interest" || definition.family === "simple-interest" ? [10000, 5, 10] : definition.family === "area" ? [12, 8, 1] : definition.family === "volume" ? [12, 8, 5] : definition.category === "Financial" ? [250000, 6.5, 30] : [100, 12, 5];
  const [first, setFirst] = useState(defaults[0]);
  const [second, setSecond] = useState(defaults[1]);
  const [third, setThird] = useState(defaults[2]);
  const [operator, setOperator] = useState("+");
  const result = useMemo(() => {
    const a = Number(first) || 0;
    const b = Number(second) || 0;
    const c = Number(third) || 0;
    if (definition.family === "calorie" || definition.family === "bmr") { const bmr = 10 * b + 6.25 * c - 5 * a + 5; return { value: definition.family === "calorie" ? bmr * 1.375 : bmr, detail: `Mifflin-St Jeor estimate from ${formatNumber(a)} years, ${formatNumber(b)} kg and ${formatNumber(c)} cm` }; }
    if (definition.family === "ideal-weight") { const ideal = 50 + 0.9 * (a - 152.4); return { value: ideal, detail: `Reference estimate for ${formatNumber(a)} cm height` }; }
    if (definition.family === "body-fat") { const estimate = c > b && a > b ? 495 / (1.0324 - 0.19077 * Math.log10(a - b) + 0.15456 * Math.log10(c)) - 450 : 0; return { value: estimate, detail: "Navy circumference estimate; units should be consistent" }; }
    if (definition.family === "triangle") { const semi = (a + b + c) / 2; const area = semi > a && semi > b && semi > c ? Math.sqrt(semi * (semi - a) * (semi - b) * (semi - c)) : 0; return { value: area, detail: `Heron's formula using sides ${formatNumber(a)}, ${formatNumber(b)}, ${formatNumber(c)}` }; }
    if (definition.family === "standard-deviation") { const mean = (a + b + c) / 3; return { value: Math.sqrt(((a - mean) ** 2 + (b - mean) ** 2 + (c - mean) ** 2) / 3), detail: `Mean: ${formatNumber(mean)}` }; }
    if (definition.family === "fraction") { const value = b ? a / b + c : 0; return { value, detail: `${formatNumber(a)} ÷ ${formatNumber(b)} + ${formatNumber(c)}` }; }
    if (definition.family === "random-number") { const low = Math.min(a, b); const high = Math.max(a, b); const random = low + Math.random() * (high - low); return { value: Math.round(random), detail: `Random integer between ${formatNumber(low)} and ${formatNumber(high)}` }; }
    if (definition.family === "percentage") return { value: (a * b) / 100, detail: `${formatNumber(b)}% of ${formatNumber(a)}` };
    if (definition.family === "tip") return { value: a * (1 + b / 100), detail: `Tip amount: ${formatCurrency((a * b) / 100)}` };
    if (definition.family === "discount") return { value: a * (1 - b / 100), detail: `You save: ${formatCurrency((a * b) / 100)}` };
    if (definition.family === "compound-interest") { const future = a * (1 + b / 100 / 12) ** (c * 12); return { value: future, detail: `Interest earned: ${formatCurrency(future - a)}` }; }
    if (definition.family === "simple-interest") { const interest = a * (b / 100) * c; return { value: a + interest, detail: `Interest earned: ${formatCurrency(interest)}` }; }
    if (definition.family === "average") return { value: (a + b + c) / 3, detail: `Sum: ${formatNumber(a + b + c)}` };
    if (definition.family === "area") return { value: a * b, detail: `${formatNumber(a)} × ${formatNumber(b)} square units` };
    if (definition.family === "volume") return { value: a * b * c, detail: `${formatNumber(a)} × ${formatNumber(b)} × ${formatNumber(c)} cubic units` };
    if (definition.family === "conversion") return { value: a * 1.609344, detail: `${formatNumber(a)} miles = ${formatNumber(a * 1.609344)} kilometres` };
    if (definition.family === "math" || definition.category === "Math") { const value = operator === "−" ? a - b : operator === "×" ? a * b : operator === "÷" ? (b ? a / b : 0) : a + b; return { value, detail: `${formatNumber(a)} ${operator} ${formatNumber(b)}` }; }
    if (definition.family === "health" || definition.category === "Fitness & Health") { const bmi = b ? a / (b / 100) ** 2 : 0; return { value: bmi, detail: "A general estimate; review the assumptions and units." }; }
    if (definition.category === "Financial") { const monthlyRate = b / 100 / 12; const monthly = monthlyRate ? (a * monthlyRate) / (1 - (1 + monthlyRate) ** (-c * 12)) : a / Math.max(c * 12, 1); return { value: monthly, detail: `Principal ${formatCurrency(a)} over ${formatNumber(c)} years` }; }
    return { value: a + b, detail: `${formatNumber(a)} + ${formatNumber(b)}` };
  }, [first, second, third, operator, definition]);
  const moneyResult = definition.category === "Financial" || ["tip", "discount", "compound-interest", "simple-interest"].includes(definition.family);
  return <>
    <div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Enter the values for this {topicFrom(definition).toLowerCase()} calculation.</p><NumericField label={plan.labels[0]} value={first} onChange={setFirst} suffix={plan.suffixes[0]} /><NumericField label={plan.labels[1]} value={second} onChange={setSecond} suffix={plan.suffixes[1]} />{definition.category === "Math" && <div className="operator-row"><span>Operation</span><select value={operator} onChange={(event) => setOperator(event.target.value)}><option>+</option><option>−</option><option>×</option><option>÷</option></select></div>}<NumericField label={plan.labels[2]} value={third} onChange={setThird} suffix={plan.suffixes[2]} /><button type="button" className="calculate-button">Calculate {topicFrom(definition)}</button></form><section className="result-rail" aria-live="polite"><p>{resultLabel(definition)}</p><strong>{moneyResult ? formatCurrency(result.value) : formatNumber(result.value)}</strong><span>{result.detail}</span><dl className="result-breakdown"><div><dt>Tool</dt><dd>{definition.title}</dd></div><div><dt>Category</dt><dd>{definition.category}</dd></div><div><dt>Inputs</dt><dd>3 values</dd></div></dl></section></div>
    <section className="data-section explanation-card"><div className="data-section-heading"><h2>How this calculator works</h2><span>Practical estimate</span></div><div className="explanation-body"><Lightbulb size={22} /><p>Enter your {plan.labels.map((label) => label.toLowerCase()).join(", ")}, then compare the result as you adjust the scenario. The displayed value is a planning estimate and should be checked against the correct units and assumptions.</p></div></section><p className="calculator-disclaimer">This tool is an estimate for educational and planning purposes. Check the assumptions and units before using a result for a real-world decision.</p>
  </>;
}

function AboutDirectoryPage() {
  return <section className="data-section explanation-card"><div className="data-section-heading"><h2>About this calculator directory</h2><span>Public route index</span></div><div className="explanation-body"><FileText size={22} /><p>This reconstruction organizes the public calculator routes into a searchable directory with a shared responsive workspace. Dedicated formula modules can be layered onto the same navigation without changing the directory structure.</p></div></section>;
}

export default function PublicCalculatorPage() {
  const [, params] = useRoute("/:slug");
  const definition = getCalculatorDefinition(params?.slug ?? "");
  if (!definition) return null;
  if (definition.family === "mortgage") return <MortgageCalculatorPage />;
  if (definition.family === "bmi") return <BmiCalculatorPage />;
  if (definition.family === "age") return <AgeCalculatorPage />;
  if (definition.slug === "about-us") return <CalculatorLayout category="Other" title="About Calculator.net" description="A public directory of practical calculators, organized for direct use."><AboutDirectoryPage /></CalculatorLayout>;
  if (definition.family === "date") return <CalculatorLayout category={definition.category} title={definition.title} description="Compare calendar dates and review the interval in useful units."><DateTool definition={definition} /></CalculatorLayout>;
  if (definition.family === "time") return <CalculatorLayout category={definition.category} title={definition.title} description={definition.description}><TimeTool definition={definition} /></CalculatorLayout>;
  return <CalculatorLayout category={definition.category} title={definition.title} description={definition.description}><GenericCalculator definition={definition} /></CalculatorLayout>;
}
