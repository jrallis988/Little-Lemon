export type PlanFeatureKey =
  | "pathways"
  | "wwLife"
  | "kitchen"
  | "team"
  | "momentum"
  | "glp1Support"
  | "clinic";

export type PlanTier = {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  tagline: string;
  cta: string;
  recommended?: boolean;
  pathwayFit: string[];
  features: Record<PlanFeatureKey, boolean | "partial">;
};

export const planFeatures: { key: PlanFeatureKey; label: string }[] = [
  { key: "pathways", label: "WW Pathways personalization" },
  { key: "wwLife", label: "WW Life dashboard & check-ins" },
  { key: "kitchen", label: "WW Kitchen planner & grocery" },
  { key: "team", label: "My WW Team coaching" },
  { key: "momentum", label: "WW Momentum insights" },
  { key: "glp1Support", label: "Life After GLP-1 education" },
  { key: "clinic", label: "Clinician-supported Med+ pathway" },
];

export const planTiers: PlanTier[] = [
  {
    id: "points",
    name: "Points + Coaching",
    price: "From $12/mo*",
    priceNote: "Concept pricing · 12-month plan shown for comparison",
    tagline: "Nutrition structure, recipes, and coach access for everyday life.",
    cta: "Explore Points pathway",
    pathwayFit: ["lose", "maintain", "eat", "living"],
    features: {
      pathways: true,
      wwLife: "partial",
      kitchen: true,
      team: "partial",
      momentum: "partial",
      glp1Support: false,
      clinic: false,
    },
  },
  {
    id: "life-complete",
    name: "WW Life Complete",
    price: "From $29/mo*",
    priceNote: "Concept bundle · flagship experience",
    tagline: "Full WW Life, Pathways, Kitchen, Team, and Momentum in one shell.",
    cta: "See WW Life flow",
    recommended: true,
    pathwayFit: ["strength", "eat", "living", "maintain"],
    features: {
      pathways: true,
      wwLife: true,
      kitchen: true,
      team: true,
      momentum: true,
      glp1Support: "partial",
      clinic: false,
    },
  },
  {
    id: "med-plus",
    name: "Med+ with Clinic",
    price: "From $74/mo*",
    priceNote: "Membership only · medication not included",
    tagline: "Clinician support plus behavioral companionship for GLP-1 and beyond.",
    cta: "Explore Med+ concept",
    pathwayFit: ["glp1", "lose", "strength"],
    features: {
      pathways: true,
      wwLife: true,
      kitchen: true,
      team: true,
      momentum: true,
      glp1Support: true,
      clinic: true,
    },
  },
];

export function recommendPlan(pathwayId: string): PlanTier {
  const match = planTiers.find((tier) => tier.pathwayFit.includes(pathwayId));
  return match ?? planTiers.find((tier) => tier.recommended) ?? planTiers[1];
}
