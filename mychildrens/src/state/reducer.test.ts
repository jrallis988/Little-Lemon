import assert from "node:assert/strict";
import test from "node:test";
import { DEMO_FAMILY } from "../domain/demo";
import { selectBalanceCents, selectBills, selectMessages, selectUnreadCount } from "../domain/selectors";
import { initialState, reduceChart } from "./reducer";

test("demo sign-in opens Maya's chart and sign-out clears it", () => {
  const signedIn = reduceChart(initialState, { type: "sign_in_demo" });
  assert.equal(signedIn.session.kind, "demo");
  assert.equal(signedIn.activeChildId, "maya");
  const signedOut = reduceChart(signedIn, { type: "sign_out" });
  assert.deepEqual(signedOut, initialState);
});

test("replies, read state, and payments stay outside the sample chart", () => {
  const before = DEMO_FAMILY.children[0]?.messages.length;
  let state = reduceChart(initialState, { type: "sign_in_demo" });
  state = reduceChart(state, {
    type: "send_reply",
    patientId: "maya",
    threadId: "thread-asthma",
    subject: "School asthma form",
    body: "  We will bring the form.  ",
    now: "2026-09-30T16:00:00Z",
  });
  state = reduceChart(state, { type: "mark_thread_read", patientId: "maya", threadId: "thread-asthma" });
  state = reduceChart(state, { type: "pay_bill", billId: "bill-maya-sep" });
  state = reduceChart(state, { type: "select_child", id: "missing" });
  assert.equal(DEMO_FAMILY.children[0]?.messages.length, before);
  const messages = selectMessages(state, "maya").filter((message) => message.threadId === "thread-asthma");
  assert.equal(messages.at(-1)?.body, "We will bring the form.");
  assert.equal(messages.at(-1)?.direction, "out");
  assert.equal(selectUnreadCount(state, "maya"), 0);
  const patient = state.chart?.children[0];
  if (!patient) throw new Error("Expected Maya's chart");
  assert.equal(selectBalanceCents(selectBills(state, patient)), 0);
  assert.equal(state.activeChildId, "maya");
});

test("empty replies and unknown visits are ignored", () => {
  let state = reduceChart(initialState, { type: "sign_in_demo" });
  state = reduceChart(state, {
    type: "send_reply",
    patientId: "maya",
    threadId: "thread-asthma",
    subject: "School asthma form",
    body: "   ",
    now: "2026-09-30T16:00:00Z",
  });
  state = reduceChart(state, {
    type: "complete_checkin",
    record: { visitId: "nope", fever: "no", pharmacy: "Harbor", completedAt: "2026-09-30T16:00:00Z" },
  });
  assert.equal(state.localReplies.length, 0);
  assert.deepEqual(state.completedCheckins, {});
});

test("language stays in place when the session ends", () => {
  let state = reduceChart(initialState, { type: "set_language", language: "es" });
  state = reduceChart(state, { type: "sign_in_demo" });
  assert.equal(state.language, "es");
  assert.equal(state.profile?.name, "Jordan Hale");
  state = reduceChart(state, { type: "sign_out" });
  assert.equal(state.session.kind, "signed_out");
  assert.equal(state.language, "es");
});

test("a refill can be requested once for an active medicine", () => {
  let state = reduceChart(initialState, { type: "sign_in_demo" });
  const request = {
    id: "refill-1",
    patientId: "maya",
    medicationId: "maya-albuterol",
    medicationName: "Albuterol HFA 90 mcg inhaler",
    pharmacy: "Harbor Pharmacy, Brookline",
    createdAt: "2026-09-30T16:00:00Z",
  };
  state = reduceChart(state, { type: "request_refill", request });
  state = reduceChart(state, { type: "request_refill", request: { ...request, id: "refill-2" } });
  assert.equal(state.refills.length, 1);
});

test("the lock only engages after biometrics are enabled", () => {
  let state = reduceChart(initialState, { type: "sign_in_demo" });
  state = reduceChart(state, { type: "lock" });
  assert.equal(state.locked, false);
  state = reduceChart(state, { type: "set_biometric", enabled: true });
  state = reduceChart(state, { type: "lock" });
  assert.equal(state.locked, true);
  state = reduceChart(state, { type: "unlock" });
  assert.equal(state.locked, false);
});
