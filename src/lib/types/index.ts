/**
 * Core domain types for the Walgreens redesign.
 * Strict TypeScript models for pharmacy, search, commerce, and rewards.
 */

export type PrescriptionStatus = "received" | "filling" | "ready" | "picked_up";

export type SearchIntent = "clinical" | "pharmacy" | "retail" | "general";

export type FulfillmentMethod = "pickup" | "delivery" | "same_day";

export type CheckoutMode = "guest" | "member" | "quick_pay";

export interface CareProfile {
  id: string;
  displayName: string;
  relationship: "self" | "spouse" | "child" | "parent" | "other";
  dateOfBirth: string;
  avatarInitials: string;
  isActive: boolean;
}

export interface Prescription {
  id: string;
  rxNumber: string;
  medicationName: string;
  dosage: string;
  quantity: number;
  refillsRemaining: number;
  status: PrescriptionStatus;
  statusUpdatedAt: string;
  readyBy?: string;
  storeId: string;
  storeName: string;
  profileId: string;
  isAutoRefill: boolean;
  estimatedCopay?: number;
}

export interface PrescriptionOrder {
  id: string;
  profileId: string;
  prescriptions: Prescription[];
  currentStatus: PrescriptionStatus;
  placedAt: string;
  estimatedReadyAt?: string;
  pickupStoreId: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hoursSummary: string;
  hasDriveThru: boolean;
  latitude: number;
  longitude: number;
}

export interface NavCategory {
  id: string;
  label: string;
  href: string;
  description?: string;
  featured?: boolean;
  children?: NavLink[];
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  description?: string;
  badge?: string;
  intent?: SearchIntent;
}

export interface MegaMenuSection {
  id: string;
  title: string;
  links: NavLink[];
}

export interface MegaMenuColumn {
  id: string;
  heading: string;
  sections: MegaMenuSection[];
}

export interface SearchSuggestion {
  id: string;
  query: string;
  label: string;
  intent: SearchIntent;
  href: string;
  meta?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categoryId: string;
  subcategory?: string;
  price: number;
  compareAtPrice?: number;
  imageUrl: string;
  imageAlt: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  fulfillment: FulfillmentMethod[];
  tags: string[];
  rewardsPoints?: number;
  isPickupEligible: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  productCount: number;
}

export interface ProductFilterOption {
  id: string;
  label: string;
  value: string;
  count: number;
}

export interface ProductFilters {
  categories: ProductFilterOption[];
  brands: ProductFilterOption[];
  priceRanges: ProductFilterOption[];
  concerns: ProductFilterOption[];
  fulfillment: ProductFilterOption[];
}

export interface RewardsAccount {
  memberId: string;
  displayName: string;
  pointsBalance: number;
  tier: "member" | "plus" | "premium";
  pointsToNextReward: number;
  expiringPoints?: number;
  expiringOn?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  brand: string;
  quantity: number;
  unitPrice: number;
  imageUrl: string;
  fulfillment: FulfillmentMethod;
  rewardsPointsEarned: number;
}

export interface CheckoutSession {
  mode: CheckoutMode;
  items: CartItem[];
  subtotal: number;
  estimatedTax: number;
  shipping: number;
  rewardsDiscount: number;
  total: number;
  storeId?: string;
  email?: string;
}

export interface ClinicalService {
  id: string;
  name: string;
  description: string;
  href: string;
  durationMinutes: number;
  availableToday: boolean;
}
