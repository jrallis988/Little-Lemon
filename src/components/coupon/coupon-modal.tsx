"use client";

import { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import {
  Check,
  Copy,
  Mail,
  MessageSquare,
  Printer,
  ShieldAlert,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TrustCallout } from "@/components/design/trust-callout";
import { formatCurrency } from "@/lib/pricing";
import type { Drug, Pharmacy, PharmacyPriceOffer } from "@/lib/types";
import { cn } from "@/lib/utils";

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

function BarcodeDisplay({
  value,
  large = false,
}: {
  value: string;
  large?: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    try {
      JsBarcode(svgRef.current, value, {
        format: "CODE128",
        width: large ? 2.6 : 2.2,
        height: large ? 96 : 72,
        displayValue: false,
        margin: 0,
        background: "#ffffff",
        lineColor: "#0f1b3d",
      });
    } catch {
      /* invalid barcode payload */
    }
  }, [value, large]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-white p-4">
      <div
        className="pointer-events-none absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-70 motion-safe:animate-[trx-barcode-shine_2.8s_ease-in-out_infinite]"
        aria-hidden
      />
      <svg
        ref={svgRef}
        role="img"
        aria-label={`Barcode for member ID ending in ${value.slice(-4)}`}
        className={cn("mx-auto w-full max-w-sm", large ? "h-28" : "h-20")}
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
  const [pharmacistMode, setPharmacistMode] = useState(false);
  const [sharedMsg, setSharedMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setPharmacistMode(false);
      setSharedMsg(null);
    }
  }, [open]);

  const summary = `${drug.genericName} · ${strengthLabel} · Qty ${offer.quantity} · ${offer.supplyDays}-day`;
  const shareBody = [
    `Trump RX coupon for ${pharmacy.name}`,
    summary,
    `Price: ${formatCurrency(offer.couponPrice)}`,
    `BIN ${coupon.bin} · PCN ${coupon.pcn} · Group ${coupon.group} · Member ${coupon.memberId}`,
    "Not insurance — compare with your plan copay.",
  ].join("\n");

  function onPrint() {
    window.print();
  }

  function onText() {
    window.location.href = `sms:?&body=${encodeURIComponent(shareBody)}`;
    setSharedMsg("Opening Messages…");
  }

  function onEmail() {
    window.location.href = `mailto:?subject=${encodeURIComponent("Trump RX coupon")}&body=${encodeURIComponent(shareBody)}`;
    setSharedMsg("Opening email…");
  }

  async function onWalletHint() {
    setSharedMsg(
      "Add this screen to your phone wallet favorites, or screenshot for the counter."
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "overflow-y-auto p-0 sm:max-w-lg",
          pharmacistMode
            ? "inset-0 top-0 left-0 flex h-dvh max-h-dvh w-screen max-w-none translate-x-0 translate-y-0 rounded-none"
            : "max-h-[min(94dvh,54rem)] w-full max-w-lg"
        )}
        showCloseButton={!pharmacistMode}
        aria-describedby="coupon-instructions"
      >
        <div
          className={cn(
            "trx-coupon-print space-y-4",
            pharmacistMode ? "flex min-h-full flex-col p-4 sm:p-6" : "p-4 sm:p-5"
          )}
        >
          <div className="no-print flex items-start justify-between gap-3">
            <div>
              <DialogTitle className="font-display text-2xl">
                {pharmacistMode ? "Show this to the pharmacist" : "Get coupon"}
              </DialogTitle>
              <DialogDescription
                id="coupon-instructions"
                className="mt-1 text-base"
              >
                {pharmacistMode
                  ? `${pharmacy.name} · scan barcode or enter BIN / PCN / Group / Member ID`
                  : `Ready for ${pharmacy.name}. Open pharmacist mode at the counter.`}
              </DialogDescription>
            </div>
            {pharmacistMode && (
              <Button
                type="button"
                variant="outline"
                size="icon-lg"
                aria-label="Exit pharmacist mode"
                onClick={() => setPharmacistMode(false)}
              >
                <X />
              </Button>
            )}
          </div>

          <TrustCallout variant="warning" title="Not insurance — compare your copay">
            Ask the pharmacist which is lower: this coupon or your insurance.
            Coupons generally cannot be combined with insurance.
          </TrustCallout>

          <div className="rounded-2xl bg-primary px-4 py-5 text-primary-foreground">
            <p className="text-sm opacity-90">Trump RX coupon price</p>
            <p className="font-display text-4xl font-semibold tabular-nums sm:text-5xl">
              {formatCurrency(offer.couponPrice)}
            </p>
            <p className="mt-2 text-base leading-snug">{summary}</p>
            <p className="mt-1 text-sm opacity-85">
              Est. retail {formatCurrency(offer.retailPrice)} — you save{" "}
              {formatCurrency(offer.retailPrice - offer.couponPrice)}
            </p>
          </div>

          <BarcodeDisplay value={coupon.barcodeValue} large={pharmacistMode} />

          <div className="grid gap-2 sm:grid-cols-2">
            <CopyField label="BIN" value={coupon.bin} />
            <CopyField label="PCN" value={coupon.pcn} />
            <CopyField label="Group" value={coupon.group} />
            <CopyField label="Member ID" value={coupon.memberId} />
          </div>

          {!pharmacistMode && (
            <>
              <div className="no-print grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Button
                  type="button"
                  variant="secondary"
                  className="min-h-11"
                  onClick={() => setPharmacistMode(true)}
                >
                  <ShieldAlert />
                  I&apos;m here
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-11"
                  onClick={onPrint}
                >
                  <Printer />
                  Print
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-11"
                  onClick={onText}
                >
                  <MessageSquare />
                  Text
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-11"
                  onClick={onEmail}
                >
                  <Mail />
                  Email
                </Button>
              </div>
              <Button
                type="button"
                variant="ghost"
                className="no-print min-h-10 w-full"
                onClick={onWalletHint}
              >
                Save for wallet / screenshot tip
              </Button>
              {sharedMsg && (
                <p className="no-print text-center text-sm text-muted-foreground" role="status">
                  {sharedMsg}
                </p>
              )}
              <Separator className="no-print" />
              <p className="no-print text-sm leading-relaxed text-muted-foreground">
                Ask the pharmacist to process this as a discount card. Trump RX
                does not charge you at the pharmacy.
              </p>
              <Button
                type="button"
                className="no-print min-h-12 w-full text-base"
                onClick={() => onOpenChange(false)}
              >
                Done
              </Button>
            </>
          )}

          {pharmacistMode && (
            <div className="no-print mt-auto pt-2">
              <Button
                type="button"
                className="min-h-12 w-full text-base"
                onClick={() => setPharmacistMode(false)}
              >
                Exit pharmacist mode
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
