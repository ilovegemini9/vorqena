/**
 * Style reminder — Utilitarian Calculation Desk: asymmetric navy header,
 * compact calculator workspace, dense indexed directory, and direct utility-first navigation.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Calculator, ChevronRight, HeartPulse, Landmark, Menu, Search, Sigma, TimerReset, X } from "lucide-react";
import ScientificCalculator from "@/components/ScientificCalculator";
import { calculatorRegistry, type CalculatorCategory } from "@/lib/calculators";

const categoryMeta: { id: string; title: string; category: CalculatorCategory; icon: typeof Landmark; image: string; intro: string }[] = [
  { id: "financial", title: "Financial Calculators", category: "Financial", icon: Landmark, image: "/manus-storage/calculator-net-finance_5da480d3.jpg", intro: "Payments, interest, loans, taxes and money decisions." },
  { id: "health", title: "Fitness & Health", category: "Fitness & Health", icon: HeartPulse, image: "/manus-storage/calculator-net-health_5f9d0ebc.jpg", intro: "Everyday measures for movement, nutrition and health." },
  { id: "math", title: "Math Calculators", category: "Math", icon: Sigma, image: "/manus-storage/calculator-net-math_1a6cc27f.jpg", intro: "Equations, numbers, geometry, statistics and conversions." },
  { id: "other", title: "Everyday Calculators", category: "Other", icon: TimerReset, image: "/manus-storage/calculator-net-other_5b71dbbc.jpg", intro: "Dates, time, planning and other practical number tools." },
];

const categories = categoryMeta.map((meta) => ({ ...meta, links: calculatorRegistry.filter((calculator) => calculator.category === meta.category) }));

export default function Home() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const results = useMemo(() => calculatorRegistry.filter((calculator) => calculator.title.toLowerCase().includes(search.trim().toLowerCase())), [search]);
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
          <div className="hero-copy"><p className="eyebrow">Free online calculators</p><h1>Start with a <i>number.</i><br />Leave with an answer.</h1><p>Search a tool or calculate right here. No account, no waiting, no unnecessary steps.</p><div className="search-box"><Search size={19} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a calculator" aria-label="Search calculators" /><span>{search ? `${results.length} found` : "221 tools"}</span></div>{search && <div className="search-results">{results.length ? results.slice(0, 8).map((result) => <Link key={result.slug} href={result.route}><span>{result.title}<small>{result.category}</small></span><ArrowRight size={15} /></Link>) : <p>No matching calculator in the public index.</p>}</div>}<div className="hero-shortcuts"><Link href="/mortgage-calculator.html">Mortgage</Link><Link href="/bmi-calculator.html">BMI</Link><Link href="/age-calculator.html">Age</Link><a href="#directory">All categories</a></div></div>
        </div>
      </section>
      <section className="directory-section content-frame" id="directory"><div className="directory-heading"><div><p className="eyebrow">Calculator directory</p><h2>Pick a category, then get to the number.</h2></div><span>Direct links to the practical tools people use most.</span></div><div className="category-river">{categories.map((category, index) => { const Icon = category.icon; return <article className="category-card" key={category.id} id={category.id}><div className="category-card-top"><div className="category-image"><img src={category.image} alt="" /></div><div className="category-order">{String(index + 1).padStart(2, "0")}</div></div><div className="category-name"><Icon size={18} /><h3>{category.title}</h3></div><p>{category.intro}</p><ul>{category.links.slice(0, 8).map((link) => <li key={link.slug}><Link href={link.route}>{link.title}<ChevronRight size={15} /></Link></li>)}</ul></article>; })}</div><a href="#all-tools" className="all-tools-button"><Calculator size={18} />Browse all {calculatorRegistry.length} calculators<ArrowRight size={17} /></a></section>
      <section className="all-tools-index content-frame" id="all-tools"><div className="directory-heading"><div><p className="eyebrow">Full public index</p><h2>Every route, one practical starting point.</h2></div><span>{calculatorRegistry.length} indexed pages from the public sitemap.</span></div><div className="all-tools-grid">{categories.map((category) => <section key={category.id}><div className="all-tools-heading"><category.icon size={17} /><h3>{category.title}</h3><span>{category.links.length}</span></div><div className="all-tools-links">{category.links.map((link) => <Link key={link.slug} href={link.route}>{link.title}<ChevronRight size={13} /></Link>)}</div></section>)}</div></section>
      <section className="proof-section"><div className="content-frame proof-grid"><div><p className="eyebrow">Built for ordinary decisions</p><h2>A calculation should be the easiest part of the task.</h2></div><div className="proof-copy"><p>This reconstruction follows the public calculator directory and extends it into a searchable route index with shared form patterns.</p><p>Dedicated calculators can be layered onto the same responsive shell without changing the way people browse or find a tool.</p></div></div></section>
      <footer id="about" className="site-footer"><div className="content-frame footer-grid"><div><Link href="/" className="brand"><img src="/manus-storage/calculator-net-mark_e5d4b69f.png" alt="" /><span className="wordmark"><b>calculator</b><i>.net</i></span></Link><p>Useful calculations, made direct.</p></div><div><strong>Explore</strong><a href="#directory">Calculator directory</a><a href="#all-tools">Full public index</a><Link href="/mortgage-calculator.html">Financial tools</Link></div><div><strong>Popular</strong><Link href="/mortgage-calculator.html">Mortgage Calculator</Link><Link href="/bmi-calculator.html">BMI Calculator</Link><Link href="/age-calculator.html">Age Calculator</Link></div></div><div className="content-frame footer-bottom"><span>© 2026 Calculator.net — reconstructed application.</span><span>Fast. Practical. Free.</span></div></footer>
    </main>
  );
}
