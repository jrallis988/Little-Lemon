import { PRODUCTS } from "@/data/products"
import type { CompletedOrder, OrderLine, ShippingFields } from "@/stores/checkoutStore"
import { track } from "@/lib/analytics"

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

export type InventoryResult = {
  productId: string
  size: string
  available: boolean
  stockCount: number
  storesInStock: number
}

export async function checkInventory(
  productId: string,
  size: string,
): Promise<InventoryResult> {
  await delay(280 + Math.random() * 220)
  const product = PRODUCTS.find((p) => p.id === productId)
  const sizeRow = product?.sizes.find((s) => s.label === size)
  const available =
    !!product &&
    product.inventory !== "out_of_stock" &&
    !!sizeRow?.available
  const stockCount = available ? (sizeRow?.stockCount ?? 3) : 0
  const result = {
    productId,
    size,
    available,
    stockCount,
    storesInStock: available ? 1 + (stockCount % 4) : 0,
  }
  track("inventory_check", {
    productId,
    size,
    available,
    stockCount,
  })
  return result
}

export async function placeOrderApi(input: {
  shipping: ShippingFields
  lines: OrderLine[]
  subtotal: number
  promoCode: string | null
  promoDiscount: number
  shippingCost: number
  tax: number
  total: number
  paymentLast4: string
}): Promise<CompletedOrder> {
  await delay(700 + Math.random() * 500)
  // Simulate rare payment decline for obvious test cards
  if (input.paymentLast4 === "0000") {
    track("order_failed", { reason: "card_declined" })
    throw new Error("Card declined. Try another payment method.")
  }
  const order: CompletedOrder = {
    id: `MSH-${Date.now().toString().slice(-8)}`,
    placedAt: Date.now(),
    shipping: input.shipping,
    lines: input.lines,
    subtotal: input.subtotal,
    promoCode: input.promoCode,
    promoDiscount: input.promoDiscount,
    shippingCost: input.shippingCost,
    tax: input.tax,
    total: input.total,
  }
  track("order_placed", {
    orderId: order.id,
    total: order.total,
    items: order.lines.length,
  })
  return order
}

export type OrderTracking = {
  orderId: string
  status: "placed" | "packed" | "shipped" | "out_for_delivery" | "delivered"
  steps: { label: string; done: boolean; at?: string }[]
  eta: string
}

export async function fetchOrderTracking(orderId: string): Promise<OrderTracking | null> {
  await delay(350)
  if (!orderId.trim()) return null
  const ageHours = Math.max(1, (Date.now() % 96) + 4)
  const statusIndex = ageHours < 12 ? 1 : ageHours < 36 ? 2 : ageHours < 60 ? 3 : 4
  const statuses = ["placed", "packed", "shipped", "out_for_delivery", "delivered"] as const
  const labels = [
    "Order placed",
    "Packed at distribution center",
    "Shipped",
    "Out for delivery",
    "Delivered",
  ]
  track("order_status_lookup", { orderId, status: statuses[statusIndex] })
  return {
    orderId,
    status: statuses[statusIndex]!,
    eta: statusIndex >= 4 ? "Delivered" : "Estimated 2–4 business days",
    steps: labels.map((label, i) => ({
      label,
      done: i <= statusIndex,
      at: i <= statusIndex ? new Date(Date.now() - (statusIndex - i) * 3600000).toLocaleString() : undefined,
    })),
  }
}

export async function requestSupportHandoff(input: {
  topic: string
  email: string
}): Promise<{ ticketId: string; etaMinutes: number }> {
  await delay(400)
  const ticketId = `TKT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
  const etaMinutes = 5 + Math.floor(Math.random() * 10)
  track("chat_handoff", { ticketId, email: input.email })
  return { ticketId, etaMinutes }
}
