import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CheckoutStep = 1 | 2 | 3

export type ShippingFields = {
  name: string
  email: string
  address: string
  city: string
  state: string
  zip: string
}

export type PaymentPlaceholder = {
  cardNumber: string
  nameOnCard: string
  expiry: string
  cvc: string
}

export type OrderLine = {
  productId: string
  name: string
  brand: string
  image: string
  size: string
  color: string
  quantity: number
  price: number
}

export type CompletedOrder = {
  id: string
  placedAt: number
  shipping: ShippingFields
  lines: OrderLine[]
  subtotal: number
  promoCode: string | null
  promoDiscount: number
  shippingCost: number
  tax: number
  total: number
}

type CheckoutState = {
  shipping: ShippingFields
  payment: PaymentPlaceholder
  step: CheckoutStep
  completedOrder: CompletedOrder | null
  setShippingField: (field: keyof ShippingFields, value: string) => void
  setPaymentField: (field: keyof PaymentPlaceholder, value: string) => void
  setStep: (step: CheckoutStep) => void
  completeOrder: (order: CompletedOrder) => void
  resetCheckout: () => void
}

const emptyShipping: ShippingFields = {
  name: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
}

const emptyPayment: PaymentPlaceholder = {
  cardNumber: "",
  nameOnCard: "",
  expiry: "",
  cvc: "",
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      shipping: emptyShipping,
      payment: emptyPayment,
      step: 1,
      completedOrder: null,
      setShippingField: (field, value) =>
        set((state) => ({
          shipping: { ...state.shipping, [field]: value },
        })),
      setPaymentField: (field, value) =>
        set((state) => ({
          payment: { ...state.payment, [field]: value },
        })),
      setStep: (step) => set({ step }),
      completeOrder: (completedOrder) =>
        set({
          completedOrder,
          step: 1,
          shipping: emptyShipping,
          payment: emptyPayment,
        }),
      resetCheckout: () =>
        set({
          shipping: emptyShipping,
          payment: emptyPayment,
          step: 1,
        }),
    }),
    {
      name: "marshalls-checkout",
      partialize: (state) => ({
        shipping: state.shipping,
        payment: state.payment,
        step: state.step,
        completedOrder: state.completedOrder,
      }),
    },
  ),
)
