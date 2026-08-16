import { Link } from '@tanstack/react-router'
import { Logo } from '#/components/brand/Logo'

const links = [
  { to: '/feed', label: 'Feed' },
  { to: '/mics', label: 'Mics' },
  { to: '/lab', label: 'Lab' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/messages', label: 'Messages' },
] as const

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--header)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Logo size="sm" />
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-md px-2.5 py-1.5 text-sm text-[var(--muted)] no-underline transition hover:bg-[var(--wash)] hover:text-[var(--ink)]"
              activeProps={{
                className:
                  'rounded-md px-2.5 py-1.5 text-sm text-[var(--ink)] no-underline bg-[var(--wash)]',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/settings"
          className="text-sm text-[var(--muted)] no-underline hover:text-[var(--ink)]"
        >
          Settings
        </Link>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-[var(--line)] px-2 py-1 sm:hidden">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="shrink-0 rounded-md px-3 py-2 text-xs uppercase tracking-[0.12em] text-[var(--muted)] no-underline"
            activeProps={{
              className:
                'shrink-0 rounded-md px-3 py-2 text-xs uppercase tracking-[0.12em] text-[var(--accent)] no-underline',
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
