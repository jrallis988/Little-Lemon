export type MerchItem = {
  id: string;
  name: string;
  category: "Apparel" | "Glassware" | "Accessories";
  price: number;
  note: string;
  /** CampusImage name under public/images/ */
  image: string;
  color: string;
};

export const merch: MerchItem[] = [
  {
    id: "tee-seal",
    name: "Seal Logo Tee",
    category: "Apparel",
    price: 28,
    note: "Soft cotton. Unisex fit.",
    image: "campus-sign",
    color: "#9a2f24",
  },
  {
    id: "hoodie-towle",
    name: "Towle Farm Hoodie",
    category: "Apparel",
    price: 58,
    note: "Heavyweight fleece for patio nights.",
    image: "campus-entrance",
    color: "#1a4f5c",
  },
  {
    id: "cap-buoy",
    name: "Buoy Cap",
    category: "Apparel",
    price: 24,
    note: "Structured dad hat, embroidered seal.",
    image: "campus-day",
    color: "#d94e1f",
  },
  {
    id: "pint-finestkind",
    name: "Finestkind Pint",
    category: "Glassware",
    price: 12,
    note: "16oz branded glass.",
    image: "campus-silos",
    color: "#0c1620",
  },
  {
    id: "mug-suds",
    name: "Suds Club Mug",
    category: "Glassware",
    price: 18,
    note: "Member-favorite ceramic mug.",
    image: "hayseed-plate",
    color: "#5c6b75",
  },
  {
    id: "growler-64",
    name: "64oz Growler",
    category: "Glassware",
    price: 22,
    note: "Fill on campus when pouring.",
    image: "campus-patio",
    color: "#1a4f5c",
  },
  {
    id: "coaster-set",
    name: "Seal Coaster Set",
    category: "Accessories",
    price: 14,
    note: "Set of four. Cork-backed.",
    image: "campus-sign",
    color: "#9aabb6",
  },
  {
    id: "koozie",
    name: "Island Koozie",
    category: "Accessories",
    price: 8,
    note: "Keeps the can cold on the lawn.",
    image: "campus-dusk",
    color: "#d94e1f",
  },
];
