import { create } from "zustand"
import { persist } from "zustand/middleware"

type RecentState = {
  productIds: string[]
  track: (productId: string) => void
  clear: () => void
}

export const useRecentStore = create<RecentState>()(
  persist(
    (set, get) => ({
      productIds: [],
      track: (productId) => {
        const next = [
          productId,
          ...get().productIds.filter((id) => id !== productId),
        ].slice(0, 12)
        set({ productIds: next })
      },
      clear: () => set({ productIds: [] }),
    }),
    { name: "marshalls-recent" },
  ),
)
