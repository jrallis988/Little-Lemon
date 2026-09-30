import assert from "node:assert/strict";
import test from "node:test";
import { allergyToAllergy, buildChart, interpretationFromFhir, observationToLab, patientToChild, vitalsToGrowth } from "./map";

test("patient names, MRN, and high results map from FHIR", () => {
  const child = patientToChild({
    resourceType: "Patient",
    id: "pt1",
    gender: "female",
    birthDate: "2018-06-02",
    name: [{ given: ["Maya"], family: "Hale" }],
    identifier: [{ type: { coding: [{ code: "MR" }], text: "MRN" }, value: "MC-204918" }],
  });
  assert.equal(child?.name, "Maya Hale");
  assert.equal(child?.mrn, "MC-204918");
  assert.equal(interpretationFromFhir("H", "High"), "high");
  assert.equal(interpretationFromFhir("HH", undefined), "critical");

  const lab = observationToLab(
    {
      resourceType: "Observation",
      id: "eos",
      status: "final",
      category: [{ coding: [{ code: "laboratory" }], text: "Laboratory" }],
      code: { text: "Eosinophils" },
      effectiveDateTime: "2026-06-11T13:05:00Z",
      valueQuantity: { value: 0.8, unit: "10*3/uL" },
      interpretation: [{ coding: [{ code: "H" }], text: "High" }],
      referenceRange: [{ low: { value: 0 }, high: { value: 0.5 } }],
    },
    "pt1",
  );
  assert.equal(lab?.interpretation, "high");
  assert.equal(lab?.referenceRange, "0–0.5");
});

test("height and weight on the same day become one growth point", () => {
  const points = vitalsToGrowth(
    [
      {
        resourceType: "Observation",
        id: "ht",
        status: "final",
        code: { coding: [{ code: "8302-2" }], text: "Body height" },
        effectiveDateTime: "2026-06-11T13:00:00Z",
        valueQuantity: { value: 52.8, unit: "[in_i]" },
      },
      {
        resourceType: "Observation",
        id: "wt",
        status: "final",
        code: { coding: [{ code: "29463-7" }], text: "Body weight" },
        effectiveDateTime: "2026-06-11T13:00:00Z",
        valueQuantity: { value: 61.7, unit: "[lb_av]" },
      },
    ],
    "pt1",
  );
  assert.equal(points.length, 1);
  assert.ok(points[0] && points[0].heightCm && points[0].heightCm > 130 && points[0].heightCm < 140);
  assert.ok(points[0] && points[0].weightKg && points[0].weightKg > 27 && points[0].weightKg < 29);
});

test("severe allergy reactions keep their severity", () => {
  const allergy = allergyToAllergy(
    {
      resourceType: "AllergyIntolerance",
      id: "peanut",
      clinicalStatus: { coding: [{ code: "active" }] },
      code: { text: "Peanuts" },
      reaction: [{ manifestation: [{ text: "Anaphylaxis" }], severity: "severe" }],
    },
    "pt1",
  );
  assert.equal(allergy?.severity, "severe");
  assert.equal(allergy?.status, "active");
});

test("buildChart keeps an empty section when that resource list is empty", () => {
  const chart = buildChart({
    patient: { resourceType: "Patient", id: "pt1", name: [{ text: "Maya Hale" }], birthDate: "2018-06-02" },
    appointments: [],
    labs: [],
    vitals: [],
    medications: [],
    immunizations: [],
    allergies: [],
    conditions: [],
    communications: [],
    careTeams: [],
    invoices: [],
    guardianName: "Jordan Hale",
  });
  assert.equal(chart?.guardian.name, "Jordan Hale");
  assert.equal(chart?.children[0]?.visits.length, 0);
  assert.equal(chart?.children[0]?.child.preferredName, "Maya");
});
