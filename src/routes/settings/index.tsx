"use client"

import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { AppShell } from '#/components/layout/AppShell'
import { useDemoAuth } from '#/lib/demo-auth'
import { useMembership } from '#/lib/membership'
import { getCreator } from '#/lib/oj/catalog'

export const Route = createFileRoute('/settings/')({
  component: SettingsPage,
})

function SettingsPage() {
  const {
    user,
    ready,
    signOut,
    setRole,
    creatorSettings,
    updateCreatorSettings,
  } = useDemoAuth()
  const { unlockedCreatorIds, tipTotalsByCreator } = useMembership()
  const [tierName, setTierName] = useState(creatorSettings.tierName)
  const [tierPrice, setTierPrice] = useState(
    String(creatorSettings.tierPriceMonthly),
  )
  const [saved, setSaved] = useState(false)

  if (!ready) {
    return (
      <AppShell>
        <div className="px-4 py-10 text-sm text-[var(--muted)]">Loading…</div>
      </AppShell>
    )
  }

  if (!user) {
    return (
      <AppShell>
        <div className="mx-auto max-w-2xl px-4 py-8">
          <h1 className="font-display text-4xl text-[var(--ink)]">You</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Sign in to manage creator mode, tier pricing, and payouts.
          </p>
          <Link
            to="/auth"
            search={{ mode: 'signup', role: 'fan' }}
            className="mt-6 inline-flex rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--on-accent)] no-underline"
          >
            Create account
          </Link>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--tint)]">
          Account
        </p>
        <h1 className="font-display text-4xl text-[var(--ink)]">{user.name}</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {user.email} · {user.role}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setRole('fan')}
            className={`rounded-xl border px-3 py-3 text-sm font-semibold ${
              user.role === 'fan'
                ? 'border-white bg-white text-[var(--on-accent)]'
                : 'border-[var(--line)] text-[var(--ink)]'
            }`}
          >
            Fan mode
          </button>
          <button
            type="button"
            onClick={() => setRole('creator')}
            className={`rounded-xl border px-3 py-3 text-sm font-semibold ${
              user.role === 'creator'
                ? 'border-white bg-white text-[var(--on-accent)]'
                : 'border-[var(--line)] text-[var(--ink)]'
            }`}
          >
            Creator mode
          </button>
        </div>

        {user.role === 'creator' ? (
          <form
            className="mt-8 space-y-3"
            onSubmit={(e) => {
              e.preventDefault()
              updateCreatorSettings({
                tierName,
                tierPriceMonthly: Number(tierPrice) || 9,
              })
              setSaved(true)
              window.setTimeout(() => setSaved(false), 1200)
            }}
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--tint)]">
              Tier pricing & perks
            </p>
            <label className="block text-sm text-[var(--muted)]">
              Tier name
              <input
                value={tierName}
                onChange={(e) => setTierName(e.target.value)}
                className="mt-1 h-11 w-full rounded-xl border border-[var(--line)] bg-white/10 px-3 text-[var(--ink)] outline-none focus:border-white"
              />
            </label>
            <label className="block text-sm text-[var(--muted)]">
              Monthly price (USD)
              <input
                value={tierPrice}
                onChange={(e) => setTierPrice(e.target.value)}
                inputMode="decimal"
                className="mt-1 h-11 w-full rounded-xl border border-[var(--line)] bg-white/10 px-3 text-[var(--ink)] outline-none focus:border-white"
              />
            </label>
            <button
              type="submit"
              className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--on-accent)]"
            >
              {saved ? 'Saved' : 'Save tier'}
            </button>
            <p className="text-xs text-[var(--muted)]">
              Payout destination: connect Stripe Connect when live keys are
              available. Demo pricing stays on-device for now.
            </p>
          </form>
        ) : (
          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--tint)]">
              Your support
            </p>
            <ul className="mt-3 divide-y divide-[var(--hairline)]">
              {unlockedCreatorIds.length === 0 ? (
                <li className="py-3 text-sm text-[var(--muted)]">
                  No tiers unlocked yet.
                </li>
              ) : (
                unlockedCreatorIds.map((id) => {
                  const creator = getCreator(id)
                  return (
                    <li
                      key={id}
                      className="flex items-center justify-between py-3 text-sm text-[var(--ink-soft)]"
                    >
                      <span>{creator?.displayName ?? id}</span>
                      <span className="text-[var(--tint)]">
                        {creator?.tierName ?? 'Member'}
                      </span>
                    </li>
                  )
                })
              )}
            </ul>
            <p className="mt-4 text-xs text-[var(--muted)]">
              Tips sent this device:{' '}
              <span className="font-mono text-[var(--ink)]">
                $
                {Object.values(tipTotalsByCreator).reduce((a, b) => a + b, 0)}
              </span>
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={signOut}
          className="mt-10 text-sm text-[var(--ink-soft)] underline-offset-4 hover:text-[var(--ink)] hover:underline"
        >
          Sign out
        </button>
      </div>
    </AppShell>
  )
}
