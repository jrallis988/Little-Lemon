export type Beer = {
  name: string;
  style: string;
  abv: string;
  note: string;
};

export const beers: Beer[] = [
  {
    name: "Finestkind IPA",
    style: "American IPA",
    abv: "6.9%",
    note: "Citrusy Simcoe and Santiam hops with a crisp, unfiltered finish — the house classic.",
  },
  {
    name: "Old Brown Dog",
    style: "American Brown Ale",
    abv: "5.7%",
    note: "Toasty malt, caramel, and a smooth finish. An early craft classic still pouring strong.",
  },
  {
    name: "Shoals Pale Ale",
    style: "English-Style Pale Ale",
    abv: "5.0%",
    note: "Named for the Isles of Shoals — balanced, hop-forward, and built for another round.",
  },
  {
    name: "Robust Porter",
    style: "American Porter",
    abv: "6.2%",
    note: "Dark chocolate and roast with a clean bitterness. Multiple GABF medal winner.",
  },
];
