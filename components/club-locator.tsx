"use client";

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
        "w-full rounded-lg border px-4 py-4 text-left transition-all duration-200",
        selected
          ? "border-pf-purple bg-white shadow-lift"
          : "border-transparent bg-white/70 hover:border-pf-line hover:bg-white"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-xl tracking-tight text-pf-ink">
            {club.name}
          </p>
          <p className="mt-1 text-sm text-pf-ink/70">
            {club.address}, {club.city}, {club.state} {club.zip}
          </p>
        </div>
        <Badge variant={club.openNow ? "success" : "muted"}>
          {club.openNow ? "Open now" : "Closed"}
        </Badge>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-pf-ink/65">
        <span className="inline-flex items-center gap-1">
          <Navigation className="h-3.5 w-3.5" aria-hidden />
          {club.distanceMiles.toFixed(1)} mi
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock3 className="h-3.5 w-3.5" aria-hidden />
          {club.hours[0]?.open === "24 hours"
            ? "24-hour weekdays"
            : formatHours(club.hours[0])}
        </span>
        {club.blackCardAvailable && (
          <span className="inline-flex items-center gap-1 text-pf-purple">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Black Card Spa
          </span>
        )}
      </div>
    </button>
  );
}

function ClubDetail({ club }: { club: Club }) {
  return (
    <div
      key={club.id}
      className="animate-fade-up rounded-xl border border-pf-line bg-white p-5 shadow-lift md:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-pf-purple">
            Your club
          </p>
          <h3 className="mt-1 font-display text-3xl tracking-tight text-pf-ink">
            {club.name}
          </h3>
          <p className="mt-2 flex items-start gap-2 text-sm text-pf-ink/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pf-purple" />
            {club.address}
            <br />
            {club.city}, {club.state} {club.zip}
          </p>
        </div>
        <Badge variant={club.openNow ? "success" : "muted"} className="text-sm">
          {club.openNow ? "Open now" : "Currently closed"}
        </Badge>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-pf-ink/55">
            Hours
          </h4>
          <ul className="mt-3 space-y-2">
            {club.hours.map((slot) => (
              <li
                key={slot.day}
                className="flex items-center justify-between gap-3 border-b border-pf-line/70 py-2 text-sm last:border-0"
              >
                <span className="font-medium text-pf-ink">{slot.day}</span>
                <span className="text-pf-ink/70">{formatHours(slot)}</span>
              </li>
            ))}
          </ul>
          <a
            href={`tel:${club.phone.replace(/[^\d+]/g, "")}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-pf-purple hover:underline"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {club.phone}
          </a>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-pf-ink/55">
            On the floor
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {club.amenities.map((amenity) => (
              <li key={amenity}>
                <Badge variant="default">{amenity}</Badge>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button asChild className="flex-1">
              <a href={`/join?club=${club.id}`}>Join this location</a>
            </Button>
            <Button asChild variant="outline" className="flex-1">
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
      className="relative scroll-mt-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.85),transparent_45%),linear-gradient(160deg,var(--pf-mist)_0%,#ffffff_45%,#f3ebff_100%)]" />
      <div className="container py-16 md:py-20">
        <div className="max-w-2xl animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pf-purple">
            Find a club
          </p>
          <h2
            id="club-locator-heading"
            className="mt-3 font-display text-4xl tracking-tight text-pf-ink md:text-5xl"
          >
            Where will you work out?
          </h2>
          <p className="mt-3 max-w-xl text-base text-pf-ink/70 md:text-lg">
            Search by city or ZIP. We’ll show hours, what’s on the floor, and how
            to get there—before you commit to a membership.
          </p>
        </div>

        <div className="mt-8 animate-fade-up [animation-delay:80ms]">
          <label htmlFor="club-search" className="sr-only">
            Search clubs by city, ZIP, or address
          </label>
          <div className="relative max-w-xl animate-search-pulse rounded-md">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pf-ink/40"
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
              className="h-14 pl-12 text-lg"
              autoComplete="postal-code"
            />
          </div>
          <p className="mt-2 text-sm text-pf-ink/55" aria-live="polite">
            {isPending
              ? "Searching…"
              : `${results.length} club${results.length === 1 ? "" : "s"} nearby`}
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
          <div className="flex max-h-[32rem] flex-col gap-2 overflow-y-auto rounded-xl border border-pf-line/80 bg-white/40 p-2 backdrop-blur-sm">
            {results.length === 0 ? (
              <div className="rounded-lg bg-white px-4 py-8 text-center text-sm text-pf-ink/65">
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

          <div>
            {selected ? (
              <ClubDetail club={selected} />
            ) : (
              <div className="flex h-full min-h-64 items-center justify-center rounded-xl border border-dashed border-pf-line bg-white/60 px-6 text-center text-pf-ink/60">
                Search above to see hours, equipment, and directions.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const CLUBS_DEFAULT_ID = "pf-midtown";
