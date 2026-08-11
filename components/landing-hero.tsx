"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { track } from "@/lib/analytics";

/**
 * PF homepage hero clone — solid purple, stacked WE'RE ALL / STRONG /
 * ON THIS PLANET™, yellow JOIN THE CLUB TODAY!, nested Find a Club pill,
 * single top-right gym photo with bottom-left diagonal cut.
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
      className="relative overflow-hidden bg-[#5f259f] text-white"
    >
      {/* Soft glow behind headline copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-1/4 h-[28rem] w-[36rem] rounded-full bg-[#7a3bb8]/35 blur-3xl"
      />

      {/* Single photo — top right, diagonal cutting bottom-left corner */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(58%,44rem)] lg:block"
        aria-hidden
      >
        <div
          className="relative h-full w-full"
          style={{
            // Bottom-left of the photo is clipped; diagonal runs
            // from near top-center of the hero down toward the right.
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 32% 100%)",
          }}
        >
          <Image
            src="/images/strong-hero.jpg"
            alt="Members training together at Planet Fitness"
            fill
            priority
            className="object-cover object-[62%_center]"
            sizes="(max-width: 1280px) 55vw, 700px"
          />
        </div>
      </div>

      {/* Mobile photo band */}
      <div className="relative lg:hidden">
        <div className="relative h-48 w-full sm:h-56">
          <Image
            src="/images/strong-hero.jpg"
            alt="Members training together at Planet Fitness"
            fill
            priority
            className="object-cover object-[center_25%]"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#5f259f] via-[#5f259f]/55 to-transparent"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(72vh,38rem)] max-w-6xl items-center px-4 pb-16 pt-4 sm:px-6 md:px-10 lg:py-24">
        <div className="w-full max-w-lg">
          <h1
            id="landing-hero-heading"
            className="font-display font-black uppercase leading-[0.88] tracking-[-0.02em]"
          >
            <span className="block text-[clamp(2.4rem,6vw,4.25rem)] text-white">
              We&apos;re all
            </span>
            <span className="mt-1 block text-[clamp(3.4rem,9vw,6.5rem)] text-[#ffce08]">
              Strong
            </span>
            <span className="mt-1 block text-[clamp(2.4rem,6vw,4.25rem)] text-white">
              On this planet
              <sup className="ml-0.5 text-[0.32em] font-bold tracking-normal">
                ™
              </sup>
            </span>
          </h1>

          <p className="mt-6 font-display text-[clamp(1.15rem,2.4vw,1.65rem)] font-bold uppercase tracking-[0.04em] text-[#ffce08]">
            Join the club today!
          </p>

          <form onSubmit={goToClubs} className="mt-8 w-full max-w-[26rem]">
            <label htmlFor="landing-club-search" className="sr-only">
              Search clubs by address, city, or ZIP
            </label>
            <div className="flex h-[3.25rem] items-stretch rounded-full bg-white p-1 shadow-[0_10px_28px_-14px_rgba(20,0,36,0.5)]">
              <input
                id="landing-club-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by address, city, or ZIP…"
                className="h-full min-w-0 flex-1 rounded-full border-0 bg-transparent px-4 text-[15px] text-[#000521] outline-none placeholder:text-[#000521]/40"
                autoComplete="postal-code"
              />
              <button
                type="submit"
                className="inline-flex h-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#5f259f] px-4 text-sm font-semibold text-white transition hover:bg-[#6d20ab] sm:px-5"
              >
                <Search className="h-4 w-4 shrink-0" aria-hidden />
                <span className="hidden sm:inline">Find a Club</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
