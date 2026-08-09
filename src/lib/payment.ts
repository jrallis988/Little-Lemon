/** Lightweight Stripe-style card helpers for the demo checkout. */

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "")
}

export function formatCardNumber(value: string) {
  const digits = digitsOnly(value).slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
}

export function formatExpiry(value: string) {
  const digits = digitsOnly(value).slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export function formatCvc(value: string) {
  return digitsOnly(value).slice(0, 4)
}

export function detectCardBrand(cardNumber: string) {
  const digits = digitsOnly(cardNumber)
  if (/^4/.test(digits)) return "Visa"
  if (/^5[1-5]/.test(digits) || /^2(2[2-9]|[3-6]|7[01]|720)/.test(digits))
    return "Mastercard"
  if (/^3[47]/.test(digits)) return "Amex"
  if (/^6(?:011|5)/.test(digits)) return "Discover"
  return "Card"
}

export function cardLast4(cardNumber: string) {
  const digits = digitsOnly(cardNumber)
  return digits.slice(-4).padStart(4, "0")
}

export function isValidDemoCard(cardNumber: string, expiry: string, cvc: string) {
  const digits = digitsOnly(cardNumber)
  const exp = digitsOnly(expiry)
  const sec = digitsOnly(cvc)
  if (digits.length < 15) return false
  if (exp.length !== 4) return false
  const month = Number(exp.slice(0, 2))
  if (month < 1 || month > 12) return false
  if (sec.length < 3) return false
  return true
}
