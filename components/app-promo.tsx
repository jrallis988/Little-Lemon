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
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-[1.1fr_0.9fr] md:items-end md:px-6 md:py-12">
        <div className="max-w-xl pb-2">
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

        <div className="relative mx-auto w-full max-w-[16rem] md:max-w-[18rem]">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border-[6px] border-white/90 bg-pf-purple-ink shadow-[0_20px_40px_-20px_rgba(0,0,0,0.55)]">
            <Image
              src="/images/cardio-gym.jpg"
              alt="Planet Fitness app preview showing club activity"
              fill
              className="object-cover opacity-90"
              sizes="288px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pf-purple-ink via-pf-purple/40 to-transparent" />
            <div className="absolute inset-x-3 bottom-3 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-pf-yellow">
                On demand workouts for all levels
              </p>
              <div className="rounded-xl bg-white/95 p-2.5 text-pf-ink shadow">
                <p className="text-[10px] font-bold uppercase tracking-wide text-pf-purple">
                  Crowd Meter
                </p>
                <p className="mt-0.5 text-sm font-semibold">
                  Manhattan (27th St.)
                </p>
                <p className="text-xs text-pf-ink/60">Not too busy · Open now</p>
              </div>
              <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-pf-purple">
                Explore Workouts
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
