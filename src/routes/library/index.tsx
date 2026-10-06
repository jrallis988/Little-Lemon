"use client"

import { useMemo, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { formatDistanceToNow } from 'date-fns'
import { AppShell } from '#/components/layout/AppShell'
import { ContentTile } from '#/components/feed/ContentTile'
import { Avatar } from '#/components/ui/Avatar'
import { SiteFooter } from '#/components/layout/SiteFooter'
import { useDemoAuth } from '#/lib/demo-auth'
import { useMembership } from '#/lib/membership'
import { getCreator, getPostsByCreator } from '#/lib/oj/catalog'
import { usePublish } from '#/lib/oj/publish-store'

export const Route = createFileRoute('/library/')({
  component: LibraryPage,
})

function LibraryPage() {
  const { user, ready } = useDemoAuth()
  const {
    unlockedCreatorIds,
    tipTotalsByCreator,
    receipts,
    revoke,
  } = useMembership()
  const { postsForCreator } = usePublish()
  const [tab, setTab] = useState<'unlocked' | 'receipts'>('unlocked')

  const libraryPosts = useMemo(() => {
    return unlockedCreatorIds
      .flatMap((id) => {
        const published = postsForCreator(id)
        const catalog = getPostsByCreator(id)
        const byId = new Map(
          [...published, ...catalog].map((p) => [p.id, p] as const),
        )
        return [...byId.values()].filter((p) => p.access === 'supporters')
      })
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  }, [unlockedCreatorIds, postsForCreator])

  const tipSum = Object.values(tipTotalsByCreator).reduce((a, b) => a + b, 0)

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-6">
        <header className="mb-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--tint)]">
            Membership
          </p>
          <h1 className="font-display text-4xl text-[var(--ink)]">Library</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Supporter drops and tip receipts on this device
            {ready && user ? ` · ${user.name}` : ''}.
          </p>
        </header>

        <div className="mb-5 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-white/10 px-2 py-3">
            <p className="font-mono text-lg text-[var(--ink)]">
              {unlockedCreatorIds.length}
            </p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
              Tiers
            </p>
          </div>
          <div className="rounded-xl bg-white/10 px-2 py-3">
            <p className="font-mono text-lg text-[var(--ink)]">
              {libraryPosts.length}
            </p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
              Locked drops
            </p>
          </div>
          <div className="rounded-xl bg-white/10 px-2 py-3">
            <p className="font-mono text-lg text-[var(--ink)]">${tipSum}</p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
              Tips sent
            </p>
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          {(
            [
              ['unlocked', 'Unlocked'],
              ['receipts', 'Receipts'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-xl border px-3 py-2 text-xs uppercase tracking-[0.14em] ${
                tab === id
                  ? 'border-white bg-white text-[var(--on-accent)]'
                  : 'border-[var(--line)] text-[var(--muted)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'unlocked' ? (
          <>
            <ul className="mb-6 divide-y divide-[var(--hairline)]">
              {unlockedCreatorIds.length === 0 ? (
                <li className="py-4 text-sm text-[var(--muted)]">
                  No tiers yet.{' '}
                  <Link
                    to="/creators"
                    className="text-[var(--ink)] underline-offset-4 hover:underline"
                  >
                    Browse creators
                  </Link>
                </li>
              ) : (
                unlockedCreatorIds.map((id) => {
                  const c = getCreator(id)
                  if (!c) return null
                  return (
                    <li
                      key={id}
                      className="flex items-center gap-3 py-3"
                    >
                      <Link
                        to="/c/$username"
                        params={{ username: c.username }}
                        className="flex min-w-0 flex-1 items-center gap-3 no-underline"
                      >
                        <Avatar
                          initials={c.avatarInitials}
                          hue={c.bannerHue}
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-[var(--ink)]">
                            {c.displayName}
                          </p>
                          <p className="text-xs text-[var(--muted)]">
                            {c.tierName} · tips $
                            {tipTotalsByCreator[id] ?? 0}
                          </p>
                        </div>
                      </Link>
                      <button
                        type="button"
                        onClick={() => revoke(id)}
                        className="shrink-0 text-xs text-[var(--muted)] underline-offset-2 hover:text-[var(--ink)] hover:underline"
                      >
                        Revoke
                      </button>
                    </li>
                  )
                })
              )}
            </ul>

            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[var(--tint)]">
              Supporter-only drops
            </p>
            {libraryPosts.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">
                Unlock a tier to open locked specials and memos here.
              </p>
            ) : (
              libraryPosts.map((post) => {
                const creator = getCreator(post.creatorId)
                if (!creator) return null
                return (
                  <ContentTile
                    key={post.id}
                    post={post}
                    creator={creator}
                  />
                )
              })
            )}
          </>
        ) : (
          <ul className="divide-y divide-[var(--hairline)]">
            {receipts.length === 0 ? (
              <li className="py-4 text-sm text-[var(--muted)]">
                No tips or unlocks recorded yet.
              </li>
            ) : (
              receipts.map((r) => {
                const c = getCreator(r.creatorId)
                return (
                  <li key={r.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                    <div>
                      <p className="font-medium text-[var(--ink)]">
                        {r.kind === 'subscribe' ? 'Unlock' : 'Tip'} ·{' '}
                        {c?.displayName ?? r.creatorId}
                      </p>
                      <p className="text-xs text-[var(--muted)]">
                        {r.label} ·{' '}
                        {formatDistanceToNow(new Date(r.at), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <span className="font-mono text-[var(--tint)]">
                      ${r.amount}
                    </span>
                  </li>
                )
              })
            )}
          </ul>
        )}
      </div>
      <SiteFooter />
    </AppShell>
  )
}
