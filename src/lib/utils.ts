import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount)
}

export function discountPercent(compareAt: number, price: number) {
  if (compareAt <= 0 || price >= compareAt) return 0
  return Math.round(((compareAt - price) / compareAt) * 100)
}

export function savingsAmount(compareAt: number, price: number) {
  return Math.max(0, compareAt - price)
}
