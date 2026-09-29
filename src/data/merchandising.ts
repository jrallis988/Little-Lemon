import { PRODUCTS } from "@/data/products"
import { discountPercent } from "@/lib/utils"
import type { Product } from "@/types"

/** Prefer in-stock styles for storefront rails */
function isShopable(product: Product) {
  return product.inventory !== "out_of_stock"
}

function byDiscount(a: Product, b: Product) {
  return (
    discountPercent(b.compareAt, b.price) - discountPercent(a.compareAt, a.price)
  )
}

function uniqueById(products: Product[]) {
  const seen = new Set<string>()
  return products.filter((p) => {
    if (seen.has(p.id)) return false
    seen.add(p.id)
    return true
  })
}

export function womenProducts() {
  return PRODUCTS.filter((p) => p.department === "Women" && isShopable(p))
}

/** Deepest Women markdowns first, then fill with other wow deals */
export function curatedWowFinds(limit = 4): Product[] {
  const women = [...womenProducts()].sort(byDiscount)
  const rest = PRODUCTS.filter(
    (p) => p.department !== "Women" && isShopable(p),
  ).sort(byDiscount)
  return uniqueById([...women, ...rest]).slice(0, limit)
}

export function curatedDesigner(limit = 4): Product[] {
  const designerWomen = womenProducts().filter(
    (p) => p.brandTier === "Designer" || p.price >= 90,
  )
  const designerRest = PRODUCTS.filter(
    (p) =>
      isShopable(p) &&
      (p.brandTier === "Designer" || p.price >= 90) &&
      p.department !== "Women",
  )
  return uniqueById([...designerWomen, ...designerRest]).slice(0, limit)
}

export function curatedUnderFifty(limit = 4): Product[] {
  const women = womenProducts()
    .filter((p) => p.price < 50)
    .sort(byDiscount)
  const rest = PRODUCTS.filter((p) => isShopable(p) && p.price < 50).sort(
    byDiscount,
  )
  return uniqueById([...women, ...rest]).slice(0, limit)
}

export function curatedNewArrivals(limit = 4): Product[] {
  const womenNew = womenProducts().filter((p) => p.isNew)
  const restNew = PRODUCTS.filter(
    (p) => isShopable(p) && p.isNew && p.department !== "Women",
  )
  return uniqueById([...womenNew, ...restNew]).slice(0, limit)
}

export function curatedWomenEdit(limit = 8): Product[] {
  const women = womenProducts()
  const featured = [...women].sort((a, b) => {
    const score = (p: Product) =>
      (p.isNew ? 30 : 0) +
      discountPercent(p.compareAt, p.price) +
      (p.brandTier === "Designer" ? 8 : 0)
    return score(b) - score(a)
  })
  return featured.slice(0, limit)
}

export function curatedWomenByBucket() {
  const women = womenProducts()
  return {
    newArrivals: women.filter((p) => p.isNew).slice(0, 4),
    wowDeals: [...women].sort(byDiscount).slice(0, 4),
    designer: women
      .filter((p) => p.brandTier === "Designer" || p.price >= 100)
      .slice(0, 4),
  }
}
