import { Link, useLocation } from "wouter";
import { ArrowRight, Search } from "lucide-react";
import { searchTools } from "../data/vorqena";

export default function SearchPage() {
  const [location] = useLocation();
  const query = new URLSearchParams(location.split("?")[1] || "").get("q") || "";
  const results = searchTools(query);
  return <main className="page-shell"><header className="site-header"><Link href="/" className="brand"><span className="brand-mark">V</span><span>Vorqena</span></Link><nav className="desktop-nav"><Link href="/fix">Fix</Link><Link href="/calculate">Calculate</Link><Link href="/decide">Decide</Link><Link href="/when">When</Link><Link href="/cost">Cost</Link></nav><Link href="/" className="header-cta">Home <ArrowRight size={15}/></Link></header><section className="search-page"><span className="eyebrow">Vorqena search</span><h1>{query ? `Results for “${query}”` : "What do you need to solve?"}</h1><form className="search-box large" action="/search"><Search size={21}/><input name="q" defaultValue={query} autoFocus placeholder="Ask a question or find a tool…" aria-label="Search Vorqena"/><button>Search</button></form><div className="results-list">{results.length ? results.map(t=><Link className="result-card" key={t.slug} href={`/tool/${t.slug}`}><div><span className="result-intent">{t.intent}</span><h2>{t.title}</h2><p>{t.description}</p></div><ArrowRight/></Link>) : <div className="empty-state"><h2>No exact match yet.</h2><p>Try a simpler phrase such as “phone charging”, “tip”, “mortgage”, or “days between dates”.</p><Link href="/calculate">Browse calculators <ArrowRight size={16}/></Link></div>}</div></section><footer className="site-footer"><span>Vorqena — Everyday answers, tools & decisions.</span><span>© 2026</span></footer></main>}
