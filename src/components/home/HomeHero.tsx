"use client";

import Image from "next/image";
import { AwardBadgeRow } from "@/components/brand/AwardBadges";
import { Button } from "@/components/ui/Button";

export function HomeHero() {
  return (
    <section
      className="relative min-h-[min(78vh,720px)] overflow-hidden max-md:min-h-[580px]"
      aria-labelledby="hero-heading"
    >
      <Image
        src="/images/hero/homepage-hero-mia.webp"
        alt="A young patient smiling while holding a white stuffed animal"
        fill
        priority
        className="object-cover object-[center_28%] saturate-[.92]"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-nav-dark/80 via-blue/50 to-blue/15"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-nav-dark/55 via-transparent to-nav-dark/25"
        aria-hidden="true"
      />

      <div className="wrap relative z-[2] flex min-h-[min(78vh,720px)] flex-col justify-center py-s8 pt-s9 max-md:min-h-[580px] max-md:justify-end max-md:pb-s8 max-md:pt-s7 sm:pt-[88px] lg:pt-s9">
        <div className="max-w-[720px]">
          <p className="mb-s4 font-sans text-sm font-extrabold uppercase tracking-[0.16em] text-white sm:text-base sm:tracking-[0.18em]">
            Top ranked pediatric hospital in the nation
          </p>

          <AwardBadgeRow className="mb-s5 gap-s4 [&_img]:h-[70px] [&_img]:w-auto sm:[&_img]:h-[78px]" />

          <h1
            id="hero-heading"
            className="mb-s6 font-sans text-4xl font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl sm:leading-[1.06] lg:text-[3.25rem]"
          >
            Trusted by families.
            <span className="mt-1 block text-sky">
              Where the world comes for answers.
            </span>
          </h1>

          <Button href="/appointments/request" variant="pink" size="md">
            Request an Appointment
          </Button>
        </div>
      </div>
    </section>
  );
}
