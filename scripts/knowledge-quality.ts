import { knowledge } from "../client/src/data/knowledge/index";
import { qualityGate } from "../client/src/data/knowledge/quality";

const result = qualityGate(knowledge);

if (!result.ok) {
  console.error(`Knowledge quality gate failed with ${result.issues.length} issue(s):`);
  for (const issue of result.issues) console.error(`- ${issue.id}.${issue.field}: ${issue.message}`);
  process.exit(1);
}

console.log(`Knowledge quality gate passed: ${knowledge.filter(item => item.seo.indexable).length} indexable records checked.`);
