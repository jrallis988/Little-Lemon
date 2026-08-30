"use client"

import { useEffect, useId } from 'react'
import { Pause, X } from 'lucide-react'
import { usePlayer } from '#/lib/player'
import { posterDataUri } from '#/lib/oj/visuals'

export function PlaySheet() {
  const { target, closePlayer } = usePlayer()
  const titleId = useId()

  useEffect(() => {
    if (!target) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePlayer()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [target, closePlayer])

  if (!target) return null

  const { post, creator } = target
  const poster = posterDataUri({
    tone: post.mediaTone,
    title: post.title,
    kind: post.kind,
    seed: creator.visualSeed,
  })

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close player"
        className="absolute inset-0 bg-[#003d5c]/60 backdrop-blur-[2px]"
        onClick={closePlayer}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="animate-sheet relative z-10 w-full max-w-lg overflow-hidden rounded-t-2xl border border-white/25 bg-[var(--bg-elevated)] shadow-[0_-24px_60px_rgba(0,62,92,0.35)] sm:rounded-2xl"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <img
            src={poster}
            alt=""
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/25">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-sm">
              <Pause className="h-7 w-7 fill-white text-white" />
            </div>
            <p className="font-mono text-xs text-white/90">
              {post.durationLabel ?? 'live'} · demo playback
            </p>
          </div>
          <button
            type="button"
            onClick={closePlayer}
            className="absolute right-3 top-3 rounded-lg bg-black/40 p-2 text-white hover:bg-black/55"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--tint)]">
            Now playing · {creator.displayName}
          </p>
          <h2 id={titleId} className="mt-1 text-xl font-semibold text-[var(--ink)]">
            {post.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
            {post.playNote ?? post.body}
          </p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-1/3 rounded-full bg-white animate-rise" />
          </div>
        </div>
      </div>
    </div>
  )
}
