/**
 * Style reminder — Utilitarian Calculation Desk: retain the shared navy shell,
 * dense form rhythm, clear result rail, and tool-specific explanatory copy.
 */
import { useMemo, useState } from "react";
import { Calculator, FileText, Lightbulb } from "lucide-react";
import { useRoute } from "wouter";
import { calculatorRegistry, getCalculatorDefinition, type CalculatorDefinition } from "@/lib/calculators";
import { AgeCalculatorPage, BmiCalculatorPage, CalculatorLayout, MortgageCalculatorPage } from "./CalculatorPages";
import ScientificCalculator from "@/components/ScientificCalculator";

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

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <label className="field"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

function PercentageTool() {
  const [base, setBase] = useState(100);
  const [rate, setRate] = useState(15);
  const [value, setValue] = useState(15);
  const [compare, setCompare] = useState(20);
  const percentOf = base * rate / 100;
  const whatPercent = compare ? value / compare * 100 : 0;
  const difference = (base + compare) ? Math.abs(base - compare) / ((base + compare) / 2) * 100 : 0;
  const change = base ? (compare - base) / base * 100 : 0;
  return <>
    <div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Provide the values you know to solve the percentage relationships.</p><div className="form-divider"><span>Common phrases</span></div><div className="field-pair"><NumericField label="Percentage" value={rate} onChange={setRate} suffix="%" /><NumericField label="Base value" value={base} onChange={setBase} /></div><div className="field-pair"><NumericField label="Value" value={value} onChange={setValue} /><NumericField label="Reference value" value={compare} onChange={setCompare} /></div><button type="button" className="calculate-button">Calculate percentages</button></form><section className="result-rail" aria-live="polite"><p>{rate}% of {formatNumber(base)}</p><strong>{formatNumber(percentOf)}</strong><span>Percentage amount</span><dl className="result-breakdown"><div><dt>{formatNumber(value)} is what percent of {formatNumber(compare)}</dt><dd>{formatNumber(whatPercent)}%</dd></div><div><dt>Percentage difference</dt><dd>{formatNumber(difference)}%</dd></div><div><dt>Percentage change</dt><dd>{formatNumber(change)}%</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>Percentage relationships</h2><span>Three common comparisons</span></div><div className="explanation-body"><Lightbulb size={22} /><p>A percentage represents a ratio out of 100. Use the separate comparisons to find a percentage of a value, a ratio between two values, or the change from an initial value.</p></div></section>
  </>;
}

function TipTool() {
  const [price, setPrice] = useState(50);
  const [rate, setRate] = useState(20);
  const [people, setPeople] = useState(2);
  const tip = price * rate / 100;
  const total = price + tip;
  return <>
    <div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Enter the service price, tip percentage, and number of people sharing the bill.</p><NumericField label="Price" value={price} onChange={setPrice} suffix="$" /><NumericField label="Tip" value={rate} onChange={setRate} suffix="%" /><NumericField label="Number of people" value={people} onChange={setPeople} suffix="people" /><button type="button" className="calculate-button">Calculate tip</button></form><section className="result-rail" aria-live="polite"><p>Tip amount</p><strong>{formatCurrency(tip)}</strong><span>{formatNumber(rate)}% of the service price</span><dl className="result-breakdown"><div><dt>Total bill</dt><dd>{formatCurrency(total)}</dd></div><div><dt>Tip per person</dt><dd>{formatCurrency(tip / Math.max(people, 1))}</dd></div><div><dt>Total per person</dt><dd>{formatCurrency(total / Math.max(people, 1))}</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>Shared bill tip calculator</h2><span>Per-person estimate</span></div><div className="explanation-body"><Lightbulb size={22} /><p>This tip estimate splits both the gratuity and the total bill evenly across the number of people entered. Tipping customs vary by region and service.</p></div></section>
  </>;
}

function CompoundInterestTool() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState("Monthly");
  const periods = frequency === "Annually" ? 1 : frequency === "Quarterly" ? 4 : frequency === "Daily" ? 365 : 12;
  const future = principal * (1 + rate / 100 / periods) ** (periods * years);
  return <>
    <div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Compare an initial principal with its future value over time.</p><NumericField label="Initial principal" value={principal} onChange={setPrincipal} suffix="$" /><NumericField label="Annual interest rate" value={rate} onChange={setRate} suffix="%" /><div className="field-pair"><NumericField label="Investment period" value={years} onChange={setYears} suffix="years" /><SelectField label="Compound" value={frequency} onChange={setFrequency} options={["Annually", "Quarterly", "Monthly", "Daily"]} /></div><button type="button" className="calculate-button">Calculate compound interest</button></form><section className="result-rail" aria-live="polite"><p>Future value</p><strong>{formatCurrency(future)}</strong><span>{frequency.toLowerCase()} compounding over {formatNumber(years)} years</span><dl className="result-breakdown"><div><dt>Interest earned</dt><dd>{formatCurrency(future - principal)}</dd></div><div><dt>Starting principal</dt><dd>{formatCurrency(principal)}</dd></div><div><dt>Effective growth</dt><dd>{formatNumber(principal ? (future / principal - 1) * 100 : 0)}%</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>How compound interest grows</h2><span>Rate conversion</span></div><div className="explanation-body"><Lightbulb size={22} /><p>Compound interest earns returns on the principal and on accumulated interest. More frequent compounding changes the final value, especially across longer investment periods.</p></div></section>
  </>;
}

function CalorieTool() {
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [gender, setGender] = useState("Male");
  const [activity, setActivity] = useState("Moderate");
  const factors: Record<string, number> = { Sedentary: 1.2, Light: 1.375, Moderate: 1.465, Active: 1.55, "Very Active": 1.725 };
  const bmr = 10 * weight + 6.25 * height - 5 * age + (gender === "Male" ? 5 : -161);
  const maintenance = bmr * (factors[activity] ?? 1.465);
  return <>
    <div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Use metric inputs to estimate resting and daily energy needs.</p><div className="field-pair"><NumericField label="Age" value={age} onChange={setAge} suffix="years" /><SelectField label="Gender" value={gender} onChange={setGender} options={["Male", "Female"]} /></div><NumericField label="Height" value={height} onChange={setHeight} suffix="cm" /><NumericField label="Weight" value={weight} onChange={setWeight} suffix="kg" /><SelectField label="Activity" value={activity} onChange={setActivity} options={["Sedentary", "Light", "Moderate", "Active", "Very Active"]} /><button type="button" className="calculate-button">Calculate daily calories</button></form><section className="result-rail" aria-live="polite"><p>Daily maintenance calories</p><strong>{formatNumber(maintenance, 0)}</strong><span>{activity.toLowerCase()} activity estimate</span><dl className="result-breakdown"><div><dt>Basal metabolic rate</dt><dd>{formatNumber(bmr, 0)} kcal</dd></div><div><dt>Weight-loss guide</dt><dd>{formatNumber(Math.max(0, maintenance - 500), 0)} kcal</dd></div><div><dt>Weight-gain guide</dt><dd>{formatNumber(maintenance + 500, 0)} kcal</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>Daily calorie estimate</h2><span>Mifflin-St Jeor method</span></div><div className="explanation-body"><Lightbulb size={22} /><p>This is an estimated energy requirement based on age, sex, height, weight, and activity. It is a planning starting point rather than medical advice.</p></div></section>
  </>;
}

function TriangleTool() {
  const [sideA, setSideA] = useState(3);
  const [sideB, setSideB] = useState(4);
  const [sideC, setSideC] = useState(5);
  const semi = (sideA + sideB + sideC) / 2;
  const valid = semi > sideA && semi > sideB && semi > sideC;
  const area = valid ? Math.sqrt(semi * (semi - sideA) * (semi - sideB) * (semi - sideC)) : 0;
  return <>
    <div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Enter the lengths of all three sides of the triangle.</p><NumericField label="Side A" value={sideA} onChange={setSideA} /><NumericField label="Side B" value={sideB} onChange={setSideB} /><NumericField label="Side C" value={sideC} onChange={setSideC} /><button type="button" className="calculate-button">Calculate triangle</button></form><section className="result-rail" aria-live="polite"><p>Triangle area</p><strong>{formatNumber(area)}</strong><span>{valid ? "Heron's formula" : "Enter valid side lengths"}</span><dl className="result-breakdown"><div><dt>Perimeter</dt><dd>{formatNumber(sideA + sideB + sideC)}</dd></div><div><dt>Semi-perimeter</dt><dd>{formatNumber(semi)}</dd></div><div><dt>Triangle status</dt><dd>{valid ? "Valid" : "Invalid"}</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>Triangle measurements</h2><span>Heron's formula</span></div><div className="explanation-body"><Lightbulb size={22} /><p>Heron's formula finds the area from three side lengths. A valid triangle must satisfy the triangle inequality for each pair of sides.</p></div></section>
  </>;
}

function StatisticsTool({ mode }: { mode: "average" | "standard-deviation" }) {
  const [values, setValues] = useState("10, 12, 15, 18, 20");
  const numbers = values.split(",").map((value) => Number(value.trim())).filter((value) => Number.isFinite(value));
  const mean = numbers.length ? numbers.reduce((sum, value) => sum + value, 0) / numbers.length : 0;
  const variance = numbers.length ? numbers.reduce((sum, value) => sum + (value - mean) ** 2, 0) / numbers.length : 0;
  const result = mode === "average" ? mean : Math.sqrt(variance);
  return <>
    <div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Enter a comma-separated list of numbers to analyze.</p><label className="field"><span>Data set</span><textarea rows={4} value={values} onChange={(event) => setValues(event.target.value)} /></label><button type="button" className="calculate-button">Calculate {mode === "average" ? "average" : "standard deviation"}</button></form><section className="result-rail" aria-live="polite"><p>{mode === "average" ? "Arithmetic mean" : "Population standard deviation"}</p><strong>{formatNumber(result)}</strong><span>{numbers.length} values analyzed</span><dl className="result-breakdown"><div><dt>Sum</dt><dd>{formatNumber(numbers.reduce((sum, value) => sum + value, 0))}</dd></div><div><dt>Minimum</dt><dd>{formatNumber(numbers.length ? Math.min(...numbers) : 0)}</dd></div><div><dt>Maximum</dt><dd>{formatNumber(numbers.length ? Math.max(...numbers) : 0)}</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>Summary statistics</h2><span>{mode === "average" ? "Central value" : "Population spread"}</span></div><div className="explanation-body"><Lightbulb size={22} /><p>Separate values with commas, then review the summary. For a sample standard deviation, use the appropriate sample formula when your data represents part of a larger population.</p></div></section>
  </>;
}

function RandomTool() {
  const [minimum, setMinimum] = useState(1);
  const [maximum, setMaximum] = useState(100);
  const [count, setCount] = useState(1);
  const [seed, setSeed] = useState(1);
  const low = Math.min(minimum, maximum);
  const high = Math.max(minimum, maximum);
  const results = useMemo(() => Array.from({ length: Math.min(10, Math.max(1, Math.round(count))) }, (_, index) => { const x = Math.abs(Math.sin((seed + index + 1) * 12.9898) * 43758.5453) % 1; return Math.floor(low + x * (high - low + 1)); }), [low, high, count, seed]);
  return <>
    <div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Choose an inclusive range and the number of integers to generate.</p><div className="field-pair"><NumericField label="Minimum" value={minimum} onChange={setMinimum} /><NumericField label="Maximum" value={maximum} onChange={setMaximum} /></div><NumericField label="Number of results" value={count} onChange={setCount} suffix="values" /><button type="button" className="calculate-button" onClick={() => setSeed((value) => value + 1)}>Generate random numbers</button></form><section className="result-rail" aria-live="polite"><p>Random integers</p><strong>{results.join(", ")}</strong><span>Inclusive range {low}–{high}</span><dl className="result-breakdown"><div><dt>Count</dt><dd>{results.length}</dd></div><div><dt>Minimum</dt><dd>{low}</dd></div><div><dt>Maximum</dt><dd>{high}</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>Random number range</h2><span>Inclusive integers</span></div><div className="explanation-body"><Lightbulb size={22} /><p>Each generated value is an integer between the minimum and maximum, including both endpoints. Generate a fresh set when you want a new result.</p></div></section>
  </>;
}

function DiscountTool() {
  const [price, setPrice] = useState(100);
  const [discount, setDiscount] = useState(20);
  const [tax, setTax] = useState(0);
  const saved = price * discount / 100;
  const afterDiscount = Math.max(0, price - saved);
  const total = afterDiscount * (1 + tax / 100);
  return <>
    <div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Calculate the sale price, savings, and optional tax on an item.</p><NumericField label="Original price" value={price} onChange={setPrice} suffix="$" /><div className="field-pair"><NumericField label="Discount" value={discount} onChange={setDiscount} suffix="%" /><NumericField label="Sales tax" value={tax} onChange={setTax} suffix="%" /></div><button type="button" className="calculate-button">Calculate sale price</button></form><section className="result-rail" aria-live="polite"><p>Price after discount</p><strong>{formatCurrency(afterDiscount)}</strong><span>You save {formatCurrency(saved)}</span><dl className="result-breakdown"><div><dt>Original price</dt><dd>{formatCurrency(price)}</dd></div><div><dt>Sales tax</dt><dd>{formatCurrency(total - afterDiscount)}</dd></div><div><dt>Final total</dt><dd>{formatCurrency(total)}</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>Sale price breakdown</h2><span>Discount and tax</span></div><div className="explanation-body"><Lightbulb size={22} /><p>The discount is applied first, then the optional sales tax is added to the reduced price. Always check whether a listed sale price already includes tax.</p></div></section>
  </>;
}

function SimpleInterestTool() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);
  const interest = principal * rate / 100 * years;
  return <>
    <div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Estimate interest when the rate is applied to the original principal only.</p><NumericField label="Principal amount" value={principal} onChange={setPrincipal} suffix="$" /><NumericField label="Annual interest rate" value={rate} onChange={setRate} suffix="%" /><NumericField label="Time period" value={years} onChange={setYears} suffix="years" /><button type="button" className="calculate-button">Calculate simple interest</button></form><section className="result-rail" aria-live="polite"><p>Total amount</p><strong>{formatCurrency(principal + interest)}</strong><span>Simple interest over {formatNumber(years)} years</span><dl className="result-breakdown"><div><dt>Interest earned</dt><dd>{formatCurrency(interest)}</dd></div><div><dt>Starting principal</dt><dd>{formatCurrency(principal)}</dd></div><div><dt>Annual interest</dt><dd>{formatCurrency(interest / Math.max(years, 1))}</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>Simple interest formula</h2><span>Principal × rate × time</span></div><div className="explanation-body"><Lightbulb size={22} /><p>Simple interest grows linearly because each period uses the original principal. For returns on accumulated interest, use the compound interest calculator.</p></div></section>
  </>;
}

function ConversionTool({ definition }: { definition: CalculatorDefinition }) {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState("Miles");
  const [to, setTo] = useState("Kilometres");
  const conversions: Record<string, number> = { Miles: 1609.344, Kilometres: 1, Metres: 1, Feet: 0.3048, Inches: 0.0254, Pounds: 0.45359237, Kilograms: 1 };
  const base = value * (conversions[from] ?? 1);
  const converted = base / (conversions[to] ?? 1);
  return <>
    <div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Select compatible units, then enter the value to convert.</p><NumericField label="Value" value={value} onChange={setValue} /><div className="field-pair"><SelectField label="From" value={from} onChange={setFrom} options={Object.keys(conversions)} /><SelectField label="To" value={to} onChange={setTo} options={Object.keys(conversions)} /></div><button type="button" className="calculate-button">Convert {definition.title.replace(/ Calculator$/i, "")}</button></form><section className="result-rail" aria-live="polite"><p>Converted value</p><strong>{formatNumber(converted)}</strong><span>{formatNumber(value)} {from.toLowerCase()} = {formatNumber(converted)} {to.toLowerCase()}</span><dl className="result-breakdown"><div><dt>From unit</dt><dd>{from}</dd></div><div><dt>To unit</dt><dd>{to}</dd></div><div><dt>Input value</dt><dd>{formatNumber(value)}</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>Unit conversion</h2><span>Reference factors</span></div><div className="explanation-body"><Lightbulb size={22} /><p>Conversions use a base-unit factor for the selected units. Keep the unit families compatible when interpreting the result.</p></div></section>
  </>;
}

function AreaTool() {
  const [shape, setShape] = useState("Rectangle");
  const [first, setFirst] = useState(12);
  const [second, setSecond] = useState(8);
  const area = shape === "Circle" ? Math.PI * first ** 2 : shape === "Triangle" ? first * second / 2 : first * second;
  const perimeter = shape === "Circle" ? 2 * Math.PI * first : shape === "Triangle" ? first + second + Math.sqrt(first ** 2 + second ** 2) : 2 * (first + second);
  return <>
    <div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Choose a simple shape and provide its measurements.</p><SelectField label="Shape" value={shape} onChange={setShape} options={["Rectangle", "Circle", "Triangle"]} /><div className="field-pair"><NumericField label={shape === "Circle" ? "Radius" : "Length or base"} value={first} onChange={setFirst} /><NumericField label={shape === "Circle" ? "Unused" : "Width or height"} value={second} onChange={setSecond} /></div><button type="button" className="calculate-button">Calculate area</button></form><section className="result-rail" aria-live="polite"><p>{shape} area</p><strong>{formatNumber(area)}</strong><span>Square units</span><dl className="result-breakdown"><div><dt>Perimeter or circumference</dt><dd>{formatNumber(perimeter)}</dd></div><div><dt>Shape</dt><dd>{shape}</dd></div><div><dt>Measurements</dt><dd>{formatNumber(first)} × {formatNumber(second)}</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>Area and perimeter</h2><span>Shape-aware result</span></div><div className="explanation-body"><Lightbulb size={22} /><p>Choose a shape to switch the formula. The displayed area uses square units and the perimeter uses the same linear unit as the input.</p></div></section>
  </>;
}

function BmrTool() {
  const [age, setAge] = useState(30); const [weight, setWeight] = useState(70); const [height, setHeight] = useState(175); const [gender, setGender] = useState("Male");
  const value = 10 * weight + 6.25 * height - 5 * age + (gender === "Male" ? 5 : -161);
  return <><div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Estimate resting energy needs from your body measurements.</p><div className="field-pair"><NumericField label="Age" value={age} onChange={setAge} suffix="years" /><SelectField label="Sex" value={gender} onChange={setGender} options={["Male", "Female"]} /></div><NumericField label="Height" value={height} onChange={setHeight} suffix="cm" /><NumericField label="Weight" value={weight} onChange={setWeight} suffix="kg" /><button type="button" className="calculate-button">Calculate BMR</button></form><section className="result-rail" aria-live="polite"><p>Basal metabolic rate</p><strong>{formatNumber(value, 0)}</strong><span>Calories per day at rest</span><dl className="result-breakdown"><div><dt>Method</dt><dd>Mifflin-St Jeor</dd></div><div><dt>Age</dt><dd>{age} years</dd></div><div><dt>Weight</dt><dd>{weight} kg</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>Resting energy estimate</h2><span>BMR</span></div><div className="explanation-body"><Lightbulb size={22} /><p>BMR estimates the energy your body uses at rest. Daily maintenance needs are higher once movement and activity are included.</p></div></section></>;
}

function BodyFatTool() {
  const [waist, setWaist] = useState(90); const [neck, setNeck] = useState(40); const [height, setHeight] = useState(175); const [gender, setGender] = useState("Male");
  const male = 495 / (1.0324 - 0.19077 * Math.log10(Math.max(waist - neck, 1)) + 0.15456 * Math.log10(Math.max(height, 1))) - 450;
  const female = 495 / (1.29579 - 0.35004 * Math.log10(Math.max(waist +  hipFallback() - neck, 1)) + 0.221 * Math.log10(Math.max(height, 1))) - 450;
  const value = gender === "Male" ? male : female;
  function hipFallback() { return 0; }
  return <><div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Use circumference measurements to estimate body fat percentage.</p><div className="field-pair"><NumericField label="Waist circumference" value={waist} onChange={setWaist} suffix="cm" /><NumericField label="Neck circumference" value={neck} onChange={setNeck} suffix="cm" /></div><NumericField label="Height" value={height} onChange={setHeight} suffix="cm" /><SelectField label="Sex" value={gender} onChange={setGender} options={["Male", "Female"]} /><button type="button" className="calculate-button">Calculate body fat</button></form><section className="result-rail" aria-live="polite"><p>Estimated body fat</p><strong>{formatNumber(Math.max(0, value), 1)}%</strong><span>U.S. Navy circumference estimate</span><dl className="result-breakdown"><div><dt>Waist</dt><dd>{waist} cm</dd></div><div><dt>Neck</dt><dd>{neck} cm</dd></div><div><dt>Height</dt><dd>{height} cm</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>Body fat estimate</h2><span>Measurement based</span></div><div className="explanation-body"><Lightbulb size={22} /><p>This estimate depends on consistent circumference measurements and is not a clinical diagnosis. Keep units consistent when repeating the calculation.</p></div></section></>;
}

function IdealWeightTool() {
  const [height, setHeight] = useState(175); const [gender, setGender] = useState("Male");
  const base = gender === "Male" ? 50 : 45.5; const value = base + 0.9 * (height - 152.4);
  return <><div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Estimate an ideal weight range from height and reference sex.</p><div className="field-pair"><NumericField label="Height" value={height} onChange={setHeight} suffix="cm" /><SelectField label="Sex" value={gender} onChange={setGender} options={["Male", "Female"]} /></div><button type="button" className="calculate-button">Calculate ideal weight</button></form><section className="result-rail" aria-live="polite"><p>Ideal weight estimate</p><strong>{formatNumber(Math.max(0, value), 1)} kg</strong><span>Devine reference formula</span><dl className="result-breakdown"><div><dt>Lower guide</dt><dd>{formatNumber(Math.max(0, value - 5), 1)} kg</dd></div><div><dt>Upper guide</dt><dd>{formatNumber(value + 5, 1)} kg</dd></div><div><dt>Height</dt><dd>{height} cm</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>Reference weight</h2><span>Height-based estimate</span></div><div className="explanation-body"><Lightbulb size={22} /><p>Ideal-weight formulas are population references, not medical targets. Body composition and health history matter more than a single number.</p></div></section></>;
}

function FractionTool() {
  const [a, setA] = useState(3); const [b, setB] = useState(4); const [c, setC] = useState(2); const [d, setD] = useState(5); const [operator, setOperator] = useState("+");
  const numerator = operator === "+" ? a * d + c * b : operator === "−" ? a * d - c * b : operator === "×" ? a * c : a * d;
  const denominator = operator === "×" ? b * d : operator === "÷" ? b * c : b * d;
  const value = denominator ? numerator / denominator : 0;
  return <><div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Combine two fractions and review the simplified decimal result.</p><div className="fraction-grid"><NumericField label="Numerator 1" value={a} onChange={setA} /><NumericField label="Denominator 1" value={b} onChange={setB} /><SelectField label="Operation" value={operator} onChange={setOperator} options={["+", "−", "×", "÷"]} /><NumericField label="Numerator 2" value={c} onChange={setC} /><NumericField label="Denominator 2" value={d} onChange={setD} /></div><button type="button" className="calculate-button">Calculate fraction</button></form><section className="result-rail" aria-live="polite"><p>Fraction result</p><strong>{numerator}/{denominator}</strong><span>Decimal value {formatNumber(value)}</span><dl className="result-breakdown"><div><dt>Operation</dt><dd>{operator}</dd></div><div><dt>Numerator</dt><dd>{numerator}</dd></div><div><dt>Denominator</dt><dd>{denominator}</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>Fraction arithmetic</h2><span>Exact and decimal</span></div><div className="explanation-body"><Lightbulb size={22} /><p>Fractions are combined using a common denominator where required. The result rail keeps both the exact fraction and its decimal interpretation visible.</p></div></section></>;
}

function VolumeTool({ definition }: { definition: CalculatorDefinition }) {
  const [length, setLength] = useState(12); const [width, setWidth] = useState(8); const [height, setHeight] = useState(5);
  const value = length * width * height;
  return <><div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Enter three dimensions to calculate volume for a rectangular solid.</p><div className="field-pair"><NumericField label="Length" value={length} onChange={setLength} /><NumericField label="Width" value={width} onChange={setWidth} /></div><NumericField label="Height" value={height} onChange={setHeight} /><button type="button" className="calculate-button">Calculate {topicFrom(definition).toLowerCase()}</button></form><section className="result-rail" aria-live="polite"><p>Rectangular volume</p><strong>{formatNumber(value)}</strong><span>Cubic units</span><dl className="result-breakdown"><div><dt>Length</dt><dd>{formatNumber(length)}</dd></div><div><dt>Width</dt><dd>{formatNumber(width)}</dd></div><div><dt>Height</dt><dd>{formatNumber(height)}</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>Volume formula</h2><span>Length × width × height</span></div><div className="explanation-body"><Lightbulb size={22} /><p>For a rectangular solid, multiply the three perpendicular dimensions. Use the matching units to interpret the cubic result.</p></div></section></>;
}

function FamilyTool({ definition }: { definition: CalculatorDefinition }) {
  const title = definition.title.replace(/ Calculator$/i, ""); const category = definition.category;
  const [first, setFirst] = useState(100); const [second, setSecond] = useState(category === "Financial" ? 5 : 12); const [third, setThird] = useState(category === "Financial" ? 10 : 2); const [operator, setOperator] = useState("+");
  const result = category === "Financial" ? first * (1 + second / 100 * third) : category === "Fitness & Health" ? (second ? first / (second / 100) ** 2 : 0) : category === "Math" ? (operator === "−" ? first - second : operator === "×" ? first * second : operator === "÷" ? (second ? first / second : 0) : first + second) : first * (second / 100 || 1) + third;
  const labels = category === "Financial" ? ["Principal or amount", "Annual rate", "Term or period"] : category === "Fitness & Health" ? ["Weight or value", "Height", "Age or target"] : category === "Math" ? ["First value", "Second value", "Precision or count"] : ["Value", "Rate or factor", "Quantity or period"];
  const suffixes = category === "Financial" ? ["$", "%", "years"] : category === "Fitness & Health" ? ["kg", "cm", "years"] : ["", "", ""];
  return <><div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">Enter the main values for this {title.toLowerCase()} workflow and review the calculated estimate.</p><NumericField label={labels[0]} value={first} onChange={setFirst} suffix={suffixes[0]} /><NumericField label={labels[1]} value={second} onChange={setSecond} suffix={suffixes[1]} />{category === "Math" && <SelectField label="Operation" value={operator} onChange={setOperator} options={["+", "−", "×", "÷"]} />}<NumericField label={labels[2]} value={third} onChange={setThird} suffix={suffixes[2]} /><button type="button" className="calculate-button">Calculate {title}</button></form><section className="result-rail" aria-live="polite"><p>{resultLabel(definition)}</p><strong>{category === "Financial" ? formatCurrency(result) : formatNumber(result)}</strong><span>Task-specific planning estimate</span><dl className="result-breakdown"><div><dt>Tool</dt><dd>{definition.title}</dd></div><div><dt>Category</dt><dd>{category}</dd></div><div><dt>Inputs</dt><dd>3 values</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>{title} workflow</h2><span>Input and result summary</span></div><div className="explanation-body"><Lightbulb size={22} /><p>Use the labeled inputs above, then compare the result as you adjust the scenario. Check the original tool's assumptions and units before using a value for a real-world decision.</p></div></section></>;
}

type TaskKind = "loan" | "growth" | "tax" | "fuel" | "credit" | "health" | "math" | "density" | "circle" | "grade" | "electrical" | "distance" | "temperature" | "probability" | "construction" | "other";
type TaskProfile = { kind: TaskKind; labels: [string, string, string]; suffixes: [string, string, string]; result: string; helper: string; action: string; money?: boolean };

function taskProfile(definition: CalculatorDefinition): TaskProfile {
  const text = `${definition.slug} ${definition.title}`.toLowerCase();
  if (/credit-card/.test(text)) return { kind: "credit", labels: ["Card balance", "APR", "Monthly payment"], suffixes: ["$", "%", "$"], result: "Estimated payoff time", helper: "Estimate how long a revolving balance may take to pay down at a fixed monthly payment.", action: "Calculate payoff time" };
  if (/density/.test(text)) return { kind: "density", labels: ["Mass", "Volume", "Precision"], suffixes: ["g", "cm³", "decimals"], result: "Density", helper: "Find density from mass and volume using density = mass ÷ volume.", action: "Calculate density" };
  if (/circle|circumference|sphere/.test(text)) return { kind: "circle", labels: ["Radius", "Diameter", "Precision"], suffixes: ["", "", "decimals"], result: "Circle area", helper: "Calculate the area, circumference, diameter, and radius relationships for a circle.", action: "Calculate circle" };
  if (/gpa|grade|test-score|percent-error|z-score/.test(text)) return { kind: "grade", labels: ["Points earned", "Points possible", "Extra value"], suffixes: ["points", "points", ""], result: "Score percentage", helper: "Compare earned points with the possible total and review the percentage result.", action: "Calculate score" };
  if (/ohm|voltage|resistor|electricity|power|horsepower|voltage-drop/.test(text)) return { kind: "electrical", labels: ["Voltage or power", "Current or resistance", "Third value"], suffixes: ["V", "A", "Ω"], result: "Electrical result", helper: "Use two known electrical quantities to estimate the related value.", action: "Calculate electrical value" };
  if (/distance|speed|pace|mileage|gas-mileage/.test(text)) return { kind: "distance", labels: ["Distance", "Speed", "Time"], suffixes: ["miles", "mph", "hours"], result: "Distance estimate", helper: "Relate distance, speed, and time using consistent units.", action: "Calculate distance" };
  if (/dew-point|heat-index|wind-chill|temperature/.test(text)) return { kind: "temperature", labels: ["Temperature", "Humidity or wind", "Unit setting"], suffixes: ["°", "%", ""], result: "Temperature estimate", helper: "Estimate the apparent temperature from the selected environmental inputs.", action: "Calculate temperature" };
  if (/probability|permutation|combination|odds/.test(text)) return { kind: "probability", labels: ["Favorable outcomes", "Total outcomes", "Trials"], suffixes: ["", "", ""], result: "Probability", helper: "Compare favorable outcomes with the total possible outcomes.", action: "Calculate probability" };
  if (/concrete|gravel|mulch|roofing|square-footage|tile|stair/.test(text)) return { kind: "construction", labels: ["Length", "Width", "Depth or height"], suffixes: ["ft", "ft", "in"], result: "Material quantity", helper: "Estimate a project quantity from the dimensions entered.", action: "Calculate quantity" };
  if (/loan|heloc|home-equity|debt|bond|annuity|lease|fha|mortgage/.test(text)) return { kind: "loan", labels: ["Principal amount", "Annual interest rate", "Term"], suffixes: ["$", "%", "years"], result: "Estimated payment", helper: "Estimate a periodic payment from principal, annual rate, and term.", action: "Calculate payment", money: true };
  if (/investment|retirement|401k|ira|savings|future-value|inflation|interest-rate/.test(text)) return { kind: "growth", labels: ["Starting amount", "Annual return", "Time period"], suffixes: ["$", "%", "years"], result: "Future value estimate", helper: "Project how an amount may change over time using an annual growth assumption.", action: "Calculate future value", money: true };
  if (/tax|salary|paycheck|income|commission|cash-back|cashback/.test(text)) return { kind: "tax", labels: ["Gross amount", "Tax or rate", "Pay periods"], suffixes: ["$", "%", "periods"], result: "Net amount estimate", helper: "Apply the selected rate to an amount and review the estimated net value.", action: "Calculate net amount", money: true };
  if (/fuel|gas-mileage|electricity|energy-cost/.test(text)) return { kind: "fuel", labels: ["Distance or usage", "Efficiency", "Unit price"], suffixes: ["miles", "mpg", "$"], result: "Estimated cost", helper: "Estimate operating cost from usage, efficiency, and the unit price.", action: "Calculate cost", money: true };
  if (/bmr|body|weight|calorie|protein|carbohydrate|fat-intake|tdee|heart|pace|pregnancy|gfr/.test(text)) return { kind: "health", labels: ["Weight or value", "Height or rate", "Age or target"], suffixes: ["kg", "cm", "years"], result: "Health estimate", helper: "Use the labeled measurements to create a planning estimate; this is not medical advice.", action: "Calculate estimate" };
  if (/gpa|grade|average|statistics|standard-deviation|mean|ratio|equation|exponent|factor|gcf|lcm|number|binary|hex/.test(text)) return { kind: "math", labels: ["First value", "Second value", "Precision or count"], suffixes: ["", "", ""], result: "Calculated value", helper: "Enter the values for this mathematical operation and review the result.", action: "Calculate result" };
  return { kind: definition.category === "Financial" ? "loan" : definition.category === "Fitness & Health" ? "health" : definition.category === "Math" ? "math" : "other", labels: ["Primary value", "Rate or factor", "Quantity or period"], suffixes: ["", "", ""], result: "Calculated estimate", helper: "Enter the values for this tool and review the estimate with its stated assumptions.", action: "Calculate result" };
}

function TaskTool({ definition }: { definition: CalculatorDefinition }) {
  const profile = taskProfile(definition);
  const [first, setFirst] = useState(profile.kind === "loan" ? 250000 : profile.kind === "health" ? 70 : profile.kind === "grade" ? 87 : profile.kind === "density" ? 100 : profile.kind === "circle" ? 10 : profile.kind === "electrical" ? 12 : profile.kind === "distance" ? 100 : profile.kind === "temperature" ? 72 : profile.kind === "probability" ? 1 : 100);
  const [second, setSecond] = useState(profile.kind === "loan" ? 6.5 : profile.kind === "health" ? 175 : profile.kind === "grade" ? 100 : profile.kind === "density" ? 5 : profile.kind === "circle" ? 20 : profile.kind === "electrical" ? 2 : profile.kind === "distance" ? 5 : profile.kind === "temperature" ? 60 : profile.kind === "probability" ? 6 : 5);
  const [third, setThird] = useState(profile.kind === "fuel" ? 4 : profile.kind === "health" ? 30 : profile.kind === "grade" ? 4 : profile.kind === "distance" ? 2 : profile.kind === "temperature" ? 0 : profile.kind === "probability" ? 1 : 10);
  const [operator, setOperator] = useState("+");
  const computed = useMemo(() => {
    const a = Number(first) || 0; const b = Number(second) || 0; const c = Number(third) || 0;
    if (profile.kind === "density") return { value: b ? a / b : 0, detail: `${formatNumber(a)} mass ÷ ${formatNumber(b)} volume` };
    if (profile.kind === "circle") return { value: Math.PI * a ** 2, detail: `Circumference ${formatNumber(2 * Math.PI * a)}; diameter ${formatNumber(2 * a)}` };
    if (profile.kind === "grade") return { value: b ? a / b * 100 : 0, detail: `${formatNumber(a)} of ${formatNumber(b)} points` };
    if (profile.kind === "electrical") return { value: b ? a / b : 0, detail: `${formatNumber(a)} ÷ ${formatNumber(b)} using the selected electrical relationship` };
    if (profile.kind === "distance") return { value: a || b * c, detail: `${formatNumber(b)} mph × ${formatNumber(c)} hours` };
    if (profile.kind === "temperature") return { value: a - ((100 - b) / 5), detail: `Environmental adjustment from ${formatNumber(a)}° and ${formatNumber(b)}%` };
    if (profile.kind === "probability") return { value: b ? a / b * 100 : 0, detail: `${formatNumber(a)} favorable outcomes of ${formatNumber(b)}` };
    if (profile.kind === "construction") return { value: a * b * c / 12, detail: `${formatNumber(a)} × ${formatNumber(b)} × ${formatNumber(c)} project dimensions` };
    if (profile.kind === "loan") { const r = b / 100 / 12; const n = Math.max(1, c * 12); const payment = r ? a * r / (1 - (1 + r) ** -n) : a / n; return { value: payment, detail: `${formatCurrency(a)} over ${formatNumber(c)} years` }; }
    if (profile.kind === "credit") { const r = b / 100 / 12; const months = r && c > a * r ? Math.log(c / (c - a * r)) / Math.log(1 + r) : 0; return { value: months, detail: months ? `${formatNumber(c, 0)} monthly payment` : "Payment must exceed monthly interest" }; }
    if (profile.kind === "growth") { const r = b / 100; const value = a * (1 + r) ** c; return { value, detail: `${formatNumber(b)}% annual growth over ${formatNumber(c)} years` }; }
    if (profile.kind === "tax") { const net = a * (1 - b / 100); return { value: net, detail: `Estimated reduction: ${formatCurrency(a - net)}` }; }
    if (profile.kind === "fuel") { const cost = b ? a / b * c : 0; return { value: cost, detail: `${formatNumber(a)} usage at ${formatNumber(c)} per unit` }; }
    if (profile.kind === "health") { const bmi = b ? a / (b / 100) ** 2 : 0; return { value: bmi, detail: `${formatNumber(a)} kg, ${formatNumber(b)} cm, age ${formatNumber(c)}` }; }
    if (profile.kind === "math") { const value = operator === "−" ? a - b : operator === "×" ? a * b : operator === "÷" ? (b ? a / b : 0) : a + b; return { value, detail: `${formatNumber(a)} ${operator} ${formatNumber(b)}` }; }
    return { value: a * (b / 100 || 1) + c, detail: `${formatNumber(a)} adjusted by ${formatNumber(b)}%` };
  }, [first, second, third, operator, profile]);
  return <><div className="calculator-workbench generic-workbench"><form className="calculator-form" onSubmit={(event) => event.preventDefault()}><p className="form-instruction">{profile.helper}</p><NumericField label={profile.labels[0]} value={first} onChange={setFirst} suffix={profile.suffixes[0]} /><NumericField label={profile.labels[1]} value={second} onChange={setSecond} suffix={profile.suffixes[1]} />{profile.kind === "math" && <SelectField label="Operation" value={operator} onChange={setOperator} options={["+", "−", "×", "÷"]} />}<NumericField label={profile.labels[2]} value={third} onChange={setThird} suffix={profile.suffixes[2]} /><button type="button" className="calculate-button">{profile.action}</button></form><section className="result-rail" aria-live="polite"><p>{profile.result}</p><strong>{profile.money ? formatCurrency(computed.value) : formatNumber(computed.value)}</strong><span>{computed.detail}</span><dl className="result-breakdown"><div><dt>Tool</dt><dd>{definition.title}</dd></div><div><dt>Category</dt><dd>{definition.category}</dd></div><div><dt>Inputs</dt><dd>3 values</dd></div></dl></section></div><section className="data-section explanation-card"><div className="data-section-heading"><h2>{definition.title.replace(/ Calculator$/i, "")} workflow</h2><span>Task-aware estimate</span></div><div className="explanation-body"><Lightbulb size={22} /><p>{profile.helper} Check the original tool's assumptions and units before using the value for a real-world decision.</p></div></section></>;
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

function RelatedTools({ definition }: { definition: CalculatorDefinition }) {
  const related = calculatorRegistry.filter((item) => item.category === definition.category && item.slug !== definition.slug).slice(0, 6);
  return <section className="data-section related-tools"><div className="data-section-heading"><h2>Related calculators</h2><span>{definition.category} tools</span></div><div className="related-tools-grid">{related.map((item) => <a key={item.slug} href={item.route}><span>{item.title}</span><span aria-hidden="true">›</span></a>)}</div></section>;
}

function WithRelated({ definition, children }: { definition: CalculatorDefinition; children: React.ReactNode }) {
  return <>{children}<RelatedTools definition={definition} /></>;
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
  if (definition.family === "percentage") return <CalculatorLayout category="Math" title={definition.title} description="Solve percentage relationships, differences, and changes with clear inputs."><WithRelated definition={definition}><PercentageTool /></WithRelated></CalculatorLayout>;
  if (definition.family === "tip") return <CalculatorLayout category="Other" title={definition.title} description="Calculate gratuity, total bill, and each person's share."><WithRelated definition={definition}><TipTool /></WithRelated></CalculatorLayout>;
  if (definition.family === "compound-interest") return <CalculatorLayout category="Financial" title={definition.title} description="Compare an input interest rate with its effective compounded value."><WithRelated definition={definition}><CompoundInterestTool /></WithRelated></CalculatorLayout>;
  if (definition.family === "calorie") return <CalculatorLayout category="Fitness & Health" title={definition.title} description="Estimate daily calorie needs from your body measurements and activity."><WithRelated definition={definition}><CalorieTool /></WithRelated></CalculatorLayout>;
  if (definition.family === "triangle") return <CalculatorLayout category="Math" title={definition.title} description="Calculate triangle area and perimeter from three side lengths."><WithRelated definition={definition}><TriangleTool /></WithRelated></CalculatorLayout>;
  if (definition.family === "average") return <CalculatorLayout category="Math" title={definition.title} description="Find the arithmetic mean and review a compact data summary."><WithRelated definition={definition}><StatisticsTool mode="average" /></WithRelated></CalculatorLayout>;
  if (definition.family === "standard-deviation") return <CalculatorLayout category="Math" title={definition.title} description="Measure the spread of a population data set."><WithRelated definition={definition}><StatisticsTool mode="standard-deviation" /></WithRelated></CalculatorLayout>;
  if (definition.family === "random-number") return <CalculatorLayout category="Math" title={definition.title} description="Generate random integers from an inclusive range."><WithRelated definition={definition}><RandomTool /></WithRelated></CalculatorLayout>;
  if (definition.family === "discount") return <CalculatorLayout category="Other" title={definition.title} description="Find sale prices, savings, and optional sales tax."><WithRelated definition={definition}><DiscountTool /></WithRelated></CalculatorLayout>;
  if (definition.family === "simple-interest") return <CalculatorLayout category="Financial" title={definition.title} description="Estimate interest applied to the original principal over time."><WithRelated definition={definition}><SimpleInterestTool /></WithRelated></CalculatorLayout>;
  if (definition.family === "conversion") return <CalculatorLayout category={definition.category} title={definition.title} description="Convert a value between compatible reference units."><WithRelated definition={definition}><ConversionTool definition={definition} /></WithRelated></CalculatorLayout>;
  if (definition.family === "area") return <CalculatorLayout category="Math" title={definition.title} description="Calculate area and perimeter for common shapes."><WithRelated definition={definition}><AreaTool /></WithRelated></CalculatorLayout>;
  if (definition.family === "bmr") return <CalculatorLayout category="Fitness & Health" title={definition.title} description="Estimate basal metabolic rate from height, weight, age, and sex."><WithRelated definition={definition}><BmrTool /></WithRelated></CalculatorLayout>;
  if (definition.family === "body-fat") return <CalculatorLayout category="Fitness & Health" title={definition.title} description="Estimate body fat percentage from circumference measurements."><WithRelated definition={definition}><BodyFatTool /></WithRelated></CalculatorLayout>;
  if (definition.family === "ideal-weight") return <CalculatorLayout category="Fitness & Health" title={definition.title} description="Estimate a height-based reference weight range."><WithRelated definition={definition}><IdealWeightTool /></WithRelated></CalculatorLayout>;
  if (definition.family === "fraction") return <CalculatorLayout category="Math" title={definition.title} description="Add, subtract, multiply, or divide two fractions."><WithRelated definition={definition}><FractionTool /></WithRelated></CalculatorLayout>;
  if (definition.family === "volume") return <CalculatorLayout category="Math" title={definition.title} description="Calculate volume from three dimensions."><WithRelated definition={definition}><VolumeTool definition={definition} /></WithRelated></CalculatorLayout>;
  if (definition.family === "scientific") return <CalculatorLayout category="Math" title={definition.title} description="Evaluate arithmetic expressions with a compact scientific keypad."><WithRelated definition={definition}><ScientificCalculator /></WithRelated></CalculatorLayout>;
  if (definition.slug === "about-us") return <CalculatorLayout category="Other" title="About Calculator.net" description="A public directory of practical calculators, organized for direct use."><AboutDirectoryPage /></CalculatorLayout>;
  if (definition.family === "date") return <CalculatorLayout category={definition.category} title={definition.title} description="Compare calendar dates and review the interval in useful units."><WithRelated definition={definition}><DateTool definition={definition} /></WithRelated></CalculatorLayout>;
  if (definition.family === "time") return <CalculatorLayout category={definition.category} title={definition.title} description={definition.description}><WithRelated definition={definition}><TimeTool definition={definition} /></WithRelated></CalculatorLayout>;
  return <CalculatorLayout category={definition.category} title={definition.title} description={definition.description}><WithRelated definition={definition}><TaskTool definition={definition} /></WithRelated></CalculatorLayout>;
}
