import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FulfillmentProfile } from "@/lib/program-catalog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FulfillmentSectionProps {
  drugId: string;
  fulfillment: FulfillmentProfile;
}

export function FulfillmentSection({
  drugId,
  fulfillment,
}: FulfillmentSectionProps) {
  const accessHref =
    fulfillment.path === "pharmacy_pickup"
      ? `/access?drug=${drugId}&path=pharmacy`
      : fulfillment.path === "manufacturer_direct" ||
          fulfillment.path === "specialty"
        ? `/access?drug=${drugId}&path=manufacturer`
        : `/access?drug=${drugId}&path=program`;

  return (
    <section
      aria-labelledby="fulfillment-heading"
      className="rounded-lg border border-border bg-card p-4 sm:p-5"
    >
      <h2
        id="fulfillment-heading"
        className="font-display text-xl font-semibold uppercase tracking-tight"
      >
        How can I get it?
      </h2>
      <p className="mt-1 text-sm font-medium text-primary">
        {fulfillment.label}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{fulfillment.summary}</p>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-semibold">Where do I get this medication?</dt>
          <dd className="mt-0.5 text-muted-foreground">
            {fulfillment.whereToGetIt}
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Can I use my existing pharmacy?</dt>
          <dd className="mt-0.5 text-muted-foreground">
            {fulfillment.canUseExistingPharmacy}
          </dd>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="font-semibold">Can I use CVS?</dt>
            <dd className="mt-0.5 text-muted-foreground">{fulfillment.cvs}</dd>
          </div>
          <div>
            <dt className="font-semibold">Can I use Walgreens?</dt>
            <dd className="mt-0.5 text-muted-foreground">
              {fulfillment.walgreens}
            </dd>
          </div>
        </div>
        <div>
          <dt className="font-semibold">Is it shipped?</dt>
          <dd className="mt-0.5 text-muted-foreground">
            {fulfillment.shipped
              ? `Yes. ${fulfillment.whoShips ?? "A program partner ships it."}`
              : "No — this path is typically pharmacy pickup."}
          </dd>
        </div>
        {fulfillment.shipped && (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="font-semibold">Typical delivery</dt>
                <dd className="mt-0.5 text-muted-foreground">
                  {fulfillment.typicalDelivery ?? "Varies by program"}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Expedited shipping</dt>
                <dd className="mt-0.5 text-muted-foreground">
                  {fulfillment.expeditedAvailable ??
                    "Depends on the fulfilling organization"}
                </dd>
              </div>
            </div>
            <div>
              <dt className="font-semibold">Delivery problems</dt>
              <dd className="mt-0.5 text-muted-foreground">
                {fulfillment.deliveryProblemsContact}
              </dd>
            </div>
          </>
        )}
      </dl>

      <ol className="mt-4 space-y-2 border-t border-border pt-4">
        {fulfillment.steps.map((step, i) => (
          <li key={step} className="flex gap-3 text-sm">
            <span className="font-display text-sm font-semibold text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <Link
        href={accessHref}
        className={cn(
          buttonVariants({ size: "lg" }),
          "mt-5 inline-flex min-h-11 gap-1.5"
        )}
      >
        Get this price
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </section>
  );
}
