import { Link } from "react-router-dom"
import { SlidersHorizontal } from "lucide-react"
import { useFilterStore } from "@/stores/filterStore"
import type { CatalogSort } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FilterPanel } from "@/components/catalog/FilterSidebar"

const SORT_OPTIONS: { value: CatalogSort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "discount", label: "Highest discount" },
  { value: "price_asc", label: "Price: Low to high" },
  { value: "price_desc", label: "Price: High to low" },
]

type CatalogToolbarProps = {
  resultCount: number
  visibleCount: number
}

function catalogHeading(input: {
  departments: string[]
  categories: string[]
  brands: string[]
  query: string
  saleOnly: boolean
  arrivals: string
}) {
  if (input.query.trim()) return `Results for “${input.query.trim()}”`
  if (input.departments.length === 1 && input.categories.length === 0)
    return input.departments[0]!
  if (input.categories.length === 1) return input.categories[0]!
  if (input.brands.length === 1) return input.brands[0]!
  if (input.saleOnly) return "Clearance & sale"
  if (input.arrivals === "new") return "New finds"
  if (input.departments.length > 1) return input.departments.join(" · ")
  return "Shop Marshalls"
}

export function CatalogToolbar({ resultCount, visibleCount }: CatalogToolbarProps) {
  const sort = useFilterStore((s) => s.sort)
  const setSort = useFilterStore((s) => s.setSort)
  const activeFilterCount = useFilterStore((s) => s.activeFilterCount())
  const departments = useFilterStore((s) => s.departments)
  const categories = useFilterStore((s) => s.categories)
  const brands = useFilterStore((s) => s.brands)
  const query = useFilterStore((s) => s.query)
  const saleOnly = useFilterStore((s) => s.saleOnly)
  const arrivals = useFilterStore((s) => s.arrivals)

  const heading = catalogHeading({
    departments,
    categories,
    brands,
    query,
    saleOnly,
    arrivals,
  })

  const crumb =
    departments[0] ??
    categories[0] ??
    brands[0] ??
    (saleOnly ? "Sale" : query.trim() || "All products")

  return (
    <div className="sticky top-[var(--chrome-offset)] z-20 -mx-2 flex flex-col gap-3 border-b border-border/70 bg-background/95 px-2 py-3 backdrop-blur-md sm:flex-row sm:items-end sm:justify-between">
      <div>
        <nav
          aria-label="Breadcrumb"
          className="mb-2 flex items-center gap-1.5 text-2xs text-muted-foreground"
        >
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link to="/catalog" className="hover:text-foreground">
            Shop
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-foreground">{crumb}</span>
        </nav>
        <h1 className="font-display text-display-sm font-bold tracking-tight">
          {heading}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          <span className="tabular font-medium text-foreground">
            {visibleCount < resultCount
              ? `${visibleCount} of ${resultCount}`
              : resultCount}
          </span>{" "}
          {resultCount === 1 ? "item" : "items"} · Brand names for less
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="lg:hidden">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 rounded-sm bg-foreground px-1.5 py-0.5 text-[10px] text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent side="left" className="overflow-y-auto p-0">
            <DialogHeader className="border-b border-border px-4 py-4 pr-12">
              <DialogTitle>Filter & refine</DialogTitle>
            </DialogHeader>
            <div className="p-3">
              <FilterPanel className="border-0 p-0 shadow-none" idPrefix="mobile-filter" />
            </div>
          </DialogContent>
        </Dialog>

        <div className="min-w-[11.5rem]">
          <Select value={sort} onValueChange={(v) => setSort(v as CatalogSort)}>
            <SelectTrigger aria-label="Sort products">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
