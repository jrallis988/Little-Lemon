export type BeerDetail = {
  slug: string;
  name: string;
  style: string;
  abv: string;
  ibu: string;
  srm: string;
  tagline: string;
  description: string;
  tastingNotes: string[];
  malt: string[];
  hops: string[];
  pairings: string[];
  packaging: { label: string; note: string }[];
  status: "year-round" | "seasonal" | "limited";
  image: string; // CampusImage name without extension
};

export const beerDetails: BeerDetail[] = [
  {
    slug: "finestkind-ipa",
    name: "Finestkind IPA",
    style: "American IPA",
    abv: "6.9%",
    ibu: "65",
    srm: "8",
    tagline: "The house classic — citrusy, crisp, unfiltered.",
    description:
      "Finestkind is the IPA that put Smuttynose on Seacoast taps. Bright citrus and pine hop character ride a clean malt backbone with just enough bitterness to keep another pint interesting.",
    tastingNotes: ["Grapefruit zest", "Pine resin", "Light biscuit malt", "Dry finish"],
    malt: ["2-Row", "Crystal 40", "Munich"],
    hops: ["Centennial", "Cascade", "Simcoe"],
    pairings: ["Fish tacos", "Sharp cheddar", "Spicy wings", "Citrus salads"],
    packaging: [
      { label: "Draft", note: "On tap at Towle Farm & accounts" },
      { label: "12oz cans", note: "6-packs in retail" },
      { label: "Growler fills", note: "When pouring on campus" },
    ],
    status: "year-round",
    image: "campus-silos",
  },
  {
    slug: "old-brown-dog",
    name: "Old Brown Dog",
    style: "American Brown Ale",
    abv: "5.7%",
    ibu: "30",
    srm: "18",
    tagline: "Toasty malt and caramel — an early craft classic.",
    description:
      "Old Brown Dog has been in the rotation since the early days. Nutty, toasty malt with caramel sweetness and a soft hop finish — built for cool evenings on the patio.",
    tastingNotes: ["Toasted bread", "Caramel", "Light chocolate", "Gentle earthiness"],
    malt: ["Pale", "Chocolate", "Crystal", "Victory"],
    hops: ["East Kent Goldings", "Fuggle"],
    pairings: ["Burgers", "BBQ", "Roasted squash", "Chocolate dessert"],
    packaging: [
      { label: "Draft", note: "Regular campus pour" },
      { label: "Bottles / cans", note: "Seasonal retail packs" },
      { label: "Growler fills", note: "Ask at the bar" },
    ],
    status: "year-round",
    image: "campus-patio",
  },
  {
    slug: "shoals-pale-ale",
    name: "Shoals Pale Ale",
    style: "English-Style Pale Ale",
    abv: "5.0%",
    ibu: "35",
    srm: "10",
    tagline: "Named for the Isles of Shoals — balanced and sessionable.",
    description:
      "A coastal pale ale with English roots: floral hops, biscuit malt, and an easy finish that belongs on a Towle Farm picnic table.",
    tastingNotes: ["Floral hops", "Biscuit", "Light caramel", "Clean finish"],
    malt: ["Maris Otter", "Crystal"],
    hops: ["East Kent Goldings", "Willamette"],
    pairings: ["Fish & chips", "Soft pretzels", "Pub cheese", "Grilled chicken"],
    packaging: [
      { label: "Draft", note: "Year-round on campus" },
      { label: "Cans", note: "Retail where available" },
    ],
    status: "year-round",
    image: "campus-day",
  },
  {
    slug: "magic-beans",
    name: "Magic Beans",
    style: "Coffee Ale",
    abv: "6.0%",
    ibu: "22",
    srm: "22",
    tagline: "Roasty coffee character with a smooth malt backbone.",
    description:
      "Coffee and craft beer, Towle Farm style — roasted bean aroma over silky malt without tipping into dessert territory.",
    tastingNotes: ["Fresh espresso", "Dark chocolate", "Light roast", "Smooth body"],
    malt: ["Pale", "Chocolate", "Oats"],
    hops: ["Noble blend"],
    pairings: ["Brunch plates", "Donuts", "Smoked meats", "Vanilla ice cream"],
    packaging: [
      { label: "Draft", note: "Rotating campus pour" },
      { label: "Limited cans", note: "When released" },
    ],
    status: "seasonal",
    image: "hayseed-plate",
  },
];

export function getBeerBySlug(slug: string) {
  return beerDetails.find((b) => b.slug === slug);
}

export function beerSlugFromName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
