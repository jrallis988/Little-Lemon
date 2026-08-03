"use client";

import Image from "next/image";
import { AwardBadgeRow } from "@/components/brand/AwardBadges";
import { Button } from "@/components/ui/Button";

export function HomeHero() {
  return (
    <section
      className="relative min-h-[620px] overflow-hidden max-md:min-h-[540px]"
      aria-labelledby="hero-heading"
    >
      <Image
        src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=2000&q=80"
        alt="A young child outdoors near a hospital campus"
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

      <div className="wrap relative z-[2] flex min-h-[620px] flex-col justify-center gap-s6 py-s9 max-md:min-h-[540px] max-md:justify-end max-md:pb-s8">
        <div className="max-w-[640px]">
          <p className="mb-s3 font-sans text-[15px] font-extrabold uppercase tracking-[0.14em] text-white/90 sm:text-base">
            Top ranked pediatric hospital in the nation
          </p>
          <AwardBadgeRow className="mb-s5 [&_svg]:h-[72px]" />
          <h1
            id="hero-heading"
            className="mb-s5 font-sans text-[clamp(36px,4.5vw,48px)] font-semibold leading-[1.08] tracking-[-0.02em] text-white"
          >
            Trusted by families.
            <br />
            <span className="text-sky">Where the world comes for answers.</span>
          </h1>
          <Button href="/appointments/request" variant="pink" size="md">
            Make an Appointment
          </Button>
        </div>
      </div>
    </section>
  );
}
