import assert from "node:assert/strict";
import test from "node:test";
import { loadFamilyChart } from "./client";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/fhir+json" },
  });
}

test("a partial FHIR server still returns the patient and records a warning", async () => {
  let authorized = false;
  const fetchImpl: typeof fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    const headers = new Headers(init?.headers);
    authorized = headers.get("Authorization") === "Bearer secret-token";
    if (url.endsWith("/Patient/pt1")) {
      return jsonResponse({
        resourceType: "Patient",
        id: "pt1",
        name: [{ given: ["Maya"], family: "Hale" }],
        birthDate: "2018-06-02",
        gender: "female",
      });
    }
    if (url.includes("/Observation") && url.includes("laboratory")) {
      return jsonResponse({
        resourceType: "Bundle",
        entry: [
          {
            resource: {
              resourceType: "Observation",
              id: "strep",
              status: "final",
              category: [{ coding: [{ code: "laboratory" }] }],
              code: { text: "Rapid strep" },
              effectiveDateTime: "2026-09-12T14:20:00Z",
              valueString: "Negative",
              interpretation: [{ coding: [{ code: "N" }] }],
            },
          },
        ],
      });
    }
    if (url.includes("/Invoice")) {
      return jsonResponse(
        { resourceType: "OperationOutcome", issue: [{ diagnostics: "Invoice is not supported" }] },
        404,
      );
    }
    return jsonResponse({ resourceType: "Bundle", entry: [] });
  };

  const loaded = await loadFamilyChart({
    iss: "https://ehr.example.org/fhir/",
    accessToken: "secret-token",
    patientId: "pt1",
    fetchImpl,
    guardianName: "Jordan Hale",
  });

  assert.equal(authorized, true);
  assert.equal(loaded.chart.children[0]?.child.name, "Maya Hale");
  assert.equal(loaded.chart.children[0]?.results[0]?.value, "Negative");
  assert.equal(loaded.chart.children[0]?.bills.length, 0);
  assert.ok(loaded.warnings.some((warning) => warning.includes("Billing")));
});
