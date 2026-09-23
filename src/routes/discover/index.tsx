"use client"

import { useMemo, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { AppShell } from '#/components/layout/AppShell'
import { DiscoveryFeed } from '#/components/feed/DiscoveryFeed'
import { SiteFooter } from '#/components/layout/SiteFooter'
import { useMembership } from '#/lib/membership'
import { loadPublicFeed } from '#/server/oj'
import { getPostsByCreator } from '#/lib/oj/catalog'
import { usePublish } from '#/lib/oj/publish-store'
import type { Post } from '#/domain/oj-types'

export const Route = createFileRoute('/discover/')({
  loader: () => loadPublicFeed(),
  component: DiscoverPage,
})

function DiscoverPage() {
  const feed = Route.useLoaderData()
  const { unlockedCreatorIds } = useMembership()
  const { postsForCreator } = usePublish()
  const [scope, setScope] = useState<'all' | 'supporting'>('all')

  const supportingPosts = useMemo(() => {
    if (unlockedCreatorIds.length === 0) return [] as Post[]
    const merged = unlockedCreatorIds.flatMap((id) => {
      const published = postsForCreator(id)
      const catalog = getPostsByCreator(id)
      const byId = new Map(
        [...published, ...catalog].map((p) => [p.id, p] as const),
      )
      return [...byId.values()]
    })
    return merged.sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    )
  }, [unlockedCreatorIds, postsForCreator])

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-6">
        <header className="mb-2">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--tint)]">
            Chronological
          </p>
          <h1 className="font-display text-4xl text-[var(--ink)]">Discover</h1>
          <p className="mt-1 max-w-md text-sm text-[var(--muted)]">
            Public clips, open-mic notes, and teaser shorts — newest first. No
            engagement re-ranking.
          </p>
        </header>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          {(
            [
              ['all', 'Everyone'],
              ['supporting', 'Supporting'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setScope(id)}
              className={`rounded-xl border px-3 py-2 text-xs uppercase tracking-[0.14em] ${
                scope === id
                  ? 'border-white bg-white text-[var(--on-accent)]'
                  : 'border-[var(--line)] text-[var(--muted)]'
              }`}
            >
              {label}
            </button>
          ))}
          <Link
            to="/library"
            className="ml-auto text-xs uppercase tracking-[0.14em] text-[var(--tint)] no-underline hover:text-[var(--ink)]"
          >
            Library →
          </Link>
        </div>

        {scope === 'supporting' && unlockedCreatorIds.length === 0 ? (
          <p className="py-8 text-sm text-[var(--muted)]">
            Unlock a creator tier to see their public + supporter drops here.{' '}
            <Link
              to="/creators"
              className="text-[var(--ink)] underline-offset-4 hover:underline"
            >
              Browse creators
            </Link>
          </p>
        ) : (
          <DiscoveryFeed
            posts={scope === 'supporting' ? supportingPosts : feed}
            includePublished={scope === 'all'}
          />
        )}
      </div>
      <SiteFooter />
    </AppShell>
  )
}
