import { create } from "zustand"
import { persist } from "zustand/middleware"
import { STORE_LOCATIONS, type StoreLocation } from "@/data/stores"

type StorePreferenceState = {
  preferredStoreId: string | null
  lastSearchQuery: string
  setPreferredStore: (storeId: string) => void
  clearPreferredStore: () => void
  setLastSearchQuery: (query: string) => void
  preferredStore: () => StoreLocation | null
}

export const useStorePreferenceStore = create<StorePreferenceState>()(
  persist(
    (set, get) => ({
      preferredStoreId: null,
      lastSearchQuery: "10003",
      setPreferredStore: (storeId) => set({ preferredStoreId: storeId }),
      clearPreferredStore: () => set({ preferredStoreId: null }),
      setLastSearchQuery: (query) => set({ lastSearchQuery: query }),
      preferredStore: () => {
        const id = get().preferredStoreId
        if (!id) return null
        return STORE_LOCATIONS.find((s) => s.id === id) ?? null
      },
    }),
    {
      name: "marshalls-preferred-store",
      partialize: (state) => ({
        preferredStoreId: state.preferredStoreId,
        lastSearchQuery: state.lastSearchQuery,
      }),
    },
  ),
)
