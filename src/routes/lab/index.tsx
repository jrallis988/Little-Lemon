import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/lab/')({ component: LabPage })

function LabPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-6">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
          Peer craft
        </p>
        <h1 className="font-display text-3xl text-[var(--ink)]">Material Lab</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Share rough premises and voice memos. Get notes — not likes.
        </p>
      </header>
      <div className="border border-dashed border-[var(--line)] bg-[var(--surface)] p-6">
        <p className="text-sm text-[var(--ink-soft)]">
          Lab posts use <code>posts.kind = lab_memo</code> with{' '}
          <code>visibility = lab</code>. Feedback lives in{' '}
          <code>lab_notes</code> — chronological peer notes, zero vanity
          counters.
        </p>
        <button
          type="button"
          className="mt-4 rounded-md border border-[var(--line)] px-3 py-2 text-sm"
        >
          Drop a premise (coming next)
        </button>
      </div>
    </main>
  )
}
