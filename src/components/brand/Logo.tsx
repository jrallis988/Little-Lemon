import { Link } from '@tanstack/react-router'

function OjMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 64"
      className={className}
      aria-hidden
      fill="none"
    >
      <circle
        cx="26"
        cy="32"
        r="18.5"
        stroke="#BEE1F9"
        strokeWidth="11"
      />
      <path
        d="M44 9v31.5c0 11.5-8.2 19.5-21.5 19.5"
        stroke="#FFFFFF"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const markSize = {
  sm: 'h-8 w-9',
  md: 'h-11 w-12',
  lg: 'h-16 w-[4.5rem]',
  hero: 'h-24 w-[6.75rem] sm:h-28 sm:w-32',
} as const

const wordSize = {
  sm: 'text-[15px] leading-[1.05]',
  md: 'text-xl leading-[1.05]',
  lg: 'text-3xl leading-[1.02]',
  hero: 'text-4xl leading-[1.02] sm:text-5xl',
} as const

export function Logo({
  to = '/',
  size = 'md',
  wordmark = true,
}: {
  to?: string
  size?: 'sm' | 'md' | 'lg' | 'hero'
  wordmark?: boolean
}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2.5 no-underline sm:gap-3"
      aria-label="only Jokes"
    >
      <OjMark className={`shrink-0 ${markSize[size]}`} />
      {wordmark ? (
        <span
          className={`flex flex-col font-semibold tracking-tight ${wordSize[size]}`}
        >
          <span className="text-[var(--ink)]">only</span>
          <span className="text-[var(--tint)]">Jokes</span>
        </span>
      ) : null}
    </Link>
  )
}
