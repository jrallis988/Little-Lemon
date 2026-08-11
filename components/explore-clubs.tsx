"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelectedClub } from "@/components/selected-club-context";
import { track } from "@/lib/analytics";
import { getClubs, searchClubs, type Club } from "@/lib/clubs";
import { cn } from "@/lib/utils";

function ClubCard({ club }: { club: Club }) {
  const { setClub } = useSelectedClub();

  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-5 text-pf-ink shadow-[0_12px_32px_-18px_rgba(20,0,36,0.45)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl tracking-tight text-pf-ink">
          {club.city}, {club.state}
        </h3>
        <span className="shrink-0 text-sm font-medium text-pf-ink/55">
          {club.distanceMiles < 0.1
            ? "Home"
            : `${club.distanceMiles.toFixed(0)} mi`}
        </span>
      </div>
      <p className="mt-2 flex items-start gap-1.5 text-sm text-pf-ink/65">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pf-purple" aria-hidden />
        <span>
          {club.address}, {club.city}, {club.state} {club.zip}
        </span>
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Button asChild variant="outline" size="sm" className="border-pf-line">
          <Link
            href={`/gyms/${club.slug}`}
            onClick={() => {
              setClub(club);
              track("club_select", { clubId: club.id, source: "explore_details" });
            }}
          >
            Club Details
          </Link>
        </Button>
        <Button asChild variant="purple" size="sm">
          <Link
            href="/#pricing"
            onClick={() => {
              setClub(club);
              track("plan_select", {
                clubId: club.id,
                source: "explore_review",
              });
            }}
          >
            Review Plans
          </Link>
        </Button>
      </div>
    </article>
  );
}

/**
 * “Explore Clubs Near You” — purple → gold gradient with club cards.
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
      className="scroll-mt-14 bg-gradient-to-b from-pf-purple via-[#6d20ab] to-pf-gold px-4 py-12 text-white md:px-6 md:py-16"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="explore-clubs-heading"
          className="text-center font-display text-3xl tracking-tight sm:text-4xl md:text-5xl"
        >
          Explore Clubs Near You
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-white/80">
          Start with Planet Fitness Stratham, then browse Seacoast clubs nearby.
        </p>

        {query ? (
          <p className="mt-3 text-center text-xs text-white/70" aria-live="polite">
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
            "mt-8 grid gap-4",
            visible.length === 1
              ? "md:grid-cols-1 md:max-w-md md:mx-auto"
              : visible.length === 2
                ? "md:grid-cols-2"
                : "md:grid-cols-3"
          )}
        >
          {visible.map((club) => (
            <li key={club.id}>
              <ClubCard club={club} />
            </li>
          ))}
        </ul>

        {filtered.length === 0 ? (
          <p className="mt-8 text-center text-sm text-white/80">
            No clubs match that search. Try Stratham, Portsmouth, or 03885.
          </p>
        ) : null}

        {filtered.length > 3 ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => {
                setShowAll((v) => !v);
                track("club_search", {
                  source: "show_all_clubs",
                  resultCount: filtered.length,
                });
              }}
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/80 bg-transparent px-6 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {showAll ? "Show Fewer Clubs" : "Show All Clubs"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
