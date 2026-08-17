export function Avatar({
  initials,
  hue,
  size = 'md',
}: {
  initials: string
  hue: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  const dim =
    size === 'xl'
      ? 'h-24 w-24 text-2xl'
      : size === 'lg'
        ? 'h-16 w-16 text-lg'
        : size === 'sm'
          ? 'h-8 w-8 text-[10px]'
          : 'h-11 w-11 text-xs'

  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-display tracking-wide text-[var(--ink)] ${dim}`}
      style={{
        background: `linear-gradient(145deg, hsl(${hue} 70% 42%), hsl(${hue} 55% 18%))`,
        boxShadow: 'inset 0 0 0 1px rgba(244,241,234,0.16)',
      }}
      aria-hidden
    >
      {initials}
    </div>
  )
}
