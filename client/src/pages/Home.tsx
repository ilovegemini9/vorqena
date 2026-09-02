import { Link } from "wouter";
import { ArrowRight, CalendarDays, Calculator, CircleDollarSign, Search, ShieldCheck, Sparkles, Wrench } from "lucide-react";

const items=[
  ['fix','Fix','Troubleshoot a problem and find the next safe step.',Wrench],
  ['calculate','Calculate','Turn numbers into a clear answer.',Calculator],
  ['decide','Decide','Understand your options before you act.',ShieldCheck],
  ['when','When','Find dates, deadlines, and timing.',CalendarDays],
  ['cost','Cost','Estimate price and compare choices.',CircleDollarSign]
] as const;

const visuals=[
  ['fix','Fix everyday problems','Diagnose the likely cause, start with the safest check, and know when to stop.','/visual-fix.svg','My phone is not charging'],
  ['calculate','Calculate an answer','Use a purpose-built calculator with clear inputs, assumptions, and a result you can act on.','/visual-calculate.svg','80 dollar dinner 18% tip 4 people'],
  ['decide','Make the next decision','Compare options with practical rules instead of getting a vague yes-or-no.','/visual-decide.svg','Should I repair or replace']
] as const;

export default function Home(){
  return <main className="page-shell">
    <header className="site-header">
      <Link href="/" className="brand"><span className="brand-mark">V</span><span>Vorqena</span></Link>
      <nav className="desktop-nav">{items.map(([k,t])=><Link key={k} href={'/'+k}>{t}</Link>)}</nav>
      <Link href="/search" className="header-cta">Search <Search size={15}/></Link>
    </header>

    <section className="home-hero">
      <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
      <div className="hero-content">
        <div className="eyebrow"><Sparkles size={15}/> Everyday utility engine</div>
        <h1>What can we<br/><span>help you with?</span></h1>
        <p>Describe a problem, ask a question, or calculate something. Vorqena finds the most useful next step.</p>
        <form className="hero-search search-box" action="/search">
          <Search size={21}/><input name="q" placeholder="Try: Why is my phone not charging?" aria-label="Ask Vorqena"/><button className="search-submit">Ask</button>
        </form>
        <div className="hero-examples">
          <span>Try:</span>
          <Link href="/search?q=phone%20not%20charging">phone not charging</Link>
          <Link href="/search?q=tip">18% tip on $80</Link>
          <Link href="/search?q=can%20i%20freeze">Can I freeze this?</Link>
        </div>
      </div>
    </section>

    <section className="intent-band">
      <div className="content-wrap intent-band-inner">
        <div className="section-heading compact-heading"><div><span className="eyebrow">Start with the outcome</span><h2>One question. One useful path.</h2></div><span className="muted">Five ways to get unstuck.</span></div>
        <div className="intent-grid">{items.map(([k,t,d,Icon],i)=><Link className="intent-card" href={'/'+k} key={k}><span className="intent-num">0{i+1}</span><Icon size={22}/><h3>{t}</h3><p>{d}</p><ArrowRight className="card-arrow" size={17}/></Link>)}</div>
      </div>
    </section>

    <section className="content-wrap">
      <div className="visual-section visual-section-home">
        <div className="section-heading"><div><span className="eyebrow">See it in action</span><h2>From question to useful action.</h2></div><span className="muted">Not a generic chatbot.</span></div>
        <div className="visual-grid">{visuals.map(([k,title,description,image,query],i)=><Link className={`visual-card visual-card-${i+1}`} href={`/search?q=${encodeURIComponent(query)}`} key={k}>
          <div className="visual-image"><img src={image} alt="" loading="lazy"/></div>
          <div className="visual-copy"><span className="result-intent">{k}</span><h3>{title}</h3><p>{description}</p><span className="visual-link">Try an example <ArrowRight size={15}/></span></div>
        </Link>)}</div>
      </div>

      <div className="engine-section">
        <div><span className="eyebrow">The idea</span><h2>Knowledge first.<br/>AI second.</h2><p>Vorqena is built around structured facts, rules, calculators, and trusted sources. AI can understand the question and route it to the right path — not replace the useful work with a blank chat box.</p></div>
        <div className="engine-flow"><span>Question</span><b>→</b><span>Intent</span><b>→</b><span>Knowledge + rules</span><b>→</b><span>Answer + action</span></div>
      </div>

      <div className="question-strip">
        <div><span className="eyebrow">Ask naturally</span><h2>Skip the perfect keyword.</h2><p>Vorqena is built around the job behind the question: diagnose it, calculate it, decide it, find the date, or estimate the cost.</p></div>
        <div className="question-list">
          <Link href="/search?q=phone%20charging">Why is my phone charging slowly? <ArrowRight size={15}/></Link>
          <Link href="/search?q=tip">How much should I tip? <ArrowRight size={15}/></Link>
          <Link href="/search?q=brake%20repair">How much does brake repair cost? <ArrowRight size={15}/></Link>
          <Link href="/search?q=days%20between%20dates">How many days are between two dates? <ArrowRight size={15}/></Link>
        </div>
      </div>

      <div className="principles"><span className="eyebrow">The Vorqena standard</span><h2>Answer first. Evidence close. Action next.</h2><div className="principle-grid"><div><b>01</b><strong>Answer-first</strong><span>Useful result before the noise.</span></div><div><b>02</b><strong>Transparent</strong><span>Assumptions and sources stay visible.</span></div><div><b>03</b><strong>Actionable</strong><span>The next step is obvious.</span></div></div></div>
    </section>

    <footer className="site-footer"><div className="brand"><span className="brand-mark">V</span><span>Vorqena</span></div><span>Everyday answers, tools & decisions.</span><span>© 2026</span></footer>
  </main>
}