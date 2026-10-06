import { avatarDataUri } from '#/lib/oj/visuals'

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
    <img
      src={avatarDataUri({ initials, hue })}
      alt=""
      className={`inline-flex shrink-0 rounded-full object-cover ring-2 ring-white/55 ${dim}`}
      aria-hidden
    />
  )
}
