export type Beer = {
  name: string;
  style: string;
  abv: string;
  note: string;
};

/** Featured pours currently highlighted on smuttynose.com */
export const pouringNow: Beer[] = [
  {
    name: "Finestkind IPA",
    style: "American IPA",
    abv: "6.9%",
    note: "Citrusy hops, crisp body, unfiltered — the house classic.",
  },
  {
    name: "Magic Beans",
    style: "Coffee Ale",
    abv: "6.0%",
    note: "Roasty coffee character with a smooth malt backbone.",
  },
  {
    name: "Hazy DIPA",
    style: "Double IPA",
    abv: "9.0%",
    note: "Big, juicy hop character with a soft haze.",
  },
  {
    name: "Raspberry Lime Rickey",
    style: "Fruit Ale",
    abv: "5.2%",
    note: "Bright raspberry-lime snap — easy Backyard pour.",
  },
];

export const classics: Beer[] = [
  {
    name: "Old Brown Dog",
    style: "American Brown Ale",
    abv: "5.7%",
    note: "Toasty malt and caramel. An early craft classic still pouring strong.",
  },
  {
    name: "Shoals Pale Ale",
    style: "English-Style Pale Ale",
    abv: "5.0%",
    note: "Named for the Isles of Shoals — balanced and built for another round.",
  },
  {
    name: "Robust Porter",
    style: "American Porter",
    abv: "6.2%",
    note: "Dark chocolate and roast. Multiple GABF medal winner.",
  },
];
