import type { KnowledgeRecord } from "../types";

export const salesTax: KnowledgeRecord = {
  id: "calculate/sales-tax",
  intent: "calculate",
  title: "Sales Tax",
  slug: "/calculate/sales-tax",
  aliases: ["sales tax calculator", "calculate sales tax", "tax on purchase", "add sales tax"],
  answer: "For a taxable price, multiply the price by the tax rate as a decimal to get the tax amount, then add the tax to the original price.",
  factors: ["Tax rate", "Pre-tax price", "Whether the item is taxable", "Any exemptions or local rules"],
  steps: ["Convert the tax rate from a percentage to a decimal by dividing it by 100.", "Multiply the pre-tax price by that decimal to get the tax amount.", "Add the tax amount to the pre-tax price for the total.", "Round the final monetary amount according to the applicable payment or tax rules."],
  warnings: ["Actual tax can depend on jurisdiction, product category, exemptions, and where a sale occurs."],
  sources: [
    { label: "IRS — Sales tax and use tax overview", url: "https://www.irs.gov/businesses/small-businesses-self-employed/sales-and-use-tax" },
  ],
  related: ["calculate/percentage", "cost/electricity-cost"],
  seo: {
    indexable: true,
    title: "How to Calculate Sales Tax: Formula & Example | Vorqena",
    description: "Learn the simple sales tax formula, how to convert a tax rate to a decimal, and what can change the final amount.",
  },
};
