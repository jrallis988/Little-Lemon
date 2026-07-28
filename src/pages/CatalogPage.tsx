import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { CatalogView } from "@/components/catalog/CatalogView"
import { useFilterStore } from "@/stores/filterStore"
import type { CatalogSort, Department } from "@/types"
import { ALL_CATEGORIES, DEPARTMENTS } from "@/data/products"
import { getNavPreset } from "@/data/navigation"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"

const SORTS: CatalogSort[] = [
  "featured",
  "newest",
  "price_asc",
  "price_desc",
  "discount",
]

export function CatalogPage() {
  useDocumentMeta({
    title: "Shop Brand-Name Finds | Marshalls",
    description:
      "Explore new arrivals and savings across women, men, kids, home, beauty, and shoes.",
  })

  const [params] = useSearchParams()
  const toggleDepartment = useFilterStore((s) => s.toggleDepartment)
  const toggleCategory = useFilterStore((s) => s.toggleCategory)
  const setSort = useFilterStore((s) => s.setSort)
  const setQuery = useFilterStore((s) => s.setQuery)
  const clearFilters = useFilterStore((s) => s.clearFilters)
  const applyNavPreset = useFilterStore((s) => s.applyNavPreset)

  useEffect(() => {
    const nav = params.get("nav")
    const dept = params.get("department")
    const category = params.get("category")
    const sort = params.get("sort")
    const q = params.get("q")

    const preset = getNavPreset(nav)
    if (preset) {
      applyNavPreset({
        departments: preset.departments,
        categories: preset.categories,
        query: preset.query ?? (q ?? undefined),
      })
      if (sort && SORTS.includes(sort as CatalogSort)) {
        setSort(sort as CatalogSort)
      }
      return
    }

    clearFilters()

    if (dept && DEPARTMENTS.includes(dept as (typeof DEPARTMENTS)[number])) {
      toggleDepartment(dept as Department)
    }

    if (category && ALL_CATEGORIES.includes(category)) {
      toggleCategory(category)
    }

    if (sort && SORTS.includes(sort as CatalogSort)) {
      setSort(sort as CatalogSort)
    }

    if (q !== null) {
      setQuery(q)
    }
    // Intentionally sync from URL on param change only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  return <CatalogView />
}
