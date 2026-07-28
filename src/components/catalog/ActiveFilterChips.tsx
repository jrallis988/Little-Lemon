import { X } from "lucide-react"
import { PRICE_BOUNDS } from "@/data/products"
import { formatCurrency } from "@/lib/utils"
import { useFilterStore } from "@/stores/filterStore"
import { Button } from "@/components/ui/button"

type Chip = {
  id: string
  label: string
  dismiss: () => void
}

export function ActiveFilterChips() {
  const filters = useFilterStore()
  const chips: Chip[] = [
    ...filters.departments.map((value) => ({
      id: `department-${value}`,
      label: value,
      dismiss: () => filters.toggleDepartment(value),
    })),
    ...filters.categories.map((value) => ({
      id: `category-${value}`,
      label: value,
      dismiss: () => filters.toggleCategory(value),
    })),
    ...filters.brands.map((value) => ({
      id: `brand-${value}`,
      label: value,
      dismiss: () => filters.toggleBrand(value),
    })),
    ...filters.brandTiers.map((value) => ({
      id: `tier-${value}`,
      label: value,
      dismiss: () => filters.toggleBrandTier(value),
    })),
    ...filters.sizes.map((value) => ({
      id: `size-${value}`,
      label: `Size ${value}`,
      dismiss: () => filters.toggleSize(value),
    })),
    ...filters.colors.map((value) => ({
      id: `color-${value}`,
      label: value,
      dismiss: () => filters.toggleColor(value),
    })),
  ]

  if (
    filters.priceRange[0] !== PRICE_BOUNDS.min ||
    filters.priceRange[1] !== PRICE_BOUNDS.max
  ) {
    chips.push({
      id: "price",
      label: `${formatCurrency(filters.priceRange[0])}–${formatCurrency(filters.priceRange[1])}`,
      dismiss: () =>
        filters.setPriceRange([PRICE_BOUNDS.min, PRICE_BOUNDS.max]),
    })
  }
  if (filters.inStockOnly) {
    chips.push({
      id: "in-stock",
      label: "In stock",
      dismiss: () => filters.setInStockOnly(false),
    })
  }
  if (filters.saleOnly) {
    chips.push({
      id: "sale",
      label: "Sale only",
      dismiss: () => filters.setSaleOnly(false),
    })
  }
  if (filters.arrivals === "new") {
    chips.push({
      id: "arrivals",
      label: "Just in",
      dismiss: () => filters.setArrivals("any"),
    })
  }

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Active filters">
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={chip.dismiss}
          className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-xs font-medium shadow-soft hover:border-foreground/30"
          aria-label={`Remove ${chip.label} filter`}
        >
          {chip.label}
          <X className="h-3 w-3 text-muted-foreground" />
        </button>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 px-2 text-xs"
        onClick={filters.clearFilters}
      >
        Clear all
      </Button>
    </div>
  )
}
