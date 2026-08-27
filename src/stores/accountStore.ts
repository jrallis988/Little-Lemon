import { create } from "zustand"
import { persist } from "zustand/middleware"

import { PRODUCTS } from "@/data/products"
import type { CompletedOrder } from "@/stores/checkoutStore"

export type AccountUser = {
  name: string
  email: string
}

function buildDemoOrders(user: AccountUser): CompletedOrder[] {
  const product = PRODUCTS[0]
  if (!product) return []
  const lineTotal = product.price
  return [
    {
      id: "MS-DEMO-10482",
      placedAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
      shipping: {
        name: user.name,
        email: user.email,
        address: "129 W 14th St",
        city: "New York",
        state: "NY",
        zip: "10011",
      },
      lines: [
        {
          productId: product.id,
          name: product.name,
          brand: product.brand,
          image: product.images[0] ?? "",
          size: product.sizes.find((s) => s.available)?.label ?? product.sizes[0]?.label ?? "M",
          color: product.colorways[0]?.name ?? "Default",
          quantity: 1,
          price: product.price,
        },
      ],
      subtotal: lineTotal,
      promoCode: null,
      promoDiscount: 0,
      shippingCost: 0,
      tax: Math.round(lineTotal * 0.08875 * 100) / 100,
      total: Math.round((lineTotal + lineTotal * 0.08875) * 100) / 100,
    },
  ]
}


type AccountState = {
  user: AccountUser | null
  orders: CompletedOrder[]
  emailSubscribers: string[]
  chatTickets: { id: string; topic: string; createdAt: number }[]
  signIn: (user: AccountUser) => void
  signOut: () => void
  addOrder: (order: CompletedOrder) => void
  subscribeEmail: (email: string) => boolean
  isEmailSubscribed: (email: string) => boolean
  requestHumanHandoff: (topic: string, ticketId?: string) => string
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      user: null,
      orders: [],
      emailSubscribers: [],
      chatTickets: [],
      signIn: (user) =>
        set((state) => ({
          user,
          orders: state.orders.length > 0 ? state.orders : buildDemoOrders(user),
        })),
      signOut: () => set({ user: null }),
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders.filter((o) => o.id !== order.id)].slice(
            0,
            25,
          ),
        })),
      subscribeEmail: (email) => {
        const normalized = email.trim().toLowerCase()
        if (!normalized || !normalized.includes("@")) return false
        const existing = get().emailSubscribers
        if (existing.includes(normalized)) return true
        set({ emailSubscribers: [...existing, normalized] })
        return true
      },
      isEmailSubscribed: (email) =>
        get().emailSubscribers.includes(email.trim().toLowerCase()),
      requestHumanHandoff: (topic, ticketId) => {
        const id = ticketId ?? `TKT-${Date.now().toString(36).toUpperCase()}`
        set((state) => ({
          chatTickets: [
            { id, topic, createdAt: Date.now() },
            ...state.chatTickets,
          ].slice(0, 20),
        }))
        return id
      },
    }),
    {
      name: "marshalls-account",
      partialize: (state) => ({
        user: state.user,
        orders: state.orders,
        emailSubscribers: state.emailSubscribers,
        chatTickets: state.chatTickets,
      }),
    },
  ),
)
