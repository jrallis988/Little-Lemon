import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { CatalogView } from "@/components/catalog/CatalogView"
import { useFilterStore } from "@/stores/filterStore"
import type { CatalogSort, Department } from "@/types"
import { ALL_CATEGORIES, DEPARTMENTS } from "@/data/products"
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
  const departments = useFilterStore((s) => s.departments)
  const categories = useFilterStore((s) => s.categories)
  const setSort = useFilterStore((s) => s.setSort)
  const setQuery = useFilterStore((s) => s.setQuery)
  const clearFilters = useFilterStore((s) => s.clearFilters)

  useEffect(() => {
    const dept = params.get("department")
    const category = params.get("category")
    const sort = params.get("sort")
    const q = params.get("q")

    if (dept && DEPARTMENTS.includes(dept as (typeof DEPARTMENTS)[number])) {
      if (!departments.includes(dept as Department)) {
        clearFilters()
        toggleDepartment(dept as Department)
      }
    }

    if (category && ALL_CATEGORIES.includes(category)) {
      if (!categories.includes(category)) {
        clearFilters()
        toggleCategory(category)
      }
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
