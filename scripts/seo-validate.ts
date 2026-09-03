import fs from "node:fs";
import path from "node:path";
import { knowledge } from "../client/src/data/knowledge/index";
import { qualityGate } from "../client/src/data/knowledge/quality";
import { tools } from "../client/src/data/vorqena";

const DIST = path.resolve("dist/public");
const SITE = "https://vorqena.vercel.app";

if (!fs.existsSync(DIST)) throw new Error("dist/public does not exist. Run the Vite build first.");

const errors: string[] = [];
const fail = (message: string) => errors.push(message);
const routeOf = (slug: string) => (slug.startsWith("/") ? slug : `/${slug}`);

function readRoute(route: string) {
  const clean = route.replace(/^\//, "");
  const file = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, clean, "index.html");
  if (!fs.existsSync(file)) {
    fail(`Missing generated HTML: ${route}`);
    return "";
  }
  return fs.readFileSync(file, "utf8");
}

function meta(html: string, name: string) {
  const match = html.match(new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)`, "i"));
  return match?.[1] ?? "";
}

function title(html: string) {
  return html.match(/<title>(.*?)<\/title>/i)?.[1]?.trim() ?? "";
}

function canonical(html: string) {
  const match = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)/i);
  return match?.[1] ?? "";
}

const quality = qualityGate(knowledge);
for (const issue of quality.issues) {
  fail(`Knowledge quality: ${issue.id}.${issue.field} — ${issue.message}`);
}

const titles = new Map<string, string>();
const descriptions = new Map<string, string>();
const indexableRoutes: string[] = ["/", "/fix", "/calculate", "/decide", "/when", "/cost", ...knowledge.filter(k => k.seo.indexable).map(k => routeOf(k.slug))];

for (const route of indexableRoutes) {
  const html = readRoute(route);
  if (!html) continue;
  const t = title(html);
  const d = meta(html, "description");
  const c = canonical(html);
  if (!t) fail(`${route}: missing title`);
  if (!d) fail(`${route}: missing meta description`);
  if (!c) fail(`${route}: missing canonical`);
  else if (c !== `${SITE}${route}`) fail(`${route}: canonical is ${c}, expected ${SITE}${route}`);
  if (!html.includes("<main")) fail(`${route}: missing semantic main content`);
  if (t) titles.set(route, t);
  if (d) descriptions.set(route, d);
}

function duplicates(map: Map<string, string>, label: string) {
  const groups = new Map<string, string[]>();
  for (const [route, value] of map) {
    const list = groups.get(value) ?? [];
    list.push(route);
    groups.set(value, list);
  }
  for (const [value, routes] of groups) {
    if (routes.length > 1) fail(`Duplicate ${label}: ${routes.join(", ")} => ${value}`);
  }
}

duplicates(titles, "title");
duplicates(descriptions, "description");

const duplicateToolToKnowledge: Record<string, string> = {
  "percentage-calculator": "/calculate/percentage",
  "fuel-cost": "/cost/fuel-cost",
  "phone-not-charging": "/fix/phone-not-charging",
  "dryer-not-heating": "/fix/dryer-not-heating",
  "repair-or-replace": "/decide/repair-or-replace",
};

for (const tool of tools) {
  const route = routeOf(`/tool/${tool.slug}`);
  const html = readRoute(route);
  if (!html) continue;
  const duplicate = duplicateToolToKnowledge[tool.slug];
  const robots = meta(html, "robots");
  if (duplicate && !robots.startsWith("noindex")) fail(`${route}: duplicate tool must be noindex`);
  if (duplicate && canonical(html) !== `${SITE}${duplicate}`) fail(`${route}: duplicate tool canonical is ${canonical(html)}, expected ${SITE}${duplicate}`);
}

const sitemapPath = path.join(DIST, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) fail("Missing sitemap.xml");
else {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  for (const route of indexableRoutes) {
    if (!sitemap.includes(`<loc>${SITE}${route}</loc>`)) fail(`Sitemap missing ${route}`);
  }
  if (sitemap.includes(`${SITE}/search`)) fail("Sitemap must not contain /search");
}

for (const item of knowledge.filter(k => k.seo.indexable)) {
  for (const related of item.related) {
    const href = routeOf(related);
    const target = path.join(DIST, href.replace(/^\//, ""), "index.html");
    if (!fs.existsSync(target)) fail(`${item.slug}: broken related route ${href}`);
  }
}

if (errors.length) {
  console.error(`\nSEO validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SEO validation passed: ${indexableRoutes.length} indexable routes checked, ${tools.length} tool routes checked, knowledge quality gate passed.`);