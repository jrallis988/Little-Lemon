import type { Drug } from "@/lib/types";

/**
 * Representative medication catalog for demo pricing & search.
 * Prices are illustrative mock data, not live pharmacy quotes.
 */
export const DRUGS: Drug[] = [
  {
    id: "atorvastatin",
    brandName: "Lipitor",
    genericName: "atorvastatin",
    therapeuticClass: "Statin (cholesterol)",
    strengths: [
      { id: "atorva-10", label: "10 mg tablet", amountMg: 10, form: "tablet" },
      { id: "atorva-20", label: "20 mg tablet", amountMg: 20, form: "tablet" },
      { id: "atorva-40", label: "40 mg tablet", amountMg: 40, form: "tablet" },
      { id: "atorva-80", label: "80 mg tablet", amountMg: 80, form: "tablet" },
    ],
    commonQuantities: [30, 90],
    retailCashPrice30: 312.4,
    retailCashPrice90: 890.1,
    searchAliases: ["lipitor", "atorva", "cholesterol statin"],
  },
  {
    id: "metformin",
    brandName: "Glucophage",
    genericName: "metformin",
    therapeuticClass: "Biguanide (diabetes)",
    strengths: [
      { id: "met-500", label: "500 mg tablet", amountMg: 500, form: "tablet" },
      { id: "met-850", label: "850 mg tablet", amountMg: 850, form: "tablet" },
      { id: "met-1000", label: "1000 mg tablet", amountMg: 1000, form: "tablet" },
    ],
    commonQuantities: [60, 180],
    retailCashPrice30: 84.2,
    retailCashPrice90: 220.5,
    searchAliases: ["glucophage", "metformin hcl", "diabetes"],
  },
  {
    id: "amlodipine",
    brandName: "Norvasc",
    genericName: "amlodipine",
    therapeuticClass: "Calcium channel blocker",
    strengths: [
      { id: "amlo-2-5", label: "2.5 mg tablet", amountMg: 2.5, form: "tablet" },
      { id: "amlo-5", label: "5 mg tablet", amountMg: 5, form: "tablet" },
      { id: "amlo-10", label: "10 mg tablet", amountMg: 10, form: "tablet" },
    ],
    commonQuantities: [30, 90],
    retailCashPrice30: 148.9,
    retailCashPrice90: 410.0,
    searchAliases: ["norvasc", "blood pressure", "amlodipine besylate"],
  },
  {
    id: "sertraline",
    brandName: "Zoloft",
    genericName: "sertraline",
    therapeuticClass: "SSRI (mental health)",
    strengths: [
      { id: "sert-25", label: "25 mg tablet", amountMg: 25, form: "tablet" },
      { id: "sert-50", label: "50 mg tablet", amountMg: 50, form: "tablet" },
      { id: "sert-100", label: "100 mg tablet", amountMg: 100, form: "tablet" },
    ],
    commonQuantities: [30, 90],
    retailCashPrice30: 196.5,
    retailCashPrice90: 540.2,
    searchAliases: ["zoloft", "sertraline hcl", "depression anxiety"],
  },
  {
    id: "albuterol",
    brandName: "ProAir HFA",
    genericName: "albuterol",
    therapeuticClass: "Bronchodilator (asthma)",
    strengths: [
      {
        id: "alb-90",
        label: "90 mcg inhaler",
        amountMg: 0.09,
        form: "inhaler",
      },
    ],
    commonQuantities: [1],
    retailCashPrice30: 72.0,
    retailCashPrice90: 72.0,
    searchAliases: ["proair", "ventolin", "inhaler", "asthma rescue"],
  },
  {
    id: "lisinopril",
    brandName: "Prinivil",
    genericName: "lisinopril",
    therapeuticClass: "ACE inhibitor",
    strengths: [
      { id: "lisi-5", label: "5 mg tablet", amountMg: 5, form: "tablet" },
      { id: "lisi-10", label: "10 mg tablet", amountMg: 10, form: "tablet" },
      { id: "lisi-20", label: "20 mg tablet", amountMg: 20, form: "tablet" },
      { id: "lisi-40", label: "40 mg tablet", amountMg: 40, form: "tablet" },
    ],
    commonQuantities: [30, 90],
    retailCashPrice30: 56.8,
    retailCashPrice90: 148.0,
    searchAliases: ["prinivil", "zestril", "ace inhibitor", "blood pressure"],
  },
  {
    id: "omeprazole",
    brandName: "Prilosec",
    genericName: "omeprazole",
    therapeuticClass: "PPI (acid reflux)",
    strengths: [
      { id: "ome-20", label: "20 mg capsule", amountMg: 20, form: "capsule" },
      { id: "ome-40", label: "40 mg capsule", amountMg: 40, form: "capsule" },
    ],
    commonQuantities: [30, 90],
    retailCashPrice30: 128.4,
    retailCashPrice90: 350.0,
    searchAliases: ["prilosec", "omeprazole dr", "gerd", "heartburn"],
  },
  {
    id: "levothyroxine",
    brandName: "Synthroid",
    genericName: "levothyroxine",
    therapeuticClass: "Thyroid hormone",
    strengths: [
      { id: "levo-25", label: "25 mcg tablet", amountMg: 0.025, form: "tablet" },
      { id: "levo-50", label: "50 mcg tablet", amountMg: 0.05, form: "tablet" },
      { id: "levo-75", label: "75 mcg tablet", amountMg: 0.075, form: "tablet" },
      { id: "levo-100", label: "100 mcg tablet", amountMg: 0.1, form: "tablet" },
      { id: "levo-112", label: "112 mcg tablet", amountMg: 0.112, form: "tablet" },
    ],
    commonQuantities: [30, 90],
    retailCashPrice30: 64.5,
    retailCashPrice90: 175.0,
    searchAliases: ["synthroid", "levoxyl", "thyroid", "levothyroxine sodium"],
  },
  {
    id: "gabapentin",
    brandName: "Neurontin",
    genericName: "gabapentin",
    therapeuticClass: "Anticonvulsant / nerve pain",
    strengths: [
      { id: "gaba-100", label: "100 mg capsule", amountMg: 100, form: "capsule" },
      { id: "gaba-300", label: "300 mg capsule", amountMg: 300, form: "capsule" },
      { id: "gaba-600", label: "600 mg tablet", amountMg: 600, form: "tablet" },
    ],
    commonQuantities: [90, 270],
    retailCashPrice30: 142.0,
    retailCashPrice90: 390.0,
    searchAliases: ["neurontin", "nerve pain", "gabapentin"],
  },
  {
    id: "montelukast",
    brandName: "Singulair",
    genericName: "montelukast",
    therapeuticClass: "Leukotriene inhibitor",
    strengths: [
      { id: "mont-10", label: "10 mg tablet", amountMg: 10, form: "tablet" },
      { id: "mont-5", label: "5 mg chewable", amountMg: 5, form: "tablet" },
    ],
    commonQuantities: [30, 90],
    retailCashPrice30: 210.0,
    retailCashPrice90: 580.0,
    searchAliases: ["singulair", "allergy asthma", "montelukast sodium"],
  },
];

export function getDrugById(id: string): Drug | undefined {
  return DRUGS.find((d) => d.id === id);
}
