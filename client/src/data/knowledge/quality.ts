import type { Intent, KnowledgeRecord } from "./types";

export type QualityIssue = {
  id: string;
  field: string;
  message: string;
};

const MIN_ANSWER_WORDS = 20;
const MIN_ALIASES = 2;
const MIN_RELATED = 1;
const MIN_SOURCE_COUNT = 1;
const SEO_TITLE_MIN = 25;
const SEO_TITLE_MAX = 70;
const SEO_DESCRIPTION_MIN = 80;
const SEO_DESCRIPTION_MAX = 180;

const requirements: Record<Intent, Partial<Record<"causes" | "steps" | "warnings" | "factors", number>>> = {
  fix: { causes: 2, steps: 3, warnings: 1 },
  calculate: { factors: 2, steps: 3 },
  decide: { factors: 3, steps: 2 },
  when: { factors: 2, steps: 3 },
  cost: { factors: 2, steps: 3 },
};

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function hasHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function nonEmpty(values: string[] | undefined) {
  return (values ?? []).filter(value => value.trim().length > 0);
}

export function qualityIssues(item: KnowledgeRecord): QualityIssue[] {
  const issues: QualityIssue[] = [];
  const add = (field: string, message: string) => issues.push({ id: item.id, field, message });

  if (!item.id.trim()) add("id", "must not be empty");
  if (!item.title.trim()) add("title", "must not be empty");
  if (!item.slug.startsWith(`/${item.intent}/`)) add("slug", `must start with /${item.intent}/`);
  if (item.slug.endsWith("/") || /\s/.test(item.slug)) add("slug", "must not end with / or contain whitespace");

  if (wordCount(item.answer) < MIN_ANSWER_WORDS) add("answer", `needs at least ${MIN_ANSWER_WORDS} words`);
  if (nonEmpty(item.aliases).length < MIN_ALIASES) add("aliases", `needs at least ${MIN_ALIASES} useful aliases`);
  if (nonEmpty(item.related).length < MIN_RELATED) add("related", "needs at least one related knowledge route");

  if (item.sources.length < MIN_SOURCE_COUNT) add("sources", "needs at least one source");
  const seenSources = new Set<string>();
  for (const source of item.sources) {
    if (!source.label.trim()) add("sources", "every source needs a label");
    if (!hasHttpUrl(source.url)) add("sources", `invalid source URL: ${source.url}`);
    const normalizedUrl = source.url.trim().toLowerCase();
    if (seenSources.has(normalizedUrl)) add("sources", `duplicate source URL: ${source.url}`);
    seenSources.add(normalizedUrl);
  }

  for (const [field, minimum] of Object.entries(requirements[item.intent])) {
    const values = nonEmpty(item[field as keyof KnowledgeRecord] as string[] | undefined);
    if (values.length < (minimum ?? 0)) add(field, `needs at least ${minimum} useful entries for ${item.intent} content`);
  }

  if (!item.seo.title.trim()) add("seo.title", "must not be empty");
  else if (item.seo.title.length < SEO_TITLE_MIN || item.seo.title.length > SEO_TITLE_MAX) {
    add("seo.title", `should be ${SEO_TITLE_MIN}-${SEO_TITLE_MAX} characters`);
  }
  if (!item.seo.description.trim()) add("seo.description", "must not be empty");
  else if (item.seo.description.length < SEO_DESCRIPTION_MIN || item.seo.description.length > SEO_DESCRIPTION_MAX) {
    add("seo.description", `should be ${SEO_DESCRIPTION_MIN}-${SEO_DESCRIPTION_MAX} characters`);
  }

  return issues;
}

export function qualityGate(records: KnowledgeRecord[]) {
  const indexable = records.filter(item => item.seo.indexable);
  const issues = indexable.flatMap(qualityIssues);
  const duplicateGroups = new Map<string, string[]>();
  const addDuplicateGroup = (kind: string, value: string, id: string) => {
    const key = `${kind}:${value}`;
    const group = duplicateGroups.get(key) ?? [];
    group.push(id);
    duplicateGroups.set(key, group);
  };

  for (const item of indexable) {
    addDuplicateGroup("id", item.id.toLowerCase(), item.id);
    addDuplicateGroup("slug", item.slug.toLowerCase(), item.id);
    addDuplicateGroup("title", item.title.toLowerCase(), item.id);
    addDuplicateGroup("seo-title", item.seo.title.toLowerCase(), item.id);
    addDuplicateGroup("seo-description", item.seo.description.toLowerCase(), item.id);
    for (const alias of item.aliases) addDuplicateGroup("alias", alias.trim().toLowerCase(), item.id);
  }

  for (const [key, ids] of duplicateGroups) {
    if (ids.length > 1) {
      const [kind, value] = key.split(":");
      issues.push({ id: ids[0], field: kind, message: `duplicate ${kind} "${value}" across ${ids.join(", ")}` });
    }
  }

  const indexableSlugs = new Set(indexable.map(item => item.slug.replace(/^\//, "").toLowerCase()));
  for (const item of indexable) {
    for (const related of item.related) {
      const normalized = related.replace(/^\//, "").toLowerCase();
      if (!indexableSlugs.has(normalized)) {
        issues.push({ id: item.id, field: "related", message: `related route is not an indexable knowledge route: ${related}` });
      }
      if (normalized === item.slug.replace(/^\//, "").toLowerCase()) {
        issues.push({ id: item.id, field: "related", message: "must not relate to itself" });
      }
    }
  }

  return { ok: issues.length === 0, issues };
}
