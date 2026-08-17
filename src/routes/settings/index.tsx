import { createFileRoute } from '@tanstack/react-router'
import { AppShell } from '#/components/layout/AppShell'

export const Route = createFileRoute('/settings/')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="font-display text-4xl">You</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Creator payouts, supporter tier pricing, and media upload settings land
          here next.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-[var(--ink-soft)]">
          <li className="border border-[var(--line)] bg-[var(--bg-elevated)] p-3">
            Switch to creator mode
          </li>
          <li className="border border-[var(--line)] bg-[var(--bg-elevated)] p-3">
            Tier pricing & perks
          </li>
          <li className="border border-[var(--line)] bg-[var(--bg-elevated)] p-3">
            Payout destination
          </li>
        </ul>
      </div>
    </AppShell>
  )
}
