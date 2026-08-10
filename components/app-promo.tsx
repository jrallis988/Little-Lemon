"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

/** Purple → gold app promo with phone mockup (desktop + mobile). */
export function AppPromo() {
  return (
    <section
      id="app-promo"
      aria-labelledby="app-promo-heading"
      className="scroll-mt-14 overflow-hidden pf-grad-app text-white"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-6 md:py-14">
        <div className="max-w-xl">
          <h2
            id="app-promo-heading"
            className="font-display text-3xl tracking-tight md:text-5xl"
          >
            Bring the{" "}
            <span className="text-pf-yellow">Judgement Free Zone®</span>{" "}
            anywhere
          </h2>
          <p className="mt-3 text-sm text-white/90 md:text-base">
            Track your workouts, and download our PF App to find a club, explore
            thousands of workouts, check Crowd Meter, and even talk to a personal
            trainer for free. Ready to get movin’?
          </p>
          <Button asChild variant="app" size="lg" className="mt-5">
            <a
              href="https://www.planetfitness.com/mobileapp"
              target="_blank"
              rel="noreferrer"
              onClick={() => track("app_banner_click", { source: "app_promo" })}
            >
              Download PF App
            </a>
          </Button>
        </div>

        <div className="relative mx-auto w-full max-w-[15.5rem] md:max-w-[17rem] md:justify-self-end">
          <div className="relative aspect-[9/17] overflow-hidden rounded-[2.1rem] border-[7px] border-white/95 bg-white shadow-[0_24px_48px_-22px_rgba(0,0,0,0.55)]">
            <div className="flex h-full flex-col bg-white text-pf-ink">
              <div className="bg-pf-purple px-3 py-4 text-white">
                <p className="text-[11px] font-black uppercase tracking-[0.08em] text-pf-yellow">
                  In-home workouts for all levels
                </p>
                <button
                  type="button"
                  className="mt-3 w-full rounded-full bg-white py-2 text-xs font-semibold text-pf-purple"
                >
                  Start Workout
                </button>
              </div>
              <div className="relative flex-1">
                <Image
                  src="/images/cardio-gym.jpg"
                  alt=""
                  fill
                  className="object-cover opacity-90"
                  sizes="280px"
                />
                <div className="absolute inset-x-3 bottom-3 space-y-2">
                  <div className="rounded-2xl bg-white p-3 shadow">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-pf-purple">
                      Monday 24
                    </p>
                    <p className="text-sm font-semibold">Quick full-body circuit</p>
                  </div>
                  <span className="inline-flex w-full items-center justify-center rounded-full bg-pf-btn py-2.5 text-xs font-semibold text-white">
                    Go To App
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
