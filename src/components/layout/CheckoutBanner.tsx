"use client"

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useMembership } from '#/lib/membership'
import { useActivity } from '#/lib/oj/activity-store'
import { getCreator } from '#/lib/oj/catalog'

/**
 * Surfaces Stripe Checkout return query and applies membership when
 * creatorId/kind/amount/label are present (client bridge until webhooks land).
 */
export function CheckoutBanner() {
  const { subscribe, tip, isUnlocked } = useMembership()
  const { push: pushActivity } = useActivity()
  const [banner, setBanner] = useState<'success' | 'cancel' | null>(null)
  const [detail, setDetail] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const checkout = params.get('checkout')
    if (checkout !== 'success' && checkout !== 'cancel') return

    if (checkout === 'success') {
      const creatorId = params.get('creatorId')
      const kind = params.get('kind')
      const label = params.get('label') ?? 'Checkout'
      const amount = Number(params.get('amount') ?? 0)
      const creator = creatorId ? getCreator(creatorId) : undefined

      if (creatorId && kind === 'subscribe' && creator) {
        if (!isUnlocked(creatorId)) {
          subscribe(creatorId, label || creator.tierName, amount || creator.tierPriceMonthly)
          pushActivity({
            kind: 'subscribe',
            title: `${label || creator.tierName} unlocked`,
            body: `Checkout return · ${creator.displayName}`,
            href: '/library',
          })
        }
        setDetail(`${creator.displayName} · ${label || creator.tierName}`)
      } else if (creatorId && kind === 'tip' && amount > 0) {
        tip(creatorId, amount, label)
        pushActivity({
          kind: 'tip',
          title: `$${amount} tip recorded`,
          body: creator
            ? `Checkout return · ${creator.displayName}`
            : 'Checkout return tip',
          href: creator ? `/c/${creator.username}` : '/library',
        })
        setDetail(
          creator
            ? `$${amount} → ${creator.displayName}`
            : `$${amount} tip recorded`,
        )
      }
    }

    setBanner(checkout)
    ;['checkout', 'creatorId', 'kind', 'amount', 'label'].forEach((k) =>
      params.delete(k),
    )
    const next = `${window.location.pathname}${
      params.toString() ? `?${params}` : ''
    }${window.location.hash}`
    window.history.replaceState({}, '', next)
    // Apply once on mount from URL — membership methods are stable enough
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            ? detail
              ? `Checkout complete · ${detail}. Webhooks will own sync when STRIPE_WEBHOOK_SECRET is set.`
              : 'Checkout complete. Membership syncs from return params on this device until webhooks are live.'
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
