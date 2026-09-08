export const AISLE_COPY: Record<
  string,
  { title: string; description: string }
> = {
  skincare: {
    title: "Beauty & skincare",
    description: "Moisturizers, sunscreen, makeup, and everyday glow staples.",
  },
  vitamins: {
    title: "Vitamins & supplements",
    description: "Daily multis, immune support, and wellness essentials.",
  },
  "personal-care": {
    title: "Personal care",
    description: "Oral care, deodorant, shave, and back-to-school basics.",
  },
  "first-aid": {
    title: "Pain, cold & OTC",
    description: "Allergy, cold, pain relief, and first-aid aisle picks.",
  },
  household: {
    title: "Household",
    description: "Paper, laundry, cleaning, and kitchen refill staples.",
  },
  baby: {
    title: "Baby & family",
    description: "Diapers, wipes, formula, and caregiver must-haves.",
  },
  snacks: {
    title: "Candy & snacks",
    description: "Checkout-aisle candy, chips, drinks, and quick bites.",
  },
  contacts: {
    title: "Contacts & eye care",
    description: "Lenses, solution, and drops for clearer days.",
  },
};

export const CONCERN_TAG_MAP: Record<string, string[]> = {
  "dry-skin": ["dry skin", "fragrance free", "moisturizing"],
  sun: ["broad spectrum", "sunscreen", "sun"],
  immune: ["immune support", "USP verified", "multi"],
  cold: ["cold", "cough", "allergy", "OTC", "fever"],
};
