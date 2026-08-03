"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { candidate, election } from "@/lib/candidate";
import { SectionIntro } from "@/components/SectionIntro";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const EMPTY: Remaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function getRemaining(targetIso: string): Remaining {
  const target = new Date(`${targetIso}T00:00:00-04:00`).getTime();
  const totalMs = Math.max(0, target - Date.now());
  return {
    days: Math.floor(totalMs / (1000 * 60 * 60 * 24)),
    hours: Math.floor((totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((totalMs % (1000 * 60)) / 1000),
  };
}

function CountdownBlock({
  label,
  remaining,
  ready,
}: {
  label: string;
  remaining: Remaining;
  ready: boolean;
}) {
  const units = [
    { value: remaining.days, name: "Days" },
    { value: remaining.hours, name: "Hours" },
    { value: remaining.minutes, name: "Minutes" },
    { value: remaining.seconds, name: "Seconds" },
  ];

  return (
    <div
      className="border border-white/10 bg-ink/40 p-6 text-white sm:p-8"
      aria-label={
        ready
          ? `${label}: ${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, and ${remaining.seconds} seconds remaining`
          : `${label}: loading countdown`
      }
    >
      <p className="font-display text-overline font-normal uppercase text-white/85">
        {label}
      </p>
      <div className="mt-4 grid grid-cols-4 gap-3 sm:gap-4">
        {units.map((unit) => (
          <div key={unit.name} className="text-center sm:text-left">
            <p
              className="font-display text-2xl font-normal tabular-nums text-white sm:text-3xl md:text-4xl"
              aria-hidden
            >
              {ready ? String(unit.value).padStart(2, "0") : "--"}
            </p>
            <p className="mt-1 text-[0.7rem] uppercase tracking-wide text-white/80 sm:text-sm">
              {unit.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ElectionDateCard({
  label,
  dateDisplay,
  weekday,
  subtext,
}: {
  label: string;
  dateDisplay: string;
  weekday: string;
  subtext: string;
}) {
  return (
    <div className="flex min-h-[11.5rem] flex-col border border-white/15 bg-white/5 p-6 sm:min-h-[12.5rem] sm:p-8">
      <p className="font-display text-overline font-normal uppercase text-red">{label}</p>
      <p className="mt-3 font-display text-3xl font-normal text-white sm:text-4xl">
        {dateDisplay}
      </p>
      <p className="mt-2 text-body-lg text-white/70">
        {weekday} · {subtext}
      </p>
    </div>
  );
}

export function ElectionCountdown() {
  // Defer live clock until after mount to avoid SSR/client hydration mismatch
  // (React #418 / #423 / #425) when seconds differ between server and browser.
  const [ready, setReady] = useState(false);
  const [september, setSeptember] = useState<Remaining>(EMPTY);
  const [general, setGeneral] = useState<Remaining>(EMPTY);

  useEffect(() => {
    const tick = () => {
      setSeptember(getRemaining(election.september.dateIso));
      setGeneral(getRemaining(election.general.dateIso));
      setReady(true);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section aria-labelledby="election-heading" className="bg-navy">
      <div className="mx-auto max-w-content section-pad">
        <SectionIntro
          overline="2026 New Hampshire U.S. Senate Election"
          title="Two election dates. One General Election that decides the seat."
          lead="Track the September election and the November 3 General Election. Nick is an independent write-in — your vote for him is on the General Election ballot."
          tone="dark"
          titleId="election-heading"
        />

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-2">
          <div className="flex h-full flex-col gap-4">
            <ElectionDateCard
              label={election.september.label}
              dateDisplay={election.september.dateDisplay}
              weekday={election.september.weekday}
              subtext={election.september.subtext}
            />
            <CountdownBlock
              label="Countdown to September election"
              remaining={september}
              ready={ready}
            />
          </div>

          <div className="flex h-full flex-col gap-4">
            <ElectionDateCard
              label={election.general.label}
              dateDisplay={election.general.dateDisplay}
              weekday={election.general.weekday}
              subtext={election.general.subtext}
            />
            <CountdownBlock
              label="Countdown to November 3 General Election"
              remaining={general}
              ready={ready}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border border-white/10 bg-white/5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-sm text-white/85 sm:text-base">
            Write in “{candidate.fullName}” on the General Election ballot.
          </p>
          <Link
            href="/how-to-vote"
            className="inline-flex shrink-0 items-center gap-1 font-display text-cta font-normal uppercase text-red hover:text-white"
          >
            Learn how to vote write-in
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
