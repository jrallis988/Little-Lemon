"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { IconSearch } from "@/components/ui/Icons";
import { searchAll, type SearchResult } from "@/lib/data/search";
import { cn } from "@/lib/cn";

const filters: Array<"all" | SearchResult["type"]> = [
  "all",
  "doctor",
  "condition",
  "program",
  "page",
];

const labels: Record<(typeof filters)[number], string> = {
  all: "All",
  doctor: "Doctors",
  condition: "Conditions",
  program: "Programs",
  page: "Pages",
};

export function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const [activeType, setActiveType] = useState<(typeof filters)[number]>("all");

  const results = useMemo(() => searchAll(query), [query]);
  const filtered =
    activeType === "all"
      ? results
      : results.filter((r) => r.type === activeType);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next = query.trim();
    router.replace(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
  }

  return (
    <div className="wrap py-s7 pb-s10">
      <form onSubmit={submit} className="mb-s6" role="search">
        <label htmlFor="site-search" className="sr-only">
          Search doctors, conditions, and programs
        </label>
        <div className="flex flex-col gap-s3 sm:flex-row">
          <div className="relative flex-1">
            <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ocean" />
            <Input
              id="site-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search doctors, conditions, programs…"
              className="pl-11"
            />
          </div>
          <Button type="submit" variant="ocean">
            Search
          </Button>
        </div>
      </form>

      {query.trim() ? (
        <>
          <div className="mb-s5 flex flex-wrap gap-s2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveType(f)}
                className={cn(
                  "rounded-sm border px-3 py-1.5 text-sm font-bold transition-colors",
                  activeType === f
                    ? "border-ocean bg-ocean text-white"
                    : "border-border bg-white text-blue hover:border-ocean",
                )}
              >
                {labels[f]}
                {f !== "all"
                  ? ` (${results.filter((r) => r.type === f).length})`
                  : ` (${results.length})`}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-md text-text-meta">
              No results for “{query}”. Try epilepsy, neurology, or heart.
            </p>
          ) : (
            <ul className="flex flex-col gap-s3">
              {filtered.map((result) => (
                <li key={result.id}>
                  <Link
                    href={result.href}
                    className="block rounded-md border border-border bg-white p-s5 no-underline transition-all hover:border-border-strong hover:shadow-sm"
                  >
                    <div className="mb-1 flex items-center gap-s2">
                      <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-text-meta">
                        {result.type}
                      </span>
                      {result.meta ? (
                        <span className="text-xs text-text-meta">
                          {result.meta}
                        </span>
                      ) : null}
                    </div>
                    <h2 className="mb-1 text-lg font-bold text-ocean">
                      {result.title}
                    </h2>
                    <p className="line-clamp-2 text-sm font-light text-text-body">
                      {result.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="rounded-md border border-border bg-surface p-s6">
          <h2 className="mb-s3 text-xl font-bold text-ocean">
            What are you looking for?
          </h2>
          <p className="mb-s4 text-md font-light text-text-body">
            Search across doctors, clinical conditions, and specialty programs.
          </p>
          <div className="flex flex-wrap gap-s2">
            {["Epilepsy", "Sarah Chen", "Heart Center", "Emergency"].map(
              (term) => (
                <button
                  key={term}
                  type="button"
                  className="rounded-sm border border-border bg-white px-3 py-1.5 text-sm font-bold text-blue hover:border-ocean"
                  onClick={() => {
                    setQuery(term);
                    router.replace(`/search?q=${encodeURIComponent(term)}`);
                  }}
                >
                  {term}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
