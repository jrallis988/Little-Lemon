"use client";

import { Suspense } from "react";

import { SearchResults } from "@/components/search/search-results";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground sm:px-6">
          Loading search…
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
