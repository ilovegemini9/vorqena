import { Link, useParams } from "wouter";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2, Search } from "lucide-react";
import { tools } from "../data/vorqena";
import { getKnowledge } from "../data/knowledge";

const today = new Date().toISOString().slice(0, 10);

function Field({ label, value, setValue, prefix, suffix, type = "number", placeholder }: any) {
  return <label className="field"><span>{label}</span><div className="field-input">{prefix && <b>{prefix}</b>}<input type={type} value={value} placeholder={placeholder} onChange={e => setValue(e.target.value)} />{suffix && <b>{suffix}</b>}</div></label>;
}

function daysBetween(a: string, b: string) {
  const start = new Date(`${a}T00:00:00`), end = new Date(`${b}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  return Math.round(Math.abs(end.getTime() - start.getTime()) / 86400000);
}

function exactAge(birth: string) {
  const b = new Date(`${birth}T00:00:00`), n = new Date();
  if (Number.isNaN(b.getTime()) || b > n) return "Enter a valid birth date";
  let years = n.getFullYear() - b.getFullYear();
  let months = n.getMonth() - b.getMonth();
  let days = n.getDate() - b.getDate();
  if (days < 0) { months--; days += new Date(n.getFullYear(), n.getMonth(), 0).getDate(); }
  if (months < 0) { years--; months += 12; }
  return `${years} years, ${months} months, ${days} days`;
}

export default function ToolPage() {
  const { slug = "" } = useParams();
  const tool = tools.find(t => t.slug === slug);
  const item = getKnowledge(slug);
  const [a, setA] = useState("100");
  const [b, setB] = useState("20");
  const [c, setC] = useState("15");
  const [d, setD] = useState("2");
  const [dateA, setDateA] = useState(today);
  const [dateB, setDateB] = useState(today);

  const result = useMemo(() => {
    const x = Number(a) || 0, y = Number(b) || 0, z = Number(c) || 0, w = Number(d) || 0;
    switch (slug) {
      case "percentage-calculator": return `${((x * y) / 100).toFixed(2)}`;
      case "tip-calculator": return `$${(x + x * y / 100).toFixed(2)} total · $${((x + x * y / 100) / Math.max(1, w)).toFixed(2)} each`;
      case "loan-payment": { const r = y / 100 / 12, n = Math.max(1, z * 12); return r ? `$${(x * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)).toFixed(2)} / month` : `$${(x / n).toFixed(2)} / month`; }
      case "mortgage-payment": { const r = y / 100 / 12, n = Math.max(1, z * 12); return r ? `$${(x * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)).toFixed(2)} / month` : `$${(x / n).toFixed(2)} / month`; }
      case "fuel-cost": return `$${(x / Math.max(0.01, y) * z).toFixed(2)}`;
      case "electricity-cost": return `$${(x * y * z / 1000).toFixed(2)}`;
      case "break-even": return `${(x / Math.max(0.01, y - z)).toFixed(2)} units`;
      case "age-calculator": return exactAge(dateA);
      case "days-between-dates": { const days = daysBetween(dateA, dateB); return days === null ? "Enter valid dates" : `${days} days`; }
      case "date-after-days": { const dt = new Date(`${dateA}T00:00:00`); dt.setDate(dt.getDate() + Math.round(x)); return dt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }); }
      default: return "Start with the safest simple check.";
    }
  }, [a, b, c, d, dateA, dateB, slug]);

  if (!tool) return <main className="page-shell"><header className="site-header"><Link href="/" className="brand"><span className="brand-mark">V</span><span>Vorqena</span></Link></header><section className="search-page"><h1>Tool not found</h1><Link href="/search">Search Vorqena <ArrowRight /></Link></section></main>;

  const calculator = ["percentage-calculator", "tip-calculator", "loan-payment", "mortgage-payment", "fuel-cost", "electricity-cost", "break-even", "age-calculator", "days-between-dates", "date-after-days"].includes(slug);
  const dateTool = ["age-calculator", "days-between-dates", "date-after-days"].includes(slug);

  return <main className="page-shell">
    <header className="site-header"><Link href="/" className="brand"><span className="brand-mark">V</span><span>Vorqena</span></Link><nav className="desktop-nav"><Link href="/fix">Fix</Link><Link href="/calculate">Calculate</Link><Link href="/decide">Decide</Link><Link href="/when">When</Link><Link href="/cost">Cost</Link></nav><Link href="/search" className="header-cta"><Search size={15}/> Search</Link></header>
    <section className="tool-layout"><div className="tool-copy"><Link href={`/${tool.intent}`} className="back-link"><ArrowLeft size={15}/> {tool.intent}</Link><span className="eyebrow">Vorqena tool</span><h1>{tool.title}</h1><p>{tool.description}</p>{item && <div className="knowledge-answer"><span className="answer-label">Vorqena's answer</span><h2>{item.answer}</h2><div><b>Next action</b><p>{item.steps?.[0] ?? "Review the inputs and follow the safest next step."}</p></div>{item.warnings?.map(w=><div className="warning" key={w}><b>Safety</b><span>{w}</span></div>)}</div>}<div className="answer-card"><span className="answer-label">Your answer</span><strong>{result}</strong><span>Calculated from the values you entered. Review assumptions before making a consequential decision.</span></div></div>
      {calculator ? <div className="tool-card"><div className="tool-card-head"><Calculator/><h2>Calculator</h2></div>
        {dateTool ? <>{slug === "age-calculator" && <Field label="Date of birth" type="date" value={dateA} setValue={setDateA}/>} {slug === "days-between-dates" && <><Field label="Start date" type="date" value={dateA} setValue={setDateA}/><Field label="End date" type="date" value={dateB} setValue={setDateB}/></>} {slug === "date-after-days" && <><Field label="Starting date" type="date" value={dateA} setValue={setDateA}/><Field label="Number of days" value={a} setValue={setA}/></>}</> : <><Field label={slug === "tip-calculator" ? "Bill amount" : slug === "fuel-cost" ? "Distance" : slug === "electricity-cost" ? "Power" : slug === "break-even" ? "Fixed costs" : "Value"} value={a} setValue={setA} prefix={slug === "tip-calculator" ? "$" : undefined} suffix={slug === "fuel-cost" ? "mi" : slug === "electricity-cost" ? "W" : slug === "break-even" ? "$" : undefined}/><Field label={slug === "tip-calculator" ? "Tip rate" : slug === "fuel-cost" ? "Fuel efficiency" : slug === "electricity-cost" ? "Hours" : slug === "break-even" ? "Price / unit" : "Rate / percentage"} value={b} setValue={setB} suffix={slug === "fuel-cost" ? "mi/gal" : slug === "electricity-cost" ? "hr" : slug === "break-even" ? "$" : "%"}/><Field label={slug === "tip-calculator" ? "People" : slug === "fuel-cost" ? "Fuel price" : slug === "electricity-cost" ? "Electricity rate" : slug === "break-even" ? "Variable cost / unit" : "Amount / term"} value={c} setValue={setC} prefix={slug === "fuel-cost" || slug === "electricity-cost" || slug === "break-even" ? "$" : undefined} suffix={slug === "electricity-cost" ? "/kWh" : undefined}/>{slug === "tip-calculator" && <Field label="Number of people" value={d} setValue={setD}/>} {(slug === "loan-payment" || slug === "mortgage-payment") ? <p className="muted">For loans and mortgages, enter principal in Value, annual interest rate in Rate, and term in years in Amount / term.</p> : null}</>}
        <div className="live-result"><CheckCircle2 size={18}/><div><span>Result</span><strong>{result}</strong></div></div>
      </div> : <div className="tool-card"><div className="tool-card-head"><CheckCircle2/><h2>Quick checks</h2></div><div className="check-list"><p>1. Stop if there is smoke, burning smell, exposed wiring, leaking fluid, overheating, or another immediate hazard.</p><p>2. Check the obvious cause: power, connection, settings, blockage, or a recent change.</p><p>3. If the simple checks fail, use the symptom details to narrow the cause before spending money.</p></div></div>}
    </section>
    <section className="content-wrap tool-bottom">{item && <><span className="eyebrow">Canonical knowledge</span><h2>What this answer is built from</h2><div className="knowledge-meta"><div><b>Intent</b><span>{item.intent}</span></div><div><b>Next action</b><span>{item.steps?.[0] ?? "Review the result and assumptions."}</span></div><div><b>Canonical page</b><Link href={item.slug}>Open SEO page</Link></div></div></>}<h2>How Vorqena approaches this</h2><div className="principle-grid"><div><b>01</b><strong>Clear inputs</strong><span>Only ask for information that changes the result.</span></div><div><b>02</b><strong>Visible assumptions</strong><span>You can see what the answer depends on.</span></div><div><b>03</b><strong>Next action</strong><span>The result tells you what to do next.</span></div></div></section>
    <footer className="site-footer"><span>Vorqena — Everyday answers, tools & decisions.</span><span>© 2026</span></footer>
  </main>;
}
