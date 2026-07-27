"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
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
import { track } from "@/lib/analytics";
import {
  formatHours,
  getClubs,
  searchClubs,
  type Club,
} from "@/lib/clubs";
import { formatCurrency, summarizeLocalRates } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { useSelectedClub } from "@/components/selected-club-context";

function ClubResult({
  club,
  selected,
  onSelect,
  optionId,
}: {
  club: Club;
  selected: boolean;
  onSelect: (club: Club) => void;
  optionId: string;
}) {
  return (
    <button
      type="button"
      id={optionId}
      role="option"
      aria-selected={selected}
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
  const classic = club.pricing.classic;
  const black = club.pricing["black-card"];

  return (
    <div key={club.id} className="flex h-full min-h-0 flex-col bg-pf-purple-ink/80">
      <div className="relative h-48 shrink-0 overflow-hidden sm:h-56 lg:h-64">
        <Image
          src={club.image}
          alt={`Interior photo for ${club.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pf-purple-ink via-pf-purple-deep/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-pf-yellow">
              Your club
            </p>
            <h3 className="font-display text-xl leading-none tracking-tight text-white sm:text-2xl">
              {club.name}
            </h3>
            <p className="mt-1 text-xs text-white/75">{club.todayLabel}</p>
          </div>
          <Badge variant={club.openNow ? "success" : "muted"}>
            {club.openNow ? "Open now" : "Closed"}
          </Badge>
        </div>
      </div>

      <div className="grid flex-1 lg:grid-cols-2">
        <div className="space-y-2.5 border-b border-white/10 p-3 lg:border-b-0 lg:border-r">
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

        <div className="flex flex-col gap-3 p-3">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
              Local membership rates
            </h4>
            <p className="mt-1 text-xs text-white/55">
              Confirmed for this location—not a national average.
            </p>
            <dl className="mt-2 grid gap-1.5 text-sm">
              <div className="flex justify-between gap-2 bg-white/5 px-2 py-1.5">
                <dt className="text-white/70">Classic</dt>
                <dd className="font-semibold">
                  {formatCurrency(classic.monthlyDues)}/mo
                  {classic.enrollmentFee > 0
                    ? ` · enroll ${formatCurrency(classic.enrollmentFee)}`
                    : ""}
                </dd>
              </div>
              <div className="flex justify-between gap-2 bg-white/5 px-2 py-1.5">
                <dt className="text-white/70">Black Card</dt>
                <dd className="font-semibold">
                  {black.available
                    ? `${formatCurrency(black.monthlyDues)}/mo${
                        black.enrollmentFee > 0
                          ? ` · enroll ${formatCurrency(black.enrollmentFee)}`
                          : ""
                      }`
                    : "Not offered here"}
                </dd>
              </div>
            </dl>
          </div>

          <div>
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
          </div>

          <div className="mt-auto flex flex-col gap-2 pt-1 sm:flex-row">
            <Button asChild variant="purple" className="flex-1">
              <a href="#pricing">Review Plans</a>
            </Button>
            <Button asChild className="flex-1">
              <Link
                href={`/join?club=${club.id}&plan=${
                  black.available ? "black-card" : "classic"
                }`}
                onClick={() =>
                  track("plan_select", {
                    clubId: club.id,
                    plan: black.available ? "black-card" : "classic",
                    source: "club_detail",
                  })
                }
              >
                Join Now
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:flex-none"
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
  const listboxId = useId();
  const { setClub: setSelectedClubContext } = useSelectedClub();
  const [query, setQuery] = useState("");
  const [clubs, setClubs] = useState<Club[]>(() => getClubs());
  const [selectedId, setSelectedId] = useState<string | null>(
    () => getClubs()[0]?.id ?? null
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const deferredQuery = useDeferredValue(query);
  const [isPending, startTransition] = useTransition();
  const listRef = useRef<HTMLDivElement>(null);
  const searchTimer = useRef<number | null>(null);

  const results = useMemo(() => {
    if (!deferredQuery.trim()) return clubs;
    return searchClubs(deferredQuery);
  }, [clubs, deferredQuery]);

  const selected =
    results.find((club) => club.id === selectedId) ?? results[0] ?? null;

  useEffect(() => {
    if (selected) setSelectedClubContext(selected);
  }, [selected, setSelectedClubContext]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/clubs")
      .then((res) => res.json())
      .then((data: { clubs?: Club[] }) => {
        if (cancelled || !data.clubs?.length) return;
        setClubs(data.clubs);
        setSelectedId((prev) => prev ?? data.clubs![0]?.id ?? null);
      })
      .catch(() => {
        /* local getClubs() already seeded state */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const index = Math.max(
      0,
      results.findIndex((club) => club.id === selected?.id)
    );
    setActiveIndex(index === -1 ? 0 : index);
  }, [results, selected?.id]);

  const selectClub = useCallback((club: Club) => {
    setSelectedId(club.id);
    track("club_select", {
      clubId: club.id,
      openNow: club.openNow,
      rates: summarizeLocalRates(club),
    });
  }, []);

  const onSearchChange = (next: string) => {
    setQuery(next);
    startTransition(() => {
      const nextResults = searchClubs(next);
      setSelectedId(nextResults[0]?.id ?? null);
    });
    if (searchTimer.current) window.clearTimeout(searchTimer.current);
    searchTimer.current = window.setTimeout(() => {
      track("club_search", { query: next, resultCount: searchClubs(next).length });
    }, 350);
  };

  const onListKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = Math.min(results.length - 1, activeIndex + 1);
      setActiveIndex(next);
      selectClub(results[next]);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const next = Math.max(0, activeIndex - 1);
      setActiveIndex(next);
      selectClub(results[next]);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      selectClub(results[0]);
    } else if (event.key === "End") {
      event.preventDefault();
      const next = results.length - 1;
      setActiveIndex(next);
      selectClub(results[next]);
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      selectClub(results[activeIndex]);
    }
  };

  return (
    <section
      id="clubs"
      aria-labelledby="club-locator-heading"
      className="relative grid min-h-[calc(100dvh-3.5rem)] pf-texture lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
    >
      <div className="relative min-h-[38vh] overflow-hidden lg:min-h-full">
        <Image
          src="/images/hero-gym.jpg"
          alt="Weights on the gym floor"
          fill
          priority
          className="object-cover object-center animate-[hero-zoom_20s_ease-out_forwards]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div aria-hidden className="absolute inset-0 pf-grad-hero" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-pf-purple-deep/90 to-transparent lg:hidden"
        />

        <div className="relative flex h-full min-h-[38vh] flex-col justify-end p-4 pb-5 sm:p-6 lg:min-h-full lg:p-8 lg:pb-8">
          <p className="font-display text-5xl leading-none tracking-tight text-pf-yellow sm:text-6xl lg:text-7xl">
            Planet Fitness
          </p>
          <h1
            id="club-locator-heading"
            className="mt-2 max-w-md text-lg font-medium leading-snug text-white sm:text-xl"
          >
            Find a Club Near You
          </h1>
          <p className="mt-1.5 max-w-md text-sm text-white/80 sm:text-base">
            Clear local membership pricing. The Judgement Free Zone®—a gym where
            everyone feels welcome.
          </p>

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
                  onChange={(event) => onSearchChange(event.target.value)}
                  placeholder="Search by address, city, or ZIP…"
                  className="h-11 border-0 bg-white pl-10 text-base shadow-none"
                  autoComplete="postal-code"
                  role="combobox"
                  aria-expanded={true}
                  aria-controls={listboxId}
                  aria-autocomplete="list"
                  aria-activedescendant={
                    results[activeIndex]
                      ? `${listboxId}-option-${results[activeIndex].id}`
                      : undefined
                  }
                />
              </div>
              <Button
                type="button"
                variant="purple"
                className="h-11 shrink-0 rounded-full px-4"
                aria-label="Search clubs"
                onClick={() => {
                  listRef.current?.focus();
                  track("club_search", {
                    query,
                    resultCount: results.length,
                    source: "search_button",
                  });
                }}
              >
                <Search className="h-4 w-4" aria-hidden />
              </Button>
            </div>
            <p className="mt-1.5 text-xs text-white/70" aria-live="polite">
              {isPending
                ? "Searching…"
                : `${results.length} club${results.length === 1 ? "" : "s"} nearby · 2,700+ worldwide`}
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-h-[50vh] flex-col border-t border-white/15 lg:min-h-0 lg:border-l lg:border-t-0">
        <div className="grid min-h-0 flex-1 lg:grid-cols-[15.5rem_minmax(0,1fr)]">
          <div
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label="Nearby clubs"
            tabIndex={0}
            onKeyDown={onListKeyDown}
            className="max-h-[40vh] overflow-y-auto border-b border-white/15 bg-pf-purple-ink/35 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pf-yellow lg:max-h-none lg:border-b-0 lg:border-r lg:border-white/15"
          >
            {results.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-white/55">
                No clubs match “{query}”.
              </div>
            ) : (
              results.map((club) => (
                <ClubResult
                  key={club.id}
                  club={club}
                  optionId={`${listboxId}-option-${club.id}`}
                  selected={selected?.id === club.id}
                  onSelect={selectClub}
                />
              ))
            )}
          </div>
          <div className="min-h-[24rem] flex-1 lg:min-h-0">
            {selected ? (
              <ClubDetail club={selected} />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-white/50">
                Pick a club to see hours, local rates, and what’s on the floor.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
