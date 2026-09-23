"use client"

import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { AppShell } from '#/components/layout/AppShell'
import { useDemoAuth } from '#/lib/demo-auth'
import { useMembership } from '#/lib/membership'
import { usePublish } from '#/lib/oj/publish-store'
import { useActivity } from '#/lib/oj/activity-store'
import { getCreator, getCreatorByUsername } from '#/lib/oj/catalog'
import type { AccessLevel, MediaKind } from '#/domain/oj-types'

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
  const { unlockedCreatorIds, tipTotalsByCreator, receipts } = useMembership()
  const { publish, postsForCreator } = usePublish()
  const { push: pushActivity } = useActivity()
  const [tierName, setTierName] = useState(creatorSettings.tierName)
  const [tierPrice, setTierPrice] = useState(
    String(creatorSettings.tierPriceMonthly),
  )
  const [saved, setSaved] = useState(false)
  const [pubTitle, setPubTitle] = useState('')
  const [pubBody, setPubBody] = useState('')
  const [pubKind, setPubKind] = useState<MediaKind>('video')
  const [pubAccess, setPubAccess] = useState<AccessLevel>('public')
  const [publishedNote, setPublishedNote] = useState<string | null>(null)

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

  const creator =
    getCreatorByUsername(user.creatorUsername ?? 'maya.kill') ??
    getCreator('cr1')

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

        {user.role === 'creator' && creator ? (
          <>
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

            <form
              className="mt-10 space-y-3 border-t border-[var(--hairline)] pt-8"
              onSubmit={(e) => {
                e.preventDefault()
                if (!pubTitle.trim()) return
                const post = publish({
                  creatorId: creator.id,
                  title: pubTitle,
                  body: pubBody || 'New drop from the road.',
                  kind: pubKind,
                  access: pubAccess,
                  durationLabel: pubKind === 'text' ? undefined : '1:00',
                })
                pushActivity({
                  kind: 'publish',
                  title: `Published “${post.title}”`,
                  body: `${pubAccess === 'supporters' ? 'Supporters' : 'Public'} · ${pubKind}`,
                  href: '/discover',
                })
                setPublishedNote(`Published “${post.title}”`)
                setPubTitle('')
                setPubBody('')
              }}
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--tint)]">
                Publish
              </p>
              <p className="text-xs text-[var(--muted)]">
                Demo publish lands in Discover / your library on this device.
                Wire R2 + `oj_posts` when DATABASE_URL is set.
              </p>
              <label className="block text-sm text-[var(--muted)]">
                Title
                <input
                  value={pubTitle}
                  onChange={(e) => setPubTitle(e.target.value)}
                  className="mt-1 h-11 w-full rounded-xl border border-[var(--line)] bg-white/10 px-3 text-[var(--ink)] outline-none focus:border-white"
                  required
                />
              </label>
              <label className="block text-sm text-[var(--muted)]">
                Caption
                <textarea
                  value={pubBody}
                  onChange={(e) => setPubBody(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-[var(--line)] bg-white/10 px-3 py-2 text-[var(--ink)] outline-none focus:border-white"
                />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="block text-sm text-[var(--muted)]">
                  Kind
                  <select
                    value={pubKind}
                    onChange={(e) => setPubKind(e.target.value as MediaKind)}
                    className="mt-1 h-11 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-3 text-[var(--ink)]"
                  >
                    <option value="video">Clip</option>
                    <option value="audio">Memo</option>
                    <option value="animation">Short</option>
                    <option value="text">Note</option>
                  </select>
                </label>
                <label className="block text-sm text-[var(--muted)]">
                  Access
                  <select
                    value={pubAccess}
                    onChange={(e) =>
                      setPubAccess(e.target.value as AccessLevel)
                    }
                    className="mt-1 h-11 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-3 text-[var(--ink)]"
                  >
                    <option value="public">Public</option>
                    <option value="supporters">Supporters</option>
                  </select>
                </label>
              </div>
              <button
                type="submit"
                className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--on-accent)]"
              >
                Publish post
              </button>
              {publishedNote ? (
                <p className="text-sm text-[var(--tint)]">{publishedNote}</p>
              ) : null}
              <p className="text-xs text-[var(--muted)]">
                Your publishes on this device:{' '}
                {postsForCreator(creator.id).length}
              </p>
            </form>
          </>
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
                  const c = getCreator(id)
                  return (
                    <li
                      key={id}
                      className="flex items-center justify-between py-3 text-sm text-[var(--ink-soft)]"
                    >
                      <span>{c?.displayName ?? id}</span>
                      <span className="text-[var(--tint)]">
                        {c?.tierName ?? 'Member'}
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

        <div className="mt-8 rounded-xl border border-[var(--hairline)] bg-white/5 px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--tint)]">
            Quick links
          </p>
          <div className="mt-2 flex flex-wrap gap-4 text-sm">
            <Link to="/library" className="text-[var(--ink)] no-underline hover:underline">
              Library
            </Link>
            <Link to="/activity" className="text-[var(--ink)] no-underline hover:underline">
              Activity
            </Link>
            <Link to="/creators" className="text-[var(--ink)] no-underline hover:underline">
              Creators
            </Link>
          </div>
          <p className="mt-2 text-xs text-[var(--muted)]">
            {receipts.length} receipt{receipts.length === 1 ? '' : 's'} on this
            device
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
          <Link to="/terms" className="no-underline hover:text-[var(--ink)]">
            Terms
          </Link>
          <Link to="/privacy" className="no-underline hover:text-[var(--ink)]">
            Privacy
          </Link>
        </div>

        <button
          type="button"
          onClick={signOut}
          className="mt-6 text-sm text-[var(--ink-soft)] underline-offset-4 hover:text-[var(--ink)] hover:underline"
        >
          Sign out
        </button>
      </div>
    </AppShell>
  )
}
