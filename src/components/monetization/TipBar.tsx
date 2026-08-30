"use client"

import { HeartHandshake } from 'lucide-react'
import type { Creator, Post } from '#/domain/oj-types'
import { useSupport } from '#/lib/support'
import { useMembership } from '#/lib/membership'

export function TipBar({
  creator,
  post,
  tipTotal,
}: {
  creator: Creator
  post?: Post
  tipTotal?: number
}) {
  const { openTip, openSubscribe } = useSupport()
  const { isUnlocked, tipTotalsByCreator } = useMembership()
  const unlocked = isUnlocked(creator.id)
  const locked = post?.access === 'supporters' && !unlocked
  const liveTips =
    (tipTotal ?? 0) + (tipTotalsByCreator[creator.id] ?? 0)

  return (
    <div className="mt-3 flex items-center gap-2">
      {locked ? (
        <>
          <button
            type="button"
            onClick={() => openSubscribe(creator)}
            className="inline-flex flex-[1.4] items-center justify-center rounded-xl bg-[var(--accent)] px-3 py-2.5 text-sm font-semibold text-[var(--on-accent)] transition hover:opacity-95"
          >
            Unlock ${creator.tierPriceMonthly}/mo
          </button>
          <button
            type="button"
            onClick={() => openTip(creator, post)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[var(--line-strong)] px-3 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:bg-white/10"
          >
            <HeartHandshake className="h-4 w-4" />
            Tip
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => openTip(creator, post)}
            className="inline-flex flex-[1.4] items-center justify-center gap-2 rounded-xl border border-[var(--line-strong)] bg-white/15 px-3 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:bg-white/25"
          >
            <HeartHandshake className="h-4 w-4 text-[var(--tint)]" />
            Tip
            <span className="font-mono text-xs text-[var(--muted)]">
              ${liveTips}
            </span>
          </button>
          <button
            type="button"
            onClick={() => openSubscribe(creator)}
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-[var(--accent)] px-3 py-2.5 text-sm font-semibold text-[var(--on-accent)] transition hover:opacity-95"
          >
            {unlocked ? 'Member' : `Unlock $${creator.tierPriceMonthly}/mo`}
          </button>
        </>
      )}
    </div>
  )
}
