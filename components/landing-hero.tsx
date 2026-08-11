"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { track } from "@/lib/analytics";

/**
 * Exact PF desktop hero clone:
 * purple field + stacked WE'RE ALL / STRONG / ON THIS PLANET™ +
 * yellow JOIN THE CLUB TODAY! + nested Find a Club search pill +
 * single diagonal-clipped gym photo on the right.
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
      className="relative overflow-hidden bg-pf-purple text-white"
    >
      {/* Single diagonal gym photo — top-right, clipped into the purple */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block"
        aria-hidden
      >
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)",
          }}
        >
          <Image
            src="/images/strong-hero.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="52vw"
          />
        </div>
      </div>

      {/* Mobile / tablet: full-bleed photo under content */}
      <div className="relative lg:hidden" aria-hidden>
        <div className="relative h-52 w-full sm:h-64">
          <Image
            src="/images/strong-hero.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[center_30%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pf-purple via-pf-purple/70 to-pf-purple/20" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(68vh,36rem)] max-w-6xl items-center px-4 pb-14 pt-6 sm:px-6 md:px-10 lg:py-20">
        <div className="w-full max-w-xl lg:max-w-[28rem] xl:max-w-xl">
          <h1
            id="landing-hero-heading"
            className="font-display text-[2.75rem] font-black uppercase leading-[0.9] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl"
          >
            <span className="block text-white">We&apos;re all</span>
            <span className="mt-1 block text-[1.15em] text-pf-yellow">
              Strong
            </span>
            <span className="mt-1 block text-white">
              On this planet
              <span className="align-super text-[0.35em] font-bold tracking-normal">
                ™
              </span>
            </span>
          </h1>

          <p className="mt-5 font-display text-lg font-bold uppercase tracking-wide text-pf-yellow sm:text-xl md:text-2xl">
            Join the club today!
          </p>

          {/* Nested white pill + purple Find a Club button */}
          <form
            onSubmit={goToClubs}
            className="mt-7 w-full max-w-md"
          >
            <label htmlFor="landing-club-search" className="sr-only">
              Search clubs by address, city, or ZIP
            </label>
            <div className="flex h-14 items-center rounded-full bg-white p-1.5 shadow-[0_8px_24px_-12px_rgba(20,0,36,0.45)]">
              <input
                id="landing-club-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by address, city, or ZIP…"
                className="h-full min-w-0 flex-1 border-0 bg-transparent px-4 text-sm text-pf-ink outline-none placeholder:text-pf-ink/40"
                autoComplete="postal-code"
              />
              <button
                type="submit"
                className="inline-flex h-full shrink-0 items-center justify-center gap-2 rounded-full bg-pf-purple px-4 text-sm font-semibold text-white transition hover:bg-pf-purple-bright sm:px-5"
              >
                <Search className="h-4 w-4" aria-hidden />
                <span className="hidden sm:inline">Find a Club</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
