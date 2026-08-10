"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const HERO_SLIDES = [
  {
    id: "welcome",
    image: "/images/hero-gym.jpg",
    imageAlt: "Members training together in a Planet Fitness club",
    kicker: null as string | null,
    titleBefore: "A PLACE WHERE ",
    titleAccent: "EVERYONE FEELS",
    titleAfter: " WELCOME",
  },
  {
    id: "equipment",
    image: "/images/floor-gym.jpg",
    imageAlt: "Planet Fitness strength floor with purple equipment",
    kicker: "OPEN 24/7 · YOU BELONG!",
    titleBefore: "TONS OF ",
    titleAccent: "CARDIO & STRENGTH",
    titleAfter: " EQUIPMENT",
  },
  {
    id: "spa",
    image: "/images/cardio-gym.jpg",
    imageAlt: "Black Card Spa amenities at Planet Fitness",
    kicker: "BLACK CARD SPA®",
    titleBefore: "NEW ",
    titleAccent: "POLAR DRY PLUNGE",
    titleAfter: " & MORE",
  },
  {
    id: "offer",
    image: "/images/hero-gym.jpg",
    imageAlt: "Join Planet Fitness offer",
    kicker: "NO COMMITMENT",
    titleBefore: "JOIN FOR ",
    titleAccent: "$1 DOWN",
    titleAfter: " TODAY",
  },
];

/** First-viewport welcome hero matching planetfitness.com mobile. */
export function WelcomeHero() {
  const [index, setIndex] = useState(0);
  const slide = HERO_SLIDES[index];

  return (
    <section
      id="offer"
      aria-labelledby="welcome-heading"
      className="scroll-mt-14 overflow-hidden bg-white text-pf-ink"
    >
      <div className="relative">
        <div className="absolute right-4 top-3 z-10 flex items-center gap-2 md:right-6">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() =>
              setIndex((i) => (i === 0 ? HERO_SLIDES.length - 1 : i - 1))
            }
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-black/25 text-white backdrop-blur-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="rounded-full bg-black/35 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {index + 1}/{HERO_SLIDES.length}
          </span>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() =>
              setIndex((i) => (i === HERO_SLIDES.length - 1 ? 0 : i + 1))
            }
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-black/25 text-white backdrop-blur-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div
          className="relative aspect-[5/4] w-full sm:aspect-[16/9] md:aspect-[21/9]"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 86%, 0 100%)" }}
        >
          <Image
            key={slide.id}
            src={slide.image}
            alt={slide.imageAlt}
            fill
            priority
            className="object-cover object-[center_30%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pf-purple/35 via-transparent to-transparent" />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-8 pt-5 text-center md:px-6 md:pb-10">
        {slide.kicker ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pf-purple">
            {slide.kicker}
          </p>
        ) : null}
        <h1
          id="welcome-heading"
          className={cn(
            "font-display text-[1.85rem] font-black uppercase leading-[1.05] tracking-tight text-pf-ink sm:text-4xl md:text-5xl",
            slide.kicker && "mt-2"
          )}
        >
          {slide.titleBefore}
          <span className="text-pf-purple">{slide.titleAccent}</span>
          {slide.titleAfter}
        </h1>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <Button asChild variant="purple" size="lg">
            <a
              href="/join"
              onClick={() =>
                track("plan_select", { source: "welcome_hero", plan: "black-card" })
              }
            >
              Join Now
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#pricing">Compare Memberships</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
