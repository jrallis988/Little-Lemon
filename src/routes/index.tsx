import { Link, createFileRoute } from '@tanstack/react-router'
import { Logo } from '#/components/brand/Logo'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,106,0,0.18),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(61,139,253,0.12),transparent_45%)]" />
      <div className="relative mx-auto flex min-h-dvh max-w-3xl flex-col px-4 pb-10 pt-8">
        <header className="flex items-center justify-between">
          <Logo size="md" />
          <Link
            to="/discover"
            className="text-sm text-[var(--muted)] no-underline hover:text-[var(--ink)]"
          >
            Enter
          </Link>
        </header>

        <section className="mt-auto pb-8 pt-24">
          <p className="animate-rise text-[11px] uppercase tracking-[0.28em] text-[var(--ice)]">
            Creator comedy · uncensored
          </p>
          <h1 className="sr-only">OJ — Only Jokes</h1>
          <p
            className="animate-rise mt-3 font-display text-[5.5rem] leading-[0.85] text-[var(--ink)] sm:text-[7rem]"
            style={{ animationDelay: '60ms' }}
          >
            <span className="text-[var(--accent)]">O</span>J
          </p>
          <p
            className="animate-rise mt-2 text-lg uppercase tracking-[0.22em] text-[var(--ink)]"
            style={{ animationDelay: '100ms' }}
          >
            Only <span className="text-[var(--accent)]">Jokes</span>
          </p>
          <p
            className="animate-rise mt-5 max-w-md text-base leading-relaxed text-[var(--ink-soft)]"
            style={{ animationDelay: '140ms' }}
          >
            Unfiltered stand-up, raw road work, and animated comedy without
            corporate censorship. Direct support. No algorithm tax theater.
          </p>
          <div
            className="animate-rise mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: '180ms' }}
          >
            <Link
              to="/discover"
              className="rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--on-accent)] no-underline hover:opacity-90"
            >
              Open discovery
            </Link>
            <Link
              to="/c/$username"
              params={{ username: 'maya.kill' }}
              className="rounded-md border border-[var(--line-strong)] bg-[var(--bg-panel)] px-5 py-3 text-sm font-semibold text-[var(--ice-bright)] no-underline"
            >
              See a creator
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
