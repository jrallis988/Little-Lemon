import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "@/types"
import { PRODUCTS } from "@/data/products"

type CartState = {
  items: CartItem[]
  isOpen: boolean
  promoCode: string | null
  openBag: () => void
  closeBag: () => void
  toggleBag: () => void
  addItem: (item: Omit<CartItem, "addedAt" | "quantity"> & { quantity?: number }) => void
  removeItem: (productId: string, size: string, colorwayId: string) => void
  updateQuantity: (
    productId: string,
    size: string,
    colorwayId: string,
    quantity: number,
  ) => void
  applyPromo: (code: string | null) => void
  clearCart: () => void
  itemCount: () => number
  subtotal: () => number
  compareAtTotal: () => number
}

function itemKey(item: Pick<CartItem, "productId" | "size" | "colorwayId">) {
  return `${item.productId}::${item.size}::${item.colorwayId}`
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promoCode: null,
      openBag: () => set({ isOpen: true }),
      closeBag: () => set({ isOpen: false }),
      toggleBag: () => set((s) => ({ isOpen: !s.isOpen })),
      addItem: (item) => {
        const quantity = item.quantity ?? 1
        set((state) => {
          const existing = state.items.find(
            (i) => itemKey(i) === itemKey(item),
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                itemKey(i) === itemKey(item)
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
              isOpen: true,
            }
          }
          return {
            items: [
              ...state.items,
              { ...item, quantity, addedAt: Date.now() },
            ],
            isOpen: true,
          }
        })
      },
      removeItem: (productId, size, colorwayId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i) !== itemKey({ productId, size, colorwayId }),
          ),
        })),
      updateQuantity: (productId, size, colorwayId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  (i) =>
                    itemKey(i) !== itemKey({ productId, size, colorwayId }),
                )
              : state.items.map((i) =>
                  itemKey(i) === itemKey({ productId, size, colorwayId })
                    ? { ...i, quantity }
                    : i,
                ),
        })),
      applyPromo: (code) => set({ promoCode: code }),
      clearCart: () => set({ items: [], promoCode: null }),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((sum, item) => {
          const product = PRODUCTS.find((p) => p.id === item.productId)
          return sum + (product?.price ?? 0) * item.quantity
        }, 0),
      compareAtTotal: () =>
        get().items.reduce((sum, item) => {
          const product = PRODUCTS.find((p) => p.id === item.productId)
          return sum + (product?.compareAt ?? 0) * item.quantity
        }, 0),
    }),
    {
      name: "atelier-rack-cart",
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
      }),
    },
  ),
)
