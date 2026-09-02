export type Intent = "fix" | "calculate" | "decide" | "when" | "cost";

export type Source = {
  label: string;
  url: string;
};

export type KnowledgeRecord = {
  id: string;
  intent: Intent;
  title: string;
  slug: string;
  aliases: string[];
  answer: string;
  causes?: string[];
  steps?: string[];
  warnings?: string[];
  factors?: string[];
  whenToGetHelp?: string[];
  cost?: string[];
  sources: Source[];
  related: string[];
  seo: {
    indexable: boolean;
    title: string;
    description: string;
  };
};
