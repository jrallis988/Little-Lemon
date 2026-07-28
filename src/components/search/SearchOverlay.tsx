"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IconSearch } from "@/components/ui/Icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/Dialog";
import { searchAll, type SearchResult } from "@/lib/data/search";
import { cn } from "@/lib/cn";

const typeLabel: Record<SearchResult["type"], string> = {
  doctor: "Doctor",
  condition: "Condition",
  program: "Program",
  page: "Page",
  location: "Location",
  trial: "Trial",
};

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const statusId = useId();
  const [query, setQuery] = useState("");
  const results = searchAll(query);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(t);
  }, [open]);

  const statusText = !query.trim()
    ? "Enter a search term. Popular suggestions are shown below."
    : results.length === 0
      ? `No results for ${query}.`
      : `${results.length} result${results.length === 1 ? "" : "s"} available.`;

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent
        className="p-0"
        showClose
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        <div className="flex items-center gap-s3 border-b border-border px-s4 py-s3 pr-12">
          <IconSearch className="text-ocean" aria-hidden="true" />
          <DialogTitle className="sr-only">Site search</DialogTitle>
          <DialogDescription className="sr-only" id={statusId}>
            {statusText}
          </DialogDescription>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                onClose();
                router.push(`/search?q=${encodeURIComponent(query.trim())}`);
              }
            }}
            placeholder="Search doctors, conditions, programs…"
            className="min-w-0 flex-1 border-0 bg-transparent text-md font-light text-text outline-none placeholder:text-text-ghost"
            aria-label="Search the site"
            aria-describedby={statusId}
            autoComplete="off"
          />
        </div>

        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {statusText}
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-s2">
          {!query.trim() ? (
            <div className="px-s4 py-s5">
              <p className="mb-s3 text-xs font-extrabold uppercase tracking-[0.08em] text-text-meta">
                Popular searches
              </p>
              <div className="flex flex-wrap gap-s2">
                {["Epilepsy", "Find a doctor", "Heart", "Emergency"].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      className="rounded-sm border border-border bg-surface px-3 py-1.5 text-sm font-bold text-blue hover:border-ocean hover:bg-white"
                      onClick={() => setQuery(term)}
                    >
                      {term}
                    </button>
                  ),
                )}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="px-s4 py-s6 text-base text-text-meta" role="status">
              No results for “{query}”. Try a specialty, doctor name, or
              condition.
            </p>
          ) : (
            <ul className="flex flex-col" aria-label="Search results">
              {results.slice(0, 8).map((result) => (
                <li key={result.id}>
                  <Link
                    href={result.href}
                    onClick={onClose}
                    className="flex items-start gap-s3 rounded-sm px-s4 py-s3 no-underline transition-colors hover:bg-surface"
                  >
                    <span
                      className={cn(
                        "mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                        result.type === "doctor" && "bg-ocean/10 text-ocean",
                        result.type === "condition" && "bg-blue/10 text-blue",
                        result.type === "program" &&
                          "bg-green/12 text-success-text",
                        result.type === "location" && "bg-bay/15 text-bay",
                        result.type === "trial" && "bg-indigo/15 text-indigo",
                        result.type === "page" && "bg-surface-2 text-text-meta",
                      )}
                    >
                      {typeLabel[result.type]}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base font-bold text-text">
                        {result.title}
                      </span>
                      <span className="mt-0.5 line-clamp-2 block text-sm font-light text-text-body">
                        {result.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {query.trim() ? (
          <div className="border-t border-border px-s4 py-s3">
            <Link
              href={`/search?q=${encodeURIComponent(query.trim())}`}
              onClick={onClose}
              className="text-sm font-bold text-ocean no-underline hover:underline"
            >
              View all results for “{query.trim()}”
            </Link>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
