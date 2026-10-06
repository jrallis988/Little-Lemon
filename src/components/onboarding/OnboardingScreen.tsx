"use client"

import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Compass, HeartHandshake, Sparkles, UserRound } from 'lucide-react'
import { Logo } from '#/components/brand/Logo'

const steps = [
  {
    icon: Sparkles,
    eyebrow: 'Welcome',
    title: 'Comedy without the algorithm tax',
    body: 'only Jokes is a creator home for stand-up, road work, and animated shorts — unfiltered and direct.',
  },
  {
    icon: Compass,
    eyebrow: 'Discover',
    title: 'Chronological feeds, not engagement theater',
    body: 'Public clips and teasers land newest first. No vanity ranking, no corporate-safe re-ordering.',
  },
  {
    icon: HeartHandshake,
    eyebrow: 'Support',
    title: 'Subscribe backstage or send a micro-tip',
    body: 'Unlock supporter tiers for raw memos and full specials, or tip a set fee after a killer crowdwork bit.',
  },
  {
    icon: UserRound,
    eyebrow: 'Join',
    title: 'Pick fan or creator, then make an account',
    body: 'Fans unlock tiers and tip. Creators set pricing and open Backstage. You can skip and browse first.',
  },
] as const

export function OnboardingScreen() {
  const [step, setStep] = useState(0)
  const current = steps[step]
  const Icon = current.icon
  const isLast = step === steps.length - 1

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <div
        className="pointer-events-none absolute -left-16 top-24 h-56 w-56 rounded-full bg-[#BEE1F9]/55 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 top-8 h-44 w-44 rounded-full bg-white/25 blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-dvh max-w-lg flex-col px-5 pb-8 pt-6">
        <header className="flex items-center justify-between gap-3">
          <Logo size="sm" />
          <Link
            to="/discover"
            className="text-sm font-medium text-[var(--ink-soft)] no-underline hover:text-[var(--ink)]"
          >
            Skip
          </Link>
        </header>

        <section className="mt-10 flex flex-1 flex-col">
          <div
            className="animate-rise relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-panel)] p-6 shadow-[0_18px_50px_color-mix(in_srgb,#0094d4_28%,transparent)]"
            key={step}
          >
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--line-strong)] bg-[var(--sky)] text-[var(--ink)]">
                <Icon className="h-6 w-6" strokeWidth={1.8} />
              </div>
              <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-[var(--on-accent)]">
                {current.eyebrow}
              </p>
              <h1 className="mt-2 font-display text-4xl leading-tight text-[var(--on-accent)]">
                {current.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[var(--on-accent)]/85">
                {current.body}
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {steps.map((item, index) => (
              <button
                key={item.eyebrow}
                type="button"
                aria-label={`Go to step ${index + 1}: ${item.eyebrow}`}
                aria-current={index === step ? 'step' : undefined}
                onClick={() => setStep(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === step
                    ? 'w-8 bg-[var(--ink)]'
                    : 'w-2.5 bg-[var(--ink)]/35 hover:bg-[var(--ink)]/55'
                }`}
              />
            ))}
          </div>
        </section>

        <footer className="mt-auto flex flex-col gap-3 pt-10">
          {isLast ? (
            <>
              <Link
                to="/auth"
                search={{ mode: 'signup', role: 'fan' }}
                className="rounded-xl bg-[var(--accent)] px-5 py-3.5 text-center text-sm font-semibold text-[var(--on-accent)] no-underline shadow-[0_10px_30px_color-mix(in_srgb,#0094d4_35%,transparent)] hover:opacity-95"
              >
                Continue as fan
              </Link>
              <Link
                to="/auth"
                search={{ mode: 'signup', role: 'creator' }}
                className="rounded-xl border border-[var(--line-strong)] bg-white/15 px-5 py-3.5 text-center text-sm font-semibold text-[var(--ink)] no-underline hover:bg-white/25"
              >
                Continue as creator
              </Link>
              <Link
                to="/discover"
                className="text-center text-sm font-medium text-[var(--ink-soft)] no-underline hover:text-[var(--ink)]"
              >
                Browse without an account
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setStep((value) => value + 1)}
              className="rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-[var(--on-accent)] shadow-[0_10px_30px_color-mix(in_srgb,#0094d4_35%,transparent)] hover:opacity-95"
            >
              Continue
            </button>
          )}
        </footer>
      </div>
    </main>
  )
}
