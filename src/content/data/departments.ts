import type { DepartmentDoc, ClinicalTrialDoc, InsuranceCarrier } from "@/content/types";

export const departments: DepartmentDoc[] = [
  {
    _type: "department",
    _id: "dept-neurology",
    slug: "neurology",
    name: "Neurology",
    summary:
      "Brain, spine, and nervous system care — including epilepsy, headache, and movement disorders.",
    programSlugs: ["epilepsy-program"],
  },
  {
    _type: "department",
    _id: "dept-cardiology",
    slug: "cardiology",
    name: "Cardiology & Heart Center",
    summary:
      "Congenital and acquired heart disease from fetal diagnosis through adulthood.",
    programSlugs: ["heart-center"],
  },
  {
    _type: "department",
    _id: "dept-oncology",
    slug: "oncology",
    name: "Cancer and Blood Disorders",
    summary:
      "Pediatric oncology, hematology, and bone marrow transplant in partnership with Dana-Farber.",
    programSlugs: ["cancer-blood-disorders"],
  },
  {
    _type: "department",
    _id: "dept-genetics",
    slug: "genetics",
    name: "Genetics and Genomics",
    summary:
      "Diagnosis and care for rare genetic and undiagnosed conditions.",
    programSlugs: ["undiagnosed-disease-program"],
  },
];

export const clinicalTrials: ClinicalTrialDoc[] = [
  {
    _type: "clinicalTrial",
    _id: "trial-epilepsy-genetics",
    slug: "pediatric-epilepsy-genetics-registry",
    title: "Pediatric epilepsy genetics registry",
    status: "recruiting",
    summary:
      "Registry studying genetic causes of childhood epilepsy to improve diagnosis and treatment selection.",
    conditionSlugs: ["epilepsy-in-children"],
    programSlugs: ["epilepsy-program"],
    phase: "Observational",
  },
  {
    _type: "clinicalTrial",
    _id: "trial-asm-phase2",
    slug: "novel-anti-seizure-medication-phase-2",
    title: "Novel anti-seizure medication (Phase 2)",
    status: "recruiting",
    summary:
      "Evaluating a new anti-seizure medication for children with drug-resistant epilepsy.",
    conditionSlugs: ["epilepsy-in-children"],
    programSlugs: ["epilepsy-program"],
    phase: "Phase 2",
  },
  {
    _type: "clinicalTrial",
    _id: "trial-heart-device",
    slug: "congenital-heart-device-registry",
    title: "Congenital heart device outcomes registry",
    status: "active",
    summary:
      "Long-term outcomes for children receiving advanced cardiac devices and staged repairs.",
    conditionSlugs: ["congenital-heart-disease"],
    programSlugs: ["heart-center"],
    phase: "Observational",
  },
];

export const insuranceCarriers: InsuranceCarrier[] = [
  { id: "bcbs-ma", name: "Blue Cross Blue Shield of Massachusetts" },
  { id: "harvard-pilgrim", name: "Harvard Pilgrim Health Care" },
  { id: "tufts", name: "Tufts Health Plan" },
  { id: "aetna", name: "Aetna" },
  { id: "united", name: "UnitedHealthcare" },
  { id: "masshealth", name: "MassHealth" },
  { id: "other", name: "Other / not listed" },
  { id: "self-pay", name: "Self-pay / no insurance" },
];

export function getDepartment(slug: string) {
  return departments.find((d) => d.slug === slug);
}

export function getTrial(slug: string) {
  return clinicalTrials.find((t) => t.slug === slug);
}
