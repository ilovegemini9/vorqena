import type { KnowledgeRecord } from "../types";

export const rentOrBuy: KnowledgeRecord = {
  id: "decide/rent-or-buy",
  intent: "decide",
  title: "Rent or Buy a Home",
  slug: "/decide/rent-or-buy",
  aliases: ["rent or buy", "should I rent or buy", "rent versus buy", "buying vs renting"],
  answer: "Compare the total cost of ownership and the flexibility of renting over the time you expect to stay, rather than comparing rent only with a mortgage payment.",
  factors: ["Expected time in the home", "Rent and rent growth", "Mortgage rate and payment", "Taxes, insurance, maintenance, and fees", "Down payment opportunity cost", "Expected sale costs and property value changes", "Flexibility needs"],
  steps: ["Estimate the full monthly cost of owning, not just principal and interest.", "Estimate comparable rent and likely increases over your expected stay.", "Include upfront costs, maintenance, insurance, taxes, and eventual selling costs.", "Consider what the down payment and other cash could earn or fund elsewhere.", "Compare scenarios over the actual time horizon you expect to live there."],
  warnings: ["Home values and rent can change, and transaction costs can make short ownership periods expensive."],
  sources: [
    { label: "Consumer Financial Protection Bureau — Buying a house", url: "https://www.consumerfinance.gov/owning-a-home/" },
    { label: "HUD — Buying a home", url: "https://www.hud.gov/topics/buying_a_home" },
  ],
  related: ["calculate/percentage", "decide/repair-or-replace"],
  seo: {
    indexable: true,
    title: "Rent or Buy? A Practical Cost Comparison | Vorqena",
    description: "Compare renting and buying using time horizon, total ownership costs, flexibility, cash needs, and opportunity cost.",
  },
};
