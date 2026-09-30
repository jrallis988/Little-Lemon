import { buildChart, outcomeMessage, resourcesFrom } from "./map";
import type { FamilyChart } from "../domain/types";

export interface FhirLoadResult {
  chart: FamilyChart;
  warnings: string[];
}

const QUERIES = [
  ["appointments", "Appointments", "/Appointment"],
  ["labs", "Results", "/Observation"],
  ["vitals", "Growth measurements", "/Observation"],
  ["medications", "Medicines", "/MedicationRequest"],
  ["immunizations", "Vaccines", "/Immunization"],
  ["allergies", "Allergies", "/AllergyIntolerance"],
  ["conditions", "Conditions", "/Condition"],
  ["communications", "Messages", "/Communication"],
  ["careTeams", "Care team", "/CareTeam"],
  ["invoices", "Billing", "/Invoice"],
] as const;

type QueryKey = (typeof QUERIES)[number][0];

function searchPath(key: QueryKey, patientId: string): string {
  const patient = encodeURIComponent(patientId);
  switch (key) {
    case "appointments":
      return `/Appointment?patient=${patient}&_count=30`;
    case "labs":
      return `/Observation?patient=${patient}&category=laboratory&_count=40`;
    case "vitals":
      return `/Observation?patient=${patient}&category=vital-signs&_count=40`;
    case "medications":
      return `/MedicationRequest?patient=${patient}&_count=40`;
    case "immunizations":
      return `/Immunization?patient=${patient}&_count=40`;
    case "allergies":
      return `/AllergyIntolerance?patient=${patient}&_count=20`;
    case "conditions":
      return `/Condition?patient=${patient}&_count=20`;
    case "communications":
      return `/Communication?patient=${patient}&_count=30`;
    case "careTeams":
      return `/CareTeam?patient=${patient}&_count=10`;
    case "invoices":
      return `/Invoice?patient=${patient}&_count=10`;
  }
}

async function readJson(fetchImpl: typeof fetch, url: string, accessToken: string): Promise<{ ok: boolean; status: number; json: unknown }> {
  const response = await fetchImpl(url, {
    headers: {
      Accept: "application/fhir+json, application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  let json: unknown = null;
  try {
    json = await response.json();
  } catch {
    json = null;
  }
  return { ok: response.ok, status: response.status, json };
}

export async function loadFamilyChart(input: {
  iss: string;
  accessToken: string;
  patientId: string;
  fetchImpl?: typeof fetch;
  guardianName?: string;
}): Promise<FhirLoadResult> {
  const fetchImpl = input.fetchImpl ?? fetch;
  const base = input.iss.replace(/\/+$/, "");
  const patientId = encodeURIComponent(input.patientId);
  const patientResponse = await readJson(fetchImpl, `${base}/Patient/${patientId}`, input.accessToken);
  if (!patientResponse.ok) {
    if (patientResponse.status === 401) throw new Error("The access token was rejected. Sign in again.");
    throw new Error(outcomeMessage(patientResponse.json) ?? `The patient record could not be loaded (${patientResponse.status}).`);
  }

  const warnings: string[] = [];
  const buckets: Record<QueryKey, unknown[]> = {
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
  };

  await Promise.all(
    QUERIES.map(async ([key, label]) => {
      const response = await readJson(fetchImpl, `${base}${searchPath(key, input.patientId)}`, input.accessToken);
      if (!response.ok) {
        warnings.push(`${label} did not load (${response.status}). ${outcomeMessage(response.json) ?? ""}`.trim());
        return;
      }
      const outcome = outcomeMessage(response.json);
      if (outcome && resourcesFrom(response.json).length === 0) {
        warnings.push(`${label}: ${outcome}`);
        return;
      }
      buckets[key] = resourcesFrom(response.json);
    }),
  );

  const chart = buildChart({
    patient: patientResponse.json,
    appointments: buckets.appointments,
    labs: buckets.labs,
    vitals: buckets.vitals,
    medications: buckets.medications,
    immunizations: buckets.immunizations,
    allergies: buckets.allergies,
    conditions: buckets.conditions,
    communications: buckets.communications,
    careTeams: buckets.careTeams,
    invoices: buckets.invoices,
    guardianName: input.guardianName,
  });
  if (!chart) throw new Error("The patient record was missing a name or id.");
  return { chart, warnings };
}
