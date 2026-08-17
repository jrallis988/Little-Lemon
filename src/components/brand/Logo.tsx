import { Link } from '@tanstack/react-router'

export function Logo({
  to = '/',
  size = 'md',
}: {
  to?: string
  size?: 'sm' | 'md' | 'lg' | 'hero'
}) {
  const cls =
    size === 'hero'
      ? 'text-6xl sm:text-7xl'
      : size === 'lg'
        ? 'text-4xl'
        : size === 'sm'
          ? 'text-xl'
          : 'text-2xl'

  return (
    <Link
      to={to}
      className={`font-display text-[var(--ink)] no-underline ${cls}`}
    >
      O<span className="text-[var(--orange)]">J</span>
    </Link>
  )
}
