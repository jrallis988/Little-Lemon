import type { Department } from "@/types"

export type NavPreset = {
  id: string
  /** Compact label for top nav */
  label: string
  /** Full menu label */
  menuLabel: string
  description: string
  departments?: Department[]
  categories?: string[]
  query?: string
}

/**
 * Complete Marshalls-style shop taxonomy used by header, mobile menu, and footer.
 */
export const SHOP_NAV: NavPreset[] = [
  {
    id: "footwear",
    label: "Footwear",
    menuLabel: "Footwear",
    description: "Women's, men's, and children's shoes",
    categories: ["Shoes"],
  },
  {
    id: "apparel",
    label: "Apparel",
    menuLabel: "Apparel & Clothing",
    description: "Tops, denim, dresses, outerwear, and more",
    categories: [
      "Blazers",
      "Knitwear",
      "Denim",
      "Dresses",
      "Outerwear",
      "Pants",
      "Basics",
      "Skirts",
      "Tops",
      "Shirts",
      "Activewear",
      "Polos",
      "Sets",
      "Hoodies",
      "Swim",
      "Apparel",
    ],
  },
  {
    id: "women",
    label: "Women",
    menuLabel: "Women's Wear",
    description: "Apparel, shoes, and accessories for women",
    departments: ["Women"],
  },
  {
    id: "juniors",
    label: "Juniors",
    menuLabel: "Juniors",
    description: "Trendy styles for juniors",
    departments: ["Juniors"],
  },
  {
    id: "men",
    label: "Men",
    menuLabel: "Men's Department",
    description: "Men's clothing, shoes, and accessories",
    departments: ["Men"],
  },
  {
    id: "boys-girls",
    label: "Boys & Girls",
    menuLabel: "Boys' & Girls' Clothing",
    description: "Clothing for boys and girls",
    departments: ["Boys", "Girls"],
  },
  {
    id: "baby",
    label: "Baby",
    menuLabel: "Baby Apparel",
    description: "Baby and toddler clothing",
    departments: ["Kids"],
  },
  {
    id: "kids-gear",
    label: "Kids' Gear",
    menuLabel: "Baby & Kids' Gear and Gifts",
    description: "Non-clothing items, baby care, and children's gifts",
    departments: ["Kids", "Boys", "Girls"],
    categories: ["Accessories", "Bags", "Toys"],
  },
  {
    id: "home",
    label: "Home",
    menuLabel: "Home Goods & Decor",
    description: "Bedding, pillows, blankets, wall art, lighting, and seasonal items",
    departments: ["Home"],
    categories: ["Bedding", "Furniture", "Lighting", "Rugs", "Decor", "Bath"],
  },
  {
    id: "beauty",
    label: "Bath & Beauty",
    menuLabel: "Bath & Beauty",
    description: "Skincare, haircare, cosmetics, fragrances, and bath accessories",
    departments: ["Beauty"],
  },
  {
    id: "kitchen",
    label: "Kitchen",
    menuLabel: "Kitchen & Dining",
    description: "Cookware, small appliances, tableware, glassware, and food storage",
    departments: ["Home"],
    categories: ["Kitchen", "Tabletop"],
  },
  {
    id: "gourmet",
    label: "Gourmet",
    menuLabel: "Gourmet & Specialty Food",
    description: "Sweets, pantry staples, snacks, coffee, and tea",
    categories: ["Gourmet", "Pantry", "Coffee & Tea", "Snacks"],
  },
  {
    id: "handbags",
    label: "Handbags",
    menuLabel: "Handbags & Accessories",
    description: "Purses, luggage, jewelry, scarves, and belts",
    categories: ["Bags", "Accessories", "Jewelry"],
  },
  {
    id: "stationery",
    label: "Stationery",
    menuLabel: "Stationery",
    description: "Cards, notebooks, paper goods, and writing supplies",
    categories: ["Stationery", "Paper Goods"],
  },
]

export function navHref(item: NavPreset) {
  return `/catalog?nav=${item.id}`
}

export function getNavPreset(id: string | null | undefined) {
  if (!id) return undefined
  return SHOP_NAV.find((item) => item.id === id)
}
