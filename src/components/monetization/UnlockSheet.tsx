"use client"

import { useEffect, useId, useState } from 'react'
import { X } from 'lucide-react'
import { tipPresets } from '#/lib/mock/oj'
import { useSupport } from '#/lib/support'

export function UnlockSheet() {
  const { target, close } = useSupport()
  const titleId = useId()
  const [customAmount, setCustomAmount] = useState('5')
  const [selectedTip, setSelectedTip] = useState(tipPresets[1]?.id ?? 't2')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!target) {
      setDone(false)
      return
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [target, close])

  if (!target) return null

  const { mode, creator, post } = target
  const isSubscribe = mode === 'subscribe'

  function confirm() {
    setDone(true)
    window.setTimeout(() => close(), 900)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-[#003d5c]/55 backdrop-blur-[2px]"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="animate-sheet relative z-10 w-full max-w-md rounded-t-2xl border border-white/25 bg-[var(--bg-elevated)] p-5 shadow-[0_-24px_60px_rgba(0,62,92,0.35)] sm:rounded-2xl"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--tint)]">
              {isSubscribe ? 'Creator tier' : 'Micro-tip'}
            </p>
            <h2 id={titleId} className="font-display text-3xl text-[var(--ink)]">
              {isSubscribe ? creator.tierName : `Tip ${creator.displayName}`}
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {isSubscribe
                ? `Unlock raw memos, full specials, and exclusive shorts from ${creator.displayName}.`
                : post
                  ? `Support “${post.title}” directly — no platform algorithm tax theater.`
                  : `Send a tip straight to ${creator.displayName}.`}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-2 text-[var(--muted)] hover:bg-white/10 hover:text-[var(--ink)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {done ? (
          <p className="animate-rise rounded-xl bg-white/15 px-3 py-4 text-center text-sm font-medium text-[var(--ink)]">
            {isSubscribe ? 'Backstage unlocked (demo).' : 'Tip sent (demo).'}
          </p>
        ) : isSubscribe ? (
          <div className="space-y-4">
            <ul className="divide-y divide-[var(--hairline)] text-sm text-[var(--ink-soft)]">
              <li className="py-2.5 first:pt-0">Full specials + uncut crowdwork</li>
              <li className="py-2.5">Writing-lab audio memos</li>
              <li className="py-2.5 last:pb-0">Exclusive animated shorts</li>
            </ul>
            <button
              type="button"
              onClick={confirm}
              className="w-full rounded-xl bg-[var(--accent)] py-3.5 text-sm font-semibold text-[var(--on-accent)] hover:opacity-95"
            >
              Unlock {creator.tierName} · ${creator.tierPriceMonthly}/mo
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {tipPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedTip(preset.id)}
                  className={`rounded-xl border px-2 py-3 text-center text-xs uppercase tracking-[0.12em] transition ${
                    selectedTip === preset.id
                      ? 'border-white bg-white text-[var(--on-accent)]'
                      : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]'
                  }`}
                >
                  {preset.label}
                  {preset.amount > 0 ? (
                    <span
                      className={`mt-1 block font-mono text-sm ${
                        selectedTip === preset.id
                          ? 'text-[var(--on-accent)]'
                          : 'text-[var(--ink)]'
                      }`}
                    >
                      ${preset.amount}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
            {selectedTip === 't4' ? (
              <label className="block text-sm text-[var(--muted)]">
                Custom amount
                <input
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  inputMode="decimal"
                  className="mt-1 h-11 w-full rounded-xl border border-[var(--line)] bg-white/10 px-3 text-[var(--ink)] outline-none focus:border-white"
                />
              </label>
            ) : null}
            <button
              type="button"
              onClick={confirm}
              className="w-full rounded-xl bg-[var(--accent)] py-3.5 text-sm font-semibold text-[var(--on-accent)] hover:opacity-95"
            >
              Send tip
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
