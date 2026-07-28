import {
  ALL_BRANDS,
  ALL_CATEGORIES,
  ALL_SIZES,
  BRAND_TIERS,
  DEPARTMENTS,
  PRICE_BOUNDS,
  PRODUCTS,
} from "@/data/products"
import { useFilterStore } from "@/stores/filterStore"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import type { BrandTier, Department } from "@/types"
import { cn } from "@/lib/utils"

const ALL_COLORS = Array.from(
  new Map(
    PRODUCTS.flatMap((product) =>
      product.colorways.map((colorway) => [
        colorway.name,
        { name: colorway.name, hex: colorway.hex },
      ] as const),
    ),
  ).values(),
).sort((a, b) => a.name.localeCompare(b.name))

function FilterOption({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(v === true)}
      />
      <Label
        htmlFor={id}
        className="flex flex-1 cursor-pointer items-center justify-between text-sm font-normal text-foreground/90"
      >
        <span>{label}</span>
      </Label>
    </div>
  )
}

export function FilterPanel({
  className,
  idPrefix = "filter",
}: {
  className?: string
  idPrefix?: string
}) {
  const departments = useFilterStore((s) => s.departments)
  const categories = useFilterStore((s) => s.categories)
  const brands = useFilterStore((s) => s.brands)
  const brandTiers = useFilterStore((s) => s.brandTiers)
  const sizes = useFilterStore((s) => s.sizes)
  const colors = useFilterStore((s) => s.colors)
  const priceRange = useFilterStore((s) => s.priceRange)
  const inStockOnly = useFilterStore((s) => s.inStockOnly)
  const saleOnly = useFilterStore((s) => s.saleOnly)
  const arrivals = useFilterStore((s) => s.arrivals)
  const activeFilterCount = useFilterStore((s) => s.activeFilterCount())

  const toggleDepartment = useFilterStore((s) => s.toggleDepartment)
  const toggleCategory = useFilterStore((s) => s.toggleCategory)
  const toggleBrand = useFilterStore((s) => s.toggleBrand)
  const toggleBrandTier = useFilterStore((s) => s.toggleBrandTier)
  const toggleSize = useFilterStore((s) => s.toggleSize)
  const toggleColor = useFilterStore((s) => s.toggleColor)
  const setPriceRange = useFilterStore((s) => s.setPriceRange)
  const setInStockOnly = useFilterStore((s) => s.setInStockOnly)
  const setSaleOnly = useFilterStore((s) => s.setSaleOnly)
  const setArrivals = useFilterStore((s) => s.setArrivals)
  const clearFilters = useFilterStore((s) => s.clearFilters)

  return (
    <div className={cn("rounded-lg border border-border/80 bg-surface p-4 shadow-soft lg:p-5", className)}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <h2 className="font-display text-base font-bold tracking-tight">Filters</h2>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={clearFilters}>
            Clear ({activeFilterCount})
          </Button>
        )}
      </div>
      <p className="text-2xs text-muted-foreground">
        Refine by department, color, arrival, and price.
      </p>

      <div className="filter-section">
        <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Department
        </p>
        <div className="space-y-2.5">
          {DEPARTMENTS.map((dept) => (
            <FilterOption
              key={dept}
              id={`${idPrefix}-dept-${dept}`}
              label={dept === "Juniors" ? "Jr's" : dept === "Pets" ? "Pet" : dept}
              checked={departments.includes(dept)}
              onCheckedChange={() => toggleDepartment(dept as Department)}
            />
          ))}
        </div>
      </div>

      <div className="filter-section">
        <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Brand tier
        </p>
        <div className="space-y-2.5">
          {BRAND_TIERS.map((tier) => (
            <FilterOption
              key={tier}
              id={`${idPrefix}-tier-${tier}`}
              label={tier}
              checked={brandTiers.includes(tier)}
              onCheckedChange={() => toggleBrandTier(tier as BrandTier)}
            />
          ))}
        </div>
      </div>

      <div className="filter-section">
        <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Category
        </p>
        <div className="max-h-48 space-y-2.5 overflow-y-auto pr-1">
          {ALL_CATEGORIES.map((category) => (
            <FilterOption
              key={category}
              id={`${idPrefix}-cat-${category}`}
              label={category}
              checked={categories.includes(category)}
              onCheckedChange={() => toggleCategory(category)}
            />
          ))}
        </div>
      </div>

      <div className="filter-section">
        <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Brand
        </p>
        <div className="max-h-48 space-y-2.5 overflow-y-auto pr-1">
          {ALL_BRANDS.map((brand) => (
            <FilterOption
              key={brand}
              id={`${idPrefix}-brand-${brand}`}
              label={brand}
              checked={brands.includes(brand)}
              onCheckedChange={() => toggleBrand(brand)}
            />
          ))}
        </div>
      </div>

      <div className="filter-section">
        <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Size
        </p>
        <div className="flex flex-wrap gap-1.5">
          {ALL_SIZES.map((size) => {
            const active = sizes.includes(size)
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={
                  active
                    ? "min-w-10 rounded-md border border-foreground bg-foreground px-2 py-1.5 text-xs font-semibold text-primary-foreground transition-colors"
                    : "min-w-10 rounded-md border border-border bg-surface px-2 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-foreground/40"
                }
                aria-pressed={active}
              >
                {size}
              </button>
            )
          })}
        </div>
      </div>

      <div className="filter-section">
        <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Color
        </p>
        <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto pr-1">
          {ALL_COLORS.map((color) => {
            const active = colors.includes(color.name)
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => toggleColor(color.name)}
                className={cn(
                  "flex items-center gap-2 rounded-md border px-2 py-1.5 text-left text-xs transition-colors",
                  active
                    ? "border-foreground bg-secondary font-semibold"
                    : "border-transparent hover:border-border",
                )}
                aria-pressed={active}
                title={color.name}
              >
                <span
                  className="h-4 w-4 shrink-0 rounded-full border border-black/15"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="truncate">{color.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="filter-section">
        <div className="flex items-center justify-between">
          <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Price
          </p>
          <p className="text-xs tabular text-foreground">
            {formatCurrency(priceRange[0])} – {formatCurrency(priceRange[1])}
          </p>
        </div>
        <Slider
          min={PRICE_BOUNDS.min}
          max={PRICE_BOUNDS.max}
          step={10}
          value={priceRange}
          onValueChange={(value) =>
            setPriceRange([value[0] ?? PRICE_BOUNDS.min, value[1] ?? PRICE_BOUNDS.max])
          }
          className="mt-4"
          aria-label="Price range"
        />
      </div>

      <div className="filter-section">
        <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Arrivals
        </p>
        <Select
          value={arrivals}
          onValueChange={(value) => setArrivals(value as "any" | "new")}
        >
          <SelectTrigger aria-label="Filter by arrival date">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="new">Just in</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="filter-section !border-b-0 space-y-3">
        <FilterOption
          id={`${idPrefix}-in-stock-only`}
          label="In stock & low stock only"
          checked={inStockOnly}
          onCheckedChange={setInStockOnly}
        />
        <FilterOption
          id={`${idPrefix}-sale-only`}
          label="Sale only (20% off or more)"
          checked={saleOnly}
          onCheckedChange={setSaleOnly}
        />
      </div>
    </div>
  )
}

export function FilterSidebar() {
  return (
    <aside className="w-full lg:w-[var(--layout-rail)] lg:shrink-0">
      <div className="sticky top-[calc(var(--chrome-offset)+1rem)] max-h-[calc(100dvh-var(--chrome-offset)-2rem)] overflow-y-auto">
        <FilterPanel />
      </div>
    </aside>
  )
}
