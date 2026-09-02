import { Link, useLocation } from "wouter";
import { ArrowRight, CalendarDays, Calculator, CircleDollarSign, Search, ShieldCheck, Wrench } from "lucide-react";
import { knowledgeForIntent } from "../data/knowledge";
import { tools } from "../data/vorqena";

type Intent = "fix" | "calculate" | "decide" | "when" | "cost";

const data: Record<Intent,{title:string;intro:string;icon:any;guide:string}>={
  fix:{title:"Find the likely cause. Take the next step.",intro:"Describe what went wrong and start with the simplest safe checks before you spend money.",icon:Wrench,guide:"Start with the symptom, rule out the simplest causes, then move to the next safe check. Vorqena keeps troubleshooting focused instead of turning every problem into a long checklist."},
  calculate:{title:"Put the numbers in. Get a useful answer.",intro:"Use focused calculators for money, math, dates, home projects, and everyday decisions.",icon:Calculator,guide:"Use the smallest set of inputs that gives you a useful result. Each answer should make the formula, assumptions, and next step clear."},
  decide:{title:"Know what makes sense before you act.",intro:"Turn uncertain questions into clear conditions, tradeoffs, and next actions.",icon:ShieldCheck,guide:"Compare the factors that actually change the decision. Vorqena focuses on tradeoffs and practical conditions rather than pretending there is one answer for everyone."},
  when:{title:"Get the date, deadline, or timing.",intro:"Find dates, countdowns, deadlines, and useful timing windows.",icon:CalendarDays,guide:"Timing questions depend on the starting point, frequency, and conditions. Check the relevant interval first, then use the result to plan the next action."},
  cost:{title:"Estimate the cost before you commit.",intro:"Understand price ranges, assumptions, and when repair or replacement makes more sense.",icon:CircleDollarSign,guide:"Treat cost as an estimate with assumptions, not a promise. Vorqena helps identify the inputs that move the estimate and the decisions that follow from it."}
};

const nav:Intent[]=["fix","calculate","decide","when","cost"];

export default function IntentPage({type}:{type:Intent}){
  const d=data[type],Icon=d.icon;
  const answers=knowledgeForIntent(type);
  const related=tools.filter(t=>t.intent===type);
  const [,navigate]=useLocation();
  return <main className="page-shell">
    <header className="site-header">
      <Link href="/" className="brand"><span className="brand-mark">V</span><span>Vorqena</span></Link>
      <nav className="desktop-nav">{nav.map(k=><Link className={k===type?"active":""} key={k} href={'/'+k}>{k[0].toUpperCase()+k.slice(1)}</Link>)}</nav>
      <Link href="/search" className="header-cta"><Search size={15}/> Search</Link>
    </header>

    <section className="intent-hero"><div className="intent-hero-copy">
      <div className="eyebrow"><Icon size={16}/> {type}</div><h1>{d.title}</h1><p>{d.intro}</p>
      <form className="search-box" onSubmit={event=>{event.preventDefault();const value=new FormData(event.currentTarget).get("q")?.toString().trim()||"";navigate(value?`/search?q=${encodeURIComponent(value)}`:"/search");}}>
        <Search size={20}/><input name="q" aria-label={'Search '+type+' answers'} placeholder="Ask Vorqena…"/><button type="submit">Search</button>
      </form>
    </div></section>

    <section className="content-wrap">
      <div className="section-heading"><div><span className="eyebrow">Start here</span><h2>{answers.length} useful {type} answers</h2></div></div>
      <div className="example-grid">{answers.map(x=><Link className="example-card" key={x.slug} href={x.slug}>
        <span><b>{x.title}</b><small>{x.seo.description || x.answer}</small></span><ArrowRight size={18}/>
      </Link>)}</div>

      <div className="answer-framework"><div><span className="eyebrow">How to use this hub</span><h2>Useful before exhaustive.</h2><p>{d.guide}</p></div>
        <div className="framework-list"><div><b>01</b><span><strong>Find</strong>Start with the closest problem or goal.</span></div><div><b>02</b><span><strong>Check</strong>Review the assumptions and evidence.</span></div><div><b>03</b><span><strong>Act</strong>Take the safest useful next step.</span></div></div>
      </div>

      <div className="section-heading"><div><span className="eyebrow">Useful now</span><h2>Interactive {type} tools</h2></div></div>
      <div className="example-grid">{related.map(x=><Link className="example-card" key={x.slug} href={`/tool/${x.slug}`}>
        <span><b>{x.title}</b><small>{x.description}</small></span><ArrowRight size={18}/>
      </Link>)}</div>

      <div className="related-intents"><span className="eyebrow">Keep going</span><h2>Related ways to solve it</h2><div className="related-grid">{nav.filter(k=>k!==type).map(k=><Link key={k} href={'/'+k}><span>{k[0].toUpperCase()+k.slice(1)}</span><small>{data[k].intro}</small><ArrowRight size={16}/></Link>)}</div></div>
    </section>

    <footer className="site-footer"><Link href="/" className="brand"><span className="brand-mark">V</span><span>Vorqena</span></Link><span>Everyday answers, tools & decisions.</span><span>© 2026</span></footer>
  </main>
}
