export type MembershipTier = "classic" | "black-card";

export type PricingLine = {
  label: string;
  classic: string;
  blackCard: string;
  note?: string;
};

export type MembershipPlan = {
  id: MembershipTier;
  name: string;
  tagline: string;
  monthlyDues: number;
  enrollmentFee: number;
  annualFee: number;
  annualFeeMonth: string;
  cancellation: string;
  highlights: string[];
};

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "classic",
    name: "Classic",
    tagline: "Your home club—cardio, free weights, and a no-pressure floor.",
    monthlyDues: 15,
    enrollmentFee: 0,
    annualFee: 49,
    annualFeeMonth: "June",
    cancellation: "Cancel anytime online or in club. No cancellation fee. Remaining prepaid days are non-refundable.",
    highlights: [
      "Unlimited visits to your home club",
      "Cardio machines, free weights & 30-minute circuit",
      "A clean, judgment-free workout space",
      "Digital keytag & check-in in the PF app",
    ],
  },
  {
    id: "black-card",
    name: "Black Card",
    tagline: "More clubs, spa perks, and a guest whenever you train.",
    monthlyDues: 24.99,
    enrollmentFee: 0,
    annualFee: 49,
    annualFeeMonth: "June",
    cancellation: "Cancel anytime online or in club. No cancellation fee. Remaining prepaid days are non-refundable.",
    highlights: [
      "Work out at any Planet Fitness nationwide",
      "Bring one guest with you each visit",
      "Black Card Spa: massage chairs, tanning & more",
      "Digital keytag & check-in in the PF app",
    ],
  },
];

export const PRICING_MATRIX: PricingLine[] = [
  {
    label: "Monthly dues",
    classic: "$15 / month",
    blackCard: "$24.99 / month",
    note: "Billed monthly. Starting rate shown; your local club may differ slightly.",
  },
  {
    label: "Enrollment / start-up fee",
    classic: "$0",
    blackCard: "$0",
    note: "No start-up fee on this offer. You’ll see it clearly before you pay.",
  },
  {
    label: "Annual fee",
    classic: "$49 / year",
    blackCard: "$49 / year",
    note: "Charged each June. Listed here so it isn’t a surprise later.",
  },
  {
    label: "Home club access",
    classic: "Included",
    blackCard: "Included",
  },
  {
    label: "Any Planet Fitness club",
    classic: "Not included",
    blackCard: "Included",
  },
  {
    label: "Guest with you",
    classic: "Not included",
    blackCard: "1 guest per visit",
  },
  {
    label: "Black Card Spa",
    classic: "Not included",
    blackCard: "Included where available",
  },
  {
    label: "Cancel your membership",
    classic: "Anytime · $0 fee",
    blackCard: "Anytime · $0 fee",
    note: "Cancel online or at your club. No cancellation fee.",
  },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}
