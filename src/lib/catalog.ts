import { PRODUCTS } from "@/data/products"
import type { FilterState, Product } from "@/types"
import { discountPercent } from "@/lib/utils"

export function filterProducts(
  products: Product[],
  filters: FilterState,
): Product[] {
  const query = filters.query.trim().toLowerCase()

  let result = products.filter((product) => {
    if (
      filters.departments.length > 0 &&
      !filters.departments.includes(product.department)
    ) {
      return false
    }
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    ) {
      return false
    }
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false
    }
    if (
      filters.brandTiers.length > 0 &&
      !filters.brandTiers.includes(product.brandTier)
    ) {
      return false
    }
    if (filters.sizes.length > 0) {
      const hasSize = product.sizes.some(
        (size) => size.available && filters.sizes.includes(size.label),
      )
      if (!hasSize) return false
    }
    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    ) {
      return false
    }
    if (filters.inStockOnly && product.inventory === "out_of_stock") {
      return false
    }
    if (query) {
      const haystack = [
        product.name,
        product.brand,
        product.category,
        product.department,
        ...product.tags,
      ]
        .join(" ")
        .toLowerCase()
      if (!haystack.includes(query)) return false
    }
    return true
  })

  switch (filters.sort) {
    case "newest":
      result = [...result].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew))
      break
    case "price_asc":
      result = [...result].sort((a, b) => a.price - b.price)
      break
    case "price_desc":
      result = [...result].sort((a, b) => b.price - a.price)
      break
    case "discount":
      result = [...result].sort(
        (a, b) =>
          discountPercent(b.compareAt, b.price) -
          discountPercent(a.compareAt, a.price),
      )
      break
    default:
      break
  }

  return result
}

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug)
}
