import { Link, useLocation } from "wouter";
import { ArrowRight, Search } from "lucide-react";
import { searchTools } from "../data/vorqena";
import { searchKnowledge } from "../data/knowledge";

const intentSuggestions = [
  { label: "Fix a problem", href: "/fix", example: "phone not charging" },
  { label: "Calculate something", href: "/calculate", example: "20% of 450" },
  { label: "Make a decision", href: "/decide", example: "can I freeze cooked chicken" },
  { label: "Find a date", href: "/when", example: "days between two dates" },
  { label: "Estimate a cost", href: "/cost", example: "how much will fuel cost" },
];

export default function SearchPage() {
  const [location, navigate] = useLocation();
  const query = new URLSearchParams(location.includes("?") ? location.slice(location.indexOf("?") + 1) : "").get("q") || "";
  const knowledgeResults = searchKnowledge(query);
  const toolResults = searchTools(query);
  const seen = new Set(knowledgeResults.map(item => item.slug.replace(/^\//, "")));
  const results = [
    ...knowledgeResults.map(item => ({ kind: "answer" as const, slug: item.slug, title: item.title, description: item.answer, intent: item.intent })),
    ...toolResults
      .filter(tool => !seen.has(tool.slug.replace(/^\//, "")))
      .map(tool => ({ kind: "tool" as const, slug: `/tool/${tool.slug}`, title: tool.title, description: tool.description, intent: tool.intent })),
  ];

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextQuery = String(form.get("q") || "").trim();
    navigate(nextQuery ? `/search?q=${encodeURIComponent(nextQuery)}` : "/search");
  }

  return (
    <main className="page-shell">
      <header className="site-header">
        <Link href="/" className="brand"><span className="brand-mark">V</span><span>Vorqena</span></Link>
        <nav className="desktop-nav"><Link href="/fix">Fix</Link><Link href="/calculate">Calculate</Link><Link href="/decide">Decide</Link><Link href="/when">When</Link><Link href="/cost">Cost</Link></nav>
        <Link href="/" className="header-cta">Home <ArrowRight size={15}/></Link>
      </header>

      <section className="search-page">
        <span className="eyebrow">Vorqena search</span>
        <h1>{query ? `Results for “${query}”` : "What do you need to solve?"}</h1>
        <form className="search-box large" onSubmit={handleSearch}>
          <Search size={21}/>
          <input name="q" defaultValue={query} autoFocus placeholder="Ask a question or find a tool…" aria-label="Search Vorqena" />
          <button type="submit">Search</button>
        </form>

        {results.length > 0 ? (
          <div className="results-list">
            {results.map(result => (
              <Link className="result-card" key={`${result.kind}-${result.slug}`} href={result.slug}>
                <div><span className="result-intent">{result.kind === "answer" ? "answer" : result.intent}</span><h2>{result.title}</h2><p>{result.description}</p></div>
                <ArrowRight />
              </Link>
            ))}
          </div>
        ) : (
          <div className="search-no-match">
            <div className="empty-state">
              <span className="result-intent">No exact match</span>
              <h2>{query ? `We couldn't find a tool or canonical answer for “${query}” yet.` : "Start with a question."}</h2>
              <p>Try describing what you need in plain English. Vorqena works best with a problem, calculation, decision, date, or cost question.</p>
            </div>
            <div className="search-suggestions">
              {intentSuggestions.map(item => <Link className="suggestion-card" key={item.href} href={item.href}><strong>{item.label}</strong><span>Try “{item.example}”</span><ArrowRight size={16}/></Link>)}
            </div>
          </div>
        )}
      </section>
      <footer className="site-footer"><span>Vorqena — Everyday answers, tools & decisions.</span><span>© 2026</span></footer>
    </main>
  );
}
