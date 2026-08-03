"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { IconSearch } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type HeaderSearchProps = {
  variant?: "desktop" | "mobile";
};

export function HeaderSearch({ variant = "desktop" }: HeaderSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputId =
    variant === "mobile" ? "header-search-mobile" : "header-search";

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = query.trim();
    router.push(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "min-w-0",
        variant === "desktop" && "hidden w-full max-w-md flex-1 xl:block",
        variant === "mobile" && "block w-full",
      )}
      role="search"
      aria-label="Site search"
    >
      <label htmlFor={inputId} className="sr-only">
        Search doctors, conditions, or programs
      </label>
      <div className="flex w-full items-stretch overflow-hidden rounded-sm border border-white/30 bg-white/10 shadow-sm focus-within:border-white focus-within:ring-2 focus-within:ring-white/35">
        <div className="flex min-w-0 flex-1 items-center gap-2 px-2.5">
          <IconSearch className="h-4 w-4 shrink-0 text-white/75" />
          <input
            id={inputId}
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
