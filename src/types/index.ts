export type Department =
  | "Women"
  | "Men"
  | "Boys"
  | "Girls"
  | "Juniors"
  | "Kids"
  | "Home"
  | "Beauty"
  | "Pets"
export type BrandTier = "Designer" | "Contemporary" | "Modern Essentials"
export type InventoryStatus = "in_stock" | "low_stock" | "out_of_stock" | "online_only"

export type ProductColorway = {
  id: string
  name: string
  hex: string
  /** Preferred gallery index when this color is selected */
  imageIndex?: number
  /** Optional dedicated image for this colorway */
  image?: string
  /** Dedicated multi-image gallery for this colorway */
  images?: string[]
}

export type ProductReview = {
  id: string
  author: string
  rating: number
  title: string
  body: string
  date: string
  verified?: boolean
  helpful?: number
}

export type ProductQuestion = {
  id: string
  question: string
  asker: string
  answer: string
  answeredBy: string
  date: string
}

export type NearbyStore = {
  id: string
  name: string
  distanceMi: number
  status: "in_stock" | "low_stock" | "out_of_stock"
  pickup: string
}

export type ProductSize = {
  label: string
  available: boolean
  stockCount?: number
}

export type Product = {
  id: string
  slug: string
  name: string
  brand: string
  brandTier: BrandTier
  department: Department
  category: string
  price: number
  compareAt: number
  images: string[]
  colorways: ProductColorway[]
  sizes: ProductSize[]
  inventory: InventoryStatus
  tags: string[]
  description: string
  fitNotes?: string
  isNew?: boolean
  storeStockHint?: string
  nearbyStores?: NearbyStore[]
}

export type CatalogSort =
  | "featured"
  | "newest"
  | "price_asc"
  | "price_desc"
  | "discount"

export type FilterState = {
  departments: Department[]
  categories: string[]
  brands: string[]
  brandTiers: BrandTier[]
  sizes: string[]
  colors: string[]
  priceRange: [number, number]
  inStockOnly: boolean
  saleOnly: boolean
  arrivals: "any" | "new"
  query: string
  sort: CatalogSort
}

export type CartItem = {
  productId: string
  size: string
  colorwayId: string
  quantity: number
  addedAt: number
}

export type PromoCode = {
  code: string
  label: string
  percentOff: number
}
