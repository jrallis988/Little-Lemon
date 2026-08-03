"use client";

import {
  FormEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { IconClose, IconSearch } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type HeaderSearchProps = {
  /** Always-open form for the mobile menu drawer */
  variant?: "desktop" | "mobile";
};

/**
 * Desktop: compact search icon that expands an input on click.
 * Mobile drawer: full-width form (no icon toggle needed).
 */
export function HeaderSearch({ variant = "desktop" }: HeaderSearchProps) {
  const router = useRouter();
  const inputId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = query.trim();
    router.push(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
    setOpen(false);
  }

  function close() {
    setOpen(false);
  }

  useEffect(() => {
    if (!open || variant !== "desktop") return;
    inputRef.current?.focus();

    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, variant]);

  if (variant === "mobile") {
    return (
      <form
        onSubmit={onSubmit}
        className="w-full"
        role="search"
        aria-label="Site search"
      >
        <label htmlFor={`${inputId}-mobile`} className="sr-only">
          Search doctors, conditions, or programs
        </label>
        <div className="flex w-full items-stretch overflow-hidden rounded-sm border border-white/30 bg-white/10">
          <div className="flex min-w-0 flex-1 items-center gap-2 px-2.5">
            <IconSearch className="h-4 w-4 shrink-0 text-white/75" />
            <input
              id={`${inputId}-mobile`}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search doctors, conditions, or programs"
              className="w-full min-w-0 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/60"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 bg-pink px-3.5 py-2 text-sm font-bold text-white transition-colors hover:bg-pink-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Search
          </button>
        </div>
      </form>
    );
  }

  return (
    <div ref={rootRef} className="relative flex items-center">
      {open ? (
        <form
          onSubmit={onSubmit}
          role="search"
          aria-label="Site search"
          className="flex items-stretch overflow-hidden rounded-sm border border-white/35 bg-white/10 shadow-sm animate-fade-down"
        >
          <label htmlFor={inputId} className="sr-only">
            Search doctors, conditions, or programs
          </label>
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search…"
            className="w-[min(52vw,220px)] bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/60 sm:w-[240px]"
          />
          <button
            type="submit"
            className="shrink-0 bg-pink px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-pink-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Search
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-2.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close search"
            onClick={close}
          >
            <IconClose className="h-4 w-4" />
          </button>
        </form>
      ) : (
        <button
          type="button"
          className={cn(
            "inline-flex h-10 items-center gap-1.5 rounded-sm px-2.5 text-[12.5px] font-bold tracking-[0.01em] text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
          )}
          aria-expanded={false}
          aria-haspopup="dialog"
          aria-label="Open search"
          onClick={() => setOpen(true)}
        >
          <IconSearch className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
        </button>
      )}
    </div>
  );
}
