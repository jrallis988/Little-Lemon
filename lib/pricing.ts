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
    tagline: "Home club access. Zero judgment. Straightforward price.",
    monthlyDues: 15,
    enrollmentFee: 0,
    annualFee: 49,
    annualFeeMonth: "June",
    cancellation: "Cancel anytime online or in club. No cancellation fee. Remaining prepaid days are non-refundable.",
    highlights: [
      "Unlimited access to your home club",
      "Cardio, free weights & 30-minute circuit",
      "Clean, judgment-free environment",
      "PF app for digital keytag & check-in",
    ],
  },
  {
    id: "black-card",
    name: "Black Card",
    tagline: "Every club. Spa amenities. Bring a guest anytime.",
    monthlyDues: 24.99,
    enrollmentFee: 0,
    annualFee: 49,
    annualFeeMonth: "June",
    cancellation: "Cancel anytime online or in club. No cancellation fee. Remaining prepaid days are non-refundable.",
    highlights: [
      "Use any Planet Fitness location nationwide",
      "Bring a guest every visit at no extra cost",
      "Black Card Spa: massage chairs, tanning & more",
      "PF app for digital keytag & check-in",
    ],
  },
];

export const PRICING_MATRIX: PricingLine[] = [
  {
    label: "Monthly dues",
    classic: "$15 / month",
    blackCard: "$24.99 / month",
    note: "Billed monthly. Price shown is the advertised starting rate; local clubs may vary.",
  },
  {
    label: "Enrollment / start-up fee",
    classic: "$0",
    blackCard: "$0",
    note: "No start-up fee on this offer. Always shown before you pay.",
  },
  {
    label: "Annual fee",
    classic: "$49 / year",
    blackCard: "$49 / year",
    note: "Charged each June. Displayed here — never buried in a modal.",
  },
  {
    label: "Home club access",
    classic: "Included",
    blackCard: "Included",
  },
  {
    label: "Nationwide club access",
    classic: "Not included",
    blackCard: "Included",
  },
  {
    label: "Guest privileges",
    classic: "Not included",
    blackCard: "1 guest per visit",
  },
  {
    label: "Black Card Spa amenities",
    classic: "Not included",
    blackCard: "Included where available",
  },
  {
    label: "Cancellation",
    classic: "Anytime · $0 fee",
    blackCard: "Anytime · $0 fee",
    note: "Cancel online or in club. No hidden contract traps on this page.",
  },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}
