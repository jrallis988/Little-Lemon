import { Link, createFileRoute } from '@tanstack/react-router'
import { Logo } from '#/components/brand/Logo'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,92,56,0.12),transparent_50%),linear-gradient(180deg,var(--bg),#ebe4d6)]" />
      <div className="relative mx-auto flex min-h-[calc(100dvh-8rem)] max-w-5xl flex-col justify-end px-4 pb-16 pt-20">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
          For comics · against the algorithm
        </p>
        <Logo size="lg" />
        <h1 className="sr-only">Artistic Fountain</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
          A chronological social utility for comedians — local open mics, Material
          Lab notes, and regional Green Rooms. No vanity metrics. No rage bait.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/feed"
            className="rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg)] no-underline"
          >
            Enter the feed
          </Link>
          <Link
            to="/mics"
            className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--ink)] no-underline"
          >
            Find open mics
          </Link>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            ['Chronological only', 'Newest first. No engagement re-ranking.'],
            ['Local scene first', 'Comics, mics, and rooms near your home city.'],
            ['Craft over clout', 'Profiles hide follower counts by design.'],
          ].map(([title, body]) => (
            <li
              key={title}
              className="border border-[var(--line)] bg-[var(--surface)]/80 p-4"
            >
              <h2 className="font-display text-lg text-[var(--ink)]">{title}</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
