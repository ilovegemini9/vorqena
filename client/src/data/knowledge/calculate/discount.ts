import type { KnowledgeRecord } from "../types";

export const discount: KnowledgeRecord = {
  id: "discount",
  intent: "calculate",
  title: "Discount Calculator",
  slug: "/calculate/discount",
  aliases: ["calculate a discount", "sale price", "discounted price", "how much is 20 percent off"],
  answer: "To find a discounted price, multiply the original price by 1 minus the discount rate. For example, 20% off $80 means paying $64, because $80 × 0.80 = $64.",
  factors: [
    "The original price",
    "The discount percentage",
    "Whether tax or shipping is calculated before or after the discount",
    "Whether multiple discounts can actually be combined",
  ],
  steps: [
    "Write down the original price.",
    "Convert the discount percentage to a decimal by dividing it by 100.",
    "Multiply the original price by the discount decimal to find the discount amount.",
    "Subtract the discount amount from the original price to get the sale price.",
    "Check the seller's terms to see whether taxes, shipping, or another promotion changes the final amount.",
  ],
  sources: [
    { label: "Federal Trade Commission — Shopping and consumer advice", url: "https://consumer.ftc.gov/consumer-alerts" },
    { label: "Consumer Financial Protection Bureau — Consumer tools", url: "https://www.consumerfinance.gov/consumer-tools/" },
  ],
  related: ["/calculate/percentage", "/calculate/sales-tax"],
  seo: { indexable: true, title: "Discount Calculator: Sale Price & Savings | Vorqena", description: "Calculate a discount amount and sale price, with simple steps for checking tax, shipping, and stacked promotions." }
};
