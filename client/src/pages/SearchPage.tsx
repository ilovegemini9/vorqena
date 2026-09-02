import { Link, useLocation } from "wouter";
import { ArrowRight, Search } from "lucide-react";
import { searchTools } from "../data/vorqena";

const intentSuggestions = [
  { label: "Fix a problem", href: "/fix", example: "phone not charging" },
  { label: "Calculate something", href: "/calculate", example: "20% of 450" },
  { label: "Make a decision", href: "/decide", example: "can I freeze cooked chicken" },
  { label: "Find a date", href: "/when", example: "days between two dates" },
  { label: "Estimate a cost", href: "/cost", example: "how much will fuel cost" },
];

export default function SearchPage() {
  const [location] = useLocation();
  const query = new URLSearchParams(location.split("?")[1] || "").get("q") || "";
  const results = searchTools(query);

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
        <form className="search-box large" action="/search">
          <Search size={21}/>
          <input name="q" defaultValue={query} autoFocus placeholder="Ask a question or find a tool…" aria-label="Search Vorqena" />
          <button>Search</button>
        </form>

        {results.length > 0 ? (
          <div className="results-list">
            {results.map(tool => (
              <Link className="result-card" key={tool.slug} href={`/tool/${tool.slug}`}>
                <div><span className="result-intent">{tool.intent}</span><h2>{tool.title}</h2><p>{tool.description}</p></div>
                <ArrowRight />
              </Link>
            ))}
          </div>
        ) : (
          <div className="search-no-match">
            <div className="empty-state">
              <span className="result-intent">No exact match</span>
              <h2>{query ? `We couldn't find a tool for “${query}” yet.` : "Start with a question."}</h2>
              <p>Try describing what you need in plain English. Vorqena works best with a problem, calculation, decision, date, or cost question.</p>
            </div>

            <div className="search-suggestions">
              {intentSuggestions.map(item => (
                <Link className="suggestion-card" key={item.href} href={`${item.href}`}>
                  <strong>{item.label}</strong>
                  <span>Try “{item.example}”</span>
                  <ArrowRight size={16}/>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <footer className="site-footer"><span>Vorqena — Everyday answers, tools & decisions.</span><span>© 2026</span></footer>
    </main>
  );
}
