"use client"

import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { AppShell } from '#/components/layout/AppShell'
import { useDemoAuth } from '#/lib/demo-auth'
import { useMembership } from '#/lib/membership'
import { usePublish } from '#/lib/oj/publish-store'
import { useActivity } from '#/lib/oj/activity-store'
import { usePayout } from '#/lib/oj/payout-store'
import { useFollow } from '#/lib/oj/follow-store'
import { getCreator, getCreatorByUsername, getPostsByCreator } from '#/lib/oj/catalog'
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
  const payout = usePayout()
  const { followingCreatorIds } = useFollow()
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
  const [mediaUrl, setMediaUrl] = useState<string | undefined>()
  const [uploadNote, setUploadNote] = useState<string | null>(null)
  const [connectBusy, setConnectBusy] = useState(false)

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
                Demo pricing stays on-device until Postgres + Stripe are live.
              </p>
            </form>

            <div className="mt-8 space-y-3 border-t border-[var(--hairline)] pt-8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--tint)]">
                Earnings & payouts
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-white/10 px-2 py-3">
                  <p className="font-mono text-lg text-[var(--ink)]">
                    $
                    {getPostsByCreator(creator.id).reduce(
                      (a, p) => a + p.tipTotal,
                      0,
                    )}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    Catalog tips
                  </p>
                </div>
                <div className="rounded-xl bg-white/10 px-2 py-3">
                  <p className="font-mono text-lg text-[var(--ink)]">
                    {postsForCreator(creator.id).length}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    Publishes
                  </p>
                </div>
                <div className="rounded-xl bg-white/10 px-2 py-3">
                  <p className="font-mono text-sm capitalize text-[var(--ink)]">
                    {payout.status}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    Connect
                  </p>
                </div>
              </div>
              {payout.accountId ? (
                <p className="text-xs text-[var(--muted)]">
                  Account ·{' '}
                  <span className="font-mono text-[var(--ink-soft)]">
                    {payout.accountId}
                  </span>
                </p>
              ) : null}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={connectBusy || payout.status === 'connected'}
                  onClick={() => {
                    setConnectBusy(true)
                    void payout.startConnect().finally(() => setConnectBusy(false))
                  }}
                  className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--on-accent)] disabled:opacity-60"
                >
                  {payout.status === 'connected'
                    ? 'Payouts connected'
                    : connectBusy
                      ? 'Connecting…'
                      : 'Connect payouts'}
                </button>
                {payout.status === 'connected' ? (
                  <button
                    type="button"
                    onClick={() => payout.disconnect()}
                    className="rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm text-[var(--ink-soft)]"
                  >
                    Disconnect
                  </button>
                ) : null}
              </div>
              <p className="text-xs text-[var(--muted)]">
                Demo Connect lands on-device. Live mode uses Stripe Account Links
                when `STRIPE_SECRET_KEY` is set.
              </p>
            </div>

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
                  mediaUrl,
                })
                pushActivity({
                  kind: 'publish',
                  title: `Published “${post.title}”`,
                  body: `${pubAccess === 'supporters' ? 'Supporters' : 'Public'} · ${pubKind}`,
                  href: `/p/${post.id}`,
                })
                setPublishedNote(`Published “${post.title}”`)
                setPubTitle('')
                setPubBody('')
                setMediaUrl(undefined)
                setUploadNote(null)
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
              <label className="block text-sm text-[var(--muted)]">
                Media file (optional)
                <input
                  type="file"
                  accept="video/*,audio/*,image/*"
                  className="mt-1 block w-full text-xs text-[var(--ink-soft)] file:mr-3 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[var(--on-accent)]"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    setUploadNote('Uploading…')
                    const body = new FormData()
                    body.set('file', file)
                    void fetch('/api/media/upload', { method: 'POST', body })
                      .then((r) => r.json())
                      .then((data: { ok?: boolean; url?: string; mode?: string; message?: string }) => {
                        if (data.ok && data.url) {
                          setMediaUrl(data.url)
                          setUploadNote(
                            data.mode === 'demo'
                              ? 'Demo media attached (bytes not stored).'
                              : 'Media attached.',
                          )
                        } else {
                          setUploadNote(data.message ?? 'Upload failed')
                        }
                      })
                      .catch(() => setUploadNote('Upload failed'))
                  }}
                />
              </label>
              {uploadNote ? (
                <p className="text-xs text-[var(--tint)]">{uploadNote}</p>
              ) : null}
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
              {' · '}
              Following {followingCreatorIds.length}
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
            {receipts.length} receipt{receipts.length === 1 ? '' : 's'} ·{' '}
            {followingCreatorIds.length} following on this device
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
