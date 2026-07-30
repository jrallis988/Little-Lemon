import { create } from "zustand"
import { persist } from "zustand/middleware"
import { PRODUCTS } from "@/data/products"
import { useToastStore } from "@/stores/toastStore"

type WishlistState = {
  productIds: string[]
  toggle: (productId: string) => void
  add: (productId: string) => void
  remove: (productId: string) => void
  has: (productId: string) => boolean
  clear: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggle: (productId) => {
        const exists = get().productIds.includes(productId)
        const product = PRODUCTS.find((p) => p.id === productId)
        set({
          productIds: exists
            ? get().productIds.filter((id) => id !== productId)
            : [...get().productIds, productId],
        })
        useToastStore.getState().push(
          exists
            ? {
                title: "Removed from wishlist",
                description: product?.name,
                href: "/wishlist",
                hrefLabel: "View wishlist",
              }
            : {
                title: "Saved to wishlist",
                description: product?.name,
                href: "/wishlist",
                hrefLabel: "View wishlist",
              },
        )
      },
      add: (productId) => {
        if (get().productIds.includes(productId)) {
          useToastStore.getState().push({
            title: "Already in wishlist",
            href: "/wishlist",
            hrefLabel: "View wishlist",
          })
          return
        }
        const product = PRODUCTS.find((p) => p.id === productId)
        set({ productIds: [...get().productIds, productId] })
        useToastStore.getState().push({
          title: "Saved for later",
          description: product?.name,
          href: "/wishlist",
          hrefLabel: "View wishlist",
        })
      },
      remove: (productId) =>
        set((state) => ({
          productIds: state.productIds.filter((id) => id !== productId),
        })),
      has: (productId) => get().productIds.includes(productId),
      clear: () => set({ productIds: [] }),
    }),
    { name: "marshalls-wishlist" },
  ),
)
