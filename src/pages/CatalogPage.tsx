import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { CatalogView } from "@/components/catalog/CatalogView"
import { useFilterStore } from "@/stores/filterStore"
import type { CatalogSort, Department } from "@/types"
import { DEPARTMENTS } from "@/data/products"

const SORTS: CatalogSort[] = [
  "featured",
  "newest",
  "price_asc",
  "price_desc",
  "discount",
]

export function CatalogPage() {
  const [params] = useSearchParams()
  const toggleDepartment = useFilterStore((s) => s.toggleDepartment)
  const departments = useFilterStore((s) => s.departments)
  const setSort = useFilterStore((s) => s.setSort)
  const clearFilters = useFilterStore((s) => s.clearFilters)

  useEffect(() => {
    const dept = params.get("department")
    const sort = params.get("sort")

    if (dept && DEPARTMENTS.includes(dept as (typeof DEPARTMENTS)[number])) {
      if (!departments.includes(dept as Department)) {
        clearFilters()
        toggleDepartment(dept as Department)
      }
    }

    if (sort && SORTS.includes(sort as CatalogSort)) {
      setSort(sort as CatalogSort)
    }
    // Intentionally sync from URL on param change only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  return <CatalogView />
}
