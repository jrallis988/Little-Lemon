import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type Strength = { id: string; label: string; amountMg: number; form: string; ndc?: string };
type DrugSeed = {
  id: string;
  brandName: string;
  genericName: string;
  therapeuticClass: string;
  rxnormId?: string;
  isControlled?: boolean;
  retailCashPrice30: number;
  retailCashPrice90: number;
  searchAliases: string[];
  strengths: Strength[];
  commonQuantities: number[];
};

const DRUGS: DrugSeed[] = [
  {
    id: "atorvastatin",
    brandName: "Lipitor",
    genericName: "atorvastatin",
    therapeuticClass: "Statin (cholesterol)",
    rxnormId: "83367",
    retailCashPrice30: 312.4,
    retailCashPrice90: 890.1,
    searchAliases: ["lipitor", "statin", "cholesterol"],
    strengths: [
      { id: "atorva-10", label: "10 mg tablet", amountMg: 10, form: "tablet", ndc: "00781-5381-01" },
      { id: "atorva-20", label: "20 mg tablet", amountMg: 20, form: "tablet", ndc: "00781-5382-01" },
      { id: "atorva-40", label: "40 mg tablet", amountMg: 40, form: "tablet", ndc: "00781-5383-01" },
      { id: "atorva-80", label: "80 mg tablet", amountMg: 80, form: "tablet", ndc: "00781-5384-01" },
    ],
    commonQuantities: [30, 90],
  },
  {
    id: "metformin",
    brandName: "Glucophage",
    genericName: "metformin",
    therapeuticClass: "Biguanide (diabetes)",
    rxnormId: "6809",
    retailCashPrice30: 84.5,
    retailCashPrice90: 210.0,
    searchAliases: ["glucophage", "diabetes", "metformin hcl"],
    strengths: [
      { id: "met-500", label: "500 mg tablet", amountMg: 500, form: "tablet", ndc: "00093-1048-01" },
      { id: "met-850", label: "850 mg tablet", amountMg: 850, form: "tablet" },
      { id: "met-1000", label: "1000 mg tablet", amountMg: 1000, form: "tablet" },
    ],
    commonQuantities: [60, 180],
  },
  {
    id: "amlodipine",
    brandName: "Norvasc",
    genericName: "amlodipine",
    therapeuticClass: "Calcium channel blocker",
    rxnormId: "17767",
    retailCashPrice30: 145.0,
    retailCashPrice90: 390.0,
    searchAliases: ["norvasc", "blood pressure", "bp"],
    strengths: [
      { id: "amlo-5", label: "5 mg tablet", amountMg: 5, form: "tablet" },
      { id: "amlo-10", label: "10 mg tablet", amountMg: 10, form: "tablet" },
    ],
    commonQuantities: [30, 90],
  },
  {
    id: "sertraline",
    brandName: "Zoloft",
    genericName: "sertraline",
    therapeuticClass: "SSRI (depression/anxiety)",
    rxnormId: "36437",
    retailCashPrice30: 168.2,
    retailCashPrice90: 455.0,
    searchAliases: ["zoloft", "ssri", "depression"],
    strengths: [
      { id: "sert-50", label: "50 mg tablet", amountMg: 50, form: "tablet" },
      { id: "sert-100", label: "100 mg tablet", amountMg: 100, form: "tablet" },
    ],
    commonQuantities: [30, 90],
  },
  {
    id: "omeprazole",
    brandName: "Prilosec",
    genericName: "omeprazole",
    therapeuticClass: "PPI (acid reflux)",
    rxnormId: "7646",
    retailCashPrice30: 98.0,
    retailCashPrice90: 260.0,
    searchAliases: ["prilosec", "gerd", "heartburn"],
    strengths: [
      { id: "ome-20", label: "20 mg capsule", amountMg: 20, form: "capsule" },
      { id: "ome-40", label: "40 mg capsule", amountMg: 40, form: "capsule" },
    ],
    commonQuantities: [30, 90],
  },
  {
    id: "losartan",
    brandName: "Cozaar",
    genericName: "losartan",
    therapeuticClass: "ARB (blood pressure)",
    rxnormId: "52175",
    retailCashPrice30: 132.0,
    retailCashPrice90: 350.0,
    searchAliases: ["cozaar", "arb"],
    strengths: [
      { id: "los-50", label: "50 mg tablet", amountMg: 50, form: "tablet" },
      { id: "los-100", label: "100 mg tablet", amountMg: 100, form: "tablet" },
    ],
    commonQuantities: [30, 90],
  },
  {
    id: "gabapentin",
    brandName: "Neurontin",
    genericName: "gabapentin",
    therapeuticClass: "Anticonvulsant / nerve pain",
    rxnormId: "25480",
    retailCashPrice30: 156.0,
    retailCashPrice90: 410.0,
    searchAliases: ["neurontin", "nerve pain"],
    strengths: [
      { id: "gab-300", label: "300 mg capsule", amountMg: 300, form: "capsule" },
      { id: "gab-600", label: "600 mg tablet", amountMg: 600, form: "tablet" },
    ],
    commonQuantities: [90, 270],
  },
  {
    id: "levothyroxine",
    brandName: "Synthroid",
    genericName: "levothyroxine",
    therapeuticClass: "Thyroid hormone",
    rxnormId: "10582",
    retailCashPrice30: 72.0,
    retailCashPrice90: 190.0,
    searchAliases: ["synthroid", "thyroid"],
    strengths: [
      { id: "levo-50", label: "50 mcg tablet", amountMg: 0.05, form: "tablet" },
      { id: "levo-75", label: "75 mcg tablet", amountMg: 0.075, form: "tablet" },
      { id: "levo-100", label: "100 mcg tablet", amountMg: 0.1, form: "tablet" },
    ],
    commonQuantities: [30, 90],
  },
  {
    id: "albuterol",
    brandName: "ProAir HFA",
    genericName: "albuterol",
    therapeuticClass: "Rescue inhaler (asthma)",
    rxnormId: "435",
    retailCashPrice30: 78.0,
    retailCashPrice90: 210.0,
    searchAliases: ["proair", "ventolin", "inhaler", "asthma"],
    strengths: [{ id: "alb-hfa", label: "90 mcg inhaler", amountMg: 0.09, form: "inhaler" }],
    commonQuantities: [1],
  },
  {
    id: "montelukast",
    brandName: "Singulair",
    genericName: "montelukast",
    therapeuticClass: "Leukotriene inhibitor",
    rxnormId: "88249",
    retailCashPrice30: 210.0,
    retailCashPrice90: 580.0,
    searchAliases: ["singulair", "allergies"],
    strengths: [{ id: "mont-10", label: "10 mg tablet", amountMg: 10, form: "tablet" }],
    commonQuantities: [30, 90],
  },
  {
    id: "lisinopril",
    brandName: "Zestril",
    genericName: "lisinopril",
    therapeuticClass: "ACE inhibitor",
    rxnormId: "29046",
    retailCashPrice30: 68.0,
    retailCashPrice90: 175.0,
    searchAliases: ["zestril", "prinivil", "ace"],
    strengths: [
      { id: "lis-10", label: "10 mg tablet", amountMg: 10, form: "tablet" },
      { id: "lis-20", label: "20 mg tablet", amountMg: 20, form: "tablet" },
      { id: "lis-40", label: "40 mg tablet", amountMg: 40, form: "tablet" },
    ],
    commonQuantities: [30, 90],
  },
  {
    id: "hydrochlorothiazide",
    brandName: "Microzide",
    genericName: "hydrochlorothiazide",
    therapeuticClass: "Thiazide diuretic",
    rxnormId: "310798",
    retailCashPrice30: 42.0,
    retailCashPrice90: 95.0,
    searchAliases: ["hctz", "diuretic"],
    strengths: [
      { id: "hctz-12", label: "12.5 mg tablet", amountMg: 12.5, form: "tablet" },
      { id: "hctz-25", label: "25 mg tablet", amountMg: 25, form: "tablet" },
    ],
    commonQuantities: [30, 90],
  },
  {
    id: "ozempic",
    brandName: "Ozempic",
    genericName: "semaglutide",
    therapeuticClass: "GLP-1 (diabetes / weight)",
    rxnormId: "1991302",
    retailCashPrice30: 1029.0,
    retailCashPrice90: 3087.0,
    searchAliases: ["semaglutide", "glp-1", "ozempic pen"],
    strengths: [
      { id: "oze-025", label: "0.25 mg / 0.5 mg pen", amountMg: 0.25, form: "injection" },
      { id: "oze-1", label: "1 mg pen", amountMg: 1, form: "injection" },
    ],
    commonQuantities: [1],
  },
  {
    id: "wegovy",
    brandName: "Wegovy",
    genericName: "semaglutide",
    therapeuticClass: "GLP-1 (weight management)",
    rxnormId: "2557570",
    retailCashPrice30: 1349.0,
    retailCashPrice90: 4047.0,
    searchAliases: ["wegovy", "weight loss", "semaglutide"],
    strengths: [
      { id: "weg-05", label: "0.5 mg pen", amountMg: 0.5, form: "injection" },
      { id: "weg-1", label: "1 mg pen", amountMg: 1, form: "injection" },
      { id: "weg-17", label: "1.7 mg pen", amountMg: 1.7, form: "injection" },
      { id: "weg-24", label: "2.4 mg pen", amountMg: 2.4, form: "injection" },
    ],
    commonQuantities: [1],
  },
  {
    id: "zepbound",
    brandName: "Zepbound",
    genericName: "tirzepatide",
    therapeuticClass: "GIP/GLP-1 (weight management)",
    rxnormId: "2663707",
    retailCashPrice30: 1262.0,
    retailCashPrice90: 3786.0,
    searchAliases: ["tirzepatide", "mounjaro", "weight"],
    strengths: [
      { id: "zep-25", label: "2.5 mg pen", amountMg: 2.5, form: "injection" },
      { id: "zep-5", label: "5 mg pen", amountMg: 5, form: "injection" },
      { id: "zep-75", label: "7.5 mg pen", amountMg: 7.5, form: "injection" },
      { id: "zep-10", label: "10 mg pen", amountMg: 10, form: "injection" },
    ],
    commonQuantities: [1],
  },
  {
    id: "eliquis",
    brandName: "Eliquis",
    genericName: "apixaban",
    therapeuticClass: "Anticoagulant (blood thinner)",
    rxnormId: "1364430",
    retailCashPrice30: 612.0,
    retailCashPrice90: 1780.0,
    searchAliases: ["apixaban", "blood thinner", "afib"],
    strengths: [
      { id: "eli-25", label: "2.5 mg tablet", amountMg: 2.5, form: "tablet" },
      { id: "eli-5", label: "5 mg tablet", amountMg: 5, form: "tablet" },
    ],
    commonQuantities: [60, 180],
  },
  {
    id: "pantoprazole",
    brandName: "Protonix",
    genericName: "pantoprazole",
    therapeuticClass: "PPI (acid reflux)",
    rxnormId: "40790",
    retailCashPrice30: 185.0,
    retailCashPrice90: 490.0,
    searchAliases: ["protonix", "ppi"],
    strengths: [{ id: "pan-40", label: "40 mg tablet", amountMg: 40, form: "tablet" }],
    commonQuantities: [30, 90],
  },
  {
    id: "escitalopram",
    brandName: "Lexapro",
    genericName: "escitalopram",
    therapeuticClass: "SSRI",
    rxnormId: "321988",
    retailCashPrice30: 198.0,
    retailCashPrice90: 520.0,
    searchAliases: ["lexapro", "ssri"],
    strengths: [
      { id: "esc-10", label: "10 mg tablet", amountMg: 10, form: "tablet" },
      { id: "esc-20", label: "20 mg tablet", amountMg: 20, form: "tablet" },
    ],
    commonQuantities: [30, 90],
  },
  {
    id: "rosuvastatin",
    brandName: "Crestor",
    genericName: "rosuvastatin",
    therapeuticClass: "Statin (cholesterol)",
    rxnormId: "301542",
    retailCashPrice30: 285.0,
    retailCashPrice90: 780.0,
    searchAliases: ["crestor", "statin"],
    strengths: [
      { id: "ros-10", label: "10 mg tablet", amountMg: 10, form: "tablet" },
      { id: "ros-20", label: "20 mg tablet", amountMg: 20, form: "tablet" },
      { id: "ros-40", label: "40 mg tablet", amountMg: 40, form: "tablet" },
    ],
    commonQuantities: [30, 90],
  },
  {
    id: "duloxetine",
    brandName: "Cymbalta",
    genericName: "duloxetine",
    therapeuticClass: "SNRI",
    rxnormId: "734064",
    retailCashPrice30: 245.0,
    retailCashPrice90: 680.0,
    searchAliases: ["cymbalta", "snri", "nerve pain"],
    strengths: [
      { id: "dul-30", label: "30 mg capsule", amountMg: 30, form: "capsule" },
      { id: "dul-60", label: "60 mg capsule", amountMg: 60, form: "capsule" },
    ],
    commonQuantities: [30, 90],
  },
  {
    id: "tramadol",
    brandName: "Ultram",
    genericName: "tramadol",
    therapeuticClass: "Opioid analgesic",
    rxnormId: "10689",
    isControlled: true,
    retailCashPrice30: 62.0,
    retailCashPrice90: 165.0,
    searchAliases: ["ultram", "pain"],
    strengths: [{ id: "tra-50", label: "50 mg tablet", amountMg: 50, form: "tablet" }],
    commonQuantities: [30, 90],
  },
  {
    id: "sildenafil",
    brandName: "Viagra",
    genericName: "sildenafil",
    therapeuticClass: "PDE5 inhibitor",
    rxnormId: "136411",
    retailCashPrice30: 420.0,
    retailCashPrice90: 1100.0,
    searchAliases: ["viagra", "ed"],
    strengths: [
      { id: "sil-50", label: "50 mg tablet", amountMg: 50, form: "tablet" },
      { id: "sil-100", label: "100 mg tablet", amountMg: 100, form: "tablet" },
    ],
    commonQuantities: [4, 10, 30],
  },
  {
    id: "tadalafil",
    brandName: "Cialis",
    genericName: "tadalafil",
    therapeuticClass: "PDE5 inhibitor",
    rxnormId: "358263",
    retailCashPrice30: 510.0,
    retailCashPrice90: 1400.0,
    searchAliases: ["cialis", "ed"],
    strengths: [
      { id: "tad-5", label: "5 mg tablet", amountMg: 5, form: "tablet" },
      { id: "tad-20", label: "20 mg tablet", amountMg: 20, form: "tablet" },
    ],
    commonQuantities: [4, 30],
  },
  {
    id: "fluoxetine",
    brandName: "Prozac",
    genericName: "fluoxetine",
    therapeuticClass: "SSRI",
    rxnormId: "4493",
    retailCashPrice30: 95.0,
    retailCashPrice90: 250.0,
    searchAliases: ["prozac", "ssri"],
    strengths: [
      { id: "flu-20", label: "20 mg capsule", amountMg: 20, form: "capsule" },
      { id: "flu-40", label: "40 mg capsule", amountMg: 40, form: "capsule" },
    ],
    commonQuantities: [30, 90],
  },
  {
    id: "prednisone",
    brandName: "Deltasone",
    genericName: "prednisone",
    therapeuticClass: "Corticosteroid",
    rxnormId: "8640",
    retailCashPrice30: 28.0,
    retailCashPrice90: 55.0,
    searchAliases: ["steroid", "pred"],
    strengths: [
      { id: "pred-10", label: "10 mg tablet", amountMg: 10, form: "tablet" },
      { id: "pred-20", label: "20 mg tablet", amountMg: 20, form: "tablet" },
    ],
    commonQuantities: [10, 30],
  },
  {
    id: "amoxicillin",
    brandName: "Amoxil",
    genericName: "amoxicillin",
    therapeuticClass: "Penicillin antibiotic",
    rxnormId: "723",
    retailCashPrice30: 36.0,
    retailCashPrice90: 36.0,
    searchAliases: ["amoxil", "antibiotic"],
    strengths: [
      { id: "amox-500", label: "500 mg capsule", amountMg: 500, form: "capsule" },
      { id: "amox-875", label: "875 mg tablet", amountMg: 875, form: "tablet" },
    ],
    commonQuantities: [21, 30],
  },
  {
    id: "azithromycin",
    brandName: "Zithromax",
    genericName: "azithromycin",
    therapeuticClass: "Macrolide antibiotic",
    rxnormId: "18631",
    retailCashPrice30: 68.0,
    retailCashPrice90: 68.0,
    searchAliases: ["z-pak", "zithromax"],
    strengths: [{ id: "azi-250", label: "250 mg tablet (Z-Pak)", amountMg: 250, form: "tablet" }],
    commonQuantities: [6],
  },
  {
    id: "clopidogrel",
    brandName: "Plavix",
    genericName: "clopidogrel",
    therapeuticClass: "Antiplatelet",
    rxnormId: "32968",
    retailCashPrice30: 245.0,
    retailCashPrice90: 680.0,
    searchAliases: ["plavix", "blood thinner"],
    strengths: [{ id: "clo-75", label: "75 mg tablet", amountMg: 75, form: "tablet" }],
    commonQuantities: [30, 90],
  },
  {
    id: "januvia",
    brandName: "Januvia",
    genericName: "sitagliptin",
    therapeuticClass: "DPP-4 (diabetes)",
    rxnormId: "593411",
    retailCashPrice30: 580.0,
    retailCashPrice90: 1680.0,
    searchAliases: ["sitagliptin", "diabetes"],
    strengths: [
      { id: "jan-50", label: "50 mg tablet", amountMg: 50, form: "tablet" },
      { id: "jan-100", label: "100 mg tablet", amountMg: 100, form: "tablet" },
    ],
    commonQuantities: [30, 90],
  },
  {
    id: "jardiance",
    brandName: "Jardiance",
    genericName: "empagliflozin",
    therapeuticClass: "SGLT2 (diabetes)",
    rxnormId: "1545653",
    retailCashPrice30: 620.0,
    retailCashPrice90: 1800.0,
    searchAliases: ["empagliflozin", "sglt2"],
    strengths: [
      { id: "jar-10", label: "10 mg tablet", amountMg: 10, form: "tablet" },
      { id: "jar-25", label: "25 mg tablet", amountMg: 25, form: "tablet" },
    ],
    commonQuantities: [30, 90],
  },
];

type PharmacySeed = {
  id: string;
  name: string;
  chain: string;
  npi?: string;
  ncpdpId?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  latitude: number;
  longitude: number;
  hoursWeekday: string;
  hoursSaturday: string;
  hoursSunday: string;
  pharmacyDeskNote?: string;
  driveThru?: boolean;
};

const PHARMACIES: PharmacySeed[] = [
  // NYC / NJ
  { id: "cvs-chelsea", name: "CVS Pharmacy", chain: "cvs", npi: "1215960845", address: "150 8th Ave", city: "New York", state: "NY", zip: "10011", phone: "(212) 255-2590", latitude: 40.7415, longitude: -74.0014, hoursWeekday: "8:00 AM – 10:00 PM", hoursSaturday: "9:00 AM – 6:00 PM", hoursSunday: "10:00 AM – 6:00 PM", driveThru: false },
  { id: "wags-midtown", name: "Walgreens", chain: "walgreens", npi: "1598763212", address: "350 5th Ave", city: "New York", state: "NY", zip: "10118", phone: "(212) 736-3737", latitude: 40.7484, longitude: -73.9857, hoursWeekday: "7:00 AM – 10:00 PM", hoursSaturday: "8:00 AM – 10:00 PM", hoursSunday: "9:00 AM – 9:00 PM", driveThru: false },
  { id: "walmart-brooklyn", name: "Walmart Pharmacy", chain: "walmart", npi: "1780684218", address: "625 Atlantic Ave", city: "Brooklyn", state: "NY", zip: "11217", phone: "(718) 622-1120", latitude: 40.6835, longitude: -73.9758, hoursWeekday: "9:00 AM – 9:00 PM", hoursSaturday: "9:00 AM – 7:00 PM", hoursSunday: "10:00 AM – 6:00 PM", driveThru: true },
  { id: "costco-brooklyn", name: "Costco Pharmacy", chain: "costco", npi: "1992701124", address: "976 3rd Ave", city: "Brooklyn", state: "NY", zip: "11232", phone: "(718) 965-7603", latitude: 40.6562, longitude: -74.0068, hoursWeekday: "10:00 AM – 8:30 PM", hoursSaturday: "9:30 AM – 6:00 PM", hoursSunday: "10:00 AM – 6:00 PM", pharmacyDeskNote: "Membership warehouse — pharmacy often open to non-members for Rx pickup.", driveThru: false },
  { id: "riteaid-ues", name: "Rite Aid", chain: "rite_aid", npi: "1326042285", address: "1510 1st Ave", city: "New York", state: "NY", zip: "10075", phone: "(212) 737-8461", latitude: 40.7728, longitude: -73.9526, hoursWeekday: "8:00 AM – 9:00 PM", hoursSaturday: "9:00 AM – 6:00 PM", hoursSunday: "9:00 AM – 5:00 PM", driveThru: false },
  { id: "ind-greene", name: "Greene Drug", chain: "independent", npi: "1457350010", address: "801 Broadway", city: "New York", state: "NY", zip: "10003", phone: "(212) 254-8855", latitude: 40.7328, longitude: -73.991, hoursWeekday: "9:00 AM – 7:00 PM", hoursSaturday: "10:00 AM – 5:00 PM", hoursSunday: "Closed", pharmacyDeskNote: "Independent compounding & counseling.", driveThru: false },
  { id: "kroger-hoboken", name: "Kroger Pharmacy", chain: "kroger", npi: "1568823400", address: "111 Washington St", city: "Hoboken", state: "NJ", zip: "07030", phone: "(201) 795-0111", latitude: 40.737, longitude: -74.0301, hoursWeekday: "8:00 AM – 9:00 PM", hoursSaturday: "8:00 AM – 8:00 PM", hoursSunday: "9:00 AM – 6:00 PM", driveThru: true },
  { id: "cvs-jersey-city", name: "CVS Pharmacy", chain: "cvs", address: "278 Grove St", city: "Jersey City", state: "NJ", zip: "07302", phone: "(201) 333-2240", latitude: 40.7195, longitude: -74.0431, hoursWeekday: "8:00 AM – 10:00 PM", hoursSaturday: "9:00 AM – 6:00 PM", hoursSunday: "10:00 AM – 6:00 PM", driveThru: true },
  // LA
  { id: "cvs-santa-monica", name: "CVS Pharmacy", chain: "cvs", address: "1426 Montana Ave", city: "Santa Monica", state: "CA", zip: "90403", phone: "(310) 395-9971", latitude: 34.0322, longitude: -118.4965, hoursWeekday: "8:00 AM – 9:00 PM", hoursSaturday: "9:00 AM – 6:00 PM", hoursSunday: "10:00 AM – 6:00 PM" },
  { id: "wags-hollywood", name: "Walgreens", chain: "walgreens", address: "8775 W Pico Blvd", city: "Los Angeles", state: "CA", zip: "90035", phone: "(310) 275-1114", latitude: 34.0545, longitude: -118.382, hoursWeekday: "8:00 AM – 10:00 PM", hoursSaturday: "9:00 AM – 10:00 PM", hoursSunday: "9:00 AM – 9:00 PM", driveThru: true },
  { id: "walmart-la", name: "Walmart Pharmacy", chain: "walmart", address: "9001 S La Cienega Blvd", city: "Inglewood", state: "CA", zip: "90301", phone: "(310) 337-1100", latitude: 33.954, longitude: -118.3702, hoursWeekday: "9:00 AM – 9:00 PM", hoursSaturday: "9:00 AM – 7:00 PM", hoursSunday: "10:00 AM – 6:00 PM", driveThru: true },
  { id: "costco-culver", name: "Costco Pharmacy", chain: "costco", address: "13463 Washington Blvd", city: "Marina del Rey", state: "CA", zip: "90292", phone: "(310) 305-2255", latitude: 33.987, longitude: -118.443, hoursWeekday: "10:00 AM – 8:30 PM", hoursSaturday: "9:30 AM – 6:00 PM", hoursSunday: "10:00 AM – 6:00 PM" },
  { id: "riteaid-pasadena", name: "Rite Aid", chain: "rite_aid", address: "1190 E Colorado Blvd", city: "Pasadena", state: "CA", zip: "91106", phone: "(626) 795-9711", latitude: 34.146, longitude: -118.125, hoursWeekday: "8:00 AM – 9:00 PM", hoursSaturday: "9:00 AM – 6:00 PM", hoursSunday: "9:00 AM – 5:00 PM" },
  // Chicago
  { id: "cvs-loop", name: "CVS Pharmacy", chain: "cvs", address: "2 N Riverside Plaza", city: "Chicago", state: "IL", zip: "60606", phone: "(312) 466-0101", latitude: 41.882, longitude: -87.639, hoursWeekday: "7:00 AM – 8:00 PM", hoursSaturday: "9:00 AM – 5:00 PM", hoursSunday: "10:00 AM – 5:00 PM" },
  { id: "wags-lincoln", name: "Walgreens", chain: "walgreens", address: "3000 N Halsted St", city: "Chicago", state: "IL", zip: "60657", phone: "(773) 929-8601", latitude: 41.936, longitude: -87.649, hoursWeekday: "8:00 AM – 10:00 PM", hoursSaturday: "9:00 AM – 10:00 PM", hoursSunday: "9:00 AM – 9:00 PM", driveThru: true },
  { id: "walmart-chicago", name: "Walmart Pharmacy", chain: "walmart", address: "4650 W North Ave", city: "Chicago", state: "IL", zip: "60639", phone: "(773) 252-2000", latitude: 41.91, longitude: -87.743, hoursWeekday: "9:00 AM – 9:00 PM", hoursSaturday: "9:00 AM – 7:00 PM", hoursSunday: "10:00 AM – 6:00 PM", driveThru: true },
  { id: "ind-chicago", name: "Northside Apothecary", chain: "independent", address: "2200 N Lincoln Ave", city: "Chicago", state: "IL", zip: "60614", phone: "(773) 549-2200", latitude: 41.922, longitude: -87.647, hoursWeekday: "9:00 AM – 7:00 PM", hoursSaturday: "10:00 AM – 4:00 PM", hoursSunday: "Closed", pharmacyDeskNote: "Local counseling-focused independent." },
  // Houston / Dallas
  { id: "cvs-houston", name: "CVS Pharmacy", chain: "cvs", address: "5603 Beechnut St", city: "Houston", state: "TX", zip: "77074", phone: "(713) 771-1121", latitude: 29.689, longitude: -95.493, hoursWeekday: "8:00 AM – 10:00 PM", hoursSaturday: "9:00 AM – 6:00 PM", hoursSunday: "10:00 AM – 6:00 PM", driveThru: true },
  { id: "wags-houston", name: "Walgreens", chain: "walgreens", address: "3102 Kirby Dr", city: "Houston", state: "TX", zip: "77098", phone: "(713) 523-8611", latitude: 29.738, longitude: -95.419, hoursWeekday: "8:00 AM – 10:00 PM", hoursSaturday: "9:00 AM – 10:00 PM", hoursSunday: "9:00 AM – 9:00 PM", driveThru: true },
  { id: "walmart-houston", name: "Walmart Pharmacy", chain: "walmart", address: "9555 S Post Oak Rd", city: "Houston", state: "TX", zip: "77096", phone: "(713) 728-2100", latitude: 29.676, longitude: -95.466, hoursWeekday: "9:00 AM – 9:00 PM", hoursSaturday: "9:00 AM – 7:00 PM", hoursSunday: "10:00 AM – 6:00 PM", driveThru: true },
  { id: "kroger-houston", name: "Kroger Pharmacy", chain: "kroger", address: "1035 N Shepherd Dr", city: "Houston", state: "TX", zip: "77008", phone: "(713) 864-5400", latitude: 29.79, longitude: -95.41, hoursWeekday: "8:00 AM – 9:00 PM", hoursSaturday: "8:00 AM – 8:00 PM", hoursSunday: "9:00 AM – 6:00 PM", driveThru: true },
  { id: "cvs-dallas", name: "CVS Pharmacy", chain: "cvs", address: "3100 N Hall St", city: "Dallas", state: "TX", zip: "75204", phone: "(214) 871-2500", latitude: 32.806, longitude: -96.797, hoursWeekday: "8:00 AM – 10:00 PM", hoursSaturday: "9:00 AM – 6:00 PM", hoursSunday: "10:00 AM – 6:00 PM" },
  { id: "walmart-dallas", name: "Walmart Pharmacy", chain: "walmart", address: "9301 Forest Ln", city: "Dallas", state: "TX", zip: "75243", phone: "(972) 235-2100", latitude: 32.91, longitude: -96.74, hoursWeekday: "9:00 AM – 9:00 PM", hoursSaturday: "9:00 AM – 7:00 PM", hoursSunday: "10:00 AM – 6:00 PM", driveThru: true },
  // Miami / FL
  { id: "cvs-miami", name: "CVS Pharmacy", chain: "cvs", address: "1675 SW 107th Ave", city: "Miami", state: "FL", zip: "33165", phone: "(305) 223-2100", latitude: 25.753, longitude: -80.367, hoursWeekday: "8:00 AM – 10:00 PM", hoursSaturday: "9:00 AM – 6:00 PM", hoursSunday: "10:00 AM – 6:00 PM", driveThru: true },
  { id: "wags-miami", name: "Walgreens", chain: "walgreens", address: "8600 SW 72nd St", city: "Miami", state: "FL", zip: "33143", phone: "(305) 595-2100", latitude: 25.703, longitude: -80.332, hoursWeekday: "8:00 AM – 10:00 PM", hoursSaturday: "9:00 AM – 10:00 PM", hoursSunday: "9:00 AM – 9:00 PM", driveThru: true },
  { id: "publix-miami", name: "Publix Pharmacy", chain: "independent", address: "3444 Main Hwy", city: "Miami", state: "FL", zip: "33133", phone: "(305) 442-2100", latitude: 25.727, longitude: -80.24, hoursWeekday: "9:00 AM – 9:00 PM", hoursSaturday: "9:00 AM – 7:00 PM", hoursSunday: "10:00 AM – 6:00 PM", pharmacyDeskNote: "Regional grocery pharmacy — Trump RX network partner." },
  // Seattle / Portland
  { id: "cvs-seattle", name: "CVS Pharmacy", chain: "cvs", address: "500 Pine St", city: "Seattle", state: "WA", zip: "98101", phone: "(206) 223-2100", latitude: 47.611, longitude: -122.336, hoursWeekday: "8:00 AM – 9:00 PM", hoursSaturday: "9:00 AM – 6:00 PM", hoursSunday: "10:00 AM – 6:00 PM" },
  { id: "wags-seattle", name: "Walgreens", chain: "walgreens", address: "5408 15th Ave NW", city: "Seattle", state: "WA", zip: "98107", phone: "(206) 782-2100", latitude: 47.668, longitude: -122.376, hoursWeekday: "8:00 AM – 10:00 PM", hoursSaturday: "9:00 AM – 10:00 PM", hoursSunday: "9:00 AM – 9:00 PM", driveThru: true },
  { id: "costco-seattle", name: "Costco Pharmacy", chain: "costco", address: "4401 4th Ave S", city: "Seattle", state: "WA", zip: "98134", phone: "(206) 622-2100", latitude: 47.565, longitude: -122.329, hoursWeekday: "10:00 AM – 8:30 PM", hoursSaturday: "9:30 AM – 6:00 PM", hoursSunday: "10:00 AM – 6:00 PM" },
  { id: "fredmeyer-portland", name: "Fred Meyer Pharmacy", chain: "kroger", address: "3804 SE 22nd Ave", city: "Portland", state: "OR", zip: "97202", phone: "(503) 230-2100", latitude: 45.495, longitude: -122.643, hoursWeekday: "8:00 AM – 9:00 PM", hoursSaturday: "8:00 AM – 8:00 PM", hoursSunday: "9:00 AM – 6:00 PM", driveThru: true },
  // Phoenix / Denver / Atlanta / Boston / DC
  { id: "walmart-phoenix", name: "Walmart Pharmacy", chain: "walmart", address: "3721 E Thomas Rd", city: "Phoenix", state: "AZ", zip: "85018", phone: "(602) 955-2100", latitude: 33.48, longitude: -112.0, hoursWeekday: "9:00 AM – 9:00 PM", hoursSaturday: "9:00 AM – 7:00 PM", hoursSunday: "10:00 AM – 6:00 PM", driveThru: true },
  { id: "cvs-phoenix", name: "CVS Pharmacy", chain: "cvs", address: "3149 E Indian School Rd", city: "Phoenix", state: "AZ", zip: "85016", phone: "(602) 956-2100", latitude: 33.495, longitude: -112.015, hoursWeekday: "8:00 AM – 10:00 PM", hoursSaturday: "9:00 AM – 6:00 PM", hoursSunday: "10:00 AM – 6:00 PM", driveThru: true },
  { id: "kroger-denver", name: "King Soopers Pharmacy", chain: "kroger", address: "1155 E 9th Ave", city: "Denver", state: "CO", zip: "80218", phone: "(303) 861-2100", latitude: 39.731, longitude: -104.972, hoursWeekday: "8:00 AM – 9:00 PM", hoursSaturday: "8:00 AM – 8:00 PM", hoursSunday: "9:00 AM – 6:00 PM", driveThru: true },
  { id: "wags-denver", name: "Walgreens", chain: "walgreens", address: "2000 S Colorado Blvd", city: "Denver", state: "CO", zip: "80222", phone: "(303) 757-2100", latitude: 39.682, longitude: -104.941, hoursWeekday: "8:00 AM – 10:00 PM", hoursSaturday: "9:00 AM – 10:00 PM", hoursSunday: "9:00 AM – 9:00 PM", driveThru: true },
  { id: "cvs-atlanta", name: "CVS Pharmacy", chain: "cvs", address: "1201 W Peachtree St NW", city: "Atlanta", state: "GA", zip: "30309", phone: "(404) 881-2100", latitude: 33.788, longitude: -84.388, hoursWeekday: "8:00 AM – 9:00 PM", hoursSaturday: "9:00 AM – 6:00 PM", hoursSunday: "10:00 AM – 6:00 PM" },
  { id: "walmart-atlanta", name: "Walmart Pharmacy", chain: "walmart", address: "2425 Gresham Rd SE", city: "Atlanta", state: "GA", zip: "30316", phone: "(404) 241-2100", latitude: 33.71, longitude: -84.35, hoursWeekday: "9:00 AM – 9:00 PM", hoursSaturday: "9:00 AM – 7:00 PM", hoursSunday: "10:00 AM – 6:00 PM", driveThru: true },
  { id: "cvs-boston", name: "CVS Pharmacy", chain: "cvs", address: "587 Boylston St", city: "Boston", state: "MA", zip: "02116", phone: "(617) 437-2100", latitude: 42.35, longitude: -71.075, hoursWeekday: "8:00 AM – 9:00 PM", hoursSaturday: "9:00 AM – 6:00 PM", hoursSunday: "10:00 AM – 6:00 PM" },
  { id: "wags-boston", name: "Walgreens", chain: "walgreens", address: "841 Boylston St", city: "Boston", state: "MA", zip: "02116", phone: "(617) 236-2100", latitude: 42.348, longitude: -71.084, hoursWeekday: "8:00 AM – 10:00 PM", hoursSaturday: "9:00 AM – 10:00 PM", hoursSunday: "9:00 AM – 9:00 PM" },
  { id: "cvs-dc", name: "CVS Pharmacy", chain: "cvs", address: "1199 Vermont Ave NW", city: "Washington", state: "DC", zip: "20005", phone: "(202) 628-2100", latitude: 38.905, longitude: -77.032, hoursWeekday: "7:00 AM – 9:00 PM", hoursSaturday: "9:00 AM – 6:00 PM", hoursSunday: "10:00 AM – 6:00 PM" },
  { id: "wags-dc", name: "Walgreens", chain: "walgreens", address: "801 7th St NW", city: "Washington", state: "DC", zip: "20001", phone: "(202) 289-2100", latitude: 38.9, longitude: -77.022, hoursWeekday: "8:00 AM – 10:00 PM", hoursSaturday: "9:00 AM – 10:00 PM", hoursSunday: "9:00 AM – 9:00 PM" },
];

const ZIP_SEEDS = [
  { zip: "10001", city: "New York", state: "NY", latitude: 40.7506, longitude: -73.9971, label: "New York, NY 10001" },
  { zip: "10011", city: "New York", state: "NY", latitude: 40.7415, longitude: -74.0014, label: "New York, NY 10011" },
  { zip: "11217", city: "Brooklyn", state: "NY", latitude: 40.6835, longitude: -73.9758, label: "Brooklyn, NY 11217" },
  { zip: "07030", city: "Hoboken", state: "NJ", latitude: 40.737, longitude: -74.0301, label: "Hoboken, NJ 07030" },
  { zip: "90403", city: "Santa Monica", state: "CA", latitude: 34.0322, longitude: -118.4965, label: "Santa Monica, CA 90403" },
  { zip: "90035", city: "Los Angeles", state: "CA", latitude: 34.0545, longitude: -118.382, label: "Los Angeles, CA 90035" },
  { zip: "60606", city: "Chicago", state: "IL", latitude: 41.882, longitude: -87.639, label: "Chicago, IL 60606" },
  { zip: "60657", city: "Chicago", state: "IL", latitude: 41.936, longitude: -87.649, label: "Chicago, IL 60657" },
  { zip: "77074", city: "Houston", state: "TX", latitude: 29.689, longitude: -95.493, label: "Houston, TX 77074" },
  { zip: "75204", city: "Dallas", state: "TX", latitude: 32.806, longitude: -96.797, label: "Dallas, TX 75204" },
  { zip: "33165", city: "Miami", state: "FL", latitude: 25.753, longitude: -80.367, label: "Miami, FL 33165" },
  { zip: "98101", city: "Seattle", state: "WA", latitude: 47.611, longitude: -122.336, label: "Seattle, WA 98101" },
  { zip: "97202", city: "Portland", state: "OR", latitude: 45.495, longitude: -122.643, label: "Portland, OR 97202" },
  { zip: "85018", city: "Phoenix", state: "AZ", latitude: 33.48, longitude: -112.0, label: "Phoenix, AZ 85018" },
  { zip: "80218", city: "Denver", state: "CO", latitude: 39.731, longitude: -104.972, label: "Denver, CO 80218" },
  { zip: "30309", city: "Atlanta", state: "GA", latitude: 33.788, longitude: -84.388, label: "Atlanta, GA 30309" },
  { zip: "02116", city: "Boston", state: "MA", latitude: 42.35, longitude: -71.075, label: "Boston, MA 02116" },
  { zip: "20005", city: "Washington", state: "DC", latitude: 38.905, longitude: -77.032, label: "Washington, DC 20005" },
];

/** Chain-level default discount factors vs retail cash. */
const CHAIN_FACTOR: Record<string, number> = {
  costco: 0.68,
  walmart: 0.72,
  independent: 0.78,
  kroger: 0.82,
  rite_aid: 0.88,
  walgreens: 0.9,
  cvs: 0.92,
};

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

async function main() {
  console.log("Seeding Trump RX network…");

  await prisma.coupon.deleteMany();
  await prisma.priceAlert.deleteMany();
  await prisma.savedMedication.deleteMany();
  await prisma.preferredPharmacy.deleteMany();
  await prisma.familyMember.deleteMany();
  await prisma.pharmacyContract.deleteMany();
  await prisma.drugQuantity.deleteMany();
  await prisma.drugStrength.deleteMany();
  await prisma.drug.deleteMany();
  await prisma.pharmacy.deleteMany();
  await prisma.zipLocation.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  for (const z of ZIP_SEEDS) {
    await prisma.zipLocation.create({ data: z });
  }

  for (const d of DRUGS) {
    await prisma.drug.create({
      data: {
        id: d.id,
        brandName: d.brandName,
        genericName: d.genericName,
        therapeuticClass: d.therapeuticClass,
        rxnormId: d.rxnormId,
        isControlled: d.isControlled ?? false,
        retailCashPrice30: d.retailCashPrice30,
        retailCashPrice90: d.retailCashPrice90,
        searchAliasesJson: JSON.stringify(d.searchAliases),
        strengths: {
          create: d.strengths.map((s) => ({
            id: s.id,
            label: s.label,
            amountMg: s.amountMg,
            form: s.form,
            ndc: s.ndc,
          })),
        },
        quantities: {
          create: d.commonQuantities.map((quantity) => ({ quantity })),
        },
      },
    });
  }

  for (const p of PHARMACIES) {
    await prisma.pharmacy.create({
      data: {
        ...p,
        driveThru: p.driveThru ?? false,
        acceptsTrumpRxCoupon: true,
      },
    });
  }

  // Contracted network rates: pharmacy × drug
  for (const p of PHARMACIES) {
    const base = CHAIN_FACTOR[p.chain] ?? 0.85;
    for (const d of DRUGS) {
      const jitter = ((hashSeed(`${p.id}-${d.id}`) % 900) / 10000) - 0.045;
      // Specialty brands keep thinner discounts
      const specialty =
        ["ozempic", "wegovy", "zepbound", "eliquis", "januvia", "jardiance"].includes(d.id)
          ? 0.12
          : 0;
      const discountFactor = Math.min(0.98, Math.max(0.55, base + jitter + specialty));
      await prisma.pharmacyContract.create({
        data: {
          pharmacyId: p.id,
          drugId: d.id,
          discountFactor,
          floorPrice30: d.retailCashPrice30 > 400 ? 49.99 : 3.99,
          floorPrice90: d.retailCashPrice90 > 1000 ? 129.99 : 9.99,
          inNetwork: true,
        },
      });
    }
  }

  const passwordHash = await bcrypt.hash("password123", 10);
  await prisma.user.create({
    data: {
      email: "demo@trumprx.app",
      name: "Alex Patient",
      passwordHash,
      allowPersonalizedTips: true,
      membershipTier: "free",
    },
  });

  console.log(
    `Seeded ${DRUGS.length} drugs, ${PHARMACIES.length} pharmacies, ${ZIP_SEEDS.length} ZIPs, and demo user demo@trumprx.app / password123`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
