import { create } from "zustand"

export type Toast = {
  id: string
  title: string
  description?: string
  href?: string
  hrefLabel?: string
}

type ToastState = {
  toasts: Toast[]
  push: (toast: Omit<Toast, "id">) => void
  dismiss: (id: string) => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }].slice(-4) }))
    window.setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
    }, 4200)
  },
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))
