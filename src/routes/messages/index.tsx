"use client"

import { Link, createFileRoute } from '@tanstack/react-router'
import { formatDistanceToNow } from 'date-fns'
import { AppShell } from '#/components/layout/AppShell'
import { backstageThreads } from '#/lib/oj/catalog'
import { useDemoAuth } from '#/lib/demo-auth'

export const Route = createFileRoute('/messages/')({
  component: MessagesPage,
})

function MessagesPage() {
  const { user, ready } = useDemoAuth()

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--tint)]">
          Inbox
        </p>
        <h1 className="font-display text-4xl text-[var(--ink)]">Backstage</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Direct lines for fans, bookers, and venue managers.
        </p>

        {!ready ? null : !user ? (
          <div className="mt-6 rounded-xl border border-[var(--line)] bg-white/10 p-4">
            <p className="text-sm text-[var(--ink-soft)]">
              Sign in to keep Backstage threads on this device.
            </p>
            <Link
              to="/auth"
              search={{ mode: 'signin', role: 'fan' }}
              className="mt-3 inline-flex text-sm font-semibold text-[var(--ink)] no-underline underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </div>
        ) : null}

        <ul className="mt-6 divide-y divide-[var(--hairline)]">
          {backstageThreads.map((thread) => (
            <li key={thread.id} className="py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[var(--ink)]">
                    {thread.fromLabel}
                    {thread.unread ? (
                      <span className="ml-2 inline-block h-2 w-2 rounded-full bg-white align-middle" />
                    ) : null}
                  </p>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">
                    {thread.preview}
                  </p>
                </div>
                <p className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                  {formatDistanceToNow(new Date(thread.updatedAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  )
}
