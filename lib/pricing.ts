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
    tagline: "Your home club—cardio, free weights, and a no-pressure floor.",
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
    tagline: "More clubs, spa perks, and a guest whenever you train.",
    monthlyDues: 24.99,
    enrollmentFee: 0,
    annualFee: 49,
    annualFeeMonth: "June",
    cancellation:
      "Cancel anytime online or in club. No cancellation fee. Remaining prepaid days are non-refundable.",
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
    classic: "From $15 / month",
    blackCard: "From $22.99 / month",
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
