import { useEffect, useMemo, useState } from "react"
import { PRODUCTS } from "@/data/products"
import { filterProducts } from "@/lib/catalog"
import { useFilterStore } from "@/stores/filterStore"
import { FilterSidebar } from "@/components/catalog/FilterSidebar"
import { CatalogToolbar } from "@/components/catalog/CatalogToolbar"
import { ProductCard } from "@/components/catalog/ProductCard"
import { CatalogSkeleton } from "@/components/catalog/CatalogSkeleton"
import { EmptyCatalogState } from "@/components/catalog/EmptyCatalogState"
import { QuickViewDialog } from "@/components/catalog/QuickViewDialog"
import { ActiveFilterChips } from "@/components/catalog/ActiveFilterChips"
import type { Product } from "@/types"
import { useSimulatedCatalogLoad } from "@/hooks/useSimulatedCatalogLoad"
import { Button } from "@/components/ui/button"

const PAGE_SIZE = 12

export function CatalogView() {
  const filters = useFilterStore()
  const isLoading = useSimulatedCatalogLoad(filters)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const products = useMemo(
    () =>
      filterProducts(PRODUCTS, {
        departments: filters.departments,
        categories: filters.categories,
        brands: filters.brands,
        brandTiers: filters.brandTiers,
        sizes: filters.sizes,
        colors: filters.colors,
        priceRange: filters.priceRange,
        inStockOnly: filters.inStockOnly,
        saleOnly: filters.saleOnly,
        arrivals: filters.arrivals,
        query: filters.query,
        sort: filters.sort,
      }),
    [
      filters.departments,
      filters.categories,
      filters.brands,
      filters.brandTiers,
      filters.sizes,
      filters.colors,
      filters.priceRange,
      filters.inStockOnly,
      filters.saleOnly,
      filters.arrivals,
      filters.query,
      filters.sort,
    ],
  )

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [
    filters.departments,
    filters.categories,
    filters.brands,
    filters.brandTiers,
    filters.sizes,
    filters.colors,
    filters.priceRange,
    filters.inStockOnly,
    filters.saleOnly,
    filters.arrivals,
    filters.query,
    filters.sort,
  ])

  const visibleProducts = products.slice(0, visibleCount)

  return (
    <div className="shelf-container py-6 md:py-8">
      <div className="flex gap-8">
        <div className="hidden lg:block">
          <FilterSidebar />
        </div>

        <div className="min-w-0 flex-1 space-y-6">
          <CatalogToolbar
            resultCount={isLoading ? 0 : products.length}
            visibleCount={isLoading ? 0 : visibleProducts.length}
          />
          <ActiveFilterChips />

          {isLoading ? (
            <CatalogSkeleton />
          ) : products.length === 0 ? (
            <EmptyCatalogState />
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          )}
          {!isLoading && visibleProducts.length < products.length && (
            <div className="flex flex-col items-center gap-2 border-t border-border/70 pt-6">
              <p className="text-xs text-muted-foreground">
                Showing {visibleProducts.length} of {products.length} finds
              </p>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              >
                Load more
              </Button>
            </div>
          )}
        </div>
      </div>

      <QuickViewDialog
        product={quickViewProduct}
        open={!!quickViewProduct}
        onOpenChange={(open) => {
          if (!open) setQuickViewProduct(null)
        }}
      />
    </div>
  )
}
