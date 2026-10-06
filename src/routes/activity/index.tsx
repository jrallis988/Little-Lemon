"use client"

import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { formatDistanceToNow } from 'date-fns'
import { AppShell } from '#/components/layout/AppShell'
import { SiteFooter } from '#/components/layout/SiteFooter'
import { useActivity } from '#/lib/oj/activity-store'

export const Route = createFileRoute('/activity/')({
  component: ActivityPage,
})

function ActivityPage() {
  const { items, markAllRead, unreadCount } = useActivity()

  useEffect(() => {
    markAllRead()
  }, [markAllRead])

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-6">
        <header className="mb-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--tint)]">
            On this device
          </p>
          <h1 className="font-display text-4xl text-[var(--ink)]">Activity</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Unlocks, tips, publishes, and Backstage replies
            {unreadCount > 0 ? ` · ${unreadCount} new` : ''}.
          </p>
        </header>

        <ul className="divide-y divide-[var(--hairline)]">
          {items.length === 0 ? (
            <li className="py-6 text-sm text-[var(--muted)]">
              Nothing yet. Unlock a tier, tip a comic, or publish a drop.
            </li>
          ) : (
            items.map((item) => (
              <li key={item.id} className="py-4">
                {item.href ? (
                  <a href={item.href} className="block no-underline">
                    <ActivityRow item={item} />
                  </a>
                ) : (
                  <ActivityRow item={item} />
                )}
              </li>
            ))
          )}
        </ul>
      </div>
      <SiteFooter />
    </AppShell>
  )
}

function ActivityRow({
  item,
}: {
  item: {
    kind: string
    title: string
    body: string
    createdAt: string
    read: boolean
  }
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        {!item.read ? (
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--tint)]" />
        ) : null}
        <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--tint)]">
          {item.kind}
        </p>
        <span className="text-[10px] text-[var(--muted)]">
          {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
        </span>
      </div>
      <p className="mt-1 font-semibold text-[var(--ink)]">{item.title}</p>
      <p className="mt-0.5 text-sm text-[var(--ink-soft)]">{item.body}</p>
    </div>
  )
}
