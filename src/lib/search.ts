import { PRODUCTS } from "@/data/products"
import type { Product } from "@/types"

const RECENT_KEY = "marshalls-recent-searches"

export function getRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function pushRecentSearch(query: string) {
  const q = query.trim()
  if (!q) return
  const next = [q, ...getRecentSearches().filter((item) => item.toLowerCase() !== q.toLowerCase())].slice(
    0,
    8,
  )
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next))
  } catch {
    /* ignore */
  }
}

export type SearchSuggestion = {
  type: "product" | "brand" | "department" | "recent"
  label: string
  to: string
  meta?: string
}

export function getSearchSuggestions(query: string): SearchSuggestion[] {
  const q = query.trim().toLowerCase()
  if (!q) {
    return getRecentSearches().map((label) => ({
      type: "recent" as const,
      label,
      to: `/catalog?q=${encodeURIComponent(label)}`,
    }))
  }

  const products: SearchSuggestion[] = PRODUCTS.filter((p) =>
    [p.name, p.brand, p.category, p.department, ...p.tags]
      .join(" ")
      .toLowerCase()
      .includes(q),
  )
    .slice(0, 6)
    .map((p: Product) => ({
      type: "product" as const,
      label: p.name,
      meta: `${p.brand} · ${p.department}`,
      to: `/product/${p.slug}`,
    }))

  const brands = Array.from(
    new Set(
      PRODUCTS.filter((p) => p.brand.toLowerCase().includes(q)).map((p) => p.brand),
    ),
  )
    .slice(0, 3)
    .map((brand) => ({
      type: "brand" as const,
      label: brand,
      meta: "Brand",
      to: `/catalog?q=${encodeURIComponent(brand)}`,
    }))

  const departments = Array.from(
    new Set(
      PRODUCTS.filter((p) => p.department.toLowerCase().includes(q)).map(
        (p) => p.department,
      ),
    ),
  )
    .slice(0, 3)
    .map((department) => ({
      type: "department" as const,
      label: department,
      meta: "Department",
      to: `/department/${department.toLowerCase()}`,
    }))

  return [...products, ...brands, ...departments].slice(0, 10)
}
