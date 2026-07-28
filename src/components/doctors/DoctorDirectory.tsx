"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SelectField } from "@/components/ui/SelectField";
import { IconSearch } from "@/components/ui/Icons";
import {
  availabilityOptions,
  buildDoctorDirectoryQuery,
  filterDoctors,
  languages,
  locations,
  specialties,
} from "@/lib/data/doctors";

function readParam(
  params: URLSearchParams,
  key: string,
  fallback: string,
  allowed?: readonly string[],
) {
  const value = params.get(key) ?? fallback;
  if (allowed && !allowed.includes(value)) return fallback;
  return value;
}

export function DoctorDirectory() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const specialty = readParam(
    searchParams,
    "specialty",
    "All specialties",
    specialties,
  );
  const location = readParam(
    searchParams,
    "location",
    "All locations",
    locations,
  );
  const language = readParam(
    searchParams,
    "language",
    "Any language",
    languages,
  );
  const availability = readParam(
    searchParams,
    "availability",
    "Any availability",
    availabilityOptions,
  );
  const queryFromUrl = searchParams.get("q") ?? "";

  const [queryDraft, setQueryDraft] = useState(queryFromUrl);

  useEffect(() => {
    setQueryDraft(queryFromUrl);
  }, [queryFromUrl]);

  const syncFilters = useCallback(
    (next: {
      specialty?: string;
      location?: string;
      language?: string;
      availability?: string;
      query?: string;
    }) => {
      const qs = buildDoctorDirectoryQuery({
        specialty: next.specialty ?? specialty,
        location: next.location ?? location,
        language: next.language ?? language,
        availability: next.availability ?? availability,
        query: next.query ?? queryFromUrl,
      });
      startTransition(() => {
        router.replace(`${pathname}${qs}`, { scroll: false });
      });
    },
    [
      availability,
      language,
      location,
      pathname,
      queryFromUrl,
      router,
      specialty,
    ],
  );

  const results = useMemo(
    () =>
      filterDoctors({
        specialty,
        location,
        language,
        availability,
        query: queryFromUrl,
      }),
    [specialty, location, language, availability, queryFromUrl],
  );

  const hasActiveFilters =
    specialty !== "All specialties" ||
    location !== "All locations" ||
    language !== "Any language" ||
    availability !== "Any availability" ||
    Boolean(queryFromUrl.trim());

  const countLabel = (() => {
    const base = `${results.length} doctor${results.length === 1 ? "" : "s"}`;
    if (specialty !== "All specialties") return `${base} in ${specialty}`;
    if (queryFromUrl.trim()) return `${base} matching “${queryFromUrl.trim()}”`;
    return base;
  })();

  function submitQuery(e: React.FormEvent) {
    e.preventDefault();
    syncFilters({ query: queryDraft });
  }

  function clearFilters() {
    setQueryDraft("");
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }

  return (
    <>
      <div
        className="sticky top-[108px] z-[200] border-b border-border bg-white py-s4"
        role="search"
        aria-label="Filter doctors"
      >
        <div className="wrap flex flex-col gap-s3">
          <form
            onSubmit={submitQuery}
            className="flex flex-col gap-s2 sm:flex-row sm:items-center"
          >
            <label htmlFor="doctor-query" className="sr-only">
              Search doctors by name or specialty
            </label>
            <div className="relative min-w-0 flex-1">
              <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ocean" />
              <Input
                id="doctor-query"
                value={queryDraft}
                onChange={(e) => setQueryDraft(e.target.value)}
                placeholder="Search by name, specialty, or interest…"
                className="pl-11"
              />
            </div>
            <Button type="submit" variant="ocean" size="sm">
              Search
            </Button>
          </form>

          <div className="flex flex-wrap items-center gap-s3">
            <SelectField
              aria-label="Filter by specialty"
              className="min-w-[160px] max-w-[280px] flex-[1.5]"
              value={specialty}
              onValueChange={(value) => syncFilters({ specialty: value })}
              options={specialties.map((s) => ({ value: s, label: s }))}
            />
            <SelectField
              aria-label="Filter by location"
              className="min-w-[160px] max-w-[220px] flex-1"
              value={location}
              onValueChange={(value) => syncFilters({ location: value })}
              options={locations.map((l) => ({ value: l, label: l }))}
            />
            <SelectField
              aria-label="Filter by language"
              className="min-w-[160px] max-w-[220px] flex-1"
              value={language}
              onValueChange={(value) => syncFilters({ language: value })}
              options={languages.map((l) => ({ value: l, label: l }))}
            />
            <SelectField
              aria-label="Filter by availability"
              className="min-w-[160px] max-w-[220px] flex-1"
              value={availability}
              onValueChange={(value) => syncFilters({ availability: value })}
              options={availabilityOptions.map((opt) => ({
                value: opt,
                label: opt,
              }))}
            />

            <div className="ml-auto flex flex-wrap items-center gap-s3">
          <span
            className="whitespace-nowrap text-sm font-light text-text-meta"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {isPending ? "Updating results…" : countLabel}
          </span>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-bold text-ocean hover:underline"
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        {results.length === 0 ? (
          <div className="py-s10">
            <p className="mb-s4 text-md text-text-meta">
              No doctors match these filters. Try broadening specialty or
              location, or clear your search.
            </p>
            <Button type="button" variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 gap-s4 py-s6 pb-s10 md:grid-cols-2 ${
              isPending ? "opacity-70 transition-opacity" : ""
            }`}
            role="list"
            aria-label="Doctor search results"
            aria-busy={isPending}
          >
            {results.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
