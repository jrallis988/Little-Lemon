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
    href: "/app/workouts",
    image: "/images/floor-gym.jpg",
    imageAlt: "PF App workout guide preview for Beginner Lower Body Strength",
    overlayTitle: "Beginner Lower Body Strength",
    overlayMeta: "30 min · Beginner · Machines",
  },
  {
    id: "summer",
    eyebrow: "High School Summer Pass®",
    title: "High School Summer Pass® is here",
    body: "NOW – August 31, teens ages 14–19 can work out for FREE. Build strength where it counts this summer – with progress that’s all yours. Plus, enjoy 20% off Gymshark when you sign up.",
    cta: "Sign Up Now",
    href: "https://www.planetfitness.com/SummerPass",
    image: "/images/cardio-gym.jpg",
    imageAlt: "Teens training during High School Summer Pass",
    overlayTitle: "HIGH SCHOOL SUMMER PASS",
    overlayMeta: "Powered by Gymshark",
  },
  {
    id: "plunge",
    eyebrow: "Black Card Spa®",
    title: "NEW Polar Dry Plunge",
    body: "Now in the Black Card Spa®. Recover with a cold experience designed for comfort — ask your club what’s available on Black Card.",
    cta: "Explore Black Card",
    href: "/#pricing",
    image: "/images/hero-gym.jpg",
    imageAlt: "Black Card Spa Polar Dry Plunge promo",
    overlayTitle: "NEW POLAR DRY PLUNGE",
    overlayMeta: "Now in the Black Card Spa®",
  },
  {
    id: "gear",
    eyebrow: "PF store",
    title: "Get your gear",
    body: "Bags from $38.99, tees $11.95, caps $10, towels $4.95, bottles $5, locks $5 — plus spa lotions from $7.99. Shop the counter at your club.",
    cta: "See Club Gear",
    href: "/#gear",
    image: "/images/floor-gym.jpg",
    imageAlt: "Planet Fitness club gear wall",
    overlayTitle: "CLUB GEAR",
    overlayMeta: "Bags · Apparel · Essentials",
  },
];

export function AppHighlights() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  const prev = () => setIndex((i) => (i === 0 ? SLIDES.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === SLIDES.length - 1 ? 0 : i + 1));

  return (
    <section aria-labelledby="app-highlights-heading" className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-12">
        <div className="mb-4 flex justify-center">
          <a
            href="#pricing"
            className="inline-flex h-11 items-center justify-center rounded-full border border-pf-purple bg-white px-5 text-sm font-semibold text-pf-purple"
          >
            Compare Memberships
          </a>
        </div>

        <article className="overflow-hidden rounded-3xl border border-pf-line bg-white shadow-[0_12px_28px_-18px_rgba(61,9,88,0.35)]">
          <div className="relative aspect-[16/10] bg-pf-purple">
            <Image
              key={slide.id}
              src={slide.image}
              alt={slide.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pf-purple-ink/90 via-pf-purple/35 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 text-white">
              <p className="font-display text-lg uppercase leading-none tracking-tight text-pf-yellow md:text-2xl">
                {slide.overlayTitle}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/85">
                {slide.overlayMeta}
              </p>
            </div>
          </div>
          <div className="p-5 md:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-pf-purple">
              {slide.eyebrow}
            </p>
            <h2
              id="app-highlights-heading"
              className="mt-1 font-display text-2xl uppercase tracking-tight text-pf-ink md:text-3xl"
            >
              {slide.title}
            </h2>
            <p className="mt-2 text-sm text-pf-ink/65 md:text-base">{slide.body}</p>
            <Button asChild variant="purple" className="mt-4 w-full">
              <a
                href={slide.href}
                target={slide.href.startsWith("http") ? "_blank" : undefined}
                rel={slide.href.startsWith("http") ? "noreferrer" : undefined}
              >
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
