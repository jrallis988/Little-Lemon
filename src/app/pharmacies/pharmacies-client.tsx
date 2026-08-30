"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { LocationPicker } from "@/components/pharmacy/location-picker";
import { PharmacyCard } from "@/components/pharmacy/pharmacy-card";
import { CouponModal } from "@/components/coupon/coupon-modal";
import { formatCurrency } from "@/lib/pricing";
import { useLocationStore } from "@/lib/store/location-store";
import type { Drug, Pharmacy, PharmacyPriceOffer } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DEFAULT_DRUG_ID = "atorvastatin";

export function PharmaciesClient() {
  const searchParams = useSearchParams();
  const drugId = searchParams.get("drug")?.trim() || DEFAULT_DRUG_ID;
  const location = useLocationStore((s) => s.location);
  const [sampleDrug, setSampleDrug] = useState<Drug | null>(null);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [livePharmacyPricing, setLivePharmacyPricing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [couponTarget, setCouponTarget] = useState<{
    pharmacy: Pharmacy;
    offer: PharmacyPriceOffer;
  } | null>(null);

  useEffect(() => {
    fetch("/api/config")
      .then(async (res) => {
        if (!res.ok) return;
        const data = (await res.json()) as {
          launch?: { livePharmacyPricing?: boolean };
        };
        setLivePharmacyPricing(Boolean(data.launch?.livePharmacyPricing));
      })
      .catch(() => setLivePharmacyPricing(false));
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [drugResponse, pharmacyResponse] = await Promise.all([
          fetch(`/api/drugs?id=${encodeURIComponent(drugId)}`, {
            signal: controller.signal,
          }),
          fetch(`/api/pharmacies?zip=${encodeURIComponent(location.zip)}`, {
            signal: controller.signal,
          }),
        ]);
        if (drugResponse.status === 404) {
          throw new Error(
            "That medication is not in the current TrumpRx launch formulary."
          );
        }
        if (!drugResponse.ok || !pharmacyResponse.ok) {
          throw new Error("Could not load nearby pharmacy data.");
        }

        const { drug } = (await drugResponse.json()) as { drug: Drug };
        const { pharmacies: nearby } = (await pharmacyResponse.json()) as {
          pharmacies: Pharmacy[];
        };

        setSampleDrug(drug);
        setPharmacies(
          [...nearby].sort(
            (a, b) => (a.distanceMiles ?? 99) - (b.distanceMiles ?? 99)
          )
        );
      } catch (caught) {
        if (caught instanceof DOMException && caught.name === "AbortError") return;
        setSampleDrug(null);
        setPharmacies([]);
        setError(
          caught instanceof Error
            ? caught.message
            : "Could not load nearby pharmacies."
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void load();
    return () => controller.abort();
  }, [location.zip, drugId]);

  const strength = useMemo(() => {
    if (!sampleDrug) return null;
    return sampleDrug.strengths[1] ?? sampleDrug.strengths[0] ?? null;
  }, [sampleDrug]);

  const programPrice = sampleDrug?.program?.programPrice30 ?? null;

  function openProgramInfo(pharmacy: Pharmacy) {
    if (!sampleDrug || !strength || programPrice == null) return;
    setCouponTarget({
      pharmacy,
      offer: {
        id: `${pharmacy.id}:${sampleDrug.id}:${strength.id}:30:30`,
        pharmacyId: pharmacy.id,
        drugId: sampleDrug.id,
        strengthId: strength.id,
        quantity: 30,
        supplyDays: 30,
        couponPrice: programPrice,
        retailPrice: sampleDrug.retailCashPrice30,
        coupon: {
          bin: "610020",
          pcn: "TRUMPRX",
          group: "TRXSAVE",
          memberId: "PENDING",
          barcodeValue: "PENDING",
        },
        lastUpdatedIso: new Date().toISOString(),
        inStock: true,
      },
    });
  }

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="relative isolate overflow-hidden border-b border-border">
        <Image
          src="/images/pharmacy-aisle.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-7">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Participating pharmacies near you
          </h1>
          <p className="mt-1.5 max-w-xl text-base text-muted-foreground">
            {sampleDrug && strength && programPrice != null ? (
              <>
                For{" "}
                <span className="font-medium text-foreground">
                  {sampleDrug.genericName}
                </span>
                {sampleDrug.brandName.toLowerCase() !==
                sampleDrug.genericName.toLowerCase()
                  ? ` (generic for ${sampleDrug.brandName})`
                  : ""}{" "}
                {strength.label}: typical TrumpRx program price{" "}
                <span className="font-semibold text-foreground">
                  {formatCurrency(programPrice)}
                </span>{" "}
                for a common 30-day fill. Confirm the final price at the counter
                {!livePharmacyPricing
                  ? " — live per-pharmacy quotes are not enabled yet"
                  : ""}
                .
              </>
            ) : (
              "Find pharmacies that may accept TrumpRx program information. Confirm acceptance and price before you fill."
            )}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-5 px-4 py-5 sm:px-6 sm:py-6">
        <div className="grid gap-4 lg:grid-cols-[18rem_1fr]">
          <aside className="space-y-3">
            <LocationPicker />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-border">
              <Image
                src="/images/pharmacist-helping.webp"
                alt="Pharmacist assisting a patient at the counter"
                fill
                className="object-cover"
                sizes="288px"
              />
              <p className="absolute bottom-2 left-2 rounded-md bg-card/95 px-2 py-1 text-xs font-medium shadow-sm">
                {location.label}
              </p>
            </div>
          </aside>

          <div>
            {loading ? (
              <div className="flex min-h-48 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground">
                <Loader2 className="mr-2 size-5 animate-spin" />
                Loading nearby pharmacies…
              </div>
            ) : error ? (
              <div className="space-y-3 rounded-2xl border border-destructive/30 bg-card p-5">
                <p className="text-destructive">{error}</p>
                <Link
                  href="/medications"
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Browse included medications
                </Link>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {pharmacies.map((pharmacy) => (
                  <PharmacyCard
                    key={pharmacy.id}
                    pharmacy={pharmacy}
                    priceLabel={
                      programPrice != null
                        ? formatCurrency(programPrice)
                        : undefined
                    }
                    priceCaption="typical program · confirm at fill"
                    onSelectCoupon={
                      programPrice != null
                        ? () => openProgramInfo(pharmacy)
                        : undefined
                    }
                    selectLabel="Get program information"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center pt-1">
          <Link
            href="/search"
            className={cn(buttonVariants({ size: "lg" }), "min-h-11")}
          >
            Check coverage for another medication
          </Link>
        </div>
      </div>

      {couponTarget && sampleDrug && (
        <CouponModal
          open={!!couponTarget}
          onOpenChange={(o) => !o && setCouponTarget(null)}
          drug={sampleDrug}
          pharmacy={couponTarget.pharmacy}
          offer={couponTarget.offer}
          strengthLabel={strength?.label ?? "tablet"}
        />
      )}
    </div>
  );
}
