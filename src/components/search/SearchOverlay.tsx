"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IconClose, IconSearch } from "@/components/ui/Icons";
import { searchAll, type SearchResult } from "@/lib/data/search";
import { cn } from "@/lib/cn";

const typeLabel: Record<SearchResult["type"], string> = {
  doctor: "Doctor",
  condition: "Condition",
  program: "Program",
  page: "Page",
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
  const titleId = useId();
  const [query, setQuery] = useState("");
  const results = searchAll(query);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[900] flex items-start justify-center bg-[rgba(10,15,35,.72)] px-4 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[640px] animate-fade-down overflow-hidden rounded-lg border border-border bg-white shadow-lg">
        <div className="flex items-center gap-s3 border-b border-border px-s4 py-s3">
          <IconSearch className="text-ocean" />
          <h2 id={titleId} className="sr-only">
            Site search
          </h2>
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
          />
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-sm text-text-meta hover:bg-surface"
            aria-label="Close search"
          >
            <IconClose className="h-4 w-4" />
          </button>
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
            <p className="px-s4 py-s6 text-base text-text-meta">
              No results for “{query}”. Try a specialty, doctor name, or
              condition.
            </p>
          ) : (
            <ul className="flex flex-col">
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
                        result.type === "program" && "bg-green/12 text-success-text",
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
      </div>
    </div>
  );
}
