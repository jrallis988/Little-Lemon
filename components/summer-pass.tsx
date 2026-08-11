"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const GALLERY = [
  {
    src: "/images/cardio-gym.jpg",
    alt: "Teen member training with headphones at Planet Fitness",
  },
  {
    src: "/images/floor-gym.jpg",
    alt: "Strength floor during High School Summer Pass",
  },
  {
    src: "/images/hero-gym.jpg",
    alt: "Members working out together at Planet Fitness",
  },
  {
    src: "/images/cardio-gym.jpg",
    alt: "Cardio equipment available with Summer Pass",
  },
];

/**
 * High School Summer Pass® section matching the PF desktop reference:
 * headline + copy + Sign Up Now, then promo card + image carousel.
 */
export function SummerPass() {
  const [index, setIndex] = useState(0);
  const slide = GALLERY[index]!;

  return (
    <section
      id="summer-pass"
      aria-labelledby="summer-pass-heading"
      className="scroll-mt-14 bg-white text-pf-ink"
    >
      <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="summer-pass-heading"
            className="font-display text-3xl font-black uppercase leading-[1.05] tracking-tight text-pf-ink sm:text-4xl md:text-5xl"
          >
            High School Summer Pass® is here
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-pf-ink/75 md:text-base">
            NOW – August 31, teens ages 14-19 can work out for FREE. Build
            strength where it counts this summer – with progress that&apos;s all
            yours. Plus, enjoy 20% off Gymshark when you sign up.
          </p>
          <a
            href="https://www.planetfitness.com/SummerPass"
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              track("summer_pass_click", { source: "home_promo" })
            }
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-pf-purple px-8 text-sm font-semibold text-white transition hover:bg-pf-purple-bright"
          >
            Sign Up Now
          </a>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 md:items-stretch md:gap-6">
          {/* Promo graphic card */}
          <div className="relative overflow-hidden rounded-3xl border-[6px] border-pf-purple bg-pf-purple shadow-[0_16px_40px_-24px_rgba(89,44,130,0.55)]">
            <div className="relative aspect-square sm:aspect-[4/5] md:aspect-auto md:min-h-[22rem] md:h-full">
              <Image
                src="/images/hero-gym.jpg"
                alt="Teens smiling and training during High School Summer Pass"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-pf-purple via-pf-purple/55 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 text-center text-white md:p-6">
                <p className="font-display text-sm tracking-wide text-white/90">
                  planet fitness
                </p>
                <p className="mt-1 font-display text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl">
                  <span className="text-white">High School</span>
                  <br />
                  <span className="text-pf-yellow">Summer Pass</span>
                </p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/85">
                  Powered by Gymshark
                </p>
              </div>
            </div>
          </div>

          {/* Image carousel 1/4 */}
          <div className="relative overflow-hidden rounded-3xl bg-pf-mist">
            <div className="relative aspect-square sm:aspect-[4/5] md:aspect-auto md:min-h-[22rem] md:h-full">
              <Image
                key={slide.src + index}
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover object-center animate-[hero-zoom_14s_ease-out_forwards]"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/55 to-transparent px-4 pb-4 pt-10">
                <button
                  type="button"
                  aria-label="Previous Summer Pass photo"
                  onClick={() =>
                    setIndex((i) => (i === 0 ? GALLERY.length - 1 : i - 1))
                  }
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/45"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span
                  className={cn(
                    "rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm"
                  )}
                >
                  {index + 1} / {GALLERY.length}
                </span>
                <button
                  type="button"
                  aria-label="Next Summer Pass photo"
                  onClick={() =>
                    setIndex((i) => (i === GALLERY.length - 1 ? 0 : i + 1))
                  }
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/45"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
