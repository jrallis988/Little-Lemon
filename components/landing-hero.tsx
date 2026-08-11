"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { track } from "@/lib/analytics";
import { HOME_CLUB } from "@/lib/home-club";

/**
 * First-viewport hero from the PF desktop reference:
 * “WE'RE ALL STRONG ON THIS PLANET™” + diagonal photo collage + club search.
 */
export function LandingHero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const goToClubs = (event?: FormEvent) => {
    event?.preventDefault();
    const q = query.trim();
    track("club_search", { query: q, source: "landing_hero" });
    if (q) {
      router.push(`/?q=${encodeURIComponent(q)}#clubs`);
      return;
    }
    document.getElementById("clubs")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="landing-hero-heading"
      className="relative overflow-hidden bg-[#582c83] text-white"
    >
      <div className="relative mx-auto grid min-h-[min(78vh,42rem)] max-w-6xl lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div className="relative z-10 flex flex-col justify-center px-4 py-12 sm:px-6 md:px-10 lg:py-16">
          <h1
            id="landing-hero-heading"
            className="max-w-xl font-display text-[2.35rem] font-black uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl"
          >
            We&apos;re all{" "}
            <span className="text-pf-yellow">strong</span> on this planet
            <span className="align-super text-lg sm:text-2xl">™</span>
          </h1>
          <p className="mt-4 font-display text-xl uppercase tracking-wide text-white sm:text-2xl">
            Join the club today!
          </p>
          <p className="mt-2 max-w-md text-sm text-white/75">
            Home club: {HOME_CLUB.city}, {HOME_CLUB.state} · Open &amp; Staffed
            24/7
          </p>

          <form
            onSubmit={goToClubs}
            className="mt-7 flex w-full max-w-lg flex-col gap-2 sm:flex-row sm:items-center"
          >
            <label htmlFor="landing-club-search" className="sr-only">
              Search clubs by address, city, or ZIP
            </label>
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pf-ink/40"
                aria-hidden
              />
              <input
                id="landing-club-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by address, city, or ZIP…"
                className="h-12 w-full rounded-full border-0 bg-white pl-10 pr-4 text-sm text-pf-ink shadow-sm outline-none ring-0 placeholder:text-pf-ink/45 focus-visible:ring-2 focus-visible:ring-pf-yellow"
                autoComplete="postal-code"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border-2 border-white bg-pf-purple px-5 text-sm font-semibold text-white transition hover:bg-pf-purple-bright"
            >
              <Search className="h-4 w-4" aria-hidden />
              Find a Club
            </button>
          </form>
        </div>

        {/* Diagonal three-photo collage */}
        <div
          className="relative min-h-[16rem] lg:min-h-full"
          aria-hidden
        >
          <div
            className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1.5 overflow-hidden bg-[#582c83] max-lg:[clip-path:none] lg:[clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]"
          >
            <div className="relative col-span-2 row-span-1 overflow-hidden">
              <Image
                src="/images/floor-gym.jpg"
                alt=""
                fill
                priority
                className="object-cover object-[center_30%] animate-[hero-zoom_18s_ease-out_forwards]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="/images/hero-gym.jpg"
                alt=""
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="/images/cardio-gym.jpg"
                alt=""
                fill
                priority
                className="object-cover object-[center_20%]"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
          {/* Soft purple edge blend on mobile */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#582c83] to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  );
}
