"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

/** Desktop-style workout guides promo: phones + copy + lifestyle photo. */
export function WorkoutGuidesPromo() {
  return (
    <section
      id="workout-guides"
      aria-labelledby="workout-guides-heading"
      className="scroll-mt-14 overflow-hidden bg-white"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-[0.95fr_1.1fr_0.9fr] md:gap-6 md:px-6 md:py-14">
        <div className="relative mx-auto flex h-[22rem] w-full max-w-sm items-end justify-center md:h-[26rem]">
          <div className="absolute inset-x-6 bottom-0 top-8 rounded-[2.5rem] bg-pf-purple-soft" />
          <div className="relative z-10 mr-[-1.5rem] w-[42%] rotate-[-8deg] overflow-hidden rounded-[1.4rem] border-[5px] border-white bg-white shadow-xl">
            <div className="aspect-[9/16] bg-pf-mist p-2">
              <p className="text-[8px] font-bold uppercase tracking-wide text-pf-purple">
                Quick Workouts
              </p>
              <div className="mt-2 space-y-1.5">
                {["Lower Body", "Full Circuit", "Cardio Start"].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg bg-white px-2 py-1.5 text-[9px] font-semibold text-pf-ink shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative z-20 ml-[-1rem] w-[48%] rotate-[6deg] overflow-hidden rounded-[1.5rem] border-[5px] border-white bg-white shadow-2xl">
            <div className="aspect-[9/16] bg-pf-purple p-2 text-white">
              <p className="text-[8px] font-bold uppercase tracking-wide text-pf-yellow">
                Beginner Lower Body
              </p>
              <p className="mt-1 text-[9px] text-white/80">30 min · Machines</p>
              <div className="mt-3 rounded-lg bg-white/15 px-2 py-2 text-[8px]">
                Seated Leg Press · 10 reps · 3 sets
              </div>
              <span className="mt-3 inline-flex rounded-full bg-white px-2 py-1 text-[8px] font-bold text-pf-purple">
                Start Workout
              </span>
            </div>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h2
            id="workout-guides-heading"
            className="font-display text-3xl font-black uppercase tracking-tight text-pf-ink md:text-4xl"
          >
            NEW! Workout Guides in the PF App
          </h2>
          <p className="mt-3 text-sm text-pf-ink/70 md:text-base">
            Want a guide that walks you through reps and sets in step-by-step
            routines? We got you. Bonus: each exercise includes a visual
            tutorial for proper form.
          </p>
          <Button
            asChild
            variant="purple"
            size="lg"
            className="mt-5"
          >
            <a
              href="https://www.planetfitness.com/mobileapp"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                track("app_banner_click", { source: "workout_guides_promo" })
              }
            >
              Get the App
            </a>
          </Button>
        </div>

        <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-[2rem] md:max-w-none">
          <Image
            src="/images/hero-gym.jpg"
            alt="Member training with PF App workout guides"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 320px"
          />
        </div>
      </div>
    </section>
  );
}
