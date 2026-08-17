"use client"

import { HeartHandshake } from 'lucide-react'
import type { Creator, Post } from '#/domain/oj-types'
import { useSupport } from '#/lib/support'

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

  return (
    <div className="mt-3 flex items-center gap-2">
      <button
        type="button"
        onClick={() => openTip(creator, post)}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-[var(--bg-panel)] px-3 py-2 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--ice)]/50"
      >
        <HeartHandshake className="h-4 w-4 text-[var(--ice)]" />
        Tip
        {typeof tipTotal === 'number' ? (
          <span className="font-mono text-xs text-[var(--muted)]">${tipTotal}</span>
        ) : null}
      </button>
      <button
        type="button"
        onClick={() => openSubscribe(creator)}
        className="inline-flex flex-1 items-center justify-center rounded-md bg-[var(--blue)] px-3 py-2 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--blue-deep)]"
      >
        Unlock ${creator.tierPriceMonthly}/mo
      </button>
    </div>
  )
}
