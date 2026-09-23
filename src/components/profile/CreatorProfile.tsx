"use client"

import { useMemo, useState } from 'react'
import type { Creator, Post } from '#/domain/oj-types'
import { Avatar } from '#/components/ui/Avatar'
import { ContentTile } from '#/components/feed/ContentTile'
import { useSupport } from '#/lib/support'
import { useMembership } from '#/lib/membership'
import { usePublish } from '#/lib/oj/publish-store'
import { useSafety } from '#/lib/oj/safety-store'
import { useDemoAuth } from '#/lib/demo-auth'

export function CreatorProfile({
  creator,
  posts,
}: {
  creator: Creator
  posts: Post[]
}) {
  const { openSubscribe, openTip } = useSupport()
  const { isUnlocked } = useMembership()
  const { postsForCreator } = usePublish()
  const { isBlocked, blockCreator, unblockCreator, reportCreator } = useSafety()
  const { user } = useDemoAuth()
  const unlocked = isUnlocked(creator.id)
  const blocked = isBlocked(creator.id)
  const [reportOpen, setReportOpen] = useState(false)
  const [reason, setReason] = useState('Harassment or hate')
  const [notice, setNotice] = useState<string | null>(null)

  const library = useMemo(() => {
    const extras = postsForCreator(creator.id)
    return [...extras, ...posts].sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    )
  }, [posts, postsForCreator, creator.id])

  if (blocked) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="font-display text-4xl text-[var(--ink)]">Blocked</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          You blocked {creator.displayName}. Unblock to see their profile again.
        </p>
        <button
          type="button"
          onClick={() => unblockCreator(creator.id)}
          className="mt-6 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--on-accent)]"
        >
          Unblock
        </button>
      </div>
    )
  }

  return (
    <div>
      <div
        className="relative h-36 w-full sm:h-48"
        style={{
          background: `linear-gradient(120deg, hsl(${creator.bannerHue} 55% 45%), #00AFF0 48%, #BEE1F9 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(transparent_20%,rgba(0,175,240,0.88))]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4">
        <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <Avatar
              initials={creator.avatarInitials}
              hue={creator.bannerHue}
              size="xl"
            />
            <div className="pb-1">
              <h1 className="font-display text-4xl text-[var(--ink)]">
                {creator.displayName}
              </h1>
              <p className="text-sm text-[var(--muted)]">
                @{creator.username} · {creator.city}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => openTip(creator)}
              className="rounded-xl border border-[var(--line-strong)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)] hover:bg-white/10"
            >
              Tip
            </button>
            <button
              type="button"
              onClick={() => openSubscribe(creator)}
              className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--on-accent)] hover:opacity-95"
            >
              {unlocked
                ? `${creator.tierName} · member`
                : `${creator.tierName} · $${creator.tierPriceMonthly}/mo`}
            </button>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          {creator.bio}
        </p>

        <ul className="mt-3 flex flex-wrap gap-2">
          {creator.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-[var(--ink)]"
            >
              #{tag}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          <button
            type="button"
            onClick={() => setReportOpen((v) => !v)}
            className="text-[var(--muted)] underline-offset-4 hover:text-[var(--ink)] hover:underline"
          >
            Report
          </button>
          <button
            type="button"
            onClick={() => {
              blockCreator(creator.id)
              setNotice(`Blocked ${creator.displayName}`)
            }}
            className="text-[var(--muted)] underline-offset-4 hover:text-[var(--ink)] hover:underline"
          >
            Block
          </button>
          {!user ? (
            <span className="text-[var(--muted)]">Sign in to sync safety actions</span>
          ) : null}
        </div>

        {reportOpen ? (
          <form
            className="mt-3 space-y-2 rounded-xl border border-[var(--line)] bg-white/10 p-3"
            onSubmit={(e) => {
              e.preventDefault()
              reportCreator(creator.id, reason)
              setReportOpen(false)
              setNotice('Report filed on this device')
            }}
          >
            <label className="block text-sm text-[var(--muted)]">
              Reason
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-[var(--line)] bg-[var(--bg-elevated)] px-3 text-[var(--ink)]"
              >
                <option>Harassment or hate</option>
                <option>Spam or scam</option>
                <option>Illegal content</option>
                <option>Impersonation</option>
              </select>
            </label>
            <button
              type="submit"
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--on-accent)]"
            >
              Submit report
            </button>
          </form>
        ) : null}

        {notice ? (
          <p className="mt-3 text-sm text-[var(--tint)]">{notice}</p>
        ) : null}

        <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-[var(--hairline)] py-4 text-center">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              Supporters
            </dt>
            <dd className="mt-1 font-display text-3xl text-[var(--ink)]">
              {creator.supporters.toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              Posts
            </dt>
            <dd className="mt-1 font-display text-3xl text-[var(--ink)]">
              {creator.posts + postsForCreator(creator.id).length}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              Clips
            </dt>
            <dd className="mt-1 font-display text-3xl text-[var(--ink)]">
              {creator.clips}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--tint)]">
              Library
            </p>
            <h2 className="font-display text-3xl text-[var(--ink)]">
              Public + locked
            </h2>
          </div>
          <p className="max-w-[9rem] text-right text-xs text-[var(--muted)]">
            {unlocked
              ? 'Your tier is active on this device'
              : 'Frosted tiles = supporter tier'}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-5 pb-8 sm:grid-cols-3">
          {library.map((post) => (
            <ContentTile
              key={post.id}
              post={post}
              creator={creator}
              variant="grid"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
