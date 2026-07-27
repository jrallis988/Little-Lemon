"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Clock, MapPin, Phone, Star, MapPinOff } from "lucide-react";
import { getPharmacyById, CHAIN_LABELS } from "@/lib/data/pharmacies";
import { getDrugById } from "@/lib/data/drugs";
import {
  formatCurrency,
  generateOffersForDrug,
  withDistances,
} from "@/lib/pricing";
import { useLocationStore } from "@/lib/store/location-store";
import { useProfileStore } from "@/lib/store/profile-store";
import { ChainMark } from "@/components/pharmacy/chain-mark";
import { CouponModal } from "@/components/coupon/coupon-modal";
import { TrustCallout } from "@/components/design/trust-callout";
import { EmptyState } from "@/components/design/empty-state";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PharmacyPriceOffer } from "@/lib/types";

export default function PharmacyDetailPage() {
  const params = useParams<{ id: string }>();
  const location = useLocationStore((s) => s.location);
  const preferred = useProfileStore((s) => s.preferredPharmacyIds);
  const togglePreferred = useProfileStore((s) => s.togglePreferredPharmacy);
  const [offer, setOffer] = useState<PharmacyPriceOffer | null>(null);

  const pharmacyBase = getPharmacyById(params.id);
  const sampleDrug = getDrugById("atorvastatin")!;

  const pharmacy = useMemo(() => {
    if (!pharmacyBase) return null;
    return withDistances([pharmacyBase], location)[0] ?? null;
  }, [pharmacyBase, location]);

  const sampleOffer = useMemo(() => {
    if (!pharmacy) return null;
    return generateOffersForDrug(
      sampleDrug,
      {
        strengthId: sampleDrug.strengths[1]?.id ?? sampleDrug.strengths[0].id,
        quantity: 30,
        supplyDays: 30,
      },
      location
    ).find((r) => r.pharmacy.id === pharmacy.id);
  }, [pharmacy, sampleDrug, location]);

  if (!pharmacyBase || !pharmacy) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <EmptyState
          icon={MapPinOff}
          title="Pharmacy not found"
          description="That pharmacy ID isn’t in our demo directory."
          actionHref="/pharmacies"
          actionLabel="Browse pharmacies"
        />
      </div>
    );
  }

  const isPreferred = preferred.includes(pharmacy.id);

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="relative isolate overflow-hidden border-b border-border">
        <Image
          src="/images/pharmacy-aisle.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/45" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-4 px-4 py-7 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div className="flex items-start gap-3">
            <ChainMark chain={pharmacy.chain} className="size-12 text-xs" />
            <div>
              <p className="text-sm font-medium text-primary">
                {CHAIN_LABELS[pharmacy.chain]}
              </p>
              <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {pharmacy.name}
              </h1>
              <p className="mt-1 text-muted-foreground">
                {pharmacy.address}, {pharmacy.city}, {pharmacy.state}{" "}
                {pharmacy.zip}
                {typeof pharmacy.distanceMiles === "number" &&
                  ` · ${pharmacy.distanceMiles.toFixed(1)} mi`}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={isPreferred ? "secondary" : "outline"}
              className="min-h-11"
              onClick={() => togglePreferred(pharmacy.id)}
              aria-pressed={isPreferred}
            >
              <Star className={cn(isPreferred && "fill-current")} />
              {isPreferred ? "Preferred" : "Save pharmacy"}
            </Button>
            {sampleOffer && (
              <Button
                className="min-h-11"
                onClick={() => setOffer(sampleOffer.offer)}
              >
                Show sample coupon
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          <section className="rounded-2xl border border-border bg-card p-4">
            <h2 className="font-display text-xl font-semibold">Store details</h2>
            <ul className="mt-3 space-y-2.5 text-sm sm:text-base">
              <li className="flex gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>
                  Weekdays {pharmacy.hours.weekday}
                  <br />
                  Saturday {pharmacy.hours.saturday}
                  <br />
                  Sunday {pharmacy.hours.sunday}
                </span>
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <a
                  href={`tel:${pharmacy.phone.replace(/\D/g, "")}`}
                  className="font-medium underline-offset-2 hover:underline"
                >
                  {pharmacy.phone}
                </a>
              </li>
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>
                  {pharmacy.address}, {pharmacy.city}, {pharmacy.state}{" "}
                  {pharmacy.zip}
                </span>
              </li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              {pharmacy.acceptsTrumpRxCoupon ? (
                <Badge variant="secondary">Accepts Trump RX coupon</Badge>
              ) : (
                <Badge variant="outline">Call to confirm discount</Badge>
              )}
              {pharmacy.driveThru && <Badge variant="outline">Drive-thru</Badge>}
            </div>
            {pharmacy.hours.pharmacyDeskNote && (
              <p className="mt-3 text-sm text-muted-foreground">
                {pharmacy.hours.pharmacyDeskNote}
              </p>
            )}
          </section>

          <TrustCallout title="Sample price at this store">
            Atorvastatin 20 mg (30-day) coupon estimate:{" "}
            <strong>
              {sampleOffer
                ? formatCurrency(sampleOffer.offer.couponPrice)
                : "Unavailable"}
            </strong>
            . Search your exact medication for live comparison.
          </TrustCallout>
        </div>

        <aside className="space-y-3">
          <div className="trx-photo relative aspect-[4/3]">
            <Image
              src="/images/pharmacist-helping.webp"
              alt="Pharmacist helping a patient"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 35vw"
            />
          </div>
          <Link
            href="/search"
            className={cn(buttonVariants({ size: "lg" }), "min-h-11 w-full")}
          >
            Compare medications here
          </Link>
          <Link
            href="/pharmacies"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-h-11 w-full"
            )}
          >
            Back to all pharmacies
          </Link>
        </aside>
      </div>

      {offer && sampleOffer && (
        <CouponModal
          open={!!offer}
          onOpenChange={(o) => !o && setOffer(null)}
          drug={sampleDrug}
          pharmacy={pharmacy}
          offer={offer}
          strengthLabel={
            sampleDrug.strengths.find((s) => s.id === offer.strengthId)?.label ??
            "tablet"
          }
        />
      )}
    </div>
  );
}
