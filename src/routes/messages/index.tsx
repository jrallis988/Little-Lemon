import { createFileRoute } from '@tanstack/react-router'
import { AppShell } from '#/components/layout/AppShell'

export const Route = createFileRoute('/messages/')({
  component: MessagesPage,
})

function MessagesPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="font-display text-4xl">Backstage</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Direct lines for fans, bookers, and venue managers. Wire-up next.
        </p>
        <div className="mt-6 space-y-2">
          {['Booker · Stage Left Lounge', 'Fan · tip follow-up', 'Venue · Friday late'].map(
            (row) => (
              <div
                key={row}
                className="border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink-soft)]"
              >
                {row}
              </div>
            ),
          )}
        </div>
      </div>
    </AppShell>
  )
}
