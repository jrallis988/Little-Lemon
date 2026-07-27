import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div
      role="note"
      aria-label="Important service disclaimer"
      className="border-b border-amber-200/80 bg-amber-50 text-amber-950"
    >
      <div className="mx-auto flex max-w-6xl items-start gap-2 px-4 py-2 text-sm leading-snug sm:items-center sm:px-6">
        <AlertTriangle
          className="mt-0.5 size-4 shrink-0 text-amber-700 sm:mt-0"
          aria-hidden
        />
        <p>
          <span className="font-semibold">Trump RX is a prescription discount
          provider — not insurance.</span>{" "}
          Coupons cannot be combined with insurance. Compare with your plan and
          ask the pharmacist which option costs less.{" "}
          <Link
            href="/privacy"
            className="font-medium underline underline-offset-2 hover:text-amber-800"
          >
            Privacy &amp; how we handle health searches
          </Link>
        </p>
      </div>
    </div>
  );
}
