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
  {
    _type: "department",
    _id: "dept-orthopedics",
    slug: "orthopedics",
    name: "Orthopedic Center",
    summary:
      "Bone, joint, spine, rehabilitation, and sports medicine care designed for growing children.",
    programSlugs: ["orthopedic-center"],
  },
  {
    _type: "department",
    _id: "dept-pulmonology",
    slug: "pulmonology",
    name: "Pulmonary Medicine",
    summary:
      "Comprehensive respiratory care for cystic fibrosis, asthma, sleep, and complex lung disease.",
    programSlugs: ["cystic-fibrosis-center"],
  },
  {
    _type: "department",
    _id: "dept-gastroenterology",
    slug: "gastroenterology",
    name: "Gastroenterology, Hepatology and Nutrition",
    summary:
      "Digestive, liver, and nutrition care from diagnosis through long-term disease management.",
    programSlugs: ["inflammatory-bowel-disease-center"],
  },
  {
    _type: "department",
    _id: "dept-endocrinology",
    slug: "endocrinology",
    name: "Endocrinology",
    summary:
      "Hormone, growth, bone health, and diabetes care for infants through young adults.",
    programSlugs: ["diabetes-program"],
  },
  {
    _type: "department",
    _id: "dept-nephrology",
    slug: "nephrology",
    name: "Nephrology",
    summary:
      "Kidney disease, hypertension, dialysis, and transplant care for children of all ages.",
    programSlugs: [],
  },
  {
    _type: "department",
    _id: "dept-surgery",
    slug: "surgery",
    name: "Surgery",
    summary:
      "Pediatric surgical care spanning common procedures and complex congenital conditions.",
    programSlugs: [],
  },
  {
    _type: "department",
    _id: "dept-adolescent-medicine",
    slug: "adolescent-medicine",
    name: "Adolescent and Young Adult Medicine",
    summary:
      "Developmentally informed medical, nutrition, reproductive, and behavioral health care.",
    programSlugs: [],
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
    principalInvestigator: "Sarah Chen, MD",
    enrollmentTarget: 450,
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
    principalInvestigator: "Sarah Chen, MD",
    enrollmentTarget: 72,
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
    principalInvestigator: "Elena Torres, MD",
    enrollmentTarget: 300,
  },
  {
    _type: "clinicalTrial",
    _id: "trial-precision-leukemia",
    slug: "precision-leukemia-therapy-phase-2",
    title: "Precision therapy for relapsed childhood leukemia",
    status: "recruiting",
    summary:
      "Testing molecularly matched therapies for children and adolescents with relapsed or treatment-resistant leukemia.",
    conditionSlugs: ["childhood-leukemia"],
    programSlugs: ["cancer-blood-disorders"],
    phase: "Phase 2",
    principalInvestigator: "David Okonkwo, MD",
    enrollmentTarget: 96,
  },
  {
    _type: "clinicalTrial",
    _id: "trial-cftr-young-children",
    slug: "cftr-modulator-young-children",
    title: "CFTR modulator study in young children",
    status: "recruiting",
    summary:
      "Evaluating safety, dosing, and early lung outcomes of CFTR modulator treatment in children ages 2 to 5.",
    conditionSlugs: ["cystic-fibrosis"],
    programSlugs: ["cystic-fibrosis-center"],
    phase: "Phase 3",
    principalInvestigator: "Sofia Garcia, MD",
    enrollmentTarget: 64,
  },
  {
    _type: "clinicalTrial",
    _id: "trial-ibd-microbiome",
    slug: "pediatric-ibd-microbiome-study",
    title: "Pediatric IBD microbiome and nutrition study",
    status: "active",
    summary:
      "Following diet, microbiome, and inflammation patterns to identify predictors of durable remission in pediatric IBD.",
    conditionSlugs: ["inflammatory-bowel-disease"],
    programSlugs: ["inflammatory-bowel-disease-center"],
    phase: "Observational",
    principalInvestigator: "Daniel Brooks, MD",
    enrollmentTarget: 220,
  },
  {
    _type: "clinicalTrial",
    _id: "trial-automated-insulin",
    slug: "automated-insulin-delivery-study",
    title: "Next-generation automated insulin delivery study",
    status: "recruiting",
    summary:
      "Comparing an adaptive insulin delivery algorithm with standard hybrid closed-loop therapy in school-age children.",
    conditionSlugs: ["type-1-diabetes"],
    programSlugs: ["diabetes-program"],
    phase: "Phase 3",
    principalInvestigator: "Aisha Johnson, MD",
    enrollmentTarget: 120,
  },
  {
    _type: "clinicalTrial",
    _id: "trial-arrhythmia-ablation",
    slug: "pediatric-arrhythmia-ablation-study",
    title: "Low-radiation pediatric arrhythmia ablation study",
    status: "recruiting",
    summary:
      "Studying long-term outcomes of advanced mapping techniques that reduce or eliminate radiation during catheter ablation.",
    conditionSlugs: ["pediatric-arrhythmia"],
    programSlugs: ["heart-center"],
    phase: "Prospective cohort",
    principalInvestigator: "Omar Ahmed, MD",
    enrollmentTarget: 150,
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
