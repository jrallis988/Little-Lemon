import type { Metadata } from "next";
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
    <div className="trx-atmosphere min-h-[70dvh]">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        <div className="max-w-2xl">
          <DrugSearch
            size="compact"
            initialQuery={
              drug
                ? `${drug.genericName}`
                : params.q ?? ""
            }
          />
        </div>

        {drug ? (
          <PricingMatrix drug={drug} />
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card/80 px-6 py-16 text-center">
            <h1 className="font-display text-2xl font-semibold">
              {params.q
                ? `No exact match for “${params.q}”`
                : "Search a medication to see prices"}
            </h1>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Start typing a brand or generic name. Popular options include
              atorvastatin, metformin, and lisinopril.
            </p>
            <p className="mt-6 text-sm">
              Or browse{" "}
              <Link href="/pharmacies" className="font-medium text-primary underline-offset-2 hover:underline">
                nearby pharmacies
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
