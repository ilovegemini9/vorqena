import { Link, useLocation } from "wouter";
import { Search } from "lucide-react";

const pages = {
  "/about": {
    label: "About Vorqena",
    title: "Practical answers, without the noise.",
    body: "Vorqena is an everyday utility engine for fixing problems, calculating answers, making decisions, finding dates, and estimating costs. The goal is simple: answer the question first, then give the useful context and next action.",
  },
  "/how-vorqena-works": {
    label: "How Vorqena Works",
    title: "Question → Knowledge → Answer → Tool.",
    body: "Vorqena separates live answers from canonical search content. A question can be answered without becoming an indexed page. Repeated, clear-intent topics can become canonical guides after the information is useful, specific, and supported.",
  },
  "/editorial-policy": {
    label: "Editorial Policy",
    title: "Useful before exhaustive.",
    body: "We prioritize direct answers, clear assumptions, practical steps, safety warnings, and evidence where it matters. We avoid mass-producing thin pages simply to capture search traffic.",
  },
  "/sources": {
    label: "Sources & Methodology",
    title: "Evidence should be easy to inspect.",
    body: "When a topic benefits from external evidence, Vorqena favors primary or authoritative sources. Sources are attached to knowledge records so readers can inspect the underlying guidance rather than relying on unsupported claims.",
  },
  "/contact": {
    label: "Contact Vorqena",
    title: "Help us make an answer better.",
    body: "For corrections, source suggestions, or product feedback, use the contact channel provided by the Vorqena team. When reporting a factual issue, include the page and the specific claim that needs review.",
  },
  "/privacy": {
    label: "Privacy",
    title: "Privacy, kept simple.",
    body: "Core Vorqena answers and tools are designed to work without requiring an account. As analytics or other data services are introduced, this page will be updated with the relevant collection and retention details.",
  },
  "/terms": {
    label: "Terms of Use",
    title: "Use Vorqena as a practical guide.",
    body: "Vorqena provides general informational answers, estimates, and tools. Important safety, legal, medical, financial, electrical, or mechanical decisions should be checked against authoritative or professional guidance.",
  },
} as const;

export default function TrustPage() {
  const [location] = useLocation();
  const page = pages[location as keyof typeof pages] ?? pages["/about"];

  return (
    <main className="page-shell">
      <header className="site-header">
        <Link href="/" className="brand"><span className="brand-mark">V</span><span>Vorqena</span></Link>
        <nav className="desktop-nav">
          {(["fix", "calculate", "decide", "when", "cost"] as const).map(item => <Link key={item} href={`/${item}`}>{item[0].toUpperCase() + item.slice(1)}</Link>)}
        </nav>
        <Link href="/search" className="header-cta"><Search size={15}/> Search</Link>
      </header>
      <section className="content-wrap" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <span className="eyebrow">Vorqena</span>
        <h1>{page.title}</h1>
        <p style={{ maxWidth: 720, fontSize: 18, lineHeight: 1.7 }}>{page.body}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
          {Object.entries(pages).filter(([href]) => href !== location).map(([href, item]) => <Link key={href} href={href} className="example-card" style={{ flex: "1 1 220px" }}><span><b>{item.label}</b><small>{item.title}</small></span></Link>)}
        </div>
      </section>
      <footer className="site-footer"><Link href="/" className="brand"><span className="brand-mark">V</span><span>Vorqena</span></Link><span>Everyday answers, tools & decisions.</span><span>© 2026</span></footer>
    </main>
  );
}
