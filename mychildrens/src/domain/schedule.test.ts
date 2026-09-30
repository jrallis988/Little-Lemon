import assert from "node:assert/strict";
import test from "node:test";
import { routeSymptom } from "./schedule";

test("breathing concerns are routed as urgent instead of a routine slot", () => {
  const route = routeSymptom("breathing");
  assert.equal(route.urgent, true);
  assert.equal(route.visitTitle, "Same-day sick visit");
});

test("a well visit stays with pediatrics", () => {
  assert.equal(routeSymptom("well").urgent, false);
  assert.equal(routeSymptom("well").clinic, "Pediatrics");
});
