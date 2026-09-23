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

/** Stats & copy aligned to smuttynose.com/smuttynose-beers/ */
export const beerDetails: BeerDetail[] = [
  {
    slug: "finestkind-ipa",
    name: "Finestkind IPA",
    style: "American IPA",
    abv: "6.9%",
    ibu: "76",
    srm: "8",
    tagline: "Citrus, pine, and a satisfying bitter kick.",
    description:
      "Finestkind IPA is our ode to life’s finest times — an enduring reminder to find balance and savor every moment. Brewed with ample heapings of Simcoe and Amarillo hops, it’s bold in both flavor and aroma, with distinct notes of citrus and pine. Consider this your sidekick beer. First brewed 2010.",
    tastingNotes: ["Citrus", "Pine", "Bold aroma", "Satisfying bitterness"],
    malt: ["North American 2-Row", "Crisp Pale Ale", "C-60"],
    hops: ["Magnum (bittering)", "Simcoe", "Centennial", "Santiam", "Amarillo (dry hop)"],
    pairings: ["Fish tacos", "Sharp cheddar", "Spicy wings", "Citrus salads"],
    packaging: [
      { label: "Draft", note: "On tap at Towle Farm & accounts" },
      { label: "Cans & bottles", note: "Core year-round retail" },
      { label: "Growler fills", note: "When pouring on campus" },
    ],
    status: "year-round",
    image: "campus-silos",
  },
  {
    slug: "old-brown-dog",
    name: "Old Brown Dog",
    style: "American Brown Ale",
    abv: "6.5%",
    ibu: "30",
    srm: "18",
    tagline: "Award-winning malt depth since 1994.",
    description:
      "An award-winning example of the style — reach for this when the occasion calls for something big on flavor but without the hop punch. Deep amber, toasty and caramel-forward. First brewed 1994.",
    tastingNotes: ["Toasted bread", "Caramel", "Light chocolate", "Gentle earthiness"],
    malt: ["North American 2-Row", "Munich 10L", "C-120", "Wheat"],
    hops: ["Cascade", "Galena", "Willamette"],
    pairings: ["Burgers", "BBQ", "Roasted squash", "Chocolate dessert"],
    packaging: [
      { label: "Draft", note: "Regular campus pour" },
      { label: "Cans & bottles", note: "Core year-round retail" },
      { label: "Growler fills", note: "Ask at the bar" },
    ],
    status: "year-round",
    image: "campus-patio",
  },
  {
    slug: "whole-lotta-haze",
    name: "Whole Lotta Haze",
    style: "NEIPA",
    abv: "6.5%",
    ibu: "20",
    srm: "4",
    tagline: "Punch-you-in-the-face tropical NEIPA.",
    description:
      "Whole Lotta Haze uses mash-hopping — hops in the mash and kettle — plus thiol extraction and a unique yeast strain for intense tropical fruit flavors with a soft, pillowy finish. First brewed 2023.",
    tastingNotes: ["Tropical fruit", "Soft haze", "Pillowy mouthfeel", "Juicy finish"],
    malt: [
      "2-row Pale Silo Malt",
      "Malted Oats",
      "Malted White Wheat",
      "Golden Naked Oats",
    ],
    hops: ["Cascade", "Citra", "Galaxy", "Calypso"],
    pairings: ["Thai noodles", "Fish tacos", "Mango salsa", "Soft pretzels"],
    packaging: [
      { label: "Draft", note: "Year-round on campus" },
      { label: "Cans", note: "Core year-round retail" },
    ],
    status: "year-round",
    image: "campus-day",
  },
  {
    slug: "magic-beans",
    name: "Magic Beans",
    style: "Coffee Porter",
    abv: "6.0%",
    ibu: "30",
    srm: "30",
    tagline: "Dark roast coffee porter for wild New England weather.",
    description:
      "Winter wouldn’t be the same without the rich flavor of a hearty coffee porter brewed with dark roast coffee. Seasonal cans and draft. First brewed 2024.",
    tastingNotes: ["Fresh espresso", "Dark chocolate", "Roasty body", "Smooth finish"],
    malt: [
      "2-Row",
      "Munich",
      "C-60",
      "Crisp Chocolate",
      "Caramunich",
    ],
    hops: ["Willamette"],
    pairings: ["Brunch plates", "Donuts", "Smoked meats", "Vanilla ice cream"],
    packaging: [
      { label: "Draft", note: "Seasonal campus pour" },
      { label: "Cans", note: "Seasonal retail" },
    ],
    status: "seasonal",
    image: "hayseed-plate",
  },
  {
    slug: "summer-ale",
    name: "Summer Ale",
    style: "Blonde Ale",
    abv: "5.0%",
    ibu: "25",
    srm: "6",
    tagline: "Easy-drinking blonde with light citrus notes.",
    description:
      "An easy-to-drink 5% ABV blonde ale with light citrus notes and a thirst-quenching finish — built for lake days and golden-hour patio seats. Seasonal cans and draft. First brewed 2025.",
    tastingNotes: ["Light citrus", "Clean malt", "Crisp finish", "Sessionable"],
    malt: ["CaraMun", "Silo Malt"],
    hops: ["Cascade", "Mosaic"],
    pairings: ["Grilled seafood", "Salads", "Picnic boards", "Soft cheese"],
    packaging: [
      { label: "Draft", note: "Seasonal on campus" },
      { label: "Cans", note: "Seasonal retail" },
    ],
    status: "seasonal",
    image: "campus-entrance",
  },
  {
    slug: "key-lime-pie-sour",
    name: "Key Lime Pie Sour",
    style: "Sour Ale",
    abv: "5.2%",
    ibu: "8",
    srm: "4",
    tagline: "Dessert-inspired sour — tart key lime with a graham cracker finish.",
    description:
      "A newer classic called out alongside Finestkind and Whole Lotta Haze — bright key lime acidity layered with subtle sweetness. Seasonal release when available.",
    tastingNotes: ["Key lime", "Tart citrus", "Light sweetness", "Crisp finish"],
    malt: ["2-Row", "Wheat", "Oats"],
    hops: ["Noble blend"],
    pairings: ["Key lime pie", "Ceviche", "Goat cheese", "Berries"],
    packaging: [
      { label: "Draft", note: "Seasonal campus pour" },
      { label: "Cans", note: "When released" },
    ],
    status: "seasonal",
    image: "campus-sign",
  },
  {
    slug: "pumpkin-ale",
    name: "Pumpkin Ale",
    style: "Pumpkin Ale",
    abv: "5.9%",
    ibu: "54",
    srm: "14",
    tagline: "New England colonial roots — stands out in a sea of imitators.",
    description:
      "Our homage to historic beer recipes calling for pumpkins dating back to colonial times. Deep orange, malty, and fiercely proud. First brewed 2010.",
    tastingNotes: ["Pumpkin spice", "Toasted malt", "Caramel", "Warm finish"],
    malt: ["North American 2-row", "Carastan", "C-60"],
    hops: ["Cascade", "Liberty"],
    pairings: ["Roasted turkey", "Sharp cheddar", "Apple pie", "Chili"],
    packaging: [
      { label: "Draft", note: "Seasonal" },
      { label: "Cans", note: "Fall retail" },
    ],
    status: "seasonal",
    image: "campus-dusk",
  },
  {
    slug: "blackberry-ale",
    name: "Blackberry Ale",
    style: "Fruit Ale",
    abv: "5.2%",
    ibu: "10",
    srm: "5",
    tagline: "Fresh blackberry flavor from first sip to last.",
    description:
      "Luscious blackberry explodes from the first sip while clean tartness leaves your palate tingling. Q1 release — cans and draft. First brewed 2026.",
    tastingNotes: ["Fresh blackberry", "Clean tartness", "Light malt", "Bright finish"],
    malt: ["2-Row", "White Wheat", "CaraFoam", "Flaked Wheat"],
    hops: ["Magnum"],
    pairings: ["Salads", "Soft cheese", "Grilled chicken", "Summer desserts"],
    packaging: [
      { label: "Draft", note: "Seasonal campus pour" },
      { label: "Cans", note: "Q1 release" },
    ],
    status: "seasonal",
    image: "campus-patio",
  },
  {
    slug: "cold-shoals-light-lager",
    name: "Cold Shoals Light Lager",
    style: "Light Lager",
    abv: "4.0%",
    ibu: "25",
    srm: "3",
    tagline: "Crisp tribute to the Isles of Shoals — crushable and clean.",
    description:
      "A liquid tribute to the Isle of Shoals off the NH coast. Crisp, clean, and crushable with just a kiss of hops. Bright gold. First brewed 2026.",
    tastingNotes: ["Crisp malt", "Clean lager", "Light hop kiss", "Dry finish"],
    malt: ["2-Row", "Munich", "C-60"],
    hops: ["Willamette"],
    pairings: ["Beach food", "Oysters", "Burgers", "Corn on the cob"],
    packaging: [
      { label: "Draft", note: "Seasonal" },
      { label: "Cans", note: "When released" },
    ],
    status: "seasonal",
    image: "campus-day",
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
