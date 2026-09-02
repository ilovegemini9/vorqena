import type { KnowledgeRecord } from "../types";

export const unitPrice: KnowledgeRecord = {
  id: "calculate/unit-price",
  intent: "calculate",
  title: "Unit Price",
  slug: "/calculate/unit-price",
  aliases: ["unit price calculator", "price per unit", "cost per item", "compare unit prices"],
  answer: "Unit price lets you compare products of different package sizes by dividing the total price by the quantity, weight, volume, or other consistent unit.",
  factors: ["Total price", "Package quantity", "Consistent measurement units", "Promotions or coupons"],
  steps: ["Choose the same unit for every product, such as price per ounce, kilogram, liter, or item.", "Divide each product's price by its quantity in that unit.", "Compare the resulting unit prices rather than the package prices.", "Account for coupons, membership pricing, shipping, and taxes when they materially change the real cost."],
  warnings: ["A lower unit price is not automatically better if the products differ materially in quality, usable quantity, or shelf life."],
  sources: [
    { label: "U.S. FTC — Shopping and consumer information", url: "https://consumer.ftc.gov/" },
  ],
  related: ["calculate/percentage", "decide/repair-or-replace"],
  seo: {
    indexable: true,
    title: "How to Calculate Unit Price: Compare Products Easily | Vorqena",
    description: "Use unit price to compare different package sizes and find the real cost per item, weight, volume, or other unit.",
  },
};
