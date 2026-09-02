import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CalendarDays,
  Calculator,
  Car,
  Check,
  CircleHelp,
  Clock3,
  DollarSign,
  Home as HomeIcon,
  Search,
  Sparkles,
  Wrench,
} from "lucide-react";

type Tool = {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: typeof Wrench;
};

const tools: Tool[] = [
  { slug: "wifi-connected-no-internet", title: "Wi-Fi connected but no internet", description: "A fast checklist to isolate the problem before restarting everything.", category: "Problems", icon: Wrench },
  { slug: "car-vibrates-when-braking", title: "Car vibrates when braking", description: "Common causes, urgency and what to check first.", category: "Problems", icon: Car },
  { slug: "printer-not-printing", title: "Printer not printing", description: "Work through the likely causes in the right order.", category: "Problems", icon: Wrench },
  { slug: "paint-calculator", title: "Paint calculator", description: "Estimate gallons, coats and waste from room dimensions.", category: "Calculators", icon: Calculator },
  { slug: "electricity-cost-calculator", title: "Electricity cost calculator", description: "Estimate appliance running cost from watts, hours and rate.", category: "Calculators", icon: Calculator },
  { slug: "can-i-mow-after-rain", title: "Can I mow after rain?", description: "Use soil and grass conditions to make the call.", category: "Can I?", icon: Check },
  { slug: "can-i-freeze-this", title: "Can I freeze this?", description: "A practical yes/no/depends decision format for food storage.", category: "Can I?", icon: Check },
  { slug: "social-security-payment-dates", title: "Social Security payment dates", description: "See the official schedule in an easy-to-scan format.", category: "Dates", icon: CalendarDays },
  { slug: "tax-deadlines", title: "Tax deadlines", description: "Important dates organized around the task, not the paperwork.", category: "Dates", icon: CalendarDays },
  { slug: "roof-replacement-cost", title: "Roof replacement cost", description: "Understand the main pricing drivers and build a quick estimate.", category: "Costs", icon: DollarSign },
  { slug: "repair-vs-replace", title: "Repair vs replace", description: "A simple decision framework using age, repair cost and remaining life.", category: "Costs", icon: DollarSign },
];

const categories = [
  { href: "/problems", name: "Fix", label: "Something is wrong", icon: Wrench },
  { href: "/calculators", name: "Calculate", label: "I need a number", icon: Calculator },
  { href: "/can-i", name: "Decide", label: "Can I do this?", icon: Check },
  { href: "/dates", name: "When", label: "I need a date", icon: CalendarDays },
  { href: "/costs", name: "Estimate", label: "How much?", icon: DollarSign },
];

const trending = [
  "Why is my smoke detector beeping?",
  "How much paint do I need?",
  "Can I mow wet grass?",
  "When is my next Social Security payment?",
  "How much does a water heater cost?",
];

export default function UtilityHome() {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return tools.filter((tool) => `${tool.title} ${tool.description} ${tool.category}`.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  return (
    <main className="utility-site">
      <header className="utility-header">
        <div className="utility-container utility-header-inner">
          <Link href="/" className="utility-logo" aria-label="Everyday home">
            <span className="utility-logo-mark"><Sparkles size={16} /></span>
            <span>Everyday</span>
          </Link>
          <nav className="utility-nav" aria-label="Primary">
            <Link href="/problems">Fix</Link>
            <Link href="/calculators">Calculate</Link>
            <Link href="/can-i">Decide</Link>
            <Link href="/dates">When</Link>
            <Link href="/costs">Estimate</Link>
          </nav>
          <Link href="/" className="utility-old-link">Calculator library</Link>
        </div>
      </header>

      <section className="utility-hero">
        <div className="utility-container utility-hero-grid">
          <div className="utility-hero-copy">
            <div className="utility-kicker"><CircleHelp size={14} /> Practical answers, not filler</div>
            <h1>What do you need to <em>solve?</em></h1>
            <p>Fix a problem, calculate a number, decide what to do, find a date, or estimate a cost.</p>
            <div className="utility-search-wrap">
              <Search size={20} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask a question or describe a problem…" aria-label="Search Everyday" />
              <span className="utility-search-hint"><Clock3 size={14} /> Instant</span>
            </div>
            {query && (
              <div className="utility-search-results">
                {matches.length ? matches.map((match) => {
                  const Icon = match.icon;
                  return <Link key={match.slug} href={`/${match.slug}`} className="utility-search-result"><span className="utility-search-result-icon"><Icon size={16} /></span><span><b>{match.title}</b><small>{match.category} · {match.description}</small></span><ArrowRight size={16} /></Link>;
                }) : <div className="utility-no-results">No close match yet. Try “cost”, “not working”, “can I”, or “when”.</div>}
              </div>
            )}
            <div className="utility-trending-label">People are asking</div>
            <div className="utility-chip-row">
              {trending.map((item) => <button key={item} type="button" onClick={() => setQuery(item)} className="utility-chip">{item}</button>)}
            </div>
          </div>
          <div className="utility-hero-card">
            <div className="utility-mini-label">One place for everyday decisions</div>
            <div className="utility-answer-preview">
              <div className="utility-answer-badge">EXAMPLE ANSWER</div>
              <h2>Can I mow after rain?</h2>
              <div className="utility-answer-state"><span className="utility-dot" /> Usually yes — once the lawn is dry enough.</div>
              <div className="utility-check-list">
                <div><Check size={15} /> Soil does not feel saturated</div>
                <div><Check size={15} /> Mower will not leave ruts</div>
                <div><Check size={15} /> Grass is not clumping heavily</div>
              </div>
              <Link href="/can-i-mow-after-rain" className="utility-preview-link">See the decision guide <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="utility-container utility-action-section">
        <div className="utility-section-heading">
          <div><span className="utility-overline">Start here</span><h2>Pick the kind of help you need.</h2></div>
          <span className="utility-section-note">The answer is the interface.</span>
        </div>
        <div className="utility-action-grid">
          {categories.map((category) => {
            const Icon = category.icon;
            return <Link href={category.href} key={category.href} className="utility-action-card"><span className="utility-action-icon"><Icon size={21} /></span><span className="utility-action-name">{category.name}</span><span className="utility-action-label">{category.label}</span><ArrowRight size={16} /></Link>;
          })}
        </div>
      </section>

      <section className="utility-container utility-featured-section">
        <div className="utility-section-heading">
          <div><span className="utility-overline">Useful now</span><h2>Popular practical questions.</h2></div>
          <Link href="/problems" className="utility-view-all">Browse all <ArrowRight size={15} /></Link>
        </div>
        <div className="utility-feature-grid">
          {tools.slice(0, 8).map((tool) => {
            const Icon = tool.icon;
            return <Link href={`/${tool.slug}`} className="utility-tool-card" key={tool.slug}><div className="utility-tool-top"><span className="utility-tool-icon"><Icon size={18} /></span><span>{tool.category}</span></div><h3>{tool.title}</h3><p>{tool.description}</p><span className="utility-tool-link">Open answer <ArrowRight size={14} /></span></Link>;
          })}
        </div>
      </section>

      <section className="utility-old-tools-section">
        <div className="utility-container utility-old-tools-grid">
          <div><span className="utility-overline">Already powerful</span><h2>Keep the full calculator library.</h2><p>The existing 221-tool calculator directory remains underneath this layer, so the new experience adds utility without throwing away the work already done.</p></div>
          <Link href="/" className="utility-library-button"><Calculator size={17} /> Browse calculator library <ArrowRight size={16} /></Link>
        </div>
      </section>

      <footer className="utility-footer"><div className="utility-container utility-footer-inner"><span>Everyday — clear answers for ordinary decisions.</span><div><Link href="/problems">Fix</Link><Link href="/calculators">Calculate</Link><Link href="/can-i">Decide</Link><Link href="/dates">When</Link><Link href="/costs">Estimate</Link></div></div></footer>
    </main>
  );
}
