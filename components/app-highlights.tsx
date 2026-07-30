"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    id: "guides",
    eyebrow: "New in the PF App",
    title: "NEW! Workout Guides in the PF App",
    body: "Want a guide to easily follow that walks you through reps and sets in step-by-step routines? We got you! Bonus: each exercise includes a visual tutorial to guide you on proper form.",
    cta: "Check Out Guides",
    href: "https://www.planetfitness.com/mobileapp",
    image: "/images/floor-gym.jpg",
    imageAlt: "Phone mockup style preview of PF App workout guides",
  },
  {
    id: "perks",
    eyebrow: "Member perks",
    title: "Get energized with exclusive perks",
    body: "Save big on your favorite brands with exclusive discounts and special offers in the PF App.",
    cta: "Explore Perks",
    href: "https://www.planetfitness.com/mobileapp",
    image: "/images/cardio-gym.jpg",
    imageAlt: "Gym floor representing member perk offers",
  },
  {
    id: "refer",
    eyebrow: "Refer a friend",
    title: "Earn free months by referring your friends",
    body: "Every friend you refer that joins can earn you a free month (up to 3 months/year). Head to the PF App to start referring today.",
    cta: "Refer a Friend",
    href: "https://www.planetfitness.com/mobileapp",
    image: "/images/hero-gym.jpg",
    imageAlt: "Members training together in a Planet Fitness club",
  },
  {
    id: "gear",
    eyebrow: "PF store",
    title: "Get your gear",
    body: "Bags, outfits, locker room essentials, and more—everything you need to start your fitness journey.",
    cta: "Shop Gear",
    href: "https://www.planetfitness.com/",
    image: "/images/floor-gym.jpg",
    imageAlt: "Planet Fitness club gear and floor atmosphere",
  },
];

export function AppHighlights() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  const prev = () => setIndex((i) => (i === 0 ? SLIDES.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === SLIDES.length - 1 ? 0 : i + 1));

  return (
    <section
      aria-labelledby="app-highlights-heading"
      className="bg-white"
    >
      <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-12">
        <article className="overflow-hidden rounded-3xl border border-pf-line bg-white shadow-[0_12px_28px_-18px_rgba(61,9,88,0.35)]">
          <div className="relative aspect-[16/10] bg-pf-mist">
            <Image
              key={slide.id}
              src={slide.image}
              alt={slide.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pf-purple/55 via-transparent to-transparent" />
            <p className="absolute bottom-3 left-4 text-[10px] font-bold uppercase tracking-[0.18em] text-pf-yellow">
              {slide.eyebrow}
            </p>
          </div>
          <div className="p-5 md:p-6">
            <h2
              id="app-highlights-heading"
              className="font-display text-2xl uppercase tracking-tight text-pf-ink md:text-3xl"
            >
              {slide.title}
            </h2>
            <p className="mt-2 text-sm text-pf-ink/65 md:text-base">
              {slide.body}
            </p>
            <Button asChild variant="purple" className="mt-4 w-full">
              <a href={slide.href} target="_blank" rel="noreferrer">
                {slide.cta}
              </a>
            </Button>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous highlight"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-pf-line text-pf-purple hover:bg-pf-mist"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="min-w-[3rem] text-center text-sm font-semibold text-pf-ink/70">
                {index + 1}/{SLIDES.length}
              </p>
              <button
                type="button"
                onClick={next}
                aria-label="Next highlight"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-pf-line text-pf-purple hover:bg-pf-mist"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex justify-center gap-1.5">
              {SLIDES.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show slide ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-5 bg-pf-purple" : "w-1.5 bg-pf-line"
                  )}
                />
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
