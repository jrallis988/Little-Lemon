import { createFileRoute } from '@tanstack/react-router'
import { AppShell } from '#/components/layout/AppShell'

export const Route = createFileRoute('/messages/')({
  component: MessagesPage,
})

function MessagesPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--tint)]">
          Coming next
        </p>
        <h1 className="font-display text-4xl text-[var(--ink)]">Backstage</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Direct lines for fans, bookers, and venue managers.
        </p>
        <ul className="mt-6 divide-y divide-[var(--hairline)]">
          {[
            'Booker · Stage Left Lounge',
            'Fan · tip follow-up',
            'Venue · Friday late',
          ].map((row) => (
            <li
              key={row}
              className="flex items-center justify-between py-3.5 text-sm text-[var(--ink-soft)]"
            >
              <span>{row}</span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                Soon
              </span>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  )
}
