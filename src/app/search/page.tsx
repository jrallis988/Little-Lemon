import type { Metadata } from "next";
import Link from "next/link";
import { DrugSearch } from "@/components/search/drug-search";
import { RequestMedicationForm } from "@/components/coverage/request-medication-form";
import { MedicationBrowser } from "@/components/coverage/medication-browser";
import { ReportIssueButton } from "@/components/support/report-issue-button";
import { listIncludedMedications, searchCoverage } from "@/lib/coverage";

export const metadata: Metadata = {
  title: "See if your medication is included",
  description:
    "Search or browse medications currently included in TrumpRx. Only select medications have a savings option.",
};

interface SearchPageProps {
  searchParams: Promise<{ drug?: string; q?: string; letter?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const included = await listIncludedMedications();
  const coverage = await searchCoverage({
    drugId: params.drug,
    query: params.q,
  });

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Coverage check
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
            See if your medication is included
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            TrumpRx provides lower-cost options for select medications — not
            every prescription. Search below or browse all currently included
            medications.
          </p>
          <div className="mt-4 max-w-2xl">
            <DrugSearch
              size="compact"
              initialQuery={
                coverage.status === "included"
                  ? coverage.drug.genericName
                  : params.q ?? ""
              }
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        {coverage.status === "included" && (
          <section className="rounded-lg border border-border bg-card p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-savings">
              Included in TrumpRx
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold uppercase tracking-tight">
              {coverage.drug.brandName}
            </h2>
            <p className="text-sm text-muted-foreground">
              Generic: {coverage.drug.genericName} ·{" "}
              {coverage.drug.therapeuticClass}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={`/drugs/${coverage.drug.id}`}
                className="inline-flex min-h-10 items-center bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                View medication details
              </Link>
              <Link
                href={`/access?drug=${coverage.drug.id}`}
                className="inline-flex min-h-10 items-center border border-border px-4 text-sm font-medium hover:bg-muted"
              >
                Get this price
              </Link>
              <ReportIssueButton drugId={coverage.drug.id} />
            </div>
          </section>
        )}

        {coverage.status === "not_included" && (
          <section className="rounded-lg border border-border bg-card p-4 sm:p-5">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-tight">
              We don’t currently have a TrumpRx savings option for “
              {coverage.query}”.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              TrumpRx currently provides pricing programs for select
              medications. This is not an error — it means this medication is
              outside the current program scope.
            </p>
            <div className="mt-5 grid gap-6 lg:grid-cols-2">
              <RequestMedicationForm initialName={coverage.query} />
              <div>
                <p className="text-sm font-semibold">Browse included medications</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {included.length} medications are currently listed.
                </p>
                <Link
                  href="/medications"
                  className="mt-3 inline-flex text-sm font-medium text-primary underline-offset-2 hover:underline"
                >
                  Open full A–Z list
                </Link>
              </div>
            </div>
          </section>
        )}

        {coverage.status === "browse" && (
          <p className="text-sm text-muted-foreground">
            Search a medication name, or browse the A–Z list of currently
            included medications below.
          </p>
        )}

        <MedicationBrowser
          medications={included}
          initialLetter={params.letter ?? "all"}
        />
      </div>
    </div>
  );
}
