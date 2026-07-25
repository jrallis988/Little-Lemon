export type Beer = {
  name: string;
  style: string;
  abv: string;
  note: string;
};

export const beers: Beer[] = [
  {
    name: "River Latch",
    style: "American Pale Ale",
    abv: "5.4%",
    note: "Bright citrus peel over clean malt — our house pour.",
  },
  {
    name: "Millstone Stout",
    style: "Oatmeal Stout",
    abv: "6.1%",
    note: "Roasted grain, soft coffee, and a velvet finish.",
  },
  {
    name: "Hearth Lager",
    style: "Czech-Style Pils",
    abv: "4.8%",
    note: "Crisp, floral hops with a long mineral snap.",
  },
  {
    name: "Barn Door",
    style: "New England IPA",
    abv: "6.8%",
    note: "Hazy mango and pine, soft body, low bitterness.",
  },
];
