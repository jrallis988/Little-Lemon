import type { Metadata } from "next";
import Image from "next/image";
import { DrugSearch } from "@/components/search/drug-search";
import { PricingMatrix } from "@/components/pricing/pricing-matrix";
import { EmptyState } from "@/components/design/empty-state";
import { getDrugById } from "@/lib/data/drugs";
import { searchDrugs } from "@/lib/pricing";
import { SearchX } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare prescription prices",
  description:
    "Search medications and compare Trump RX coupon prices across nearby pharmacies.",
};

interface SearchPageProps {
  searchParams: Promise<{ drug?: string; q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const drugFromId = params.drug ? getDrugById(params.drug) : undefined;
  const drugFromQuery =
    !drugFromId && params.q ? searchDrugs(params.q, 1)[0]?.drug : undefined;
  const drug = drugFromId ?? drugFromQuery;

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="relative isolate overflow-hidden border-b border-border">
        <Image
          src="/images/prescription-bottle.webp"
          alt=""
          fill
          className="object-cover object-center opacity-30"
          sizes="100vw"
          priority={!drug}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/70" />
        <div className="relative mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-5">
          <div className="max-w-2xl">
            <DrugSearch
              size="compact"
              initialQuery={drug ? `${drug.genericName}` : params.q ?? ""}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-4 px-4 py-4 sm:px-6 sm:py-5">
        {drug ? (
          <PricingMatrix drug={drug} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr] sm:items-stretch">
            <EmptyState
              icon={SearchX}
              title={
                params.q
                  ? `No exact match for “${params.q}”`
                  : "Start with a medication name"
              }
              description="Try atorvastatin, metformin, Ozempic, or Wegovy — or browse nearby pharmacies."
              actionHref="/pharmacies"
              actionLabel="Find pharmacies"
              secondaryHref="/help"
              secondaryLabel="How coupons work"
              className="h-full"
            />
            <div className="relative min-h-52 overflow-hidden rounded-2xl ring-1 ring-border">
              <Image
                src="/images/step-search.webp"
                alt="Prescription bottles ready for price comparison"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 40vw"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
