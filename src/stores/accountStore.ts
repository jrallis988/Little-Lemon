import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CompletedOrder } from "@/stores/checkoutStore"

export type AccountUser = {
  name: string
  email: string
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
  requestHumanHandoff: (topic: string) => string
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      user: null,
      orders: [],
      emailSubscribers: [],
      chatTickets: [],
      signIn: (user) => set({ user }),
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
      requestHumanHandoff: (topic) => {
        const id = `TKT-${Date.now().toString(36).toUpperCase()}`
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
