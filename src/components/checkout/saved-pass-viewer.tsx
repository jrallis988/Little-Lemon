"use client";

import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/pricing";

export interface SavedPassViewItem {
  id: string;
  pharmacyName: string | null;
  counterPrice: number;
  coupon: {
    bin: string;
    pcn: string;
    group: string;
    memberId: string;
    barcodeValue: string;
    expiresAt: string;
    drugName: string;
    pharmacyName?: string;
  };
}

function MiniBarcode({ value }: { value: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    try {
      JsBarcode(ref.current, value, {
        format: "CODE128",
        width: 2,
        height: 56,
        displayValue: false,
        margin: 0,
        background: "#ffffff",
        lineColor: "#0f1b3d",
      });
    } catch {
      /* ignore */
    }
  }, [value]);
  return (
    <div className="rounded-xl border border-border bg-white p-3">
      <svg ref={ref} className="mx-auto h-14 w-full max-w-xs" role="img" />
      <p className="mt-1 text-center font-mono text-xs tracking-widest">{value}</p>
    </div>
  );
}

interface SavedPassViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  passCode: string;
  status: string;
  items: SavedPassViewItem[];
}

/** Re-open a saved digital pass for the counter (barcodes + BIN/PCN). */
export function SavedPassViewer({
  open,
  onOpenChange,
  passCode,
  status,
  items,
}: SavedPassViewerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(94dvh,54rem)] overflow-y-auto p-0 sm:max-w-lg">
        <div className="trx-coupon-print space-y-4 p-4 sm:p-5">
          <div className="no-print flex items-start justify-between gap-3">
            <div>
              <DialogTitle className="font-display text-2xl">
                {passCode}
              </DialogTitle>
              <DialogDescription className="mt-1">
                Show at the counter · {status}. Seen price = counter price. Not
                insurance.
              </DialogDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Close"
              onClick={() => onOpenChange(false)}
            >
              <X />
            </Button>
          </div>

          {items.map((item) => (
            <article
              key={item.id}
              className="space-y-3 rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{item.coupon.drugName}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.pharmacyName ?? item.coupon.pharmacyName}
                  </p>
                </div>
                <p className="font-display text-3xl font-semibold tabular-nums">
                  {formatCurrency(item.counterPrice)}
                </p>
              </div>
              <MiniBarcode value={item.coupon.barcodeValue} />
              <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                {(
                  [
                    ["BIN", item.coupon.bin],
                    ["PCN", item.coupon.pcn],
                    ["Group", item.coupon.group],
                    ["Member", item.coupon.memberId],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-muted/70 px-3 py-2">
                    <p className="text-xs uppercase text-muted-foreground">
                      {label}
                    </p>
                    <p className="font-mono font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Expires{" "}
                {new Date(item.coupon.expiresAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </article>
          ))}

          <div className="no-print rounded-xl border border-amber-300/70 bg-amber-50 px-3 py-3 text-sm">
            <p className="font-semibold">If the claim rejects</p>
            <p className="mt-1 text-foreground/90">
              Ask the pharmacist to process as a commercial discount card (not
              insurance), re-enter BIN/PCN/Group/Member, or try another
              in-network pharmacy. Use Chat with us if you need help.
            </p>
          </div>

          <Button
            type="button"
            className="no-print min-h-11 w-full"
            variant="outline"
            onClick={() => window.print()}
          >
            Print pack
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
