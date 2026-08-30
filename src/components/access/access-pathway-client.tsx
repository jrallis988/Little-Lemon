"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ReportIssueButton } from "@/components/support/report-issue-button";
import { cn } from "@/lib/utils";

interface AccessPathwayClientProps {
  drugId: string;
  brandName: string;
  genericName: string;
  preferred: "pharmacy" | "manufacturer";
  fulfillmentLabel: string;
  steps: string[];
  allowManufacturerPathway: boolean;
}

export function AccessPathwayClient({
  drugId,
  brandName,
  genericName,
  preferred,
  fulfillmentLabel,
  steps,
  allowManufacturerPathway,
}: AccessPathwayClientProps) {
  const [path, setPath] = useState<"pharmacy" | "manufacturer">(
    allowManufacturerPathway ? preferred : "pharmacy"
  );
  const [confirmedEligibility, setConfirmedEligibility] = useState(false);

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-border bg-card p-4 sm:p-5">
          <h2 className="font-display text-lg font-semibold uppercase tracking-tight">
            {genericName}{" "}
            <span className="font-sans text-base font-normal normal-case text-muted-foreground">
              {brandName.toLowerCase() !== genericName.toLowerCase()
                ? `(generic for ${brandName})`
                : "generic"}
            </span>
          </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pathway: {fulfillmentLabel}
        </p>

        {allowManufacturerPathway ? (
          <fieldset className="mt-4 space-y-2">
            <legend className="text-sm font-semibold">
              Choose how you access it
            </legend>
            <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border px-3 py-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <input
                type="radio"
                name="access-path"
                checked={path === "pharmacy"}
                onChange={() => setPath("pharmacy")}
                className="mt-1"
              />
              <span>
                <span className="block text-sm font-semibold">
                  Option A — Use at your pharmacy
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  Confirm eligibility → get program information → choose a
                  participating pharmacy → present at the counter → fill.
                </span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border px-3 py-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <input
                type="radio"
                name="access-path"
                checked={path === "manufacturer"}
                onChange={() => setPath("manufacturer")}
                className="mt-1"
              />
              <span>
                <span className="block text-sm font-semibold">
                  Option B — Manufacturer direct
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  Review eligibility → continue to manufacturer → complete their
                  enrollment/order → they handle payment and fulfillment.
                </span>
              </span>
            </label>
          </fieldset>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            v1 launch: pharmacy pickup only. Get program information, choose a
            participating pharmacy, and fill with your prescription.
          </p>
        )}
      </section>

      <section className="rounded-lg border border-border bg-card p-4 sm:p-5">
        <h2 className="font-display text-lg font-semibold uppercase tracking-tight">
          Clear next steps
        </h2>
        <label className="mt-3 flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={confirmedEligibility}
            onChange={(e) => setConfirmedEligibility(e.target.checked)}
            className="mt-0.5"
          />
          <span>
            I reviewed the eligibility &amp; insurance notes for this medication
            and understand TrumpRx does not make the final eligibility decision.
          </span>
        </label>

        <ol className="mt-4 space-y-2">
          {(path === "pharmacy" || !allowManufacturerPathway
            ? [
                "Confirm eligibility notes on the medication page",
                "Get program information for the counter",
                "Choose a participating pharmacy",
                "Present information at the pharmacy with your prescription",
                "Fill — payment happens at the pharmacy, not on TrumpRx",
              ]
            : [
                "Review eligibility notes on the medication page",
                "Continue to the manufacturer program",
                "Complete manufacturer enrollment / order",
                "Manufacturer (or partner) handles payment and fulfillment",
              ]
          ).map((step, i) => (
            <li key={step} className="flex gap-3 text-sm">
              <span className="font-display font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-5 flex flex-wrap gap-2">
          {path === "pharmacy" || !allowManufacturerPathway ? (
            <>
              <Link
                href={`/pharmacies?drug=${drugId}`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "min-h-11 gap-1.5",
                  !confirmedEligibility && "pointer-events-none opacity-50"
                )}
                aria-disabled={!confirmedEligibility}
              >
                Get program information
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/pharmacies"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "min-h-11"
                )}
              >
                Find participating pharmacies
              </Link>
            </>
          ) : (
            <Link
              href={`/drugs/${drugId}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-h-11 gap-1.5",
                !confirmedEligibility && "pointer-events-none opacity-50"
              )}
              aria-disabled={!confirmedEligibility}
            >
              Continue to manufacturer pathway details
              <ArrowRight className="size-4" />
            </Link>
          )}
          <ReportIssueButton drugId={drugId} />
        </div>

        {confirmedEligibility && (
          <p className="mt-4 flex items-start gap-2 text-sm text-savings">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
            You confirmed you reviewed eligibility. You are dealing with{" "}
            {path === "pharmacy" || !allowManufacturerPathway
              ? "a participating pharmacy"
              : "the manufacturer program"}
            — not buying from TrumpRx.
          </p>
        )}

        <p className="mt-4 text-xs text-muted-foreground">
          Program steps (reference): {steps.join(" → ")}
        </p>
      </section>
    </div>
  );
}
