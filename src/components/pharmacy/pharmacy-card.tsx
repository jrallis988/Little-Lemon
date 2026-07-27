"use client";

import { Clock, MapPin, Phone, Star, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CHAIN_LABELS } from "@/lib/data/pharmacies";
import { useProfileStore } from "@/lib/store/profile-store";
import type { Pharmacy } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PharmacyCardProps {
  pharmacy: Pharmacy;
  priceLabel?: string;
  highlighted?: boolean;
  onSelectCoupon?: () => void;
  className?: string;
}

export function PharmacyCard({
  pharmacy,
  priceLabel,
  highlighted = false,
  onSelectCoupon,
  className,
}: PharmacyCardProps) {
  const preferred = useProfileStore((s) => s.preferredPharmacyIds);
  const togglePreferred = useProfileStore((s) => s.togglePreferredPharmacy);
  const isPreferred = preferred.includes(pharmacy.id);

  return (
    <article
      className={cn(
        "rounded-2xl border bg-card p-4 transition-shadow",
        highlighted
          ? "border-primary/40 shadow-md ring-1 ring-primary/20"
          : "border-border hover:shadow-sm",
        className
      )}
      aria-label={`${pharmacy.name}, ${pharmacy.address}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl",
              highlighted
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            )}
            aria-hidden
          >
            <Store className="size-5" />
          </span>
          <div>
            <h3 className="text-lg font-semibold leading-tight text-foreground">
              {pharmacy.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {CHAIN_LABELS[pharmacy.chain]}
              {pharmacy.driveThru ? " · Drive-thru" : ""}
            </p>
          </div>
        </div>
        {priceLabel && (
          <p className="text-right">
            <span className="block font-display text-2xl font-semibold tabular-nums text-primary">
              {priceLabel}
            </span>
            <span className="text-xs text-muted-foreground">with coupon</span>
          </p>
        )}
      </div>

      <ul className="mt-4 space-y-2 text-sm text-foreground/90">
        <li className="flex gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
          <span>
            {pharmacy.address}, {pharmacy.city}, {pharmacy.state} {pharmacy.zip}
            {typeof pharmacy.distanceMiles === "number" && (
              <span className="text-muted-foreground">
                {" "}
                · {pharmacy.distanceMiles.toFixed(1)} mi
              </span>
            )}
          </span>
        </li>
        <li className="flex gap-2">
          <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
          <span>
            Today: {pharmacy.hours.weekday}
            {pharmacy.hours.pharmacyDeskNote
              ? ` — ${pharmacy.hours.pharmacyDeskNote}`
              : ""}
          </span>
        </li>
        <li className="flex gap-2">
          <Phone className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
          <a
            href={`tel:${pharmacy.phone.replace(/\D/g, "")}`}
            className="underline-offset-2 hover:underline"
          >
            {pharmacy.phone}
          </a>
        </li>
      </ul>

      <div className="mt-3 flex flex-wrap gap-2">
        {pharmacy.acceptsTrumpRxCoupon ? (
          <Badge variant="secondary" className="font-medium">
            Accepts Trump RX coupon
          </Badge>
        ) : (
          <Badge variant="outline">Call to confirm discount</Badge>
        )}
        {highlighted && <Badge className="bg-savings text-savings-foreground">Lowest nearby</Badge>}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {onSelectCoupon && (
          <Button onClick={onSelectCoupon} className="min-h-11 flex-1 sm:flex-none">
            Show coupon
          </Button>
        )}
        <Button
          type="button"
          variant={isPreferred ? "secondary" : "outline"}
          className="min-h-11"
          onClick={() => togglePreferred(pharmacy.id)}
          aria-pressed={isPreferred}
        >
          <Star
            className={cn("size-4", isPreferred && "fill-current")}
            aria-hidden
          />
          {isPreferred ? "Preferred" : "Save pharmacy"}
        </Button>
      </div>
    </article>
  );
}
