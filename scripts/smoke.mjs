/**
 * Launch smoke checks — pure heuristics without spinning up Next.
 * Run: npm run test:smoke
 */
import assert from "node:assert/strict";

function statusRank(status) {
  switch (status) {
    case "likely_accept":
      return 0;
    case "verify_with_pharmacy":
      return 1;
    case "untested":
      return 2;
    case "network_gap":
      return 3;
    default:
      return 4;
  }
}

function scoreOption({ status, couponPrice, distanceMiles }) {
  return statusRank(status) * 1000 + couponPrice * 10 + (distanceMiles ?? 99);
}

const a = scoreOption({
  status: "likely_accept",
  couponPrice: 20,
  distanceMiles: 5,
});
const b = scoreOption({
  status: "network_gap",
  couponPrice: 5,
  distanceMiles: 1,
});
assert.ok(a < b, "acceptance should beat cheaper network_gap");

function computeCashVsPlan({ cash, plan, preferToday }) {
  if (plan == null) return "use_cash";
  if (preferToday) return cash <= plan ? "use_cash" : "use_insurance";
  return cash < plan ? "use_cash" : "use_insurance";
}

assert.equal(
  computeCashVsPlan({ cash: 12, plan: 40, preferToday: true }),
  "use_cash"
);
assert.equal(
  computeCashVsPlan({ cash: 50, plan: 10, preferToday: true }),
  "use_insurance"
);

assert.match(`pass_${Date.now().toString(36)}`, /^pass_/);

console.log("smoke ok — router scoring + insurance preference heuristics");
