import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getProgramMeta } from "@/lib/program-catalog";
import { getDrugById } from "@/lib/pricing-service";
import { AccessPathwayClient } from "@/components/access/access-pathway-client";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Get this price",
  description:
    "Confirm eligibility and follow the correct TrumpRx access pathway — pharmacy program information or manufacturer-direct enrollment.",
};

interface PageProps {
  searchParams: Promise<{ drug?: string; path?: string }>;
}

export default async function AccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const drug = params.drug ? await getDrugById(params.drug) : null;
  const program = drug ? getProgramMeta(drug.id) : null;

  if (!drug || !program) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">
          Get this price
        </h1>
        <p className="mt-2 text-muted-foreground">
          First confirm whether your medication is included, then choose how to
          access the savings option.
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
    params.path === "manufacturer"
      ? "manufacturer"
      : params.path === "pharmacy"
        ? "pharmacy"
        : program.fulfillment.path === "pharmacy_pickup"
          ? "pharmacy"
          : "manufacturer";

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Access pathway
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold uppercase tracking-tight">
            Get this price
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            TrumpRx does not sell or dispense {drug.brandName}. You will work
            with a participating pharmacy or the manufacturer program — we show
            you which path applies and what to do next.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <AccessPathwayClient
          drugId={drug.id}
          brandName={drug.brandName}
          genericName={drug.genericName}
          preferred={preferred}
          fulfillmentPath={program.fulfillment.path}
          fulfillmentLabel={program.fulfillment.label}
          steps={program.fulfillment.steps}
        />
      </div>
    </div>
  );
}
