"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { candidate, election } from "@/lib/candidate";
import { SectionIntro } from "@/components/SectionIntro";

type Remaining = { days: number; hours: number };

function getRemaining(targetIso: string): Remaining {
  const target = new Date(`${targetIso}T00:00:00-05:00`).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { days, hours };
}

export function ElectionCountdown() {
  const [remaining, setRemaining] = useState<Remaining>(() =>
    getRemaining(election.general.dateIso)
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining(getRemaining(election.general.dateIso));
    }, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      aria-labelledby="election-heading"
      className="bg-navy"
    >
      <div className="mx-auto max-w-content section-pad">
        <SectionIntro
          overline="2026 New Hampshire U.S. Senate Election"
          title="Your vote for Nick happens on November 3."
          lead="Nick is an independent write-in candidate. Your vote for him happens on the General Election — the final vote that decides who holds the seat."
          tone="dark"
          titleId="election-heading"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
          <Link
            href="/how-to-vote"
            className="group border border-white/15 bg-white/5 p-7 transition-colors hover:border-red sm:p-10"
          >
            <p className="font-display text-overline font-normal uppercase text-red">
              {election.general.label}
            </p>
            <p className="mt-4 font-display text-card-display font-normal text-white">
              {election.general.dateDisplay}
            </p>
            <p className="mt-2 text-body-lg text-white/70">
              {election.general.weekday} · {election.general.subtext}
            </p>
            <p className="mt-6 inline-flex items-center gap-1 font-display text-cta font-normal uppercase text-red">
              Learn how to vote
              <ArrowRight className="h-4 w-4" aria-hidden />
            </p>
          </Link>

          <div
            className="flex flex-col justify-center border border-white/10 bg-ink/40 p-7 text-white sm:p-10"
            aria-live="polite"
          >
            <p className="font-display text-overline font-normal uppercase text-yellow">
              Countdown to Nov 3, 2026
            </p>
            <div className="mt-4 flex gap-8">
              <div>
                <p className="font-display text-4xl font-normal tabular-nums text-white">
                  {remaining.days}
                </p>
                <p className="text-sm text-white/60">Days</p>
              </div>
              <div>
                <p className="font-display text-4xl font-normal tabular-nums text-white">
                  {remaining.hours}
                </p>
                <p className="text-sm text-white/60">Hours</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/65">
              Write in “{candidate.fullName}” on the General Election ballot.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
