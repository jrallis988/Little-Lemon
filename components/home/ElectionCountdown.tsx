"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { election } from "@/lib/candidate";
import { Reveal } from "@/components/motion/Reveal";

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

function AnimatedDigit({ value, ready }: { value: number; ready: boolean }) {
  const display = ready ? String(value).padStart(2, "0") : "00";
  const prevRef = useRef(display);
  const [tick, setTick] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (prevRef.current === display) return;
    prevRef.current = display;
    setTick(false);
    const id = window.requestAnimationFrame(() => setTick(true));
    return () => window.cancelAnimationFrame(id);
  }, [display, ready]);

  return (
    <span
      className={`count-number${tick ? " is-ticking" : ""}`}
      aria-hidden
      key={display}
    >
      {display}
    </span>
  );
}

function CountdownList({
  remaining,
  ready,
  label,
}: {
  remaining: Remaining;
  ready: boolean;
  label: string;
}) {
  const units = [
    { value: remaining.days, name: "Days" },
    { value: remaining.hours, name: "Hours" },
    { value: remaining.minutes, name: "Min" },
    { value: remaining.seconds, name: "Sec" },
  ];

  return (
    <ul
      className="countdown"
      aria-label={
        ready
          ? `${label}: ${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, and ${remaining.seconds} seconds remaining`
          : `${label}: loading countdown`
      }
    >
      {units.map((unit) => (
        <li className="countdown-item" key={unit.name}>
          <div className="countdown-item-inner">
            <AnimatedDigit value={unit.value} ready={ready} />
            <p className="count-text">{unit.name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ElectionCountdown() {
  const [ready, setReady] = useState(false);
  const [sept, setSept] = useState<Remaining>(EMPTY);
  const [nov, setNov] = useState<Remaining>(EMPTY);

  useEffect(() => {
    const tick = () => {
      setSept(getRemaining(election.september.dateIso));
      setNov(getRemaining(election.general.dateIso));
      setReady(true);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="election-campaign-section" aria-labelledby="election-heading">
      <div className="section-overlay section-padding-140">
        <div className="container">
          <Reveal>
            <div className="section-heading">
              <h6>Mark Your Calendar</h6>
              <h2 id="election-heading">Election Countdown</h2>
            </div>
          </Reveal>
          <div className="section-wrapper election-countdown-wrap">
            <div className="dual-countdown">
              <Reveal delayMs={80}>
                <p className="countdown-block-heading">
                  {election.september.label}
                  <span>
                    {election.september.weekday} · {election.september.dateDisplay}
                  </span>
                </p>
                <div className="campaign-countdown">
                  <CountdownList remaining={sept} ready={ready} label={election.september.label} />
                </div>
              </Reveal>
              <Reveal delayMs={160}>
                <p className="countdown-block-heading">
                  {election.general.label}
                  <span>
                    {election.general.weekday} · {election.general.dateDisplay}
                  </span>
                </p>
                <div className="campaign-countdown">
                  <CountdownList remaining={nov} ready={ready} label={election.general.label} />
                </div>
              </Reveal>
            </div>
            <Reveal delayMs={220} className="text-center election-countdown-cta">
              <Link href="/how-to-vote" className="custom-btn varga-btn-motion">
                Learn How to Vote Write-In
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
