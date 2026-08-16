import { Link } from '@tanstack/react-router'

export function Logo({
  to = '/',
  size = 'md',
}: {
  to?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const text =
    size === 'lg' ? 'text-4xl' : size === 'sm' ? 'text-lg' : 'text-xl'

  return (
    <Link
      to={to}
      className={`font-display tracking-[0.04em] text-[var(--ink)] no-underline ${text}`}
    >
      Artistic <span className="text-[var(--accent)]">Fountain</span>
    </Link>
  )
}
