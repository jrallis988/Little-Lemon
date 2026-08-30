import { Link, createFileRoute } from '@tanstack/react-router'
import { Logo } from '#/components/brand/Logo'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,#ffffff_32%,transparent),transparent_55%)]" />
      <div className="relative mx-auto flex min-h-dvh max-w-3xl flex-col px-4 pb-10 pt-8">
        <header className="flex items-center justify-between">
          <Logo size="sm" />
          <Link
            to="/onboarding"
            className="text-sm text-[var(--muted)] no-underline hover:text-[var(--ink)]"
          >
            New here?
          </Link>
        </header>

        <section className="mt-auto pb-8 pt-24">
          <p className="animate-rise text-[11px] uppercase tracking-[0.28em] text-[var(--tint)]">
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
            className="animate-rise mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: '180ms' }}
          >
            <Link
              to="/discover"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-[var(--on-accent)] no-underline shadow-[0_12px_32px_color-mix(in_srgb,#007eb8_35%,transparent)] hover:opacity-95"
            >
              Open discovery
            </Link>
            <Link
              to="/c/$username"
              params={{ username: 'maya.kill' }}
              className="px-1 text-sm font-medium text-[var(--ink-soft)] no-underline underline-offset-4 hover:text-[var(--ink)] hover:underline"
            >
              Or see a creator
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
