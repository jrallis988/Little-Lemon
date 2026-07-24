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
}

export function CatalogToolbar({ resultCount }: CatalogToolbarProps) {
  const sort = useFilterStore((s) => s.sort)
  const setSort = useFilterStore((s) => s.setSort)
  const activeFilterCount = useFilterStore((s) => s.activeFilterCount())

  return (
    <div className="flex flex-col gap-3 border-b border-border/70 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1.5 text-2xs text-muted-foreground">
          <span>Home</span>
          <span aria-hidden>/</span>
          <span className="font-medium text-foreground">All products</span>
        </nav>
        <h1 className="font-display text-display-sm font-bold tracking-tight">
          Shop Marshalls
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          <span className="tabular font-medium text-foreground">{resultCount}</span>{" "}
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
