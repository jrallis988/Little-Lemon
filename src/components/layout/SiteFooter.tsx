import { Link } from '@tanstack/react-router'

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--hairline)] px-4 py-6">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)]">
        <p>only Jokes · uncensored creator comedy</p>
        <nav className="flex flex-wrap gap-4">
          <Link to="/terms" className="no-underline hover:text-[var(--ink)]">
            Terms
          </Link>
          <Link to="/privacy" className="no-underline hover:text-[var(--ink)]">
            Privacy
          </Link>
          <a
            href="/api/status"
            className="no-underline hover:text-[var(--ink)]"
          >
            Status
          </a>
        </nav>
      </div>
    </footer>
  )
}
