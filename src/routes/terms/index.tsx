import { Link, createFileRoute } from '@tanstack/react-router'
import { Logo } from '#/components/brand/Logo'

export const Route = createFileRoute('/terms/')({
  component: TermsPage,
})

function TermsPage() {
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
      <h1 className="mt-10 font-display text-4xl text-[var(--ink)]">Terms</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Last updated · demo draft</p>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--ink-soft)]">
        <p>
          only Jokes is a creator-subscription comedy platform. By using the
          service you agree not to post illegal content, harass others, or
          circumvent paywalls.
        </p>
        <p>
          Creator tiers and tips are direct support. Platform fees, refunds, and
          payout schedules will be disclosed when Stripe Connect goes live.
        </p>
        <p>
          Chronological discovery has no engagement ranking. We may remove
          content that violates law or these terms.
        </p>
        <p>
          This page is a product draft until counsel review — not legal advice.
        </p>
      </div>
    </main>
  )
}
