"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { IconSearch } from "@/components/ui/Icons";
import { AwardBadgeRow } from "@/components/brand/AwardBadges";
import { Button } from "@/components/ui/Button";

const intentPills = [
  { label: "Find a Doctor", href: "/find-a-doctor" },
  { label: "Find a Location", href: "/locations" },
  { label: "Emergency Care", href: "/emergency" },
  { label: "Patient Portal", href: "/portal" },
];

export function HomeHero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

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
            className="mb-s4 font-sans text-[clamp(36px,4.5vw,48px)] font-semibold leading-[1.08] tracking-[-0.02em] text-white"
          >
            Trusted by families.
            <br />
            <span className="text-sky">Where the world comes for answers.</span>
          </h1>
          <p className="mb-s6 max-w-[480px] font-sans text-[clamp(15px,1.5vw,18px)] font-light leading-[1.7] text-white">
            Find care, get directions, or reach your care team — start with what
            you need right now.
          </p>
        </div>

        <div className="max-w-[720px] animate-fade-up">
          <form
            onSubmit={onSearch}
            role="search"
            aria-label="Search the site"
            className="flex flex-col gap-s3 rounded-md border border-white/20 bg-white/95 p-s3 shadow-lg backdrop-blur-sm sm:flex-row sm:items-center sm:p-2"
          >
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search doctors, conditions, or programs</span>
              <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-text-meta" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search doctors, conditions, or programs"
                className="h-12 w-full rounded-sm border-0 bg-transparent py-3 pl-11 pr-3 text-base text-text outline-none placeholder:text-text-ghost"
              />
            </label>
            <Button type="submit" variant="pink" size="lg" className="sm:min-w-[132px]">
              Search
            </Button>
          </form>

          <div
            className="mt-s4 flex flex-wrap gap-2"
            aria-label="Quick actions"
          >
            {intentPills.map((pill) => (
              <Link
                key={pill.label}
                href={pill.href}
                className="inline-flex min-h-10 items-center rounded-sm border border-white/35 bg-white/10 px-3.5 text-sm font-bold text-white no-underline backdrop-blur-sm transition-all hover:border-white/70 hover:bg-white/20"
              >
                {pill.label}
              </Link>
            ))}
          </div>

          <div className="mt-s5">
            <Button href="/appointments/request" variant="ghost-white" size="md">
              Make an Appointment
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
