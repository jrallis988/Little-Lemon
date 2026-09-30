import assert from "node:assert/strict";
import test from "node:test";
import { ageLabel, echeckinState, formatMoney, formatWhen, greeting, ordinal } from "./format";
import type { Visit } from "./types";

const visit: Visit = {
  id: "v1",
  patientId: "maya",
  status: "booked",
  kind: "well-visit",
  title: "Annual well visit",
  reason: "Checkup",
  start: "2026-10-02T13:20:00Z",
  end: "2026-10-02T13:50:00Z",
  provider: "Amira Shah, MD",
  specialty: "Pediatrics",
  location: "Harbor Pediatrics",
  address: "18 Brookline Place, Boston, MA",
  instructions: [],
};

test("age label counts full years and months in UTC", () => {
  const now = new Date("2026-09-30T15:00:00Z");
  assert.equal(ageLabel("2018-06-02", now), "8 years, 3 months");
  assert.equal(ageLabel("2024-03-18", now), "2 years, 6 months");
  assert.equal(ageLabel("2018-06-02", new Date("2026-06-01T00:00:00Z")), "7 years, 11 months");
  assert.equal(ageLabel("2018-06-02", new Date("2026-06-02T00:00:00Z")), "8 years");
});

test("greeting follows Boston local time", () => {
  assert.equal(greeting(new Date("2026-09-30T15:00:00Z")), "Good morning");
  assert.equal(greeting(new Date("2026-09-30T18:00:00Z")), "Good afternoon");
  assert.equal(greeting(new Date("2026-09-30T23:30:00Z")), "Good evening");
});

test("visit time renders in America/New_York", () => {
  assert.equal(formatWhen("2026-10-02T13:20:00Z"), "Fri, Oct 2 · 9:20 AM");
});

test("money and ordinals", () => {
  assert.equal(formatMoney(3000), "$30.00");
  assert.equal(formatMoney(0), "$0.00");
  assert.equal(ordinal(62), "62nd");
  assert.equal(ordinal(11), "11th");
  assert.equal(ordinal(3), "3rd");
});

test("eCheck-In opens inside the seven day window", () => {
  const now = new Date("2026-09-30T15:00:00Z");
  assert.equal(echeckinState(visit, undefined, now), "open");
  assert.equal(
    echeckinState({ ...visit, start: "2026-10-20T14:00:00Z" }, undefined, now),
    "closed",
  );
  assert.equal(
    echeckinState(visit, { visitId: visit.id, fever: "no", pharmacy: "Harbor", completedAt: now.toISOString() }, now),
    "done",
  );
  assert.equal(echeckinState({ ...visit, status: "fulfilled" }, undefined, now), "unavailable");
});
