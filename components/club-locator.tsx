"use client";

import Image from "next/image";
import { useDeferredValue, useMemo, useState, useTransition } from "react";
import {
  Clock3,
  MapPin,
  Navigation,
  Phone,
  Search,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatHours, searchClubs, type Club } from "@/lib/clubs";
import { cn } from "@/lib/utils";

function ClubResult({
  club,
  selected,
  onSelect,
}: {
  club: Club;
  selected: boolean;
  onSelect: (club: Club) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(club)}
      className={cn(
        "w-full border-b border-white/10 px-3 py-2.5 text-left transition-colors last:border-0",
        selected ? "bg-pf-yellow/20" : "hover:bg-white/5"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-display text-base tracking-tight text-white md:text-lg">
            {club.name.replace("Planet Fitness ", "")}
          </p>
          <p className="truncate text-xs text-white/60">
            {club.city}, {club.state} · {club.zip}
          </p>
        </div>
        <Badge
          variant={club.openNow ? "success" : "muted"}
          className="shrink-0"
        >
          {club.openNow ? "Open" : "Closed"}
        </Badge>
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/55">
        <span className="inline-flex items-center gap-1">
          <Navigation className="h-3 w-3" aria-hidden />
          {club.distanceMiles.toFixed(1)} mi
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock3 className="h-3 w-3" aria-hidden />
          {club.hours[0]?.open === "24 hours"
            ? "24-hr weekdays"
            : formatHours(club.hours[0])}
        </span>
        {club.blackCardAvailable && (
          <span className="inline-flex items-center gap-1 text-pf-yellow">
            <Sparkles className="h-3 w-3" aria-hidden />
            Spa
          </span>
        )}
      </div>
    </button>
  );
}

function ClubDetail({ club }: { club: Club }) {
  return (
    <div key={club.id} className="animate-fade-up flex h-full flex-col">
      <div className="relative h-40 overflow-hidden md:h-48">
        <Image
          src="/images/floor-gym.jpg"
          alt="Gym equipment on the workout floor"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 65vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0d28] via-[#1a0d28]/35 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-pf-yellow">
              Your club
            </p>
            <h3 className="font-display text-2xl tracking-tight text-white md:text-3xl">
              {club.name}
            </h3>
          </div>
          <Badge variant={club.openNow ? "success" : "muted"}>
            {club.openNow ? "Open now" : "Closed"}
          </Badge>
        </div>
      </div>

      <div className="grid flex-1 bg-[#1f1233] md:grid-cols-2">
        <div className="border-b border-white/10 p-4 md:border-b-0 md:border-r md:p-4">
          <p className="flex items-start gap-2 text-sm text-white/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pf-yellow" />
            <span>
              {club.address}
              <br />
              {club.city}, {club.state} {club.zip}
            </span>
          </p>
          <h4 className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
            Hours
          </h4>
          <ul className="mt-1.5 space-y-1">
            {club.hours.map((slot) => (
              <li
                key={slot.day}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="font-medium text-white">{slot.day}</span>
                <span className="text-white/65">{formatHours(slot)}</span>
              </li>
            ))}
          </ul>
          <a
            href={`tel:${club.phone.replace(/[^\d+]/g, "")}`}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-pf-yellow hover:underline"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {club.phone}
          </a>
        </div>

        <div className="p-4">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
            On the floor
          </h4>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {club.amenities.map((amenity) => (
              <li key={amenity}>
                <span className="inline-flex rounded-sm bg-white/10 px-2 py-0.5 text-xs font-medium text-white/85">
                  {amenity}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button asChild className="flex-1">
              <a href={`/join?club=${club.id}`}>Join this location</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
            >
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  `${club.address}, ${club.city}, ${club.state} ${club.zip}`
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Directions
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClubLocator() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(CLUBS_DEFAULT_ID);
  const deferredQuery = useDeferredValue(query);
  const [isPending, startTransition] = useTransition();

  const results = useMemo(
    () => searchClubs(deferredQuery),
    [deferredQuery]
  );

  const selected =
    results.find((club) => club.id === selectedId) ?? results[0] ?? null;

  return (
    <section
      id="clubs"
      aria-labelledby="club-locator-heading"
      className="relative scroll-mt-16 bg-[#14081f]"
    >
      <div className="container pb-8 pt-0 md:pb-10">
        <div className="overflow-hidden border border-white/10 bg-[#1a0d28]">
          <div className="grid gap-3 border-b border-white/10 px-4 py-3 md:grid-cols-[1fr_minmax(0,22rem)] md:items-center md:px-4 md:py-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pf-yellow">
                Find a club
              </p>
              <h2
                id="club-locator-heading"
                className="font-display text-2xl tracking-tight text-white md:text-3xl"
              >
                Where will you work out?
              </h2>
            </div>
            <div>
              <label htmlFor="club-search" className="sr-only">
                Search clubs by city, ZIP, or address
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pf-ink/45"
                  aria-hidden
                />
                <Input
                  id="club-search"
                  value={query}
                  onChange={(event) => {
                    const next = event.target.value;
                    setQuery(next);
                    startTransition(() => {
                      const nextResults = searchClubs(next);
                      setSelectedId(nextResults[0]?.id ?? null);
                    });
                  }}
                  placeholder="City or ZIP code…"
                  className="h-10 border-0 bg-white pl-10 text-sm shadow-none"
                  autoComplete="postal-code"
                />
              </div>
              <p className="mt-1 text-xs text-white/50" aria-live="polite">
                {isPending
                  ? "Searching…"
                  : `${results.length} club${results.length === 1 ? "" : "s"} nearby`}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
            <div className="max-h-[26rem] overflow-y-auto border-b border-white/10 bg-[#14081f] lg:max-h-[30rem] lg:border-b-0 lg:border-r">
              {results.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-white/60">
                  No clubs match “{query}”. Try a nearby city or ZIP.
                </div>
              ) : (
                results.map((club) => (
                  <ClubResult
                    key={club.id}
                    club={club}
                    selected={selected?.id === club.id}
                    onSelect={(next) => setSelectedId(next.id)}
                  />
                ))
              )}
            </div>

            <div className="min-h-[20rem] bg-[#1f1233]">
              {selected ? (
                <ClubDetail club={selected} />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-white/55">
                  Search above to see hours, equipment, and directions.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CLUBS_DEFAULT_ID = "pf-midtown";
