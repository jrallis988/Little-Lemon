"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { useSelectedClub } from "@/components/selected-club-context";
import { track } from "@/lib/analytics";
import { getClubs, searchClubs, type Club } from "@/lib/clubs";
import { cn } from "@/lib/utils";

function formatDistance(miles: number) {
  if (miles < 0.5) return "0 mi";
  return `${Math.round(miles)} mi`;
}

function clubTitle(club: Club) {
  // Match PF card titles: "City, ST" (or disambiguated name when useful)
  const short = club.name.replace(/^Planet Fitness\s+/i, "").trim();
  if (short && short.toLowerCase() !== club.city.toLowerCase()) {
    return `${short}, ${club.state}`;
  }
  return `${club.city}, ${club.state}`;
}

function ClubCard({ club }: { club: Club }) {
  const { setClub } = useSelectedClub();

  return (
    <article className="flex h-full flex-col rounded-[14px] bg-white p-5 text-[#111] shadow-[0_10px_28px_-16px_rgba(20,0,36,0.45)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-sans text-[1.125rem] font-bold leading-snug text-[#111]">
          {clubTitle(club)}
        </h3>
        <span className="shrink-0 pt-0.5 font-sans text-sm font-normal text-[#888]">
          {formatDistance(club.distanceMiles)}
        </span>
      </div>

      <p className="mt-3 flex items-start gap-2 font-sans text-sm leading-snug text-[#555]">
        <MapPin
          className="mt-0.5 h-4 w-4 shrink-0 text-[#888]"
          aria-hidden
        />
        <span>
          {club.address}, {club.city}, {club.state} {club.zip}
        </span>
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <Link
          href={`/gyms/${club.slug}`}
          onClick={() => {
            setClub(club);
            track("club_select", {
              clubId: club.id,
              source: "explore_details",
            });
          }}
          className="font-sans text-sm font-semibold text-[#5f259f] transition hover:underline"
        >
          Club Details
        </Link>
        <Link
          href="/#pricing"
          onClick={() => {
            setClub(club);
            track("plan_select", {
              clubId: club.id,
              source: "explore_review",
            });
          }}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-[#5f259f] px-4 font-sans text-sm font-semibold text-white transition hover:bg-[#6d20ab]"
        >
          Review Plans
        </Link>
      </div>
    </article>
  );
}

/**
 * Explore Clubs Near You — PF desktop clone:
 * purple → gold diagonal gradient, 3 white cards, Show All Clubs outline.
 */
export function ExploreClubsNearYou() {
  const [showAll, setShowAll] = useState(false);
  const [query, setQuery] = useState("");
  const [clubs, setClubs] = useState<Club[]>(() => getClubs());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q")?.trim() ?? "";
    if (q) {
      setQuery(q);
      setShowAll(true);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/clubs")
      .then((res) => res.json())
      .then((data: { clubs?: Club[] }) => {
        if (!cancelled && data.clubs?.length) setClubs(data.clubs);
      })
      .catch(() => {
        /* seed already loaded */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return clubs;
    return searchClubs(query);
  }, [clubs, query]);

  const visible = showAll ? filtered : filtered.slice(0, 3);

  return (
    <section
      id="clubs"
      aria-labelledby="explore-clubs-heading"
      className="pf-grad-explore scroll-mt-14 px-4 py-14 text-white md:px-6 md:py-16"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="explore-clubs-heading"
          className="font-sans text-[1.75rem] font-bold tracking-tight text-white sm:text-[2rem] md:text-[2.25rem]"
        >
          Explore Clubs Near You
        </h2>

        {query ? (
          <p className="mt-2 font-sans text-sm text-white/80" aria-live="polite">
            Showing results for “{query}”
            <button
              type="button"
              className="ml-2 underline"
              onClick={() => setQuery("")}
            >
              Clear
            </button>
          </p>
        ) : null}

        <ul
          className={cn(
            "mt-8 grid gap-5",
            visible.length >= 3
              ? "md:grid-cols-3"
              : visible.length === 2
                ? "md:grid-cols-2"
                : "md:grid-cols-1 md:max-w-sm"
          )}
        >
          {visible.map((club) => (
            <li key={club.id}>
              <ClubCard club={club} />
            </li>
          ))}
        </ul>

        {filtered.length === 0 ? (
          <p className="mt-8 text-center font-sans text-sm text-white/85">
            No clubs match that search. Try Stratham, Portsmouth, or 03885.
          </p>
        ) : null}

        {filtered.length > 0 ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => {
                const next = !showAll;
                setShowAll(next);
                track("club_search", {
                  source: "show_all_clubs",
                  resultCount: filtered.length,
                });
              }}
              className="inline-flex h-12 min-w-[11rem] items-center justify-center rounded-full border border-white bg-transparent px-8 font-sans text-base font-semibold text-white transition hover:bg-white/10"
            >
              {showAll && filtered.length > 3
                ? "Show Fewer Clubs"
                : "Show All Clubs"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
