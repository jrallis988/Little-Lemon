import type { LocationContext, PharmacyChain } from "@/lib/types";

export const CHAIN_LABELS: Record<PharmacyChain, string> = {
  cvs: "CVS",
  walgreens: "Walgreens",
  walmart: "Walmart",
  costco: "Costco",
  rite_aid: "Rite Aid",
  kroger: "Kroger",
  independent: "Independent",
};

export const DEFAULT_LOCATION: LocationContext = {
  zip: "10001",
  city: "New York",
  state: "NY",
  latitude: 40.7506,
  longitude: -73.9971,
  label: "New York, NY 10001",
};
