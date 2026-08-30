import { Clapperboard, Film, Lock, Mic, Play, Type } from 'lucide-react'
import type { MediaKind } from '#/domain/oj-types'

const icons = {
  video: Clapperboard,
  audio: Mic,
  animation: Film,
  text: Type,
} as const

export function MediaKindBadge({ kind }: { kind: MediaKind }) {
  const Icon = icons[kind]
  const label =
    kind === 'animation'
      ? 'Short'
      : kind === 'audio'
        ? 'Memo'
        : kind === 'video'
          ? 'Clip'
          : 'Note'

  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-black/45 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
      <Icon className="h-3 w-3 text-[var(--tint)]" />
      {label}
    </span>
  )
}

export function MediaStage({
  tone,
  kind,
  durationLabel,
  locked,
}: {
  tone: number
  kind: MediaKind
  durationLabel?: string
  locked?: boolean
}) {
  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl"
      style={{
        background: `
          radial-gradient(ellipse 70% 60% at 30% 20%, hsl(${tone} 70% 48% / 0.55), transparent 55%),
          radial-gradient(ellipse 50% 45% at 85% 75%, #00AFF0 0%, transparent 50%),
          linear-gradient(155deg, hsl(${tone} 42% 22%), #041828 70%, #020c14)
        `,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(transparent_35%,rgba(0,0,0,0.45)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 3px)',
        }}
        aria-hidden
      />

      {locked ? (
        <div className="frost-lock absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[var(--blur-frost)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-[#00AFF0]/50 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <p className="lock-tag rounded-md px-2.5 py-1 text-[11px] uppercase tracking-[0.18em]">
            Supporters only
          </p>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-play flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm">
            <Play className="ml-0.5 h-6 w-6 fill-white text-white" />
          </div>
        </div>
      )}

      <div className="absolute left-2 top-2">
        <MediaKindBadge kind={kind} />
      </div>
      {durationLabel ? (
        <span className="absolute bottom-2 right-2 rounded bg-black/55 px-1.5 py-0.5 font-mono text-[10px] text-white">
          {durationLabel}
        </span>
      ) : null}
    </div>
  )
}
