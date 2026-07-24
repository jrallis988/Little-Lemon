import { useEffect, useState } from "react"
import type { FilterState } from "@/types"

/**
 * Brief simulated fetch latency so skeleton states are visible in production-like flows.
 */
export function useSimulatedCatalogLoad(filters: FilterState, delayMs = 420) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timer = window.setTimeout(() => setIsLoading(false), delayMs)
    return () => window.clearTimeout(timer)
  }, [
    delayMs,
    filters.departments,
    filters.categories,
    filters.brands,
    filters.brandTiers,
    filters.sizes,
    filters.priceRange,
    filters.inStockOnly,
    filters.query,
    filters.sort,
  ])

  return isLoading
}
