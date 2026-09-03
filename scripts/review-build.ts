import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist/public");
const SHELL_PATH = path.join(DIST, "index.html");
const ROUTE = path.join(DIST, "review", "index.html");

if (!fs.existsSync(SHELL_PATH)) throw new Error(`Missing Vite output: ${SHELL_PATH}`);

const shell = fs.readFileSync(SHELL_PATH, "utf8");
const html = shell
  .replace(/<title>.*?<\/title>/s, "<title>Review Queue | Vorqena</title>")
  .replace(/<meta name="description" content="[^"]*"\s*\/>/, '<meta name="description" content="Local Vorqena question review queue." />')
  .replace(/<meta name="robots" content="[^"]*"\s*\/>/, '<meta name="robots" content="noindex,follow" />')
  .replace(/<meta name="googlebot" content="[^"]*"\s*\/>/, '<meta name="googlebot" content="noindex,follow" />')
  .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, '<link rel="canonical" href="https://vorqena.vercel.app/review" />')
  .replace(/<div id="root"><\/div>/, '<div id="root"><main class="page-shell"><section class="content-wrap"><span class="eyebrow">Review queue</span><h1>Question candidates</h1><p>Local review tools are loading. This page is not indexed and does not publish content automatically.</p></section></main></div>');

fs.mkdirSync(path.dirname(ROUTE), { recursive: true });
fs.writeFileSync(ROUTE, html, "utf8");
console.log("Generated /review static shell.");
