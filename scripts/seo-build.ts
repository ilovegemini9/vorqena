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
  const list = (title: string, values?: string[]) => values?.length ? `<section><h2>${title}</h2><ul>${values.map(value => `<li>${escapeHtml(value)}</li>`).join("")}</ul></section>` : "";
  const sources = item.sources.length ? `<section><h2>Sources</h2><ul>${item.sources.map(source => `<li><a href="${escapeHtml(source.url)}" rel="nofollow">${escapeHtml(source.label)}</a></li>`).join("")}</ul></section>` : "";
  const related = item.related.length ? `<section><h2>Related</h2><ul>${item.related.map(url => { const href = absoluteRoute(url); return `<li><a href="${href}">${escapeHtml(href.split("/").pop()?.replaceAll("-", " ") ?? href)}</a></li>`; }).join("")}</ul></section>` : "";
  return `<main class="page-shell"><section class="content-wrap"><span class="eyebrow">${item.intent}</span><h1>${escapeHtml(item.title)}</h1><p class="knowledge-answer">${escapeHtml(item.answer)}</p>${list("Common causes", item.causes)}${list("What to check or do", item.steps)}${list("Important warnings", item.warnings)}${list("When to get help", item.whenToGetHelp)}${list("Cost considerations", item.cost)}${list("What matters", item.factors)}${sources}${related}</section></main>`;
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
const home = withRootContent(setMeta(shell, "Vorqena — Everyday Answers, Tools & Decisions", "Vorqena helps you fix everyday problems, calculate answers, make decisions, find dates, and estimate costs.", `${SITE}/`), `<main><h1>Everyday answers, tools &amp; decisions</h1><p>Vorqena turns practical questions into direct answers, focused tools, and useful next steps.</p></main>`).replace("</head>", `<script type="application/ld+json">${JSON.stringify(homepageJsonLd)}</script></head>`);
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
