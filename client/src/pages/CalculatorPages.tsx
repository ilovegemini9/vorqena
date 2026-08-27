/**
 * Style reminder — Utilitarian Calculation Desk: pale blue workspace, clear result rail,
 * practical forms, tabular numbers, and strong navy hierarchy without ornamental distraction.
 */
import { Link } from "wouter";
import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, CircleHelp, FileText, HeartPulse, Landmark, Sigma } from "lucide-react";

type LayoutProps = {
  category: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

const categoryLinks = [
  { label: "Financial", href: "/mortgage", icon: Landmark },
  { label: "Fitness & Health", href: "/bmi", icon: HeartPulse },
  { label: "Math", href: "/#math", icon: Sigma },
  { label: "Other", href: "/age", icon: CalendarDays },
];

function CalculatorLayout({ category, title, description, children }: LayoutProps) {
  return (
    <>
      <header className="tool-header">
        <div className="content-frame tool-header-inner">
          <Link href="/" className="brand" aria-label="Calculator.net home"><img src="/manus-storage/calculator-net-mark_e5d4b69f.png" alt="" /><span className="wordmark"><b>calculator</b><i>.net</i></span></Link>
          <nav><Link href="/">Calculator directory</Link><Link href="/#scientific">Scientific calculator</Link><Link href="/mortgage">Popular tools</Link></nav>
        </div>
      </header>
      <main className="calculator-page">
        <div className="content-frame">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><span>{category}</span><span>/</span><strong>{title}</strong>
          </nav>
          <div className="page-columns">
            <aside className="calculator-sidebar" aria-label="Calculator categories">
              <p className="eyebrow">Browse calculators</p>
              {categoryLinks.map(({ label, href, icon: Icon }) => (
                <Link key={label} href={href} className="sidebar-link"><Icon size={17} />{label}</Link>
              ))}
              <Link href="/" className="all-calculators-link"><FileText size={16} />All calculators</Link>
            </aside>
            <article className="calculator-content">
              <Link href="/" className="back-link"><ChevronLeft size={16} />Back to calculator directory</Link>
              <div className="calculator-title">
                <div>
                  <p className="eyebrow">{category}</p>
                  <h1>{title}</h1>
                </div>
                <CircleHelp size={21} aria-label="Calculator help" />
              </div>
              <p className="calculator-intro">{description}</p>
              {children}
            </article>
          </div>
        </div>
      </main>
      <footer className="tool-footer"><div className="content-frame"><span>Calculator.net — practical, free online calculations.</span><Link href="/">Return to directory</Link></div></footer>
    </>
  );
}

function NumericField({ label, value, onChange, suffix, hint }: { label: string; value: number; onChange: (next: number) => void; suffix?: string; hint?: string }) {
  return (
    <label className="field">
      <span>{label} {hint && <small>{hint}</small>}</span>
      <div className="input-unit"><input type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} /><em>{suffix}</em></div>
    </label>
  );
}

export function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [term, setTerm] = useState(30);
  const [rate, setRate] = useState(6.7);
  const [taxRate, setTaxRate] = useState(1.2);
  const [insurance, setInsurance] = useState(1500);
  const [hoa, setHoa] = useState(0);

  const results = useMemo(() => {
    const principal = Math.max(homePrice - downPayment, 0);
    const months = Math.max(term * 12, 1);
    const monthlyRate = Math.max(rate, 0) / 1200;
    const pi = monthlyRate === 0 ? principal / months : principal * (monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);
    const monthlyTax = (homePrice * Math.max(taxRate, 0)) / 1200;
    const monthlyInsurance = Math.max(insurance, 0) / 12;
    const monthlyHoa = Math.max(hoa, 0);
    let balance = principal;
    const schedule: { year: number; interest: number; principal: number; balance: number }[] = [];
    for (let month = 1; month <= months; month += 1) {
      const interest = balance * monthlyRate;
      const paidPrincipal = Math.min(pi - interest, balance);
      balance = Math.max(0, balance - paidPrincipal);
      if (month % 12 === 0 || month === months) {
        const year = Math.ceil(month / 12);
        const prior = schedule[year - 1];
        schedule.push({
          year,
          interest: (prior?.interest ?? 0) + interest,
          principal: (prior?.principal ?? 0) + paidPrincipal,
          balance,
        });
      } else if (schedule.length) {
        schedule[schedule.length - 1].interest += interest;
        schedule[schedule.length - 1].principal += paidPrincipal;
      }
    }
    return { principal, pi, monthlyTax, monthlyInsurance, monthlyHoa, total: pi + monthlyTax + monthlyInsurance + monthlyHoa, totalInterest: pi * months - principal, schedule };
  }, [homePrice, downPayment, term, rate, taxRate, insurance, hoa]);

  return (
    <CalculatorLayout category="Financial" title="Mortgage Calculator" description="Estimate monthly mortgage costs, principal and interest, then review a yearly amortization summary.">
      <div className="calculator-workbench mortgage-workbench">
        <form className="calculator-form" onSubmit={(event) => event.preventDefault()}>
          <p className="form-instruction">Modify the values and see the estimate update instantly.</p>
          <NumericField label="Home Price" value={homePrice} onChange={setHomePrice} suffix="$" />
          <NumericField label="Down Payment" value={downPayment} onChange={setDownPayment} suffix="$" />
          <div className="field-pair"><NumericField label="Loan Term" value={term} onChange={setTerm} suffix="years" /><NumericField label="Interest Rate" value={rate} onChange={setRate} suffix="%" /></div>
          <div className="form-divider"><span>Taxes & costs</span></div>
          <div className="field-pair"><NumericField label="Property Tax" value={taxRate} onChange={setTaxRate} suffix="% / year" /><NumericField label="Home Insurance" value={insurance} onChange={setInsurance} suffix="$ / year" /></div>
          <NumericField label="HOA Fee" value={hoa} onChange={setHoa} suffix="$ / month" />
          <button type="button" className="calculate-button">Calculate payment</button>
        </form>
        <section className="result-rail" aria-live="polite">
          <p>Estimated monthly pay</p>
          <strong>{currency.format(results.total)}</strong>
          <span>Principal, interest, tax, insurance & HOA</span>
          <dl className="result-breakdown">
            <div><dt>Principal & interest</dt><dd>{currency.format(results.pi)}</dd></div>
            <div><dt>Property tax</dt><dd>{currency.format(results.monthlyTax)}</dd></div>
            <div><dt>Home insurance</dt><dd>{currency.format(results.monthlyInsurance)}</dd></div>
            <div><dt>HOA fee</dt><dd>{currency.format(results.monthlyHoa)}</dd></div>
          </dl>
          <div className="result-total"><span>Total interest</span><b>{currency.format(results.totalInterest)}</b></div>
        </section>
      </div>
      <section className="data-section">
        <div className="data-section-heading"><h2>Loan summary</h2><span>Fixed-rate estimate</span></div>
        <dl className="summary-grid">
          <div><dt>House price</dt><dd>{currency.format(homePrice)}</dd></div><div><dt>Loan amount</dt><dd>{currency.format(results.principal)}</dd></div><div><dt>Down payment</dt><dd>{currency.format(downPayment)}</dd></div><div><dt>Loan term</dt><dd>{term} years</dd></div>
        </dl>
      </section>
      <section className="data-section"><div className="data-section-heading"><h2>Amortization schedule</h2><span>Yearly view</span></div><div className="table-scroll"><table><thead><tr><th>Year</th><th>Interest</th><th>Principal</th><th>Ending balance</th></tr></thead><tbody>{results.schedule.map((row) => <tr key={row.year}><td>{row.year}</td><td>{currency.format(row.interest)}</td><td>{currency.format(row.principal)}</td><td>{currency.format(row.balance)}</td></tr>)}</tbody></table></div></section>
      <p className="calculator-disclaimer">This calculator provides an estimate for educational purposes. Actual loan terms, taxes, insurance and fees can differ.</p>
    </CalculatorLayout>
  );
}

export function BmiCalculatorPage() {
  const [unit, setUnit] = useState<"us" | "metric">("us");
  const [age, setAge] = useState(30);
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(10);
  const [pounds, setPounds] = useState(160);
  const [centimeters, setCentimeters] = useState(178);
  const [kilograms, setKilograms] = useState(72.6);
  const bmi = unit === "us" ? (pounds / ((feet * 12 + inches) ** 2)) * 703 : kilograms / ((centimeters / 100) ** 2);
  const classification = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obesity";
  const color = bmi < 18.5 ? "#5d83ad" : bmi < 25 ? "#2e8b32" : bmi < 30 ? "#d98b2d" : "#c85a48";
  const heightInches = unit === "us" ? feet * 12 + inches : centimeters / 2.54;
  const minLbs = 18.5 * heightInches ** 2 / 703;
  const maxLbs = 24.9 * heightInches ** 2 / 703;

  return (
    <CalculatorLayout category="Fitness & Health" title="BMI Calculator" description="Calculate Body Mass Index using US or metric units and review the standard adult BMI categories.">
      <div className="calculator-workbench bmi-workbench">
        <form className="calculator-form" onSubmit={(event) => event.preventDefault()}>
          <div className="unit-tabs" role="tablist"><button className={unit === "us" ? "is-active" : ""} onClick={() => setUnit("us")}>US units</button><button className={unit === "metric" ? "is-active" : ""} onClick={() => setUnit("metric")}>Metric units</button></div>
          <NumericField label="Age" value={age} onChange={setAge} suffix="years" hint="ages 2–120" />
          {unit === "us" ? <><div className="field-pair"><NumericField label="Height" value={feet} onChange={setFeet} suffix="ft" /><NumericField label="" value={inches} onChange={setInches} suffix="in" /></div><NumericField label="Weight" value={pounds} onChange={setPounds} suffix="lb" /></> : <><NumericField label="Height" value={centimeters} onChange={setCentimeters} suffix="cm" /><NumericField label="Weight" value={kilograms} onChange={setKilograms} suffix="kg" /></>}
          <button type="button" className="calculate-button">Calculate BMI</button>
        </form>
        <section className="result-rail bmi-result" aria-live="polite">
          <p>Your BMI</p><strong>{number.format(bmi)}</strong><span style={{ color }}>{classification}</span>
          <div className="bmi-scale" aria-label={`BMI ${number.format(bmi)}, ${classification}`}><i style={{ left: `${Math.max(3, Math.min(97, (bmi / 40) * 100))}%` }} /></div>
          <dl className="result-breakdown"><div><dt>Healthy BMI range</dt><dd>18.5–24.9</dd></div><div><dt>Healthy weight range</dt><dd>{number.format(minLbs)}–{number.format(maxLbs)} lb</dd></div><div><dt>BMI Prime</dt><dd>{number.format(bmi / 25)}</dd></div></dl>
        </section>
      </div>
      <section className="data-section"><div className="data-section-heading"><h2>Adult BMI ranges</h2><span>Standard screening guide</span></div><div className="bmi-legend"><span className="thin">Underweight<br/><b>&lt; 18.5</b></span><span className="normal">Normal<br/><b>18.5–24.9</b></span><span className="over">Overweight<br/><b>25–29.9</b></span><span className="obese">Obesity<br/><b>30+</b></span></div></section>
      <p className="calculator-disclaimer">BMI is a general screening measure, not a diagnosis. Consider it alongside clinical information and advice from a qualified professional.</p>
    </CalculatorLayout>
  );
}

function ageDifference(birthValue: string, targetValue: string) {
  const birth = new Date(`${birthValue}T00:00:00`);
  const target = new Date(`${targetValue}T00:00:00`);
  if (Number.isNaN(birth.getTime()) || Number.isNaN(target.getTime()) || target < birth) return null;
  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();
  if (days < 0) { months -= 1; days += new Date(target.getFullYear(), target.getMonth(), 0).getDate(); }
  if (months < 0) { years -= 1; months += 12; }
  const totalDays = Math.floor((target.getTime() - birth.getTime()) / 86400000);
  return { years, months, days, totalDays, weeks: Math.floor(totalDays / 7), hours: totalDays * 24 };
}

export function AgeCalculatorPage() {
  const today = new Date().toISOString().slice(0, 10);
  const [birth, setBirth] = useState("1990-08-15");
  const [target, setTarget] = useState(today);
  const result = ageDifference(birth, target);
  return (
    <CalculatorLayout category="Other" title="Age Calculator" description="Find the interval between a date of birth and a reference date in years, months, weeks, days and hours.">
      <div className="calculator-workbench age-workbench">
        <form className="calculator-form" onSubmit={(event) => event.preventDefault()}>
          <label className="field"><span>Date of birth</span><input type="date" value={birth} max={target} onChange={(event) => setBirth(event.target.value)} /></label>
          <label className="field"><span>Age at the date of</span><input type="date" value={target} min={birth} onChange={(event) => setTarget(event.target.value)} /></label>
          <button type="button" className="calculate-button">Calculate age</button>
        </form>
        <section className="result-rail age-result" aria-live="polite">
          {result ? <><p>Age at reference date</p><strong>{result.years}<small> years</small></strong><span>{result.months} months & {result.days} days</span><dl className="result-breakdown"><div><dt>Weeks</dt><dd>{number.format(result.weeks)}</dd></div><div><dt>Days</dt><dd>{number.format(result.totalDays)}</dd></div><div><dt>Hours</dt><dd>{number.format(result.hours)}</dd></div></dl></> : <><p>Check the dates</p><strong>—</strong><span>The reference date must follow the birth date.</span></>}
        </section>
      </div>
      <section className="data-section age-note"><CalendarDays size={28}/><div><h2>How this estimate works</h2><p>Age rises on each birthday. Month and day values use calendar boundaries, which may produce different interpretations for dates at the end of a month.</p></div></section>
    </CalculatorLayout>
  );
}
