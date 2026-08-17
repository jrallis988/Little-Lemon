import { Clapperboard, Film, Lock, Mic, Type } from 'lucide-react'
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
    kind === 'animation' ? 'Short' : kind === 'audio' ? 'Memo' : kind === 'video' ? 'Clip' : 'Note'

  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-black/45 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-[var(--ink)]">
      <Icon className="h-3 w-3 text-[var(--orange)]" />
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
      className="relative aspect-[16/10] w-full overflow-hidden rounded-md"
      style={{
        background: `linear-gradient(145deg, hsl(${tone} 55% 28%), hsl(${tone} 40% 10%) 60%, #050505)`,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,0,0,0.35)_100%)]" />
      {locked ? (
        <div className="frost-lock absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[var(--blur-frost)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] bg-black/40">
            <Lock className="h-5 w-5 text-[var(--orange)]" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            Supporters only
          </p>
        </div>
      ) : null}
      <div className="absolute left-2 top-2">
        <MediaKindBadge kind={kind} />
      </div>
      {durationLabel ? (
        <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] text-[var(--ink)]">
          {durationLabel}
        </span>
      ) : null}
    </div>
  )
}
