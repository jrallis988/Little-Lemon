/**
 * Curated “first win” medications — subset of the active launch formulary.
 * IDs must match prisma seed drug ids and V1_PHARMACY_PICKUP_DRUG_IDS.
 */
import { V1_PHARMACY_PICKUP_DRUG_IDS } from "@/lib/launch-mode";

const HINTS: Record<string, string> = {
  atorvastatin: "Cholesterol",
  metformin: "Diabetes",
  amlodipine: "Blood pressure",
  lisinopril: "Blood pressure",
  omeprazole: "Acid reflux",
  sertraline: "Mental health",
  losartan: "Blood pressure",
  gabapentin: "Nerve pain",
  levothyroxine: "Thyroid",
  montelukast: "Asthma / allergy",
};

const LABELS: Record<string, string> = {
  atorvastatin: "Atorvastatin",
  metformin: "Metformin",
  amlodipine: "Amlodipine",
  lisinopril: "Lisinopril",
  omeprazole: "Omeprazole",
  sertraline: "Sertraline",
  losartan: "Losartan",
  gabapentin: "Gabapentin",
  levothyroxine: "Levothyroxine",
  montelukast: "Montelukast",
};

/** First six v1 meds for quick chips / defaults */
export const FIRST_WIN_DRUGS = V1_PHARMACY_PICKUP_DRUG_IDS.slice(0, 6).map(
  (id) => ({
    id,
    label: LABELS[id] ?? id,
    hint: HINTS[id] ?? "Included",
  })
);
