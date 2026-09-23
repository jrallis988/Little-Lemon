import { loadStripe, type Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null> | null = null
let cachedKey: string | null = null

/** Singleton Stripe.js loader keyed by publishable key. */
export function getStripe(publishableKey: string): Promise<Stripe | null> {
  if (!publishableKey) return Promise.resolve(null)
  if (cachedKey !== publishableKey) {
    cachedKey = publishableKey
    stripePromise = loadStripe(publishableKey)
  }
  return stripePromise ?? Promise.resolve(null)
}

export function checkoutReturnUrl(origin = window.location.origin): string {
  const url = new URL(origin)
  url.searchParams.set('tab', 'checkout')
  url.searchParams.set('payment', 'return')
  return url.toString()
}

export function parseCheckoutReturn(search: string): {
  intentId?: string
  redirectStatus?: string
  isReturn: boolean
} {
  const q = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  return {
    intentId: q.get('payment_intent') ?? undefined,
    redirectStatus: q.get('redirect_status') ?? undefined,
    isReturn: q.get('payment') === 'return' || q.has('payment_intent'),
  }
}

export function clearCheckoutReturnParams() {
  const url = new URL(window.location.href)
  ;['payment', 'payment_intent', 'payment_intent_client_secret', 'redirect_status'].forEach(
    (key) => url.searchParams.delete(key),
  )
  window.history.replaceState({}, '', url.pathname + url.search + url.hash)
}
