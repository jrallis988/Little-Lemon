/**
 * Launch modes control how much the product promises vs what is wired.
 *
 * - limited_v1: 10 generic pharmacy-pickup meds, program price only, no Plus
 * - full: entire program catalog + optional membership (still needs partner env)
 * - demo: alias for limited_v1 in production; all catalog in development only
 */

export type LaunchMode = "limited_v1" | "full" | "demo";

/** v1 signed-off formulary — generic pharmacy pickup only */
export const V1_PHARMACY_PICKUP_DRUG_IDS = [
  "atorvastatin",
  "metformin",
  "amlodipine",
  "lisinopril",
  "omeprazole",
  "sertraline",
  "losartan",
  "gabapentin",
  "levothyroxine",
  "montelukast",
] as const;

export type V1DrugId = (typeof V1_PHARMACY_PICKUP_DRUG_IDS)[number];

export function getLaunchMode(): LaunchMode {
  const raw =
    process.env.NEXT_PUBLIC_LAUNCH_MODE ??
    process.env.TRUMPRX_LAUNCH_MODE ??
    "limited_v1";
  if (raw === "full" || raw === "demo" || raw === "limited_v1") return raw;
  return "limited_v1";
}

export function isLimitedV1Launch(): boolean {
  const mode = getLaunchMode();
  return mode === "limited_v1" || mode === "demo";
}

export function isDrugInLaunchFormulary(drugId: string): boolean {
  const mode = getLaunchMode();
  if (mode === "full") {
    // full mode uses catalog membership check in program-catalog
    return true;
  }
  if (mode === "limited_v1" || mode === "demo") {
    return (V1_PHARMACY_PICKUP_DRUG_IDS as readonly string[]).includes(drugId);
  }
  return false;
}

export interface LaunchFeatures {
  mode: LaunchMode;
  /** Stripe Plus / membership marketing */
  membership: boolean;
  /** Rx transfer request form */
  transfer: boolean;
  /** Provider inquiry portal */
  providers: boolean;
  /** Family profiles (Plus-gated) */
  familyProfiles: boolean;
  /** Manufacturer-direct access option on /access */
  manufacturerPathway: boolean;
  /** Live per-pharmacy price matrix as primary UX */
  livePharmacyPricing: boolean;
  /** Show limited-beta banner */
  showLimitedBetaBanner: boolean;
}

export function getLaunchFeatures(): LaunchFeatures {
  const mode = getLaunchMode();
  const limited = mode === "limited_v1" || mode === "demo";
  const livePricing =
    process.env.PRICING_PROVIDER === "external" &&
    Boolean(process.env.PRICING_API_URL);

  return {
    mode,
    membership: !limited,
    transfer: !limited,
    providers: !limited,
    familyProfiles: !limited,
    manufacturerPathway: !limited,
    livePharmacyPricing: livePricing,
    showLimitedBetaBanner: limited,
  };
}

export function launchModeLabel(): string {
  const mode = getLaunchMode();
  if (mode === "limited_v1") return "Limited launch (v1)";
  if (mode === "demo") return "Demo";
  return "Full program";
}
