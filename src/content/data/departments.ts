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
    programSlugs: ["cystic-fibrosis-center", "asthma-center"],
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
    programSlugs: ["kidney-transplant-program"],
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
  {
    _type: "department",
    _id: "dept-allergy-immunology",
    slug: "allergy-immunology",
    name: "Allergy and Immunology",
    summary:
      "Diagnosis and treatment for food allergy, asthma, immune disorders, and other allergic conditions.",
    programSlugs: ["food-allergy-program"],
  },
  {
    _type: "department",
    _id: "dept-dermatology",
    slug: "dermatology",
    name: "Dermatology",
    summary:
      "Medical and surgical care for common, complex, and rare skin conditions in children and adolescents.",
    programSlugs: [],
  },
  {
    _type: "department",
    _id: "dept-psychiatry",
    slug: "psychiatry",
    name: "Psychiatry and Behavioral Sciences",
    summary:
      "Developmentally informed mental and behavioral health assessment, therapy, and medication care.",
    programSlugs: ["behavioral-health-program"],
  },
  {
    _type: "department",
    _id: "dept-otolaryngology",
    slug: "otolaryngology",
    name: "Otolaryngology and Communication Enhancement",
    summary:
      "Ear, nose, throat, hearing, balance, speech, and communication care for children of all ages.",
    programSlugs: [],
  },
  {
    _type: "department",
    _id: "dept-rheumatology",
    slug: "rheumatology",
    name: "Rheumatology",
    summary:
      "Multidisciplinary care for arthritis, autoinflammatory disease, and systemic autoimmune conditions.",
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
  {
    _type: "clinicalTrial",
    _id: "trial-severe-asthma-biologic",
    slug: "severe-asthma-biologic-study",
    title: "Biologic therapy for severe pediatric asthma",
    status: "recruiting",
    summary:
      "Comparing biomarker-guided biologic treatment with standard escalation for children whose asthma remains uncontrolled.",
    conditionSlugs: ["pediatric-asthma"],
    programSlugs: ["asthma-center"],
    phase: "Phase 3",
    principalInvestigator: "Emily Zhang, MD",
    enrollmentTarget: 108,
  },
  {
    _type: "clinicalTrial",
    _id: "trial-nephrotic-precision",
    slug: "nephrotic-syndrome-precision-study",
    title: "Precision treatment study for childhood nephrotic syndrome",
    status: "recruiting",
    summary:
      "Using clinical and molecular markers to match children with frequently relapsing nephrotic syndrome to steroid-sparing therapies.",
    conditionSlugs: ["nephrotic-syndrome"],
    programSlugs: ["kidney-transplant-program"],
    phase: "Phase 2",
    principalInvestigator: "Samuel Adeyemi, MD",
    enrollmentTarget: 84,
  },
  {
    _type: "clinicalTrial",
    _id: "trial-peanut-oit",
    slug: "peanut-oral-immunotherapy-trial",
    title: "Early peanut oral immunotherapy trial",
    status: "recruiting",
    summary:
      "Studying the safety and effectiveness of a lower-dose oral immunotherapy protocol for young children with peanut allergy.",
    conditionSlugs: ["food-allergy"],
    programSlugs: ["food-allergy-program"],
    phase: "Phase 3",
    principalInvestigator: "Mateo Alvarez, MD",
    enrollmentTarget: 140,
  },
  {
    _type: "clinicalTrial",
    _id: "trial-digital-cbt-anxiety",
    slug: "digital-cbt-pediatric-anxiety-study",
    title: "Blended digital CBT for pediatric anxiety",
    status: "active",
    summary:
      "Evaluating therapist-supported digital cognitive behavioral therapy for school-age children with anxiety disorders.",
    conditionSlugs: ["pediatric-anxiety"],
    programSlugs: ["behavioral-health-program"],
    phase: "Randomized controlled trial",
    principalInvestigator: "Rachel Levine, MD",
    enrollmentTarget: 180,
  },
  {
    _type: "clinicalTrial",
    _id: "trial-jia-tapering",
    slug: "jia-biologic-tapering-study",
    title: "Biologic tapering in juvenile idiopathic arthritis",
    status: "active",
    summary:
      "Following clinical and imaging markers to identify when children in sustained arthritis remission can safely reduce biologic therapy.",
    conditionSlugs: ["juvenile-idiopathic-arthritis"],
    programSlugs: [],
    phase: "Prospective cohort",
    principalInvestigator: "Fatima Rahman, MD",
    enrollmentTarget: 200,
  },
  {
    _type: "clinicalTrial",
    _id: "trial-sickle-gene-therapy",
    slug: "sickle-cell-gene-therapy-trial",
    title: "Gene therapy for severe sickle cell disease",
    status: "recruiting",
    summary:
      "Evaluating a gene-modified stem cell treatment for adolescents with severe sickle cell complications.",
    conditionSlugs: ["sickle-cell-disease"],
    programSlugs: ["cancer-blood-disorders"],
    phase: "Phase 1/2",
    principalInvestigator: "Kwame Mensah, MD",
    enrollmentTarget: 36,
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
