"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { candidate, election } from "@/lib/candidate";

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
      className="border-b border-granite-200 bg-mist"
    >
      <div className="mx-auto max-w-content section-pad !py-12 md:!py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine-600">
          2026 New Hampshire U.S. Senate Election
        </p>
        <h2 id="election-heading" className="mt-2 font-serif text-2xl font-bold text-granite-800 sm:text-3xl">
          Your vote for Nick happens on November 3.
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-granite-600 sm:text-lg">
          Nick is an independent write-in candidate. Your vote for him happens on
          the General Election — the final vote that decides who holds the seat.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
          <Link
            href="/how-to-vote"
            className="group border border-granite-200 bg-white p-6 transition-colors hover:border-pine-500 sm:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
              {election.general.label}
            </p>
            <p className="mt-3 font-serif text-3xl font-bold text-granite-800">
              {election.general.dateDisplay}
            </p>
            <p className="mt-2 text-base text-granite-500">
              {election.general.weekday} · {election.general.subtext}
            </p>
            <p className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-pine-700 group-hover:underline">
              Learn how to vote
              <ArrowRight className="h-4 w-4" aria-hidden />
            </p>
          </Link>

          <div
            className="flex flex-col justify-center border border-granite-800 bg-granite-800 p-6 text-white sm:p-8"
            aria-live="polite"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
              Countdown to Nov 3, 2026
            </p>
            <div className="mt-4 flex gap-8">
              <div>
                <p className="font-serif text-4xl font-bold tabular-nums">
                  {remaining.days}
                </p>
                <p className="text-sm text-granite-300">Days</p>
              </div>
              <div>
                <p className="font-serif text-4xl font-bold tabular-nums">
                  {remaining.hours}
                </p>
                <p className="text-sm text-granite-300">Hours</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-granite-300">
              Write in “{candidate.fullName}” on the General Election ballot.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
