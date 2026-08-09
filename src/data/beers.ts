export type Beer = {
  name: string;
  style: string;
  abv: string;
  note: string;
  status?: "pouring" | "limited" | "classic";
};

/** Fallback featured pours — prefer public/data/taps.json at runtime */
export const pouringNow: Beer[] = [
  {
    name: "Finestkind IPA",
    style: "American IPA",
    abv: "6.9%",
    note: "Citrusy hops, crisp body, unfiltered — the house classic.",
    status: "pouring",
  },
  {
    name: "Shoals Pale Ale",
    style: "English-Style Pale Ale",
    abv: "5.0%",
    note: "Named for the Isles of Shoals — balanced and built for another round.",
    status: "pouring",
  },
  {
    name: "Old Brown Dog",
    style: "American Brown Ale",
    abv: "5.7%",
    note: "Toasty malt and caramel. An early craft classic still pouring strong.",
    status: "pouring",
  },
  {
    name: "Magic Beans",
    style: "Coffee Ale",
    abv: "6.0%",
    note: "Roasty coffee character with a smooth malt backbone.",
    status: "pouring",
  },
  {
    name: "Hazy DIPA",
    style: "Double IPA",
    abv: "9.0%",
    note: "Big, juicy hop character with a soft haze.",
    status: "limited",
  },
  {
    name: "Raspberry Lime Rickey",
    style: "Fruit Ale",
    abv: "5.2%",
    note: "Bright raspberry-lime snap — easy Backyard pour.",
    status: "pouring",
  },
];

export const classics: Beer[] = [
  {
    name: "Old Brown Dog",
    style: "American Brown Ale",
    abv: "5.7%",
    note: "Toasty malt and caramel. An early craft classic still pouring strong.",
    status: "classic",
  },
  {
    name: "Shoals Pale Ale",
    style: "English-Style Pale Ale",
    abv: "5.0%",
    note: "Named for the Isles of Shoals — balanced and built for another round.",
    status: "classic",
  },
  {
    name: "Robust Porter",
    style: "American Porter",
    abv: "6.2%",
    note: "Dark chocolate and roast. Multiple GABF medal winner.",
    status: "classic",
  },
  {
    name: "Finestkind IPA",
    style: "American IPA",
    abv: "6.9%",
    note: "The flagship IPA — citrus, pine, and a dry finish.",
    status: "classic",
  },
];

export function tapListUpdatedLabel(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
