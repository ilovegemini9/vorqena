import { routeQuestion } from "../client/src/data/router";

const cases = [
  ["phone charging slowly", "fix/phone-not-charging", "knowledge"],
  ["why won't my phone charge", "fix/phone-not-charging", "knowledge"],
  ["my iphone won't charge", "fix/phone-not-charging", "knowledge"],
  ["wifi not working", "fix/wifi-not-working", "knowledge"],
  ["dryer is not heating", "fix/dryer-not-heating", "knowledge"],
  ["how much does a road trip cost", "cost/car-trip-cost", "knowledge"],
  ["what is 20 percent of 80", "calculate/percentage", "knowledge"],
  ["when should I change my car oil", "when/change-car-oil", "knowledge"],
  ["should I repair or replace it", "decide/repair-or-replace", "knowledge"],
] as const;

const unknownCases = ["", "search", "calculator", "what should I do today"];

let failures = 0;

for (const [query, slug, kind] of cases) {
  const route = routeQuestion(query);
  const actualSlug = route.knowledge?.slug.replace(/^\//, "");
  if (route.kind !== kind || actualSlug !== slug) {
    failures += 1;
    console.error(`FAIL ${JSON.stringify(query)} -> ${route.kind}:${actualSlug ?? "none"}; expected ${kind}:${slug}`);
  } else {
    console.log(`PASS ${JSON.stringify(query)} -> ${route.kind}:${actualSlug}`);
  }
}

for (const query of unknownCases) {
  const route = routeQuestion(query);
  if (route.kind !== "unknown") {
    failures += 1;
    console.error(`FAIL ${JSON.stringify(query)} -> ${route.kind}; expected unknown`);
  } else {
    console.log(`PASS ${JSON.stringify(query)} -> unknown`);
  }
}

if (failures > 0) {
  console.error(`Router checks failed: ${failures} failure(s).`);
  process.exit(1);
}

console.log(`Router checks passed: ${cases.length + unknownCases.length} cases.`);
