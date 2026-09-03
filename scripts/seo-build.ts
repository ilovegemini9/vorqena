import fs from "node:fs";
import path from "node:path";
import { knowledge } from "../client/src/data/knowledge/index";
import { tools } from "../client/src/data/vorqena";

const SITE = "https://vorqena.vercel.app";
const DIST = path.resolve("dist/public");
const SHELL_PATH = path.join(DIST, "index.html");

const intentMeta = {
  fix: { title: "Fix Everyday Problems | Vorqena", description: "Practical troubleshooting guides for everyday problems, with safe checks, likely causes, and next steps.", heading: "Find the likely cause. Take the next step." },
  calculate: { title: "Calculators & Everyday Math | Vorqena", description: "Focused calculators for percentages, dates, money, loans, and everyday decisions.", heading: "Put the numbers in. Get a useful answer." },
  decide: { title: "Decision Guides | Vorqena", description: "Practical decision guides that turn uncertain everyday choices into clear tradeoffs and next actions.", heading: "Know what makes sense before you act." },
  when: { title: "Dates, Deadlines & Timing Tools | Vorqena", description: "Find dates, deadlines, durations, and timing answers with focused everyday tools.", heading: "Get the date, deadline, or timing." },
  cost: { title: "Cost Estimators & Guides | Vorqena", description: "Estimate everyday costs with transparent assumptions and practical next steps.", heading: "Estimate the cost before you commit." },
} as const;
type Intent = keyof typeof intentMeta;

const duplicateToolToKnowledge: Record<string, string> = {
  "percentage-calculator": "/calculate/percentage",
  "fuel-cost": "/cost/fuel-cost",
  "phone-not-charging": "/fix/phone-not-charging",
  "dryer-not-heating": "/fix/dryer-not-heating",
  "repair-or-replace": "/decide/repair-or-replace",
};

const homeIntents = [
  ["fix", "Fix", "Solve problems and get step-by-step guidance."],
  ["calculate", "Calculate", "Crunch numbers instantly with smart calculators."],
  ["decide", "Decide", "Get clarity on choices with pros, cons, and recommendations."],
  ["when", "When", "Find dates, deadlines, and the right time for important things."],
  ["cost", "Cost", "See estimated costs and compare your options."],
] as const;

const homePopular = [
  ["My laptop won't turn on", "fix"],
  ["I can't log into my account", "fix"],
  ["How much does it cost to replace a water heater?", "cost"],
  ["Can I drive with a check engine light on?", "decide"],
  ["How many days until Christmas?", "when"],
  ["20% of 450", "calculate"],
  ["Can I freeze cooked chicken?", "decide"],
  ["Repair or replace my washing machine?", "decide"],
  ["What is my monthly mortgage payment?", "calculate"],
] as const;

const homeExamples = [
  ["My phone is not charging", "phone not charging"],
  ["How much tip should I leave?", "tip"],
  ["Can I freeze cooked rice?", "can i freeze cooked rice"],
  ["When is Thanksgiving 2026?", "when is thanksgiving 2026"],
] as const;

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function setMeta(shell: string, title: string, description: string, canonical: string, robots = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1") {
  return shell.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`).replace(/<meta name="robots" content="[^"]*"\s*\/>/, `<meta name="robots" content="${robots}" />`).replace(/<meta name="googlebot" content="[^"]*"\s*\/>/, `<meta name="googlebot" content="${robots}" />`).replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`).replace(/<script type="application\/ld\+json">.*?<\/script>\s*/gs, "");
}
function withRootContent(shell: string, content: string) { return shell.replace('<div id="root"></div>', `<div id="root">${content}</div>`); }
function writeRoute(route: string, html: string) { const clean = route.replace(/^\//, ""); const dir = path.join(DIST, clean); fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, "index.html"), html, "utf8"); }
function absoluteRoute(route: string) { return route.startsWith("/") ? route : `/${route}`; }

function knowledgeContent(item: (typeof knowledge)[number]) {
  const unordered = (title: string, values?: string[]) => values?.length ? `<section><h2>${title}</h2><ul>${values.map(value => `<li>${escapeHtml(value)}</li>`).join("")}</ul></section>` : "";
  const ordered = item.steps?.length ? `<section><h2>What to do</h2><ol>${item.steps.map(value => `<li>${escapeHtml(value)}</li>`).join("")}</ol></section>` : "";
  const warnings = item.warnings?.length ? `<section class="warning-section"><h2>Safety &amp; warnings</h2>${item.warnings.map(value => `<p>${escapeHtml(value)}</p>`).join("")}</section>` : "";
  const sources = item.sources.length ? `<section><h2>Sources</h2><ul>${item.sources.map(source => `<li><a href="${escapeHtml(source.url)}" rel="nofollow">${escapeHtml(source.label)}</a></li>`).join("")}</ul></section>` : "";
  const related = item.related.length ? `<section class="canonical-related"><span class="eyebrow">Related questions</span><div class="related-grid">${item.related.map(url => { const href = absoluteRoute(url); return `<a href="${href}"><span>${escapeHtml(href.split("/").pop()?.replaceAll("-", " ") ?? href)}</span><span aria-hidden="true">→</span></a>`; }).join("")}</div></section>` : "";
  return `<main class="page-shell"><header class="site-header"><a href="/" class="brand"><span class="brand-mark">V</span><span>Vorqena</span></a><nav class="desktop-nav"><a href="/fix">Fix</a><a href="/calculate">Calculate</a><a href="/decide">Decide</a><a href="/when">When</a><a href="/cost">Cost</a></nav><a href="/search" class="header-cta"><span aria-hidden="true">⌕</span> Search</a></header><article class="content-wrap canonical-page"><a href="/${item.intent}" class="back-link">← ${escapeHtml(item.intent)}</a><span class="eyebrow">Vorqena answer</span><h1>${escapeHtml(item.title)}</h1><p class="canonical-intro">${escapeHtml(item.seo.description)}</p><section class="knowledge-answer canonical-answer"><span class="answer-label">Direct answer</span><h2>${escapeHtml(item.answer)}</h2></section>${unordered("Common causes", item.causes)}${unordered("What affects the answer", item.factors)}${ordered}${warnings}${unordered("When to get help", item.whenToGetHelp)}${unordered("Cost considerations", item.cost)}${sources}${related}</article><footer class="site-footer"><span>Vorqena — Everyday answers, tools &amp; decisions.</span><span><a href="/about">About</a> · <a href="/sources">Sources</a> · <a href="/editorial-policy">Editorial policy</a> · <a href="/contact">Contact</a></span><span>© 2026</span></footer></main>`;
}

function homepageContent() {
  const intentCards = homeIntents.map(([slug, title, description]) => `<a href="/${slug}" class="dark-intent-card"><div class="intent-icon"><span aria-hidden="true">${title.slice(0, 1)}</span></div><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p><span class="round-arrow" aria-hidden="true">→</span></a>`).join("");
  const exampleLinks = homeExamples.map(([label, query]) => `<a href="/search?q=${encodeURIComponent(query)}">${escapeHtml(label)}</a>`).join("");
  const popularLinks = homePopular.map(([query]) => `<a href="/search?q=${encodeURIComponent(query)}"><span>${escapeHtml(query)}</span><span class="popular-arrow" aria-hidden="true">→</span></a>`).join("");
  return `<main class="app-shell"><aside class="sidebar"><a href="/" class="side-brand"><span>V</span><span>Vorqena</span></a><nav class="side-nav"><a href="/" class="side-link active">Home</a><a href="/fix" class="side-link">Fix</a><a href="/calculate" class="side-link">Calculate</a><a href="/decide" class="side-link">Decide</a><a href="/when" class="side-link">When</a><a href="/cost" class="side-link">Cost</a></nav><div class="side-note"><strong>Save time.<br/>Get answers.<br/>Get things done.</strong><span>Vorqena turns questions into answers and action.</span></div></aside><section class="main-stage"><header class="topbar"><div class="mobile-brand">Vorqena</div><a class="examples-btn" href="#popular">Examples</a></header><section class="hero-dark"><span class="hero-mark" aria-hidden="true">V</span><h1>What can we <span>help you</span> with?</h1><p>Describe a problem, ask a question, or calculate something.</p><form class="ask-box" action="/search" method="get"><span aria-hidden="true">⌕</span><input name="q" placeholder="Ask anything..." aria-label="Ask anything"/><button type="submit" aria-label="Search">→</button></form><div class="query-chips">${exampleLinks}</div></section><section class="intent-cards">${intentCards}</section><section class="popular-box" id="popular"><div class="popular-head"><h2>Popular right now</h2><a href="/search">View all →</a></div><div class="popular-grid">${popularLinks}</div></section><section class="trust-row"><div><span><strong>Trusted &amp; Reliable</strong><small>Answers backed by sources you can trust.</small></span></div><div><span><strong>Smart Understanding</strong><small>Vorqena understands your question, not just keywords.</small></span></div><div><span><strong>Fast &amp; Accurate</strong><small>Get the right answer and next steps, instantly.</small></span></div><div><span><strong>Private &amp; Secure</strong><small>Your questions are private. We respect your data.</small></span></div></section></section></main>`;
}

function hubContent(intent: Intent) {
  const items = knowledge.filter(item => item.intent === intent && item.seo.indexable);
  const itemLinks = items.map(item => `<li><a href="${absoluteRoute(item.slug)}"><strong>${escapeHtml(item.title)}</strong> — ${escapeHtml(item.seo.description)}</a></li>`).join("");
  return `<main class="page-shell"><section class="content-wrap"><span class="eyebrow">${intent}</span><h1>${escapeHtml(intentMeta[intent].heading)}</h1><p>${escapeHtml(intentMeta[intent].description)}</p><section><h2>Useful answers</h2><ul>${itemLinks || "<li>More guides are being added.</li>"}</ul></section></section></main>`;
}
function toolContent(tool: (typeof tools)[number]) {
  const duplicate = duplicateToolToKnowledge[tool.slug];
  const canonicalNote = duplicate ? `<p>This utility is paired with a deeper canonical guide at <a href="${duplicate}">${duplicate}</a>.</p>` : "";
  return `<main class="page-shell"><section class="content-wrap"><span class="eyebrow">${tool.intent} tool</span><h1>${escapeHtml(tool.title)}</h1><p>${escapeHtml(tool.description)}</p>${canonicalNote}<p>Use the interactive Vorqena tool below to get a focused result, then review the assumptions before acting.</p></section></main>`;
}

if (!fs.existsSync(SHELL_PATH)) throw new Error(`Missing Vite output: ${SHELL_PATH}`);
const shell = fs.readFileSync(SHELL_PATH, "utf8");
const homepageJsonLd = [
  { "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE}/#website`, name: "Vorqena", url: `${SITE}/`, description: "Everyday answers, tools, and decisions.", publisher: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Vorqena", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/favicon.svg` } } },
  { "@context": "https://schema.org", "@type": "WebApplication", "@id": `${SITE}/#application`, name: "Vorqena", url: `${SITE}/`, applicationCategory: "UtilitiesApplication", operatingSystem: "Web", description: "Everyday answers, calculators, decisions, dates, and cost estimates.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
];
const home = withRootContent(setMeta(shell, "Vorqena — Everyday Answers, Tools & Decisions", "Vorqena helps you fix everyday problems, calculate answers, make decisions, find dates, and estimate costs.", `${SITE}/`), homepageContent()).replace("</head>", `<script type="application/ld+json">${JSON.stringify(homepageJsonLd)}</script></head>`);
fs.writeFileSync(SHELL_PATH, home, "utf8");

const indexableRoutes = new Set<string>(["/"]);
for (const intent of Object.keys(intentMeta) as Intent[]) { const meta = intentMeta[intent]; const route = `/${intent}`; writeRoute(route, withRootContent(setMeta(shell, meta.title, meta.description, `${SITE}${route}`), hubContent(intent))); indexableRoutes.add(route); }
for (const item of knowledge) { const route = absoluteRoute(item.slug); writeRoute(route, withRootContent(setMeta(shell, item.seo.title, item.seo.description, `${SITE}${route}`), knowledgeContent(item))); if (item.seo.indexable) indexableRoutes.add(route); }
for (const tool of tools) { const route = `/tool/${tool.slug}`; const duplicate = duplicateToolToKnowledge[tool.slug]; const base = setMeta(shell, `${tool.title} | Vorqena`, tool.description, duplicate ? `${SITE}${duplicate}` : `${SITE}${route}`, "noindex,follow"); writeRoute(route, withRootContent(base, toolContent(tool))); }
writeRoute("/search", withRootContent(setMeta(shell, "Search Vorqena", "Search Vorqena for everyday answers and tools.", `${SITE}/search`, "noindex,follow"), `<main class="page-shell"><section class="content-wrap"><h1>Search Vorqena</h1><p>Find a direct answer or the right tool.</p></section></main>`));
const trustPages = [
  ["/about", "About Vorqena", "Vorqena is an everyday utility engine built to answer practical questions directly and point people to focused tools when calculation or comparison is useful."],
  ["/how-vorqena-works", "How Vorqena Works", "Vorqena starts with the user's question, matches it to verified knowledge or a focused tool, and publishes a canonical guide only when the topic has clear search intent and enough useful information."],
  ["/editorial-policy", "Editorial Policy", "Vorqena prioritizes useful, people-first answers. We aim to explain assumptions, separate facts from estimates, link to credible sources where appropriate, and avoid publishing thin pages simply to capture search traffic."],
  ["/sources", "Sources & Methodology", "Vorqena uses primary or authoritative sources when practical, especially for safety, product guidance, and changing information. Sources are reviewed for relevance before being attached to a knowledge record."],
  ["/contact", "Contact Vorqena", "For corrections, source suggestions, or site feedback, contact the Vorqena team through the contact method provided on the site."],
  ["/privacy", "Privacy", "Vorqena is designed to provide everyday utility without requiring an account for core answers and tools. This page will be updated as analytics or other data services are introduced."],
  ["/terms", "Terms of Use", "Vorqena provides general informational answers, estimates, and tools. Check important decisions against authoritative or professional guidance, especially where safety, legal, medical, financial, or electrical risks are involved."],
] as const;
for (const [route, title, description] of trustPages) { writeRoute(route, withRootContent(setMeta(shell, `${title} | Vorqena`, description, `${SITE}${route}`), `<main class="page-shell"><section class="content-wrap"><span class="eyebrow">Vorqena</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p><p><a href="/">Return to Vorqena</a></p></section></main>`)); indexableRoutes.add(route); }
const urls = [...indexableRoutes].sort((a, b) => a.localeCompare(b));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(route => `  <url><loc>${SITE}${route === "/" ? "/" : route}</loc></url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap, "utf8");
console.log(`SEO build complete: ${urls.length} indexable URLs, ${tools.length} tools, ${knowledge.length} knowledge records.`);
