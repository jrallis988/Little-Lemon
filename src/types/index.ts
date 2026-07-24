export type Department = "Women" | "Men" | "Kids" | "Home" | "Beauty"
export type BrandTier = "Designer" | "Contemporary" | "Modern Essentials"
export type InventoryStatus = "in_stock" | "low_stock" | "out_of_stock" | "online_only"

export type ProductColorway = {
  id: string
  name: string
  hex: string
  imageIndex?: number
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
  priceRange: [number, number]
  inStockOnly: boolean
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
