import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div
      role="note"
      aria-label="Important service disclaimer"
      className="border-b border-trust/20 bg-trust text-trust-foreground"
    >
      <div className="mx-auto flex max-w-6xl items-start gap-2 px-4 py-2 text-sm leading-snug sm:items-center sm:px-6">
        <AlertTriangle
          className="mt-0.5 size-4 shrink-0 text-primary sm:mt-0"
          aria-hidden
        />
        <p>
          <span className="font-semibold">
            Trump RX is a prescription discount provider — not insurance.
          </span>{" "}
          Coupons cannot be combined with insurance. Compare with your plan and
          ask the pharmacist which option costs less.{" "}
          <Link
            href="/privacy"
            className="font-medium underline underline-offset-2 hover:text-trust-foreground/90"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
