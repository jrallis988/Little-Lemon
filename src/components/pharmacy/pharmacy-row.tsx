"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Clock, MapPin, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChainMark } from "@/components/pharmacy/chain-mark";
import { PriceDisplay } from "@/components/design/price-display";
import { useProfileStore } from "@/lib/store/profile-store";
import type { PriceComparisonRow } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PharmacyRowProps {
  row: PriceComparisonRow;
  rank?: number;
  highlighted?: boolean;
  onGetCoupon: () => void;
}

export function PharmacyRow({
  row,
  rank,
  highlighted = false,
  onGetCoupon,
}: PharmacyRowProps) {
  const [open, setOpen] = useState(highlighted);
  const preferred = useProfileStore((s) => s.preferredPharmacyIds);
  const togglePreferred = useProfileStore((s) => s.togglePreferredPharmacy);
  const isPreferred = preferred.includes(row.pharmacy.id);

  return (
    <article
      className={cn(
        "trx-row animate-trx-slide-up",
        highlighted && "bg-accent/30",
        !row.offer.inStock && "opacity-70"
      )}
    >
      <div className="flex flex-col gap-3 px-3 py-3.5 sm:flex-row sm:items-center sm:gap-4 sm:px-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <ChainMark chain={row.pharmacy.chain} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/pharmacies/${row.pharmacy.id}`}
                className="truncate text-base font-semibold hover:underline"
              >
                {row.pharmacy.name}
              </Link>
              {rank === 1 && (
                <Badge className="bg-savings text-savings-foreground">Best</Badge>
              )}
              {!row.offer.inStock && (
                <Badge variant="outline">Call to confirm stock</Badge>
              )}
            </div>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" aria-hidden />
                {row.pharmacy.distanceMiles?.toFixed(1)} mi
              </span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden />
                {row.pharmacy.hours.weekday}
              </span>
            </p>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {row.pharmacy.address}, {row.pharmacy.city}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <PriceDisplay
            couponPrice={row.offer.couponPrice}
            retailPrice={row.offer.retailPrice}
            savingsAmount={row.savingsAmount}
            savingsPercent={row.savingsPercent}
            size="md"
          />
          <div className="flex shrink-0 flex-col gap-1.5 sm:flex-row">
            <Button className="min-h-11 min-w-[7.5rem]" onClick={onGetCoupon}>
              Get coupon
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              className="hidden sm:inline-flex"
              aria-expanded={open}
              aria-label={open ? "Hide details" : "Show details"}
              onClick={() => setOpen((v) => !v)}
            >
              <ChevronDown
                className={cn("transition-transform", open && "rotate-180")}
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-3 pb-3 sm:hidden">
        <Button
          type="button"
          variant="ghost"
          className="h-9 w-full justify-between px-2 text-sm"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Hide details" : "Show hours & phone"}
          <ChevronDown
            className={cn("size-4 transition-transform", open && "rotate-180")}
          />
        </Button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-muted/20 px-3 py-3 sm:px-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <a
              href={`tel:${row.pharmacy.phone.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-1.5 font-medium underline-offset-2 hover:underline"
            >
              <Phone className="size-3.5" aria-hidden />
              {row.pharmacy.phone}
            </a>
            {row.pharmacy.acceptsTrumpRxCoupon ? (
              <Badge variant="secondary">Accepts Trump RX coupon</Badge>
            ) : (
              <Badge variant="outline">Call to confirm discount</Badge>
            )}
            {row.pharmacy.driveThru && <Badge variant="outline">Drive-thru</Badge>}
            <Button
              type="button"
              variant={isPreferred ? "secondary" : "outline"}
              size="sm"
              className="min-h-9"
              onClick={() => togglePreferred(row.pharmacy.id)}
              aria-pressed={isPreferred}
            >
              <Star className={cn("size-3.5", isPreferred && "fill-current")} />
              {isPreferred ? "Preferred" : "Save pharmacy"}
            </Button>
            <Link
              href={`/pharmacies/${row.pharmacy.id}`}
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Pharmacy details
            </Link>
          </div>
          {row.pharmacy.hours.pharmacyDeskNote && (
            <p className="mt-2 text-sm text-muted-foreground">
              {row.pharmacy.hours.pharmacyDeskNote}
            </p>
          )}
        </div>
      )}
    </article>
  );
}
