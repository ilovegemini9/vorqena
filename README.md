# Vorqena

Vorqena is an English-first everyday utility engine built around five user intents:

- **Fix** — troubleshoot a problem and find the next practical step.
- **Calculate** — get a fast answer from numbers.
- **Decide** — understand whether an action makes sense before doing it.
- **When** — find dates, deadlines, timing, and schedules.
- **Cost** — estimate price and compare repair vs. replacement.

The product principle is **answer first, action next**: give the useful result before unnecessary navigation, then provide tools, evidence, related questions, and the next step.

## Current foundation

- React 19 + TypeScript + Vite
- Wouter routing
- Responsive Vorqena design system
- Intent-first homepage and `/fix`, `/calculate`, `/decide`, `/when`, `/cost` hubs
- Existing calculator registry retained as the utility engine behind calculator routes
- SEO metadata, WebSite structured data, robots.txt, and an initial sitemap
- Lockfile-compatible pnpm configuration for deterministic Vercel builds

## Local development

```bash
pnpm install
pnpm dev
```

Validation:

```bash
pnpm check
pnpm build
```

## Product direction

The long-term content architecture is entity-first and source-backed, with original tools and strong internal linking. Initial priority is Problems + Calculators, followed by Costs + Can-I decisions, then dates and schedules. The site is designed for a global English audience, starting with the US and expanding to Canada and Australia.

## Deployment

The Git repository is `ilovegemini9/vorqena`. Vercel is connected to the `main` branch. The current Vercel project is still named `calculator.net`; the product/UI itself is Vorqena.
