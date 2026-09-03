import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Search } from "lucide-react";
import { searchKnowledge } from "../data/knowledge";
import { routeQuestion } from "../data/router";
import { upsertCandidate } from "../data/candidates/store";
import { searchTools } from "../data/vorqena";
import "./SearchPage.css";

const suggestions = [
  { label: "Fix a problem", query: "phone not charging" },
  { label: "Calculate something", query: "20% of 450" },
  { label: "Make a decision", query: "repair or replace" },
  { label: "Find a date", query: "days between dates" },
  { label: "Estimate a cost", query: "fuel cost" },
];

function readQuery(location: string) {
  const questionMark = location.indexOf("?");
  if (questionMark === -1) return "";
  return new URLSearchParams(location.slice(questionMark + 1)).get("q")?.trim() || "";
}

export default function SearchPage() {
  const [location, navigate] = useLocation();
  const query = readQuery(location);
  const [value, setValue] = useState(query);

  const results = useMemo(() => {
    if (!query) return [];

    const answers = searchKnowledge(query).map(item => ({
      key: `answer:${item.slug}`,
      kind: "answer" as const,
      href: item.slug,
      title: item.title,
      description: item.answer,
      intent: item.intent,
    }));

    const answerSlugs = new Set(answers.map(item => item.href.replace(/^\//, "")));
    const tools = searchTools(query)
      .filter(item => !answerSlugs.has(`/tool/${item.slug}`.replace(/^\//, "")))
      .map(item => ({
        key: `tool:${item.slug}`,
        kind: "tool" as const,
        href: `/tool/${item.slug}`,
        title: item.title,
        description: item.description,
        intent: item.intent,
      }));

    return [...answers, ...tools];
  }, [query]);

  function submitSearch() {
    const next = value.trim();
    if (!next) {
      navigate("/search");
      return;
    }

    const route = routeQuestion(next);
    if (route.kind === "unknown") upsertCandidate(next, route);
    navigate(`/search?q=${encodeURIComponent(next)}`);
  }

  return (
    <main className="search-v2">
      <header className="search-v2-header">
        <Link href="/" className="search-v2-brand">
          <span className="search-v2-mark">V</span>
          <span>Vorqena</span>
        </Link>
        <nav>
          <Link href="/fix">Fix</Link>
          <Link href="/calculate">Calculate</Link>
          <Link href="/decide">Decide</Link>
          <Link href="/when">When</Link>
          <Link href="/cost">Cost</Link>
        </nav>
        <Link href="/" className="search-v2-home">Home <ArrowRight size={15} /></Link>
      </header>

      <section className="search-v2-main">
        <div className="search-v2-intro">
          <span className="search-v2-eyebrow">Vorqena search</span>
          <h1>{query ? `Results for “${query}”` : "What do you need to solve?"}</h1>
          <p>Ask in plain English. Find a direct answer or the right tool.</p>
        </div>

        <div className="search-v2-box">
          <Search size={21} aria-hidden="true" />
          <input
            value={value}
            onChange={event => setValue(event.target.value)}
            onKeyDown={event => {
              if (event.key === "Enter") {
                event.preventDefault();
                submitSearch();
              }
            }}
            placeholder="Ask a question or find a tool…"
            aria-label="Search Vorqena"
            autoFocus
          />
          <button type="button" onClick={submitSearch}>Search</button>
        </div>

        {query && results.length > 0 && (
          <section className="search-v2-results" aria-label="Search results">
            {results.map(result => (
              <Link key={result.key} href={result.href} className="search-v2-result">
                <div className="search-v2-result-copy">
                  <span className="search-v2-tag">{result.kind === "answer" ? "answer" : result.intent}</span>
                  <h2>{result.title}</h2>
                  <p>{result.description}</p>
                </div>
                <ArrowRight className="search-v2-result-arrow" size={20} aria-hidden="true" />
              </Link>
            ))}
          </section>
        )}

        {query && results.length === 0 && (
          <section className="search-v2-empty">
            <span className="search-v2-tag">Question captured</span>
            <h2>We don't have a direct result for “{query}” yet.</h2>
            <p>We saved this question for review. It is not published or indexed automatically.</p>
          </section>
        )}

        {!query && (
          <section className="search-v2-suggestions" aria-label="Search examples">
            {suggestions.map(item => (
              <button
                key={item.query}
                type="button"
                onClick={() => {
                  setValue(item.query);
                  navigate(`/search?q=${encodeURIComponent(item.query)}`);
                }}
              >
                <span>{item.label}</span>
                <strong>{item.query}</strong>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            ))}
          </section>
        )}
      </section>

      <footer className="search-v2-footer">
        <span>Vorqena — Everyday answers, tools & decisions.</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
