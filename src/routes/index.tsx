import { Link, createFileRoute } from '@tanstack/react-router'
import { Logo } from '#/components/brand/Logo'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,#77ACF1_18%,transparent),transparent_52%)]" />
      <div className="relative mx-auto flex min-h-dvh max-w-3xl flex-col px-4 pb-10 pt-8">
        <header className="flex items-center justify-between">
          <Logo size="sm" />
          <Link
            to="/discover"
            className="text-sm text-[var(--muted)] no-underline hover:text-[var(--ink)]"
          >
            Enter
          </Link>
        </header>

        <section className="mt-auto pb-8 pt-24">
          <p className="animate-rise text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
            Creator comedy · uncensored
          </p>
          <h1 className="sr-only">only Jokes</h1>
          <div className="animate-rise mt-5" style={{ animationDelay: '60ms' }}>
            <Logo to="/discover" size="hero" />
          </div>
          <p
            className="animate-rise mt-6 max-w-md text-base leading-relaxed text-[var(--ink-soft)]"
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
              className="rounded-md border border-[var(--line-strong)] bg-[var(--bg-panel)] px-5 py-3 text-sm font-semibold text-[var(--ink)] no-underline"
            >
              See a creator
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
