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
            TrumpRx is a savings &amp; access guide for select medications — not
            a pharmacy and not insurance.
          </span>{" "}
          Only listed medications have a program option. Final eligibility and
          price are set by the pharmacy or manufacturer program.{" "}
          <Link
            href="/faq"
            className="font-medium underline underline-offset-2 hover:text-trust-foreground/90"
          >
            FAQ
          </Link>
        </p>
      </div>
    </div>
  );
}
