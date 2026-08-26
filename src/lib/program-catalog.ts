/**
 * Program metadata for TrumpRx-supported medications.
 * Scope is intentionally limited — only select medications are included.
 */

import {
  getLaunchMode,
  isDrugInLaunchFormulary,
} from "@/lib/launch-mode";

export type ProductType = "brand" | "generic" | "compounded";

export type FulfillmentPath =
  | "pharmacy_pickup"
  | "manufacturer_direct"
  | "specialty"
  | "program_specific";

export interface EligibilityProfile {
  whoMayQualify: string[];
  whoMayNotQualify: string[];
  insuranceRequired: boolean;
  commercialInsurance: string;
  medicare: string;
  medicaid: string;
  uninsured: string;
  manufacturerRestrictions: string[];
  determinationNote: string;
}

export interface FulfillmentProfile {
  path: FulfillmentPath;
  label: string;
  summary: string;
  whereToGetIt: string;
  canUseExistingPharmacy: string;
  cvs: string;
  walgreens: string;
  shipped: boolean;
  whoShips: string | null;
  typicalDelivery: string | null;
  expeditedAvailable: string | null;
  deliveryProblemsContact: string | null;
  steps: string[];
}

export interface ProgramDrugMeta {
  manufacturer: string;
  productType: ProductType;
  /** What the patient actually receives under this TrumpRx option */
  receivingLabel: string;
  receivingDetail: string;
  fulfillment: FulfillmentProfile;
  eligibility: EligibilityProfile;
  /** Typical program cash price used for comparison module (prototype). */
  programPrice30: number;
}

const PHARMACY_PICKUP_BASE: Omit<
  FulfillmentProfile,
  "summary" | "steps"
> = {
  path: "pharmacy_pickup",
  label: "Pick up at a participating pharmacy",
  whereToGetIt:
    "Present TrumpRx program information at a participating retail pharmacy with a valid prescription.",
  canUseExistingPharmacy:
    "Only if your pharmacy participates in this program. Ask the pharmacist before you fill.",
  cvs: "Many CVS Pharmacy locations accept TrumpRx cash-discount programs when in network for that medication.",
  walgreens:
    "Many Walgreens locations accept TrumpRx cash-discount programs when in network for that medication.",
  shipped: false,
  whoShips: null,
  typicalDelivery: null,
  expeditedAvailable: null,
  deliveryProblemsContact:
    "Contact the pharmacy that filled your prescription for pickup or fill issues.",
};

const MANUFACTURER_DIRECT_BASE: Omit<
  FulfillmentProfile,
  "summary" | "steps" | "whoShips" | "typicalDelivery"
> = {
  path: "manufacturer_direct",
  label: "Manufacturer-direct program",
  whereToGetIt:
    "Enrollment and fulfillment are handled by the manufacturer (or their specialty partner), not TrumpRx.",
  canUseExistingPharmacy:
    "Usually no — this option ships from the manufacturer program, not your local retail pharmacy.",
  cvs: "CVS retail pickup is generally not the fulfillment path for this manufacturer program.",
  walgreens:
    "Walgreens retail pickup is generally not the fulfillment path for this manufacturer program.",
  shipped: true,
  expeditedAvailable:
    "Depends on the manufacturer program. TrumpRx does not control shipping speed.",
  deliveryProblemsContact:
    "Contact the manufacturer program or shipper listed on your enrollment confirmation — not TrumpRx pharmacy support.",
};

function pharmacyEligibility(extraRestrictions: string[] = []): EligibilityProfile {
  return {
    whoMayQualify: [
      "People with a valid U.S. prescription for this medication",
      "Uninsured / self-pay patients comparing cash options",
      "Commercially insured patients who may pay less with cash discount than their copay (compare before filling)",
    ],
    whoMayNotQualify: [
      "Situations where the pharmacy cannot process the program for this NDC",
      "Patients required by their plan to use a different exclusive specialty channel",
      ...extraRestrictions,
    ],
    insuranceRequired: false,
    commercialInsurance:
      "Commercial insurance is not required. You generally cannot combine this cash-discount program with insurance on the same fill — ask the pharmacist which option costs less.",
    medicare:
      "Medicare patients should compare carefully. Federal rules and plan design can limit when cash-discount cards may be used. TrumpRx does not determine Medicare coverage.",
    medicaid:
      "Medicaid fills usually follow state Medicaid pharmacy rules. This cash program typically cannot replace a Medicaid claim.",
    uninsured:
      "Uninsured / self-pay patients are a primary audience for pharmacy pickup cash-discount pricing.",
    manufacturerRestrictions: extraRestrictions,
    determinationNote:
      "TrumpRx explains typical program rules. Final acceptance and pricing are determined at the pharmacy (and by the pharmacy benefit processor), not by TrumpRx.",
  };
}

function manufacturerEligibility(
  manufacturer: string,
  restrictions: string[]
): EligibilityProfile {
  return {
    whoMayQualify: [
      "Patients who meet the manufacturer program’s published eligibility criteria",
      "Often commercially insured patients under specific plan types — confirm on the manufacturer site",
    ],
    whoMayNotQualify: [
      "Patients who do not meet manufacturer eligibility (including some government insurance categories)",
      ...restrictions,
    ],
    insuranceRequired: false,
    commercialInsurance:
      "Many manufacturer programs are designed around commercial insurance. Confirm on the manufacturer enrollment flow.",
    medicare:
      "Medicare eligibility is usually restricted or excluded from manufacturer copay/assistance programs. The manufacturer (not TrumpRx) determines this.",
    medicaid:
      "Medicaid is commonly excluded from manufacturer patient programs. Confirm with the manufacturer.",
    uninsured:
      "Some manufacturer programs support uninsured patients; others do not. Check the manufacturer’s eligibility page.",
    manufacturerRestrictions: restrictions,
    determinationNote: `${manufacturer} (or their program administrator) makes the final eligibility determination — not TrumpRx.`,
  };
}

/** Prototype program prices — illustrative cash options for comparison UI. */
const GENERIC_PROGRAM: Partial<ProgramDrugMeta> = {
  productType: "generic",
  receivingLabel: "Generic medication",
  receivingDetail:
    "You receive the generic product dispensed by the pharmacy (same active ingredient as the brand reference). This is not the brand-name product unless your prescription and pharmacy dispense brand.",
};

const BRAND_PROGRAM: Partial<ProgramDrugMeta> = {
  productType: "brand",
  receivingLabel: "Brand-name medication",
  receivingDetail:
    "When this TrumpRx option applies, you receive the brand-name product identified on this page — not an automatic generic substitution — unless your clinician and pharmacy authorize otherwise.",
};

function metaFor(
  id: string,
  manufacturer: string,
  overrides: Partial<ProgramDrugMeta> & {
    programPrice30: number;
    productType: ProductType;
  }
): ProgramDrugMeta {
  const isBrand = overrides.productType === "brand";
  const isManufacturer =
    overrides.fulfillment?.path === "manufacturer_direct" ||
    overrides.fulfillment?.path === "specialty";

  const baseReceiving = isBrand ? BRAND_PROGRAM : GENERIC_PROGRAM;

  const fulfillment: FulfillmentProfile =
    overrides.fulfillment ??
    ({
      ...PHARMACY_PICKUP_BASE,
      summary:
        "Use a TrumpRx cash-discount option at a participating retail pharmacy with your prescription.",
      steps: [
        "Confirm this medication is included and review eligibility notes",
        "Compare TrumpRx price with what you currently pay",
        "Get program / coupon information",
        "Choose a participating pharmacy",
        "Present information at the pharmacy and fill your prescription",
      ],
    } satisfies FulfillmentProfile);

  return {
    manufacturer,
    productType: overrides.productType,
    receivingLabel:
      overrides.receivingLabel ?? baseReceiving.receivingLabel ?? "Medication",
    receivingDetail:
      overrides.receivingDetail ??
      baseReceiving.receivingDetail ??
      "",
    fulfillment,
    eligibility:
      overrides.eligibility ??
      (isManufacturer
        ? manufacturerEligibility(manufacturer, [])
        : pharmacyEligibility()),
    programPrice30: overrides.programPrice30,
  };
}

const CATALOG: Record<string, ProgramDrugMeta> = {
  atorvastatin: metaFor("atorvastatin", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 9.42,
  }),
  metformin: metaFor("metformin", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 4.18,
  }),
  amlodipine: metaFor("amlodipine", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 6.25,
  }),
  sertraline: metaFor("sertraline", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 7.9,
  }),
  omeprazole: metaFor("omeprazole", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 8.15,
  }),
  losartan: metaFor("losartan", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 7.4,
  }),
  gabapentin: metaFor("gabapentin", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 11.2,
  }),
  levothyroxine: metaFor("levothyroxine", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 10.55,
  }),
  albuterol: metaFor("albuterol", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 28.4,
  }),
  montelukast: metaFor("montelukast", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 12.8,
  }),
  lisinopril: metaFor("lisinopril", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 5.1,
  }),
  hydrochlorothiazide: metaFor(
    "hydrochlorothiazide",
    "Multiple (generic manufacturers)",
    { productType: "generic", programPrice30: 4.75 }
  ),
  ozempic: metaFor("ozempic", "Novo Nordisk", {
    productType: "brand",
    programPrice30: 499,
    eligibility: manufacturerEligibility("Novo Nordisk", [
      "Government insurance (including many Medicare/Medicaid situations) is commonly excluded from manufacturer savings programs",
    ]),
    fulfillment: {
      ...MANUFACTURER_DIRECT_BASE,
      whoShips: "Manufacturer specialty pharmacy / program partner",
      typicalDelivery: "Typically 5–10 business days after enrollment approval",
      summary:
        "Continue to the manufacturer program for enrollment, payment, and shipment. TrumpRx does not sell or ship Ozempic.",
      steps: [
        "Review eligibility notes on this page",
        "Continue to the manufacturer program",
        "Complete manufacturer enrollment / order",
        "Manufacturer (or partner) handles payment and fulfillment",
      ],
    },
  }),
  wegovy: metaFor("wegovy", "Novo Nordisk", {
    productType: "brand",
    programPrice30: 599,
    eligibility: manufacturerEligibility("Novo Nordisk", [
      "Government insurance categories are commonly excluded",
    ]),
    fulfillment: {
      ...MANUFACTURER_DIRECT_BASE,
      whoShips: "Manufacturer specialty pharmacy / program partner",
      typicalDelivery: "Typically 5–10 business days after enrollment approval",
      summary:
        "Manufacturer-direct access path. TrumpRx helps you understand the option; Novo Nordisk’s program handles enrollment and shipping.",
      steps: [
        "Review eligibility notes",
        "Continue to the manufacturer program",
        "Complete manufacturer enrollment / order",
        "Manufacturer handles payment and fulfillment",
      ],
    },
  }),
  zepbound: metaFor("zepbound", "Eli Lilly", {
    productType: "brand",
    programPrice30: 549,
    eligibility: manufacturerEligibility("Eli Lilly", [
      "Government insurance categories are commonly excluded",
    ]),
    fulfillment: {
      ...MANUFACTURER_DIRECT_BASE,
      whoShips: "Manufacturer specialty pharmacy / program partner",
      typicalDelivery: "Typically 5–10 business days after enrollment approval",
      summary:
        "Manufacturer-direct specialty pathway. TrumpRx is not the seller or shipper.",
      steps: [
        "Review eligibility",
        "Continue to the manufacturer program",
        "Complete enrollment / order with the manufacturer",
        "Manufacturer handles payment and fulfillment",
      ],
    },
  }),
  eliquis: metaFor("eliquis", "Bristol Myers Squibb / Pfizer", {
    productType: "brand",
    programPrice30: 189,
    fulfillment: {
      ...PHARMACY_PICKUP_BASE,
      path: "program_specific",
      label: "Participating pharmacy or specialty program",
      summary:
        "Depending on your situation, access may be a participating pharmacy cash option or a manufacturer-linked specialty path.",
      steps: [
        "Review eligibility and compare your current cost",
        "Choose pharmacy pickup or manufacturer-linked next step",
        "Complete the selected pathway",
      ],
    },
  }),
  pantoprazole: metaFor("pantoprazole", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 9.05,
  }),
  escitalopram: metaFor("escitalopram", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 8.6,
  }),
  rosuvastatin: metaFor("rosuvastatin", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 11.75,
  }),
  duloxetine: metaFor("duloxetine", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 14.2,
  }),
  tramadol: metaFor("tramadol", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 12.4,
    eligibility: pharmacyEligibility([
      "Controlled-substance dispensing rules and pharmacy policies still apply",
    ]),
  }),
  sildenafil: metaFor("sildenafil", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 18.5,
  }),
  tadalafil: metaFor("tadalafil", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 22.1,
  }),
  fluoxetine: metaFor("fluoxetine", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 7.25,
  }),
  prednisone: metaFor("prednisone", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 6.8,
  }),
  amoxicillin: metaFor("amoxicillin", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 9.9,
  }),
  azithromycin: metaFor("azithromycin", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 11.3,
  }),
  clopidogrel: metaFor("clopidogrel", "Multiple (generic manufacturers)", {
    productType: "generic",
    programPrice30: 10.15,
  }),
  januvia: metaFor("januvia", "Merck", {
    productType: "brand",
    programPrice30: 245,
    eligibility: manufacturerEligibility("Merck", [
      "Manufacturer assistance programs often exclude government insurance",
    ]),
    fulfillment: {
      ...MANUFACTURER_DIRECT_BASE,
      path: "specialty",
      label: "Specialty / manufacturer program",
      whoShips: "Specialty pharmacy partner",
      typicalDelivery: "Varies — often 3–7 business days after approval",
      summary:
        "Brand diabetes therapy often routes through specialty or manufacturer programs rather than a simple retail coupon.",
      steps: [
        "Review eligibility",
        "Continue to the manufacturer / specialty pathway",
        "Complete enrollment",
        "Specialty partner fulfills when approved",
      ],
    },
  }),
  jardiance: metaFor("jardiance", "Boehringer Ingelheim / Eli Lilly", {
    productType: "brand",
    programPrice30: 265,
    eligibility: manufacturerEligibility("Boehringer Ingelheim / Eli Lilly", [
      "Manufacturer programs often exclude government insurance",
    ]),
    fulfillment: {
      ...MANUFACTURER_DIRECT_BASE,
      path: "specialty",
      label: "Specialty / manufacturer program",
      whoShips: "Specialty pharmacy partner",
      typicalDelivery: "Varies — often 3–7 business days after approval",
      summary:
        "Access is typically through a specialty or manufacturer-linked program. TrumpRx does not dispense Jardiance.",
      steps: [
        "Review eligibility",
        "Continue to manufacturer / specialty pathway",
        "Complete enrollment",
        "Partner fulfills when approved",
      ],
    },
  }),
};

export function getProgramMeta(drugId: string): ProgramDrugMeta | null {
  return CATALOG[drugId] ?? null;
}

export function isIncludedMedication(drugId: string): boolean {
  if (!(drugId in CATALOG)) return false;
  if (getLaunchMode() === "full") return true;
  return isDrugInLaunchFormulary(drugId);
}

export const PRODUCT_TYPE_LABEL: Record<ProductType, string> = {
  brand: "Brand-name medication",
  generic: "Generic medication",
  compounded: "Compounded medication",
};
