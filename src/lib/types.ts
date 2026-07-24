/**
 * Core domain types for ClearDose prescription pricing platform.
 * Designed for transparent drug pricing, pharmacy discovery, and digital coupons.
 */

export type PharmacyChain =
  | "cvs"
  | "walgreens"
  | "walmart"
  | "costco"
  | "rite_aid"
  | "kroger"
  | "independent";

export type SupplyDays = 30 | 90;

export type DosageForm =
  | "tablet"
  | "capsule"
  | "solution"
  | "injection"
  | "cream"
  | "inhaler"
  | "patch";

export interface DrugStrength {
  id: string;
  label: string;
  amountMg: number;
  form: DosageForm;
}

export interface Drug {
  id: string;
  brandName: string;
  genericName: string;
  therapeuticClass: string;
  strengths: DrugStrength[];
  commonQuantities: number[];
  /** Average cash price without coupon (for savings comparison). */
  retailCashPrice30: number;
  retailCashPrice90: number;
  isControlled?: boolean;
  searchAliases: string[];
}

export interface CouponBinDetails {
  /** Bank Identification Number used by pharmacy benefit processors. */
  bin: string;
  /** Processor Control Number. */
  pcn: string;
  group: string;
  memberId: string;
  /** Value encoded in the scannable barcode. */
  barcodeValue: string;
}

export interface PharmacyHours {
  weekday: string;
  saturday: string;
  sunday: string;
  pharmacyDeskNote?: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  chain: PharmacyChain;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  latitude: number;
  longitude: number;
  hours: PharmacyHours;
  acceptsClearDoseCoupon: boolean;
  driveThru: boolean;
  /** Distance in miles from the active search location (computed). */
  distanceMiles?: number;
}

export interface PharmacyPriceOffer {
  id: string;
  pharmacyId: string;
  drugId: string;
  strengthId: string;
  quantity: number;
  supplyDays: SupplyDays;
  /** Final coupon price the patient pays at the counter. */
  couponPrice: number;
  /** Estimated retail without discount. */
  retailPrice: number;
  coupon: CouponBinDetails;
  lastUpdatedIso: string;
  inStock: boolean;
}

export interface PriceComparisonRow {
  offer: PharmacyPriceOffer;
  pharmacy: Pharmacy;
  savingsAmount: number;
  savingsPercent: number;
}

export interface DrugSearchSuggestion {
  drug: Drug;
  matchedLabel: string;
  matchType: "brand" | "generic" | "alias";
}

export interface LocationContext {
  zip: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  label: string;
}

export interface SavedMedication {
  drugId: string;
  strengthId: string;
  quantity: number;
  supplyDays: SupplyDays;
  preferredPharmacyId?: string;
  priceAlertEnabled: boolean;
  /** Lowest price observed when the alert was set. */
  alertBaselinePrice?: number;
  savedAtIso: string;
}

export interface UserProfile {
  id: string;
  displayName: string;
  email?: string;
  preferredPharmacyIds: string[];
  savedMedications: SavedMedication[];
  /** Opt-in only; searches are never sold. */
  allowPersonalizedTips: boolean;
}

export interface SearchFilters {
  supplyDays: SupplyDays;
  strengthId: string | null;
  quantity: number;
  sortBy: "price" | "distance" | "savings";
  showGenericOnly: boolean;
}

export interface SavingsTip {
  id: string;
  title: string;
  body: string;
  potentialSavingsLabel?: string;
  kind: "generic" | "supply" | "pharmacy" | "timing";
}
