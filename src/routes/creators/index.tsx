"use client"

import { useMemo, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { AppShell } from '#/components/layout/AppShell'
import { Avatar } from '#/components/ui/Avatar'
import { SiteFooter } from '#/components/layout/SiteFooter'
import { useSafety } from '#/lib/oj/safety-store'
import { useMembership } from '#/lib/membership'
import { fetchCreators } from '#/server/oj-fns'

export const Route = createFileRoute('/creators/')({
  loader: () => fetchCreators(),
  component: CreatorsPage,
})

function CreatorsPage() {
  const creators = Route.useLoaderData()
  const { isBlocked } = useSafety()
  const { isUnlocked } = useMembership()
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<string | null>(null)

  const tags = useMemo(() => {
    const set = new Set<string>()
    for (const c of creators) for (const t of c.tags) set.add(t)
    return [...set].sort()
  }, [creators])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return creators
      .filter((c) => !isBlocked(c.id))
      .filter((c) => (tag ? c.tags.includes(tag) : true))
      .filter((c) => {
        if (!q) return true
        return (
          c.displayName.toLowerCase().includes(q) ||
          c.username.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.bio.toLowerCase().includes(q) ||
          c.tags.some((t) => t.includes(q))
        )
      })
  }, [creators, isBlocked, query, tag])

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-6">
        <header className="mb-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--tint)]">
            Directory
          </p>
          <h1 className="font-display text-4xl text-[var(--ink)]">Creators</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Stand-ups and comedy animators — search by name, city, or craft tag.
          </p>
        </header>

        <label className="mb-3 block">
          <span className="sr-only">Search creators</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, city, tag…"
            className="h-11 w-full rounded-xl border border-[var(--line)] bg-white/10 px-3 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)] focus:border-white"
          />
        </label>

        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTag(null)}
            className={`rounded-lg border px-2.5 py-1.5 text-[10px] uppercase tracking-[0.14em] ${
              tag === null
                ? 'border-white bg-white text-[var(--on-accent)]'
                : 'border-[var(--line)] text-[var(--muted)]'
            }`}
          >
            All
          </button>
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t === tag ? null : t)}
              className={`rounded-lg border px-2.5 py-1.5 text-[10px] uppercase tracking-[0.14em] ${
                tag === t
                  ? 'border-white bg-white text-[var(--on-accent)]'
                  : 'border-[var(--line)] text-[var(--muted)]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <ul className="divide-y divide-[var(--hairline)]">
          {visible.length === 0 ? (
            <li className="py-6 text-sm text-[var(--muted)]">
              No creators match that search.
            </li>
          ) : (
            visible.map((creator) => (
              <li key={creator.id}>
                <Link
                  to="/c/$username"
                  params={{ username: creator.username }}
                  className="flex items-center gap-3 py-4 no-underline transition hover:bg-white/5"
                >
                  <Avatar
                    initials={creator.avatarInitials}
                    hue={creator.bannerHue}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[var(--ink)]">
                      {creator.displayName}
                      {isUnlocked(creator.id) ? (
                        <span className="ml-2 text-[10px] font-normal uppercase tracking-[0.14em] text-[var(--tint)]">
                          Member
                        </span>
                      ) : null}
                    </p>
                    <p className="truncate text-xs text-[var(--muted)]">
                      @{creator.username} · {creator.city}
                    </p>
                    <p className="mt-1 line-clamp-1 text-sm text-[var(--ink-soft)]">
                      {creator.bio}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-[var(--ink)]">
                      ${creator.tierPriceMonthly}/mo
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--tint)]">
                      {creator.tierName}
                    </p>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
      <SiteFooter />
    </AppShell>
  )
}
