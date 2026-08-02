"use client";

import { useState } from "react";
import { CircleLink } from "@/components/home/CircleLink";

/** Rankings marquee copy aligned to childrenshospital.org homepage HTML */
const rankings = [
  {
    lead: "Ranked among the",
    emphasis: "best in the world",
    tone: "ocean" as const,
  },
  {
    lead: "#1 in the nation",
    emphasis: "Neonatology",
    tone: "blue" as const,
  },
  {
    lead: "#1 in the nation",
    emphasis: "Nephrology",
    tone: "pink" as const,
  },
  {
    lead: "#1 in the nation",
    emphasis: "Urology",
    tone: "blue" as const,
  },
];

export function RankingsTicker() {
  const [index, setIndex] = useState(0);
  const item = rankings[index];

  return (
    <section className="border-b border-border bg-white py-s5" aria-label="Rankings highlights">
      <div className="wrap">
        <div className="flex items-center justify-center gap-s4">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-text hover:border-ocean hover:text-ocean"
            aria-label="Previous ranking"
            onClick={() =>
              setIndex((current) =>
                current === 0 ? rankings.length - 1 : current - 1,
              )
            }
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <p
            className="min-h-[48px] max-w-[720px] flex-1 text-center text-lg font-bold leading-snug text-blue sm:text-xl"
            aria-live="polite"
          >
            <span className="font-semibold uppercase tracking-wide text-ocean">
              {item.lead}{" "}
            </span>
            <span
              className={
                item.tone === "pink"
                  ? "text-pink-text"
                  : item.tone === "ocean"
                    ? "text-ocean-dark"
                    : "text-blue"
              }
            >
              {item.emphasis}
            </span>
          </p>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-text hover:border-ocean hover:text-ocean"
            aria-label="Next ranking"
            onClick={() =>
              setIndex((current) =>
                current === rankings.length - 1 ? 0 : current + 1,
              )
            }
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="mt-s4 flex justify-center">
          <CircleLink href="/about">Read About Our Rankings &amp; Awards</CircleLink>
        </div>
      </div>
    </section>
  );
}
