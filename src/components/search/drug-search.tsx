"use client";

import { useEffect, useId, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { DrugSearchSuggestion } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DrugSearchProps {
  initialQuery?: string;
  size?: "hero" | "compact";
  className?: string;
  autoFocus?: boolean;
}

export function DrugSearch({
  initialQuery = "",
  size = "hero",
  className,
  autoFocus = false,
}: DrugSearchProps) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<DrugSearchSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (query.trim().length < 1) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    const handle = window.setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/drugs?q=${encodeURIComponent(query)}&limit=7`,
          { signal: controller.signal }
        );
        if (!res.ok) return;
        const data = (await res.json()) as { results: DrugSearchSuggestion[] };
        setSuggestions(data.results);
        setOpen(true);
        setActiveIndex(-1);
      } catch {
        /* aborted or network */
      }
    }, 120);
    return () => {
      controller.abort();
      window.clearTimeout(handle);
    };
  }, [query]);

  function navigateToDrug(drugId: string) {
    setOpen(false);
    startTransition(() => {
      router.push(`/search?drug=${encodeURIComponent(drugId)}`);
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      navigateToDrug(suggestions[activeIndex].drug.id);
      return;
    }
    if (suggestions[0]) {
      navigateToDrug(suggestions[0].drug.id);
      return;
    }
    if (query.trim()) {
      startTransition(() => {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      });
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const isHero = size === "hero";

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className={cn("relative w-full", className)}
      aria-label="Search medications"
    >
      <Label htmlFor="drug-search" className="sr-only">
        Medication name, dosage, or brand
      </Label>
      <div
        className={cn(
          "flex items-stretch overflow-hidden border bg-card shadow-[0_12px_40px_-12px_rgba(8,24,48,0.45)] transition-shadow focus-within:ring-3 focus-within:ring-ring/40",
          isHero ? "border-transparent" : "border-border shadow-sm"
        )}
      >
        <div className="relative flex flex-1 items-center">
          <Search
            className={cn(
              "pointer-events-none absolute left-3.5 text-muted-foreground",
              isHero ? "size-5" : "size-4"
            )}
            aria-hidden
          />
          <Input
            id="drug-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim() && setOpen(true)}
            onBlur={() => {
              window.setTimeout(() => setOpen(false), 150);
            }}
            onKeyDown={onKeyDown}
            autoFocus={autoFocus}
            autoComplete="off"
            spellCheck={false}
            placeholder="Search Lipitor, metformin, inhaler…"
            aria-autocomplete="list"
            aria-controls={listId}
            aria-expanded={open && suggestions.length > 0}
            aria-activedescendant={
              activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined
            }
            role="combobox"
            className={cn(
              "h-auto flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0",
              isHero
                ? "py-4 pl-12 pr-3 text-lg md:text-xl"
                : "py-2.5 pl-10 pr-3 text-base"
            )}
          />
        </div>
        <Button
          type="submit"
          size={isHero ? "lg" : "default"}
          disabled={pending}
          className={cn(
            "m-1.5 rounded-md px-5 text-base font-semibold",
            isHero && "h-12 min-w-[7.5rem] px-6 text-lg"
          )}
        >
          {pending ? (
            <Loader2 className="size-5 animate-spin" aria-hidden />
          ) : (
            "Search"
          )}
        </Button>
      </div>

      {open && suggestions.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Medication suggestions"
          className="absolute z-30 mt-2 max-h-80 w-full overflow-auto rounded-xl border border-border bg-popover p-1.5 shadow-lg animate-trx-fade-up"
        >
          {suggestions.map((s, index) => (
            <li key={`${s.drug.id}-${s.matchType}`} role="presentation">
              <button
                type="button"
                id={`${listId}-opt-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                className={cn(
                  "flex w-full flex-col items-start rounded-lg px-3 py-2.5 text-left transition-colors",
                  index === activeIndex
                    ? "bg-secondary text-secondary-foreground"
                    : "hover:bg-muted"
                )}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => navigateToDrug(s.drug.id)}
              >
                <span className="text-base font-semibold">{s.matchedLabel}</span>
                <span className="text-sm text-muted-foreground">
                  {s.drug.therapeuticClass}
                  {s.matchType === "generic" ? " · Generic available" : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
