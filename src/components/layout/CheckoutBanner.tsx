"use client"

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

/**
 * Surfaces Stripe Checkout return query (?checkout=success|cancel).
 * Demo unlocks still happen on-device; live Stripe needs the webhook.
 */
export function CheckoutBanner() {
  const [banner, setBanner] = useState<'success' | 'cancel' | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const checkout = params.get('checkout')
    if (checkout === 'success' || checkout === 'cancel') {
      setBanner(checkout)
      params.delete('checkout')
      const next = `${window.location.pathname}${
        params.toString() ? `?${params}` : ''
      }${window.location.hash}`
      window.history.replaceState({}, '', next)
    }
  }, [])

  if (!banner) return null

  return (
    <div
      className={`animate-rise border-b px-4 py-3 text-sm ${
        banner === 'success'
          ? 'border-white/25 bg-white/15 text-[var(--ink)]'
          : 'border-[#fb7185]/35 bg-[#fb7185]/15 text-[#ffe4e8]'
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-start justify-between gap-3">
        <p>
          {banner === 'success'
            ? 'Checkout complete. If Stripe webhooks are live, your membership syncs from the server — otherwise unlocks stay on this device.'
            : 'Checkout canceled. Nothing was charged.'}
        </p>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setBanner(null)}
          className="shrink-0 rounded-lg p-1 opacity-80 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
