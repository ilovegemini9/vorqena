import { Link, useLocation } from "wouter";
import { ArrowRight, BarChart3, BookOpen, Calculator, CalendarDays, CircleDollarSign, Clock3, FileText, HelpCircle, History, Home as HomeIcon, Menu, Plus, Search, Settings, ShieldCheck, Sparkles, Wrench, XCircle } from "lucide-react";
import { routeQuestion } from "../data/router";

const intents=[
  ["fix","Fix","Solve problems and get step-by-step guidance.",Wrench,"#57c8ea"],
  ["calculate","Calculate","Crunch numbers instantly with smart calculators.",Calculator,"#77d59c"],
  ["decide","Decide","Get clarity on choices with pros, cons, and recommendations.",ShieldCheck,"#b77bf0"],
  ["when","When","Find dates, deadlines, and the right time for important things.",CalendarDays,"#ffb451"],
  ["cost","Cost","See estimated costs and compare your options.",CircleDollarSign,"#f4c764"]
] as const;

const popular=[
  ["My laptop won't turn on","fix"],
  ["I can't log into my account","fix"],
  ["How much does it cost to replace a water heater?","cost"],
  ["Can I drive with a check engine light on?","decide"],
  ["How many days until Christmas?","when"],
  ["20% of 450","calculate"],
  ["Can I freeze cooked chicken?","decide"],
  ["Repair or replace my washing machine?","decide"],
  ["What is my monthly mortgage payment?","calculate"]
];

const examples=[
  ["My phone is not charging","phone not charging"],
  ["How much tip should I leave?","tip"],
  ["Can I freeze cooked rice?","can i freeze cooked rice"],
  ["When is Thanksgiving 2026?","when is thanksgiving 2026"]
];

export default function Home(){
  const [, navigate] = useLocation();

  function handleAsk(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const query = String(form.get("q") || "").trim();
    if (!query) return;

    const route = routeQuestion(query);
    if (route.kind === "knowledge" && route.knowledge) {
      navigate(route.knowledge.slug);
      return;
    }
    if (route.kind === "tool" && route.tool) {
      navigate(`/tool/${route.tool.slug}`);
      return;
    }
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return <main className="app-shell">
    <aside className="sidebar">
      <Link href="/" className="side-brand"><BarChart3/><span>Vorqena</span></Link>
      <nav className="side-nav">
        <Link href="/" className="side-link active"><HomeIcon/>Home</Link>
        <Link href="/fix" className="side-link"><Wrench/>Fix</Link>
        <Link href="/calculate" className="side-link"><Calculator/>Calculate</Link>
        <Link href="/decide" className="side-link"><ShieldCheck/>Decide</Link>
        <Link href="/when" className="side-link"><CalendarDays/>When</Link>
        <Link href="/cost" className="side-link"><CircleDollarSign/>Cost</Link>
      </nav>
      <nav className="side-nav side-bottom">
        <a href="#popular" className="side-link"><BookOpen/>Bookmarks</a>
        <a href="#popular" className="side-link"><History/>History</a>
        <a href="#popular" className="side-link"><Settings/>Settings</a>
      </nav>
      <div className="side-note"><Sparkles/><strong>Save time.<br/>Get answers.<br/>Get things done.</strong><span>Vorqena turns questions into answers and action.</span></div>
    </aside>

    <section className="main-stage">
      <header className="topbar">
        <div className="mobile-brand"><BarChart3/> Vorqena</div>
        <button className="examples-btn"><Sparkles size={15}/>Examples</button>
        <button className="menu-btn" aria-label="Menu"><Menu/></button>
      </header>

      <section className="hero-dark">
        <BarChart3 className="hero-mark"/>
        <h1>What can we <span>help you</span> with?</h1>
        <p>Describe a problem, ask a question, or calculate something.</p>
        <form className="ask-box" onSubmit={handleAsk}>
          <Search/>
          <input name="q" placeholder="Ask anything..." aria-label="Ask anything"/>
          <Plus className="ask-plus"/>
          <button type="submit" aria-label="Search"><ArrowRight/></button>
        </form>
        <div className="query-chips">{examples.map(([label,q])=><Link key={label} href={"/search?q="+encodeURIComponent(q)}>{label}</Link>)}</div>
      </section>

      <section className="intent-cards">
        {intents.map(([key,title,desc,Icon,color])=><Link key={key} href={"/"+key} className="dark-intent-card">
          <div className="intent-icon" style={{color}}><Icon size={54}/></div>
          <h2 style={{color}}>{title}</h2>
          <p>{desc}</p>
          <span className="round-arrow"><ArrowRight size={17}/></span>
        </Link>)}
      </section>

      <section className="popular-box" id="popular">
        <div className="popular-head"><h2><BarChart3/>Popular right now</h2><Link href="/search">View all <ArrowRight size={15}/></Link></div>
        <div className="popular-grid">{popular.map(([q,intent])=><Link key={q} href={"/search?q="+encodeURIComponent(q)}><FileText/><span>{q}</span><ArrowRight className="popular-arrow"/></Link>)}</div>
      </section>

      <section className="trust-row">
        <div><ShieldCheck/><span><strong>Trusted & Reliable</strong><small>Answers backed by sources you can trust.</small></span></div>
        <div><BarChart3/><span><strong>Smart Understanding</strong><small>Vorqena understands your question, not just keywords.</small></span></div>
        <div><Sparkles/><span><strong>Fast & Accurate</strong><small>Get the right answer and next steps, instantly.</small></span></div>
        <div><HelpCircle/><span><strong>Private & Secure</strong><small>Your questions are private. We respect your data.</small></span></div>
      </section>
    </section>
  </main>
}
