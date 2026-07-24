import { useMemo, useState } from "react"
import { PRODUCTS } from "@/data/products"
import { filterProducts } from "@/lib/catalog"
import { useFilterStore } from "@/stores/filterStore"
import { FilterSidebar } from "@/components/catalog/FilterSidebar"
import { CatalogToolbar } from "@/components/catalog/CatalogToolbar"
import { ProductCard } from "@/components/catalog/ProductCard"
import { CatalogSkeleton } from "@/components/catalog/CatalogSkeleton"
import { EmptyCatalogState } from "@/components/catalog/EmptyCatalogState"
import { QuickViewDialog } from "@/components/catalog/QuickViewDialog"
import type { Product } from "@/types"
import { useSimulatedCatalogLoad } from "@/hooks/useSimulatedCatalogLoad"

export function CatalogView() {
  const filters = useFilterStore()
  const isLoading = useSimulatedCatalogLoad(filters)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const products = useMemo(
    () =>
      filterProducts(PRODUCTS, {
        departments: filters.departments,
        categories: filters.categories,
        brands: filters.brands,
        brandTiers: filters.brandTiers,
        sizes: filters.sizes,
        priceRange: filters.priceRange,
        inStockOnly: filters.inStockOnly,
        query: filters.query,
        sort: filters.sort,
      }),
    [
      filters.departments,
      filters.categories,
      filters.brands,
      filters.brandTiers,
      filters.sizes,
      filters.priceRange,
      filters.inStockOnly,
      filters.query,
      filters.sort,
    ],
  )

  return (
    <div className="shelf-container py-6 md:py-8">
      <div className="flex gap-8">
        <div className="hidden lg:block">
          <FilterSidebar />
        </div>

        <div className="min-w-0 flex-1 space-y-6">
          <CatalogToolbar resultCount={isLoading ? 0 : products.length} />

          {isLoading ? (
            <CatalogSkeleton />
          ) : products.length === 0 ? (
            <EmptyCatalogState />
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
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
