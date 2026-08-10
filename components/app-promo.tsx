"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

export function AppPromo() {
  return (
    <section
      aria-labelledby="app-promo-heading"
      className="overflow-hidden pf-grad-app text-white"
    >
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-[1.05fr_0.95fr] md:items-end md:px-6 md:py-12">
        <div className="max-w-xl pb-2 text-center md:text-left">
          <h2
            id="app-promo-heading"
            className="font-display text-3xl tracking-tight md:text-5xl"
          >
            Bring the{" "}
            <span className="text-pf-yellow">Judgement Free Zone®</span>{" "}
            anywhere
          </h2>
          <p className="mt-3 text-sm text-white/90 md:text-base">
            The PF App has it all – pick the best time to visit your club with
            the Crowd Meter, track your activities, access hundreds of digital
            on-demand workouts, and more! Ready to get movin’?
          </p>
          <Button asChild variant="app" size="lg" className="mt-5">
            <a
              href="https://www.planetfitness.com/mobileapp"
              target="_blank"
              rel="noreferrer"
              onClick={() => track("app_banner_click", { source: "app_promo" })}
            >
              Download the PF App
            </a>
          </Button>
        </div>

        <div className="relative mx-auto w-full max-w-[15.5rem] rotate-[-6deg] md:max-w-[17rem] md:justify-self-end">
          <div className="relative aspect-[9/17] overflow-hidden rounded-[2.1rem] border-[7px] border-white/95 bg-pf-purple-ink shadow-[0_24px_48px_-22px_rgba(0,0,0,0.6)]">
            <Image
              src="/images/cardio-gym.jpg"
              alt="Planet Fitness app preview with Crowd Meter and workouts"
              fill
              className="object-cover opacity-90"
              sizes="280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pf-purple-ink via-pf-purple/45 to-pf-purple/20" />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-3 py-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                PF
              </span>
              <span className="h-7 w-7 rounded-full bg-white/25" aria-hidden />
            </div>
            <div className="absolute inset-x-3 bottom-3 space-y-2">
              <p className="text-[11px] font-black uppercase leading-tight tracking-[0.08em] text-pf-yellow">
                On demand workouts for all levels
              </p>
              <button
                type="button"
                className="w-full rounded-full border border-white/80 px-3 py-2 text-xs font-semibold text-white"
              >
                Explore Workouts
              </button>
              <div className="rounded-2xl bg-white p-3 text-left text-pf-ink shadow">
                <p className="text-sm font-semibold">Manhattan (27th St.)</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-pf-purple">
                  Crowd Meter · Not too busy
                </p>
                <span className="mt-2 inline-flex rounded-full bg-pf-btn px-3 py-1.5 text-[11px] font-semibold text-white">
                  Check-in
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
