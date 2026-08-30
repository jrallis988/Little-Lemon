import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getProgramMeta, isIncludedMedication } from "@/lib/program-catalog";
import { getLaunchFeatures } from "@/lib/launch-mode";
import { getDrugById } from "@/lib/pricing-service";
import { AccessPathwayClient } from "@/components/access/access-pathway-client";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "See how to get this option",
  description:
    "Confirm eligibility and follow the TrumpRx pharmacy pickup access pathway for included medications.",
};

interface PageProps {
  searchParams: Promise<{ drug?: string; path?: string }>;
}

export default async function AccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const drugId = params.drug;
  const included = drugId ? isIncludedMedication(drugId) : false;
  const drug = included && drugId ? await getDrugById(drugId) : null;
  const program = drug ? getProgramMeta(drug.id) : null;
  const features = getLaunchFeatures();

  if (!drug || !program) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">
          See how to get this option
        </h1>
        <p className="mt-2 text-muted-foreground">
          First confirm whether your medication is included, then follow the
          pharmacy pickup pathway.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/search"
            className={cn(buttonVariants({ size: "lg" }), "min-h-11 gap-1.5")}
          >
            See if your medication is included
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/medications"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-h-11"
            )}
          >
            Browse included medications
          </Link>
        </div>
      </div>
    );
  }

  const preferred =
    features.manufacturerPathway && params.path === "manufacturer"
      ? "manufacturer"
      : "pharmacy";

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Access pathway
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold uppercase tracking-tight">
            See how to get this option
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            TrumpRx does not sell or dispense {drug.genericName}. You will work
            with a participating pharmacy
            {features.manufacturerPathway
              ? " or the manufacturer program"
              : ""}{" "}
            — we show you which path applies and what to do next. Confirm the
            final price at fill.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <AccessPathwayClient
          drugId={drug.id}
          brandName={drug.brandName}
          genericName={drug.genericName}
          preferred={preferred}
          fulfillmentLabel={program.fulfillment.label}
          steps={program.fulfillment.steps}
          allowManufacturerPathway={features.manufacturerPathway}
        />
      </div>
    </div>
  );
}
