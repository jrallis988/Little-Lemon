import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SearchPageClient } from "@/components/search/SearchPageClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search doctors, conditions, and programs at Boston Children's Hospital.",
};

export default function SearchPage() {
  return (
    <>
      <PageHero
        id="search-heading"
        eyebrow="Site search"
        title="Search"
        lead="Find doctors, conditions, clinical programs, and key pages across Boston Children's."
      />
      <Suspense fallback={<div className="wrap py-s8 text-text-meta">Loading search…</div>}>
        <SearchPageClient />
      </Suspense>
    </>
  );
}
