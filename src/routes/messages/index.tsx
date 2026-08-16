import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/messages/')({
  component: MessagesPage,
})

function MessagesPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-6">
        <h1 className="font-display text-3xl text-[var(--ink)]">Messages</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Clean DMs for spot swaps, guest hosts, and rides to mics.
        </p>
      </header>
      <div className="border border-[var(--line)] bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
        Direct message threads map to <code>conversations</code> +{' '}
        <code>direct_messages</code>. Wire-up after auth + profiles.
      </div>
    </main>
  )
}
