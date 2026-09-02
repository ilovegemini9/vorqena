import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Calculator, CheckCircle2, Clock3, DollarSign, Search, Wrench } from "lucide-react";
import { calculatorRegistry } from "@/lib/calculators";

const intents = [
  { key: "fix", title: "Fix", text: "Troubleshoot a problem and find the next step.", icon: Wrench },
  { key: "calculate", title: "Calculate", text: "Get a fast answer from the numbers.", icon: Calculator },
  { key: "decide", title: "Decide", text: "Find out what you can do before you act.", icon: CheckCircle2 },
  { key: "when", title: "When", text: "Find dates, deadlines, timing, and schedules.", icon: Clock3 },
  { key: "cost", title: "Cost", text: "Estimate price and compare repair vs. replace.", icon: DollarSign },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return calculatorRegistry.filter((x) => `${x.title} ${x.category}`.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  return (
    <main className="site-shell">
      <header className="topbar"><Link href="/" className="brand-vorqena" aria-label="Vorqena home">vorqena</Link><nav>{intents.map((item) => <Link key={item.key} href={`/${item.key}`}>{item.title}</Link>)}</nav><a className="header-tools" href="#tools">Tools</a></header>
      <section className="hero"><div className="hero-inner"><div className="hero-kicker">Everyday utility engine</div><h1>What can we help you <em>figure out?</em></h1><p className="hero-lead">Answers, calculators, practical guides, and decisions — built around the task you need to finish.</p><div className="hero-search-wrap"><div className="hero-search"><Search size={21}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask a question or search a tool" aria-label="Search Vorqena"/><kbd>⌘ K</kbd></div>{results.length > 0 && <div className="search-dropdown">{results.map((result) => <Link key={result.slug} href={result.route}><span>{result.title}<small>{result.category}</small></span><ArrowRight size={16}/></Link>)}</div>}</div><div className="hero-note"><span>Free to use</span><span>No account required</span><span>Sources where they matter</span></div></div></section>
      <section className="intent-section"><div className="section-intro"><span className="section-label">Start with the job</span><h2>Five ways to get unstuck.</h2><p>Most questions are really asking for one of five things. Pick the outcome, then go straight to the useful part.</p></div><div className="intent-grid-home">{intents.map((item, index) => { const Icon = item.icon; return <Link className="intent-card" key={item.key} href={`/${item.key}`}><span className="intent-number">0{index + 1}</span><Icon size={21}/><h3>{item.title}</h3><p>{item.text}</p><span className="intent-arrow"><ArrowRight size={17}/></span></Link>; })}</div></section>
      <section className="answer-section"><div className="answer-panel"><div><span className="section-label">Answer-first</span><h2>Less searching. More solving.</h2><p>Vorqena puts the useful answer, calculation, or next action before the noise. Supporting detail stays available when you need it.</p></div><div className="answer-points"><div><b>01</b><span><strong>Clear answer</strong>Know what the result means.</span></div><div><b>02</b><span><strong>Useful tool</strong>Calculate or check it yourself.</span></div><div><b>03</b><span><strong>Next action</strong>Keep moving without starting over.</span></div></div></div></section>
      <section className="tools-section" id="tools"><div className="section-intro compact"><span className="section-label">Utility library</span><h2>Tools that do the work.</h2><p>Start with the most useful calculators, then explore the full library.</p></div><div className="tool-feature-grid"><Link href="/mortgage-calculator.html" className="tool-feature"><span>Financial</span><h3>Mortgage Calculator</h3><p>Estimate payments, interest, and loan cost.</p><ArrowRight/></Link><Link href="/bmi-calculator.html" className="tool-feature"><span>Health</span><h3>BMI Calculator</h3><p>Calculate BMI and understand the result.</p><ArrowRight/></Link><Link href="/age-calculator.html" className="tool-feature"><span>Dates</span><h3>Age Calculator</h3><p>Find exact age and time between dates.</p><ArrowRight/></Link></div><div className="library-line"><span>{calculatorRegistry.length}+ indexed utility pages</span><a href="#tools">Browse the library <ArrowRight size={15}/></a></div></section>
      <footer className="footer"><div><span className="brand-vorqena">vorqena</span><p>Everyday answers, tools, and decisions.</p></div><div className="footer-links">{intents.map((item) => <Link key={item.key} href={`/${item.key}`}>{item.title}</Link>)}</div><div className="footer-bottom"><span>© 2026 Vorqena</span><span>Built for useful answers.</span></div></footer>
    </main>
  );
}
