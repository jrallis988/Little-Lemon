import { Link, createFileRoute } from '@tanstack/react-router'
import { Logo } from '#/components/brand/Logo'

export const Route = createFileRoute('/privacy/')({
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-5 py-8">
      <header className="flex items-center justify-between">
        <Logo size="sm" />
        <Link
          to="/"
          className="text-sm text-[var(--muted)] no-underline hover:text-[var(--ink)]"
        >
          Home
        </Link>
      </header>
      <h1 className="mt-10 font-display text-4xl text-[var(--ink)]">Privacy</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Last updated · demo draft</p>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--ink-soft)]">
        <p>
          We collect account email, creator profile data, tips/subscriptions,
          and device-local demo preferences when no database is connected.
        </p>
        <p>
          Payment details are handled by Stripe when live keys are configured —
          we do not store raw card numbers.
        </p>
        <p>
          Media you upload will live in object storage (R2) with access control
          for supporter tiers. Report/block actions help keep the room usable.
        </p>
        <p>
          This page is a product draft until counsel review — not legal advice.
        </p>
      </div>
    </main>
  )
}
