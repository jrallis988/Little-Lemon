"use client";

import Image from "next/image";
import Link from "next/link";
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
        "w-full border-b border-white/10 px-3 py-2 text-left transition-colors last:border-0",
        selected ? "bg-pf-yellow text-pf-ink" : "text-white hover:bg-white/10"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-display text-base tracking-tight">
            {club.name.replace("Planet Fitness ", "")}
          </p>
          <p
            className={cn(
              "truncate text-xs",
              selected ? "text-pf-ink/70" : "text-white/60"
            )}
          >
            {club.city}, {club.state}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 text-[10px] font-bold uppercase tracking-wide",
            selected
              ? club.openNow
                ? "text-emerald-700"
                : "text-pf-ink/50"
              : club.openNow
                ? "text-emerald-400"
                : "text-white/40"
          )}
        >
          {club.openNow ? "Open" : "Closed"}
        </span>
      </div>
      <div
        className={cn(
          "mt-1 flex flex-wrap gap-x-2.5 gap-y-0.5 text-[11px]",
          selected ? "text-pf-ink/65" : "text-white/55"
        )}
      >
        <span className="inline-flex items-center gap-1">
          <Navigation className="h-3 w-3" aria-hidden />
          {club.distanceMiles.toFixed(1)} mi
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock3 className="h-3 w-3" aria-hidden />
          {club.hours[0]?.open === "24 hours" ? "24-hr" : "Hours vary"}
        </span>
        {club.blackCardAvailable && (
          <span
            className={cn(
              "inline-flex items-center gap-1",
              selected ? "text-pf-purple" : "text-pf-yellow"
            )}
          >
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
    <div key={club.id} className="flex h-full min-h-0 flex-col bg-[#1a0d28]">
      <div className="relative h-36 shrink-0 overflow-hidden sm:h-44 lg:h-52">
        <Image
          src="/images/floor-gym.jpg"
          alt="Gym floor equipment"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0d28] via-[#1a0d28]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-pf-yellow">
              Your club
            </p>
            <h3 className="font-display text-xl leading-none tracking-tight text-white sm:text-2xl">
              {club.name}
            </h3>
          </div>
          <Badge variant={club.openNow ? "success" : "muted"}>
            {club.openNow ? "Open now" : "Closed"}
          </Badge>
        </div>
      </div>

      <div className="grid flex-1 md:grid-cols-2">
        <div className="space-y-3 border-b border-white/10 p-3 md:border-b-0 md:border-r">
          <p className="flex items-start gap-2 text-sm text-white/85">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pf-yellow" />
            <span>
              {club.address}
              <br />
              {club.city}, {club.state} {club.zip}
            </span>
          </p>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
              Hours
            </h4>
            <ul className="mt-1 space-y-0.5">
              {club.hours.map((slot) => (
                <li
                  key={slot.day}
                  className="flex justify-between gap-2 text-sm text-white/85"
                >
                  <span>{slot.day}</span>
                  <span className="text-white/60">{formatHours(slot)}</span>
                </li>
              ))}
            </ul>
          </div>
          <a
            href={`tel:${club.phone.replace(/[^\d+]/g, "")}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-pf-yellow hover:underline"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden />
            {club.phone}
          </a>
        </div>

        <div className="flex flex-col p-3">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
            On the floor
          </h4>
          <ul className="mt-1.5 flex flex-wrap gap-1">
            {club.amenities.map((amenity) => (
              <li key={amenity}>
                <span className="inline-flex bg-white/10 px-1.5 py-0.5 text-[11px] font-medium text-white/90">
                  {amenity}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex gap-2 pt-3">
            <Button asChild className="flex-1">
              <a href={`/join?club=${club.id}`}>Join here</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
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
      className="relative grid min-h-[calc(100dvh-3.5rem)] bg-[#14081f] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
    >
      {/* Gym photo + brand + search — fills half the viewport */}
      <div className="relative min-h-[38vh] overflow-hidden lg:min-h-full">
        <Image
          src="/images/hero-gym.jpg"
          alt="Weights on the gym floor"
          fill
          priority
          className="object-cover object-center animate-[hero-zoom_20s_ease-out_forwards]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#14081f] via-[#2f124a]/55 to-black/25 lg:bg-gradient-to-r lg:from-black/30 lg:via-[#2f124a]/45 lg:to-[#14081f]"
        />

        <div className="relative flex h-full min-h-[38vh] flex-col justify-end p-4 pb-5 sm:p-6 lg:min-h-full lg:p-8 lg:pb-8">
          <p className="font-display text-5xl leading-none tracking-tight text-pf-yellow sm:text-6xl lg:text-7xl">
            Planet Fitness
          </p>
          <h1
            id="club-locator-heading"
            className="mt-2 max-w-md text-lg font-medium leading-snug text-white sm:text-xl"
          >
            A nearby gym. Clear membership pricing. Ready when you are.
          </h1>

          <div className="mt-4 max-w-md">
            <label htmlFor="club-search" className="sr-only">
              Search clubs by city or ZIP
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pf-ink/50"
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
                  placeholder="City or ZIP…"
                  className="h-11 border-0 bg-white pl-10 text-base shadow-none"
                  autoComplete="postal-code"
                />
              </div>
              <Button asChild variant="outline" className="h-11 border-white/50 bg-black/30 text-white hover:bg-white/15 hover:text-white">
                <Link href="#pricing">Pricing</Link>
              </Button>
            </div>
            <p className="mt-1.5 text-xs text-white/70" aria-live="polite">
              {isPending
                ? "Searching…"
                : `${results.length} club${results.length === 1 ? "" : "s"} nearby`}
            </p>
          </div>
        </div>
      </div>

      {/* Club list + detail — fills the other half, edge to edge */}
      <div className="flex min-h-[50vh] flex-col border-t border-white/10 lg:min-h-0 lg:border-l lg:border-t-0">
        <div className="grid min-h-0 flex-1 lg:grid-cols-[15.5rem_minmax(0,1fr)]">
          <div className="max-h-[40vh] overflow-y-auto border-b border-white/10 bg-[#0f0618] lg:max-h-none lg:border-b-0 lg:border-r">
            {results.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-white/55">
                No clubs match “{query}”.
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
          <div className="min-h-[22rem] flex-1 lg:min-h-0">
            {selected ? (
              <ClubDetail club={selected} />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-white/50">
                Pick a club to see hours and what’s on the floor.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const CLUBS_DEFAULT_ID = "pf-midtown";
