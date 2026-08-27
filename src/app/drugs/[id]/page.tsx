import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CompareWithPharmacy } from "@/components/medication/compare-with-pharmacy";
import { EligibilitySection } from "@/components/medication/eligibility-section";
import { FulfillmentSection } from "@/components/medication/fulfillment-section";
import { ReportIssueButton } from "@/components/support/report-issue-button";
import {
  getProgramMeta,
  isIncludedMedication,
  PRODUCT_TYPE_LABEL,
} from "@/lib/program-catalog";
import { getLaunchFeatures, isLimitedV1Launch } from "@/lib/launch-mode";
import { formatCurrency } from "@/lib/pricing";
import { getDrugById } from "@/lib/pricing-service";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const drugs = await prisma.drug.findMany({ select: { id: true } });
  if (isLimitedV1Launch()) {
    return drugs
      .filter((d) => isIncludedMedication(d.id))
      .map(({ id }) => ({ id }));
  }
  return drugs.map(({ id }) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  if (!isIncludedMedication(id)) {
    return { title: "Medication not included" };
  }
  const drug = await getDrugById(id);
  if (!drug) return { title: "Medication" };
  return {
    title: `${drug.brandName} (${drug.genericName}) — TrumpRx option`,
    description: `See whether a TrumpRx savings option is available for ${drug.brandName}, compare costs, review eligibility, and learn how to access it.`,
  };
}

export default async function DrugDetailPage({ params }: PageProps) {
  const { id } = await params;
  if (!isIncludedMedication(id)) {
    redirect(`/search?q=${encodeURIComponent(id)}`);
  }
  const drug = await getDrugById(id);
  if (!drug) notFound();

  const program = getProgramMeta(drug.id);
  const features = getLaunchFeatures();
  const forms = Array.from(new Set(drug.strengths.map((s) => s.form)));

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Included medication
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold uppercase tracking-tight md:text-4xl">
            {drug.brandName}
          </h1>
          <p className="mt-1 text-base text-muted-foreground">
            Generic name: <span className="text-foreground">{drug.genericName}</span>
            {program ? (
              <>
                {" "}
                · Manufacturer:{" "}
                <span className="text-foreground">{program.manufacturer}</span>
              </>
            ) : null}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {program && (
              <span className="inline-flex items-center border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {PRODUCT_TYPE_LABEL[program.productType]}
              </span>
            )}
            <span className="inline-flex items-center border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {drug.therapeuticClass}
            </span>
            {forms.map((f) => (
              <span
                key={f}
                className="inline-flex items-center border border-border bg-card px-2.5 py-1 text-xs font-medium capitalize text-muted-foreground"
              >
                {f}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={`/access?drug=${drug.id}`}
              className={cn(buttonVariants({ size: "lg" }), "min-h-11 gap-1.5")}
            >
              Get this price
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href={`/pharmacies?drug=${drug.id}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-h-11"
              )}
            >
              Find participating pharmacies
            </Link>
            <ReportIssueButton drugId={drug.id} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6 sm:py-8">
        <section className="rounded-lg border border-border bg-card p-4 sm:p-5">
          <h2 className="font-display text-xl font-semibold uppercase tracking-tight">
            What am I actually receiving?
          </h2>
          {program ? (
            <>
              <p className="mt-2 text-base font-semibold">
                {program.receivingLabel}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {program.receivingDetail}
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Program details are unavailable for this record.
            </p>
          )}
          <div className="mt-4">
            <h3 className="text-sm font-semibold">Dosage options</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {drug.strengths.map((s) => (
                <li
                  key={s.id}
                  className="border border-border bg-surface px-2.5 py-1.5 text-sm font-medium"
                >
                  {s.label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {program && (
          <>
            <section className="rounded-lg border border-border bg-card p-4 sm:p-5">
              <h2 className="font-display text-xl font-semibold uppercase tracking-tight">
                TrumpRx price
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {features.livePharmacyPricing
                  ? "Program cash option for a common 30-day fill. Confirm at the pharmacy before you fill."
                  : "Program price for a common 30-day fill. Live per-pharmacy quotes are not enabled — confirm final price at the counter."}
              </p>
              <p className="mt-3 font-display text-4xl font-semibold tabular-nums text-primary">
                {formatCurrency(program.programPrice30)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Estimated cash retail without program:{" "}
                {formatCurrency(drug.retailCashPrice30)} (30-day)
              </p>
            </section>

            <CompareWithPharmacy
              medicationLabel={`${drug.brandName} (${drug.genericName})`}
              trumpRxPrice={program.programPrice30}
              suggestedRetail={drug.retailCashPrice30}
              livePharmacyPricing={features.livePharmacyPricing}
            />

            <EligibilitySection eligibility={program.eligibility} />

            <FulfillmentSection
              drugId={drug.id}
              fulfillment={program.fulfillment}
            />
          </>
        )}
      </div>
    </div>
  );
}
