/**
 * Style reminder — Utilitarian Calculation Desk: an asymmetric navy header, pale-blue workbench,
 * compact square controls, circular category references, and direct utility-first navigation.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Calculator, ChevronRight, HeartPulse, Landmark, Menu, Search, Sigma, TimerReset, X } from "lucide-react";
import ScientificCalculator from "@/components/ScientificCalculator";

const categories = [
  { id: "financial", title: "Financial Calculators", icon: Landmark, image: "/manus-storage/calculator-net-finance_5da480d3.jpg", intro: "Make cost, payment and growth estimates clear.", links: [{ name: "Mortgage Calculator", href: "/mortgage" }, { name: "Loan Calculator", href: "/mortgage" }, { name: "Interest Calculator", href: "/mortgage" }, { name: "Investment Calculator", href: "/mortgage" }, { name: "Income Tax Calculator", href: "/mortgage" }, { name: "Compound Interest Calculator", href: "/mortgage" }] },
  { id: "health", title: "Fitness & Health", icon: HeartPulse, image: "/manus-storage/calculator-net-health_5f9d0ebc.jpg", intro: "Useful measures for movement and everyday health.", links: [{ name: "BMI Calculator", href: "/bmi" }, { name: "Calorie Calculator", href: "/bmi" }, { name: "Body Fat Calculator", href: "/bmi" }, { name: "BMR Calculator", href: "/bmi" }, { name: "Ideal Weight Calculator", href: "/bmi" }, { name: "Pace Calculator", href: "/bmi" }] },
  { id: "math", title: "Math Calculators", icon: Sigma, image: "/manus-storage/calculator-net-math_1a6cc27f.jpg", intro: "Perform practical math with less friction.", links: [{ name: "Scientific Calculator", href: "#scientific" }, { name: "Fraction Calculator", href: "#scientific" }, { name: "Percentage Calculator", href: "#scientific" }, { name: "Random Number Generator", href: "#scientific" }, { name: "Triangle Calculator", href: "#scientific" }, { name: "Standard Deviation Calculator", href: "#scientific" }] },
  { id: "other", title: "Everyday Calculators", icon: TimerReset, image: "/manus-storage/calculator-net-other_5b71dbbc.jpg", intro: "Dates, time and other everyday number tools.", links: [{ name: "Age Calculator", href: "/age" }, { name: "Date Calculator", href: "/age" }, { name: "Time Calculator", href: "/age" }, { name: "Hours Calculator", href: "/age" }, { name: "GPA Calculator", href: "/age" }, { name: "Conversion Calculator", href: "/age" }] },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const results = useMemo(() => categories.flatMap((category) => category.links.map((link) => ({ ...link, category: category.title }))).filter((link) => link.name.toLowerCase().includes(search.trim().toLowerCase())), [search]);
  return (
    <main>
      <section className="home-hero" id="scientific">
        <header className="site-header">
          <Link href="/" className="brand" aria-label="Calculator.net home"><img src="/manus-storage/calculator-net-mark_e5d4b69f.png" alt="" /><span className="wordmark"><b>calculator</b><i>.net</i></span></Link>
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}><a href="#directory" onClick={() => setMenuOpen(false)}>Calculator directory</a><a href="#scientific" onClick={() => setMenuOpen(false)}>Scientific calculator</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a></nav>
          <button className="menu-button" aria-label="Toggle navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
        </header>
        <div className="hero-workbench content-frame">
          <div className="hero-calculator"><p className="eyebrow">Quick workspace</p><ScientificCalculator compact /></div>
          <div className="hero-copy"><p className="eyebrow">Free online calculators</p><h1>Start with a <i>number.</i><br/>Leave with an answer.</h1><p>Search a tool or calculate right here. No account, no waiting, no unnecessary steps.</p><div className="search-box"><Search size={19}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a calculator" aria-label="Search calculators" /><span>{search ? `${results.length} found` : "200+ tools"}</span></div>{search && <div className="search-results">{results.length ? results.slice(0, 5).map((result) => <Link key={result.name} href={result.href}><span>{result.name}<small>{result.category}</small></span><ArrowRight size={15}/></Link>) : <p>No matching calculator in this starting collection.</p>}</div>}<div className="hero-shortcuts"><Link href="/mortgage">Mortgage</Link><Link href="/bmi">BMI</Link><Link href="/age">Age</Link><a href="#directory">All categories</a></div></div>
        </div>
      </section>
      <section className="directory-section content-frame" id="directory"><div className="directory-heading"><div><p className="eyebrow">Calculator directory</p><h2>Pick a category, then get to the number.</h2></div><span>Direct links to the practical tools people use most.</span></div><div className="category-river">{categories.map((category, index) => { const Icon = category.icon; return <article className="category-card" key={category.id} id={category.id}><div className="category-card-top"><div className="category-image"><img src={category.image} alt="" /></div><div className="category-order">0{index + 1}</div></div><div className="category-name"><Icon size={18}/><h3>{category.title}</h3></div><ul>{category.links.map((link) => <li key={link.name}>{link.href.startsWith("/") ? <Link href={link.href}>{link.name}<ChevronRight size={15}/></Link> : <a href={link.href}>{link.name}<ChevronRight size={15}/></a>}</li>)}</ul></article>; })}</div><a href="#directory" className="all-tools-button"><Calculator size={18}/>Explore all calculators<ArrowRight size={17}/></a></section>
      <section className="proof-section"><div className="content-frame proof-grid"><div><p className="eyebrow">Built for ordinary decisions</p><h2>A calculation should be the easiest part of the task.</h2></div><div className="proof-copy"><p>This reconstruction starts with the most-requested tool patterns: a scientific workspace, financial payment estimates, BMI, and date-based age calculations.</p><p>Each screen prioritizes clear inputs, immediate results and a readable explanation of what the number means.</p></div></div></section>
      <footer id="about" className="site-footer"><div className="content-frame footer-grid"><div><Link href="/" className="brand"><img src="/manus-storage/calculator-net-mark_e5d4b69f.png" alt=""/><span className="wordmark"><b>calculator</b><i>.net</i></span></Link><p>Useful calculations, made direct.</p></div><div><strong>Explore</strong><a href="#directory">Calculator directory</a><Link href="/mortgage">Financial tools</Link><Link href="/bmi">Health tools</Link></div><div><strong>Popular</strong><Link href="/mortgage">Mortgage Calculator</Link><Link href="/bmi">BMI Calculator</Link><Link href="/age">Age Calculator</Link></div></div><div className="content-frame footer-bottom"><span>© 2026 Calculator.net — reconstructed application.</span><span>Fast. Practical. Free.</span></div></footer>
    </main>
  );
}
