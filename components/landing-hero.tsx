"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { track } from "@/lib/analytics";

/**
 * Planet Fitness homepage hero clone — same info, typography, and sizes:
 * WE'RE ALL (72px) / STRONG (120px yellow) / ON THIS PLANET™ (72px)
 * JOIN THE CLUB TODAY! (28px yellow)
 * nested Find a Club search pill + diagonal top-right photo.
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
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-8%] top-[18%] h-[30rem] w-[38rem] rounded-full bg-[#7a3bb8]/40 blur-3xl"
      />

      {/* Top-right photo with bottom-left diagonal cut */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] xl:w-[52%] lg:block"
        aria-hidden
      >
        <div
          className="relative h-full w-full"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 28% 100%)",
          }}
        >
          <Image
            src="/images/strong-hero.jpg"
            alt="Members training together at Planet Fitness"
            fill
            priority
            className="object-cover object-[60%_center] motion-safe:animate-[hero-zoom_1.4s_ease-out_forwards]"
            sizes="54vw"
          />
        </div>
      </div>

      <div className="relative lg:hidden">
        <div className="relative h-44 w-full sm:h-52">
          <Image
            src="/images/strong-hero.jpg"
            alt="Members training together at Planet Fitness"
            fill
            priority
            className="object-cover object-[center_28%] motion-safe:animate-[hero-zoom_1.4s_ease-out_forwards]"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#5f259f] via-[#5f259f]/60 to-transparent"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(74vh,40rem)] max-w-[1200px] items-center px-5 pb-16 pt-6 sm:px-8 lg:px-12 lg:py-24">
        <div className="w-full max-w-[34rem] motion-safe:animate-[hero-rise_0.7s_ease-out_both]">
          <h1 id="landing-hero-heading" className="text-white">
            <span className="pf-type-hero-line block">We&apos;re all</span>
            <span className="pf-type-hero-strong mt-0.5 block motion-safe:animate-[hero-strong_0.85s_ease-out_0.12s_both]">
              Strong
            </span>
            <span className="pf-type-hero-line mt-0.5 block">
              On this planet
              <sup className="ml-0.5 text-[0.28em] font-bold tracking-normal">
                ™
              </sup>
            </span>
          </h1>

          <p className="pf-type-hero-sub mt-6 motion-safe:animate-[hero-rise_0.7s_ease-out_0.2s_both]">
            Join the club today!
          </p>

          <form
            onSubmit={goToClubs}
            className="mt-8 w-full max-w-[28rem] motion-safe:animate-[hero-rise_0.7s_ease-out_0.32s_both]"
          >
            <label htmlFor="landing-club-search" className="sr-only">
              Search clubs by address, city, or ZIP
            </label>
            <div className="flex h-14 items-stretch rounded-full bg-white p-1.5 shadow-[0_10px_28px_-14px_rgba(20,0,36,0.5)]">
              <input
                id="landing-club-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by address, city, or ZIP…"
                className="h-full min-w-0 flex-1 rounded-full border-0 bg-transparent px-4 font-sans text-base text-[#000521] outline-none placeholder:text-[#000521]/40"
                autoComplete="postal-code"
              />
              <button
                type="submit"
                className="inline-flex h-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#5f259f] px-4 font-sans text-[15px] font-semibold text-white transition hover:bg-[#6d20ab] sm:px-5"
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
