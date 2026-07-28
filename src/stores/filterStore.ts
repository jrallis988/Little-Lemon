import { create } from "zustand"
import { persist } from "zustand/middleware"
import { PRICE_BOUNDS } from "@/data/products"
import type {
  BrandTier,
  CatalogSort,
  Department,
  FilterState,
} from "@/types"

type FilterActions = {
  toggleDepartment: (value: Department) => void
  toggleCategory: (value: string) => void
  toggleBrand: (value: string) => void
  toggleBrandTier: (value: BrandTier) => void
  toggleSize: (value: string) => void
  toggleColor: (value: string) => void
  setPriceRange: (range: [number, number]) => void
  setInStockOnly: (value: boolean) => void
  setSaleOnly: (value: boolean) => void
  setArrivals: (value: FilterState["arrivals"]) => void
  setQuery: (query: string) => void
  setSort: (sort: CatalogSort) => void
  applyNavPreset: (preset: {
    departments?: Department[]
    categories?: string[]
    query?: string
  }) => void
  clearFilters: () => void
  activeFilterCount: () => number
}

const defaultFilters: FilterState = {
  departments: [],
  categories: [],
  brands: [],
  brandTiers: [],
  sizes: [],
  colors: [],
  priceRange: [PRICE_BOUNDS.min, PRICE_BOUNDS.max],
  inStockOnly: false,
  saleOnly: false,
  arrivals: "any",
  query: "",
  sort: "featured",
}

function toggleInList<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value]
}

export const useFilterStore = create<FilterState & FilterActions>()(
  persist(
    (set, get) => ({
      ...defaultFilters,
      toggleDepartment: (value) =>
        set((s) => ({ departments: toggleInList(s.departments, value) })),
      toggleCategory: (value) =>
        set((s) => ({ categories: toggleInList(s.categories, value) })),
      toggleBrand: (value) =>
        set((s) => ({ brands: toggleInList(s.brands, value) })),
      toggleBrandTier: (value) =>
        set((s) => ({ brandTiers: toggleInList(s.brandTiers, value) })),
      toggleSize: (value) =>
        set((s) => ({ sizes: toggleInList(s.sizes, value) })),
      toggleColor: (value) =>
        set((s) => ({ colors: toggleInList(s.colors, value) })),
      setPriceRange: (priceRange) => set({ priceRange }),
      setInStockOnly: (inStockOnly) => set({ inStockOnly }),
      setSaleOnly: (saleOnly) => set({ saleOnly }),
      setArrivals: (arrivals) => set({ arrivals }),
      setQuery: (query) => set({ query }),
      setSort: (sort) => set({ sort }),
      applyNavPreset: (preset) =>
        set({
          ...defaultFilters,
          departments: preset.departments ?? [],
          categories: preset.categories ?? [],
          query: preset.query ?? "",
          sort: get().sort,
        }),
      clearFilters: () =>
        set({
          ...defaultFilters,
          sort: get().sort,
          query: get().query,
        }),
      activeFilterCount: () => {
        const s = get()
        let count = 0
        count += s.departments.length
        count += s.categories.length
        count += s.brands.length
        count += s.brandTiers.length
        count += s.sizes.length
        count += s.colors.length
        if (s.inStockOnly) count += 1
        if (s.saleOnly) count += 1
        if (s.arrivals === "new") count += 1
        if (
          s.priceRange[0] !== PRICE_BOUNDS.min ||
          s.priceRange[1] !== PRICE_BOUNDS.max
        ) {
          count += 1
        }
        return count
      },
    }),
    {
      name: "marshalls-filters",
      partialize: (state) => ({
        departments: state.departments,
        categories: state.categories,
        brands: state.brands,
        brandTiers: state.brandTiers,
        sizes: state.sizes,
        colors: state.colors,
        priceRange: state.priceRange,
        inStockOnly: state.inStockOnly,
        saleOnly: state.saleOnly,
        arrivals: state.arrivals,
        sort: state.sort,
      }),
    },
  ),
)
