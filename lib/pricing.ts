import type { Club, LocalPlanPricing } from "@/lib/clubs";

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

/** National starting rates shown on the marketing matrix */
export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "classic",
    name: "Classic",
    tagline: "Our standard membership with unlimited access to your home club.",
    monthlyDues: 15,
    enrollmentFee: 0,
    annualFee: 49,
    annualFeeMonth: "June",
    cancellation:
      "Cancel anytime online or in club. No cancellation fee. Remaining prepaid days are non-refundable.",
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
    tagline:
      "Access to any club, bring a guest anytime, PF+ premium digital workouts, and so much more!",
    monthlyDues: 24.99,
    enrollmentFee: 0,
    annualFee: 49,
    annualFeeMonth: "June",
    cancellation:
      "Cancel anytime online or in club. No cancellation fee. Remaining prepaid days are non-refundable.",
    highlights: [
      "Work out at any Planet Fitness nationwide",
      "Bring one guest with you each visit",
      "Black Card Spa®: Polar Dry Plunge, red light sauna, Total Body Enhancement & more",
      "PF+ premium digital workouts in the app",
    ],
  },
];

export const PRICING_MATRIX: PricingLine[] = [
  {
    label: "Monthly dues",
    classic: "From $15 / month",
    blackCard: "From $24.99 / month",
    note: "Starting national rates. Your club confirms the local price before you pay.",
  },
  {
    label: "Enrollment / start-up fee",
    classic: "Usually $0",
    blackCard: "Usually $0",
    note: "Shown clearly for your selected club before checkout.",
  },
  {
    label: "Annual fee",
    classic: "$39–$49 / year",
    blackCard: "$49 / year",
    note: "Typically charged each June. Confirmed per club.",
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

export function getPlan(tier: MembershipTier): MembershipPlan {
  return (
    MEMBERSHIP_PLANS.find((plan) => plan.id === tier) ?? MEMBERSHIP_PLANS[1]
  );
}

export function getLocalPricing(
  club: Club | null | undefined,
  tier: MembershipTier
): LocalPlanPricing {
  if (club) return club.pricing[tier];
  const plan = getPlan(tier);
  return {
    monthlyDues: plan.monthlyDues,
    enrollmentFee: plan.enrollmentFee,
    annualFee: plan.annualFee,
    annualFeeMonth: plan.annualFeeMonth,
    available: true,
  };
}

export function dueToday(pricing: LocalPlanPricing): number {
  return pricing.enrollmentFee;
}

export function summarizeLocalRates(club: Club): string {
  const classic = club.pricing.classic;
  const black = club.pricing["black-card"];
  if (!black.available) {
    return `Classic ${formatCurrency(classic.monthlyDues)}/mo at this club`;
  }
  return `Classic ${formatCurrency(classic.monthlyDues)} · Black Card ${formatCurrency(black.monthlyDues)}/mo`;
}
