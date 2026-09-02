import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Search, ShieldCheck } from "lucide-react";
import { getKnowledge } from "../data/knowledge";

export default function CanonicalPage() {
  const { intent = "", slug = "" } = useParams();
  const item = getKnowledge(`${intent}/${slug}`);

  if (!item) return <main className="page-shell"><header className="site-header"><Link href="/" className="brand"><span className="brand-mark">V</span><span>Vorqena</span></Link></header><section className="search-page"><h1>Topic not found</h1><Link href="/search">Search Vorqena <ArrowRight /></Link></section></main>;

  if (typeof document !== "undefined") document.title = item.seo.title;

  return <main className="page-shell">
    <header className="site-header"><Link href="/" className="brand"><span className="brand-mark">V</span><span>Vorqena</span></Link><nav className="desktop-nav"><Link href="/fix">Fix</Link><Link href="/calculate">Calculate</Link><Link href="/decide">Decide</Link><Link href="/when">When</Link><Link href="/cost">Cost</Link></nav><Link href="/search" className="header-cta"><Search size={15}/> Search</Link></header>
    <article className="content-wrap canonical-page">
      <Link href={`/${item.intent}`} className="back-link"><ArrowLeft size={15}/> {item.intent}</Link>
      <span className="eyebrow">Vorqena answer</span>
      <h1>{item.title}</h1>
      <p className="canonical-intro">{item.seo.description}</p>

      <section className="knowledge-answer canonical-answer"><span className="answer-label">Direct answer</span><h2>{item.answer}</h2></section>

      {item.causes?.length ? <section><h2>Common causes</h2><ul>{item.causes.map(x => <li key={x}>{x}</li>)}</ul></section> : null}
      {item.factors?.length ? <section><h2>What affects the answer</h2><ul>{item.factors.map(x => <li key={x}>{x}</li>)}</ul></section> : null}
      {item.steps?.length ? <section><h2>What to do</h2><ol>{item.steps.map(x => <li key={x}>{x}</li>)}</ol></section> : null}
      {item.warnings?.length ? <section className="warning-section"><h2><ShieldCheck size={20}/> Safety & warnings</h2>{item.warnings.map(x => <p key={x}>{x}</p>)}</section> : null}
      {item.whenToGetHelp?.length ? <section><h2>When to get help</h2><ul>{item.whenToGetHelp.map(x => <li key={x}>{x}</li>)}</ul></section> : null}
      {item.cost?.length ? <section><h2>Cost considerations</h2><ul>{item.cost.map(x => <li key={x}>{x}</li>)}</ul></section> : null}

      {item.related.length ? <section className="canonical-related"><span className="eyebrow">Related questions</span><div className="related-grid">{item.related.map(path => <Link key={path} href={path}><span>{path.split("/").pop()?.replace(/-/g, " ")}</span><ArrowRight size={16}/></Link>)}</div></section> : null}
    </article>
    <footer className="site-footer"><span>Vorqena — Everyday answers, tools & decisions.</span><span>© 2026</span></footer>
  </main>;
}
