"use client"

import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { formatDistanceToNow } from 'date-fns'
import { AppShell } from '#/components/layout/AppShell'
import { useDemoAuth } from '#/lib/demo-auth'
import { useInbox } from '#/lib/oj/inbox-store'
import { useActivity } from '#/lib/oj/activity-store'

export const Route = createFileRoute('/messages/')({
  component: MessagesPage,
})

function MessagesPage() {
  const { user, ready } = useDemoAuth()
  const { threads, openThread, reply, messagesFor } = useInbox()
  const { push: pushActivity } = useActivity()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')

  const active = threads.find((t) => t.id === activeId) ?? null
  const msgs = activeId ? messagesFor(activeId) : []

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

        {active ? (
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setActiveId(null)}
              className="text-sm text-[var(--muted)] hover:text-[var(--ink)]"
            >
              ← All threads
            </button>
            <h2 className="mt-3 text-lg font-semibold text-[var(--ink)]">
              {active.fromLabel}
            </h2>
            <ul className="mt-4 space-y-3">
              {msgs.map((m) => (
                <li
                  key={m.id}
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    m.from === 'you'
                      ? 'ml-auto bg-white text-[var(--on-accent)]'
                      : 'bg-white/15 text-[var(--ink)]'
                  }`}
                >
                  {m.body}
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.12em] opacity-70">
                    {formatDistanceToNow(new Date(m.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </li>
              ))}
            </ul>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                if (!user || !active) return
                const body = draft.trim()
                if (!body) return
                reply(active.id, body)
                pushActivity({
                  kind: 'reply',
                  title: `Replied to ${active.fromLabel}`,
                  body: body.slice(0, 120),
                  href: '/messages',
                })
                setDraft('')
              }}
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={user ? 'Reply…' : 'Sign in to reply'}
                disabled={!user}
                className="h-11 flex-1 rounded-xl border border-[var(--line)] bg-white/10 px-3 text-[var(--ink)] outline-none focus:border-white disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!user || !draft.trim()}
                className="rounded-xl bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--on-accent)] disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        ) : (
          <ul className="mt-6 divide-y divide-[var(--hairline)]">
            {threads.map((thread) => (
              <li key={thread.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveId(thread.id)
                    openThread(thread.id)
                  }}
                  className="flex w-full items-start justify-between gap-3 py-4 text-left"
                >
                  <div>
                    <p className="font-semibold text-[var(--ink)]">
                      {thread.fromLabel}
                      {thread.unread ? (
                        <span className="ml-2 inline-block h-2 w-2 rounded-full bg-white align-middle" />
                      ) : null}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-[var(--ink-soft)]">
                      {thread.preview}
                    </p>
                  </div>
                  <p className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                    {formatDistanceToNow(new Date(thread.updatedAt), {
                      addSuffix: true,
                    })}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  )
}
