import assert from "node:assert/strict";
import test from "node:test";
import { DEMO_FAMILY } from "./demo";
import { selectBills, selectUnreadCount } from "./selectors";
import { buildTodos } from "./todos";
import { initialState, reduceChart } from "../state/reducer";

const now = new Date("2026-09-30T15:00:00Z");

test("Maya's home list includes eCheck-In, the balance, flu vaccine, and the unread note", () => {
  const state = reduceChart(initialState, { type: "sign_in_demo" });
  const patient = DEMO_FAMILY.children[0];
  assert.ok(patient);
  const todos = buildTodos({
    patient,
    completedCheckins: {},
    bills: selectBills(state, patient),
    unreadCount: selectUnreadCount(state, patient.child.id),
    now,
  });
  assert.deepEqual(
    todos.map((todo) => todo.id),
    ["checkin-maya-well", "balance", "vaccines", "messages"],
  );
});

test("Leo's well visit is outside the eCheck-In window and hepatitis A is overdue", () => {
  const state = reduceChart(initialState, { type: "sign_in_demo" });
  const patient = DEMO_FAMILY.children[1];
  assert.ok(patient);
  const todos = buildTodos({
    patient,
    completedCheckins: {},
    bills: selectBills(state, patient),
    unreadCount: selectUnreadCount(state, patient.child.id),
    now,
  });
  assert.equal(todos.some((todo) => todo.id.startsWith("checkin-")), false);
  assert.equal(todos.find((todo) => todo.id === "vaccines")?.tone, "attention");
});
