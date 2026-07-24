"use client";

import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/pricing";
import type { Drug, Pharmacy, PharmacyPriceOffer } from "@/lib/types";

interface CouponModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  drug: Drug;
  pharmacy: Pharmacy;
  offer: PharmacyPriceOffer;
  strengthLabel: string;
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard may be blocked */
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-muted/70 px-3 py-2.5">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="font-mono text-lg font-semibold tracking-wide text-foreground">
          {value}
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="size-10 shrink-0"
        onClick={copy}
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check className="text-savings" /> : <Copy />}
      </Button>
    </div>
  );
}

function BarcodeDisplay({ value }: { value: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    try {
      JsBarcode(svgRef.current, value, {
        format: "CODE128",
        width: 2.2,
        height: 72,
        displayValue: false,
        margin: 0,
        background: "#ffffff",
        lineColor: "#0f2a2e",
      });
    } catch {
      /* invalid barcode payload */
    }
  }, [value]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-white p-4">
      <div
        className="pointer-events-none absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-70"
        style={{ animation: "cd-barcode-shine 2.8s ease-in-out infinite" }}
        aria-hidden
      />
      <svg
        ref={svgRef}
        role="img"
        aria-label={`Barcode for member ID ending in ${value.slice(-4)}`}
        className="mx-auto h-20 w-full max-w-sm"
      />
      <p className="mt-2 text-center font-mono text-sm tracking-[0.2em] text-foreground">
        {value}
      </p>
    </div>
  );
}

export function CouponModal({
  open,
  onOpenChange,
  drug,
  pharmacy,
  offer,
  strengthLabel,
}: CouponModalProps) {
  const { coupon } = offer;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[min(92dvh,52rem)] w-full max-w-lg overflow-y-auto sm:max-w-lg"
        aria-describedby="coupon-instructions"
      >
        <DialogHeader className="text-left">
          <DialogTitle className="font-display text-2xl">
            Show to pharmacist
          </DialogTitle>
          <DialogDescription id="coupon-instructions" className="text-base">
            Present this screen at {pharmacy.name}. They will enter the BIN /
            PCN / Group / Member ID — or scan the barcode.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-2xl bg-primary px-4 py-5 text-primary-foreground">
            <p className="text-sm opacity-90">ClearDose coupon price</p>
            <p className="font-display text-4xl font-semibold tabular-nums">
              {formatCurrency(offer.couponPrice)}
            </p>
            <p className="mt-2 text-base leading-snug">
              {drug.genericName} · {strengthLabel} · Qty {offer.quantity} ·{" "}
              {offer.supplyDays}-day supply
            </p>
            <p className="mt-1 text-sm opacity-85">
              Est. retail {formatCurrency(offer.retailPrice)} — you save{" "}
              {formatCurrency(offer.retailPrice - offer.couponPrice)}
            </p>
          </div>

          <BarcodeDisplay value={coupon.barcodeValue} />

          <div className="grid gap-2 sm:grid-cols-2">
            <CopyField label="BIN" value={coupon.bin} />
            <CopyField label="PCN" value={coupon.pcn} />
            <CopyField label="Group" value={coupon.group} />
            <CopyField label="Member ID" value={coupon.memberId} />
          </div>

          <Separator />

          <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">How to use:</strong> Ask the
              pharmacist to process this as a discount card (not insurance). If
              your insurance copay is lower, use insurance instead.
            </p>
            <p>
              ClearDose does not charge you at the pharmacy. This is not
              insurance and does not replace your health plan.
            </p>
          </div>

          <Button
            type="button"
            className="min-h-12 w-full text-base"
            onClick={() => onOpenChange(false)}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
