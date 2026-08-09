import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "@/types"
import { PRODUCTS } from "@/data/products"
import { useToastStore } from "@/stores/toastStore"
import { track } from "@/lib/analytics"

const MAX_QTY_PER_LINE = 5

type CartState = {
  items: CartItem[]
  isOpen: boolean
  promoCode: string | null
  lastError: string | null
  openBag: () => void
  closeBag: () => void
  toggleBag: () => void
  clearError: () => void
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

function maxQtyFor(productId: string, size: string) {
  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product || product.inventory === "out_of_stock") return 0
  const sizeRow = product.sizes.find((s) => s.label === size)
  if (sizeRow && !sizeRow.available) return 0
  const stock = sizeRow?.stockCount
  if (typeof stock === "number") return Math.min(MAX_QTY_PER_LINE, stock)
  return MAX_QTY_PER_LINE
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promoCode: null,
      lastError: null,
      openBag: () => set({ isOpen: true }),
      closeBag: () => set({ isOpen: false }),
      toggleBag: () => set((s) => ({ isOpen: !s.isOpen })),
      clearError: () => set({ lastError: null }),
      addItem: (item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId)
        if (!product || product.inventory === "out_of_stock") {
          set({ lastError: "This style is currently sold through." })
          return
        }
        const quantity = item.quantity ?? 1
        const maxQty = maxQtyFor(item.productId, item.size)
        if (maxQty <= 0) {
          set({ lastError: "Selected size is unavailable." })
          return
        }
        set((state) => {
          const existing = state.items.find(
            (i) => itemKey(i) === itemKey(item),
          )
          if (existing) {
            const nextQty = Math.min(existing.quantity + quantity, maxQty)
            if (nextQty === existing.quantity) {
              return {
                lastError: `Limit ${maxQty} per size — bag already has the max.`,
                isOpen: true,
              }
            }
            return {
              items: state.items.map((i) =>
                itemKey(i) === itemKey(item)
                  ? { ...i, quantity: nextQty }
                  : i,
              ),
              isOpen: true,
              lastError: null,
            }
          }
          return {
            items: [
              ...state.items,
              {
                ...item,
                quantity: Math.min(quantity, maxQty),
                addedAt: Date.now(),
              },
            ],
            isOpen: true,
            lastError: null,
          }
        })
        if (!get().lastError) {
          track("add_to_cart", {
            productId: item.productId,
            size: item.size,
            colorwayId: item.colorwayId,
          })
          useToastStore.getState().push({
            title: "Added to bag",
            description: `${product.brand} ${product.name}`,
            href: "/bag",
            hrefLabel: "View bag",
          })
        }
      },
      removeItem: (productId, size, colorwayId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i) !== itemKey({ productId, size, colorwayId }),
          ),
        })),
      updateQuantity: (productId, size, colorwayId, quantity) =>
        set((state) => {
          const maxQty = maxQtyFor(productId, size)
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (i) =>
                  itemKey(i) !== itemKey({ productId, size, colorwayId }),
              ),
              lastError: null,
            }
          }
          const capped = Math.min(quantity, maxQty)
          return {
            items: state.items.map((i) =>
              itemKey(i) === itemKey({ productId, size, colorwayId })
                ? { ...i, quantity: capped }
                : i,
            ),
            lastError:
              capped < quantity
                ? `Only ${maxQty} available for this size.`
                : null,
          }
        }),
      applyPromo: (code) => set({ promoCode: code }),
      clearCart: () => set({ items: [], promoCode: null, lastError: null }),
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
      name: "marshalls-bag",
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
      }),
    },
  ),
)

export { MAX_QTY_PER_LINE }
