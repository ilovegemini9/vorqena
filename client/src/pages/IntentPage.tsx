import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Search } from "lucide-react";
import { calculatorRegistry } from "@/lib/calculators";

type Intent = "fix" | "calculate" | "decide" | "when" | "cost";

const content: Record<Intent, { label: string; title: string; intro: string; examples: string[]; cta: string }> = {
  fix: { label: "Fix", title: "Figure out what to do next.", intro: "Start with the problem, narrow down the likely cause, then follow a practical next step.", examples: ["Why is my phone charging slowly?", "Why is my dryer not heating?", "How do I fix a leaking faucet?"], cta: "Browse fix guides" },
  calculate: { label: "Calculate", title: "Put the numbers in. Get an answer.", intro: "Fast, focused calculators for money, health, math, dates, and everyday decisions.", examples: ["Mortgage payment", "Percentage change", "BMI", "Age and date difference"], cta: "Browse calculators" },
  decide: { label: "Decide", title: "Know what you can do before you act.", intro: "Clear yes/no-style guidance with the conditions that matter, so you can make the next decision with confidence.", examples: ["Can I freeze this food?", "Can I paint over this surface?", "Can I drive with this warning light?"], cta: "Explore decisions" },
  when: { label: "When", title: "Find the date, deadline, or timing.", intro: "Turn dates and schedules into simple answers you can use immediately.", examples: ["When is the next holiday?", "How many days until a date?", "When should I replace it?"], cta: "Explore date tools" },
  cost: { label: "Cost", title: "Estimate the cost before you commit.", intro: "Understand typical costs, the variables that move the price, and when repair or replacement makes more sense.", examples: ["How much does a brake job cost?", "Repair vs. replace", "Home repair cost estimate"], cta: "Explore cost guides" },
};

export default function IntentPage({ type }: { type: Intent }) {
  const item = content[type];
  const tools = calculatorRegistry.slice(0, 12);
  return (
    <main className="intent-page">
      <header className="topbar"><Link href="/" className="wordmark-large"><span>vorqena</span></Link><nav>{(["fix", "calculate", "decide", "when", "cost"] as Intent[]).map((key) => <Link className={key === type ? "active" : ""} key={key} href={`/${key}`}>{content[key].label}</Link>)}</nav></header>
      <section className="intent-hero"><div className="eyebrow">{item.label}</div><h1>{item.title}</h1><p>{item.intro}</p><div className="intent-search"><Search size={19} /><input placeholder={`Search ${item.label.toLowerCase()} answers`} aria-label={`Search ${item.label.toLowerCase()} answers`} /></div></section>
      <section className="intent-content"><div className="answer-card"><div><span className="answer-kicker">Start here</span><h2>What are you trying to solve?</h2><p>Use plain language. Vorqena is designed around the task, not the category.</p></div><div className="example-list">{item.examples.map((example) => <button key={example}>{example}<ArrowRight size={16} /></button>)}</div></div><div className="intent-grid"><div><div className="section-label">How Vorqena works</div><ol className="steps"><li><CheckCircle2 /><span><b>Describe the task</b><small>Search the question the way you would ask a person.</small></span></li><li><CheckCircle2 /><span><b>Get the useful answer first</b><small>Important conditions and calculations stay close to the answer.</small></span></li><li><CheckCircle2 /><span><b>Take the next step</b><small>Use a calculator, guide, source, or related question without starting over.</small></span></li></ol></div><div><div className="section-label">Popular tools</div><div className="tool-list">{tools.map((tool) => <Link key={tool.slug} href={tool.route}>{tool.title}<ArrowRight size={14} /></Link>)}</div></div></div></section>
      <footer className="minimal-footer"><Link href="/">Vorqena</Link><span>Everyday answers, tools, and decisions.</span></footer>
    </main>
  );
}
