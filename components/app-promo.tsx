"use client";

import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

export function AppPromo() {
  return (
    <section
      aria-labelledby="app-promo-heading"
      className="pf-grad-app text-white"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-5 px-4 py-10 sm:flex-row sm:items-center sm:justify-between md:px-6 md:py-12">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-pf-yellow">
            <Smartphone className="h-3.5 w-3.5" aria-hidden />
            The PF App
          </p>
          <h2
            id="app-promo-heading"
            className="mt-2 font-display text-3xl tracking-tight md:text-4xl"
          >
            Bring the Judgement Free Zone® anywhere
          </h2>
          <p className="mt-2 text-sm text-white/85 md:text-base">
            Crowd Meter, digital workouts, activity tracking, and your digital
            keytag live in the app—not on this site. Ready to get movin’?
          </p>
        </div>
        <Button asChild variant="app" size="lg" className="shrink-0">
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
    </section>
  );
}
