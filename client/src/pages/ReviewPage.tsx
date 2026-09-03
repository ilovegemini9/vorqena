import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Search } from "lucide-react";
import { knowledge } from "../data/knowledge";
import {
  getPrioritizedCandidates,
  markNeedsResearch,
  markReadyForReview,
  matchCandidate,
  publishCandidate,
  rejectCandidate,
} from "../data/candidates/store";
import type { CandidateRecord } from "../data/candidates/types";

const statuses = ["all", "new", "matched", "needs-research", "ready-for-review", "published", "rejected"] as const;
type Filter = typeof statuses[number];

export default function ReviewPage() {
  const [candidates, setCandidates] = useState<CandidateRecord[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const refresh = () => setCandidates(getPrioritizedCandidates());
  useEffect(refresh, []);

  const visible = useMemo(
    () => filter === "all" ? candidates : candidates.filter(candidate => candidate.status === filter),
    [candidates, filter],
  );

  const apply = (updated: CandidateRecord | null) => {
    if (updated) refresh();
  };

  return (
    <main className="page-shell">
      <header className="site-header">
        <Link href="/" className="brand"><span className="brand-mark">V</span><span>Vorqena</span></Link>
        <nav className="desktop-nav">
          {(["fix", "calculate", "decide", "when", "cost"] as const).map(item => <Link key={item} href={`/${item}`}>{item[0].toUpperCase() + item.slice(1)}</Link>)}
        </nav>
        <Link href="/search" className="header-cta"><Search size={15}/> Search</Link>
      </header>

      <section className="content-wrap" style={{ paddingTop: 64, paddingBottom: 96 }}>
        <span className="eyebrow">Review queue</span>
        <h1>Question candidates</h1>
        <p style={{ maxWidth: 760, fontSize: 18, lineHeight: 1.7 }}>
          Review questions that Vorqena could not match yet. This queue is browser-local only; it is not global demand analytics and it never publishes pages automatically.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "28px 0" }}>
          {statuses.map(status => (
            <button key={status} type="button" onClick={() => setFilter(status)} className="chip" aria-pressed={filter === status}>
              {status.replace("-", " ")}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="example-card"><b>No candidates in this view.</b><small>Unknown questions will appear here after a search.</small></div>
        ) : (
          <div style={{ display: "grid", gap: 16 }}>
            {visible.map(candidate => (
              <CandidateCard key={candidate.id} candidate={candidate} onChange={apply} />
            ))}
          </div>
        )}
      </section>

      <footer className="site-footer"><Link href="/" className="brand"><span className="brand-mark">V</span><span>Vorqena</span></Link><span>Local review tools — no database.</span><span>© 2026</span></footer>
    </main>
  );
}

function CandidateCard({ candidate, onChange }: { candidate: CandidateRecord; onChange: (candidate: CandidateRecord | null) => void }) {
  const [topic, setTopic] = useState(candidate.canonicalTopic ?? "");
  const selected = knowledge.find(item => item.slug === topic || item.id === topic);
  const canReady = Boolean(selected);
  const canPublish = candidate.status === "ready-for-review" && Boolean(selected?.seo.indexable);

  return (
    <article className="example-card" style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "start" }}>
        <div>
          <strong style={{ fontSize: 18 }}>{candidate.query}</strong>
          <small style={{ display: "block", marginTop: 7 }}>
            {candidate.status.replace("-", " ")} · {candidate.demandCount} local demand{candidate.demandCount === 1 ? "" : "s"} · {candidate.confidence} confidence
            {candidate.intent ? ` · ${candidate.intent}` : ""}
          </small>
        </div>
        {candidate.canonicalTopic && <Link href={candidate.canonicalTopic}>View canonical</Link>}
      </div>

      <label style={{ display: "grid", gap: 7 }}>
        <span style={{ fontWeight: 600 }}>Canonical topic</span>
        <select value={topic} onChange={event => setTopic(event.target.value)} style={{ padding: "11px 12px", borderRadius: 10, border: "1px solid var(--border, #ddd)", background: "var(--background, white)" }}>
          <option value="">Select an existing knowledge topic</option>
          {knowledge.map(item => <option key={item.id} value={item.slug}>{item.title} ({item.slug})</option>)}
        </select>
      </label>

      <small>
        Publishing here only records an explicit approval for an existing canonical topic. It does <b>not</b> create a new indexable page; new topics still require authored content in the knowledge registry.
      </small>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <button type="button" className="chip" disabled={!canReady} onClick={() => onChange(matchCandidate(candidate.id, topic))}>Match</button>
        <button type="button" className="chip" onClick={() => onChange(markNeedsResearch(candidate.id))}>Needs research</button>
        <button type="button" className="chip" disabled={!canReady} onClick={() => onChange(markReadyForReview(candidate.id))}>Ready for review</button>
        <button type="button" className="chip" disabled={!canPublish} onClick={() => onChange(publishCandidate(candidate.id))}>Publish approval</button>
        <button type="button" className="chip" onClick={() => onChange(rejectCandidate(candidate.id))}>Reject</button>
      </div>
    </article>
  );
}
