import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DrugSearch } from "@/components/search/drug-search";
import { PricingMatrix } from "@/components/pricing/pricing-matrix";
import { getDrugById } from "@/lib/data/drugs";
import { searchDrugs } from "@/lib/pricing";

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
        <div className="relative mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
          <div className="max-w-2xl">
            <DrugSearch
              size="compact"
              initialQuery={drug ? `${drug.genericName}` : params.q ?? ""}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-5 px-4 py-5 sm:px-6 sm:py-6">
        {drug ? (
          <PricingMatrix drug={drug} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr] sm:items-stretch">
            <div className="rounded-2xl border border-dashed border-border bg-surface px-5 py-8">
              <h2 className="font-display text-xl font-semibold">
                {params.q
                  ? `No exact match for “${params.q}”`
                  : "Start with a medication name"}
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Try atorvastatin, metformin, or lisinopril — or browse{" "}
                <Link
                  href="/pharmacies"
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  nearby pharmacies
                </Link>
                .
              </p>
            </div>
            <div className="relative min-h-48 overflow-hidden rounded-2xl ring-1 ring-border">
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
