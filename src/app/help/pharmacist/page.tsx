import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { TrustCallout } from "@/components/design/trust-callout";
import { PrintGuideButton } from "@/components/help/print-guide-button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pharmacist processing guide",
  description:
    "Mobile-friendly instructions for processing a Trump RX discount coupon at the pharmacy counter.",
};

export default function PharmacistGuidePage() {
  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="mx-auto max-w-xl space-y-5 px-4 py-5 sm:px-6 print:max-w-none">
        <header className="space-y-2 text-center print:text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Hand this to the pharmacist
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Trump RX coupon processing
          </h1>
          <p className="text-muted-foreground">
            Cash-discount claim — not insurance. Process as a secondary or
            primary discount card per your pharmacy workflow.
          </p>
        </header>

        <section className="rounded-2xl border-2 border-primary bg-card p-4 sm:p-5">
          <h2 className="font-display text-xl font-semibold">Claim fields</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Exact BIN / PCN / Group / Member ID appear on the patient’s digital
            coupon or pass. Ask them to open the coupon screen.
          </p>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["BIN", "Shown on coupon"],
              ["PCN", "Shown on coupon"],
              ["Group", "Shown on coupon"],
              ["Member ID", "Shown on coupon"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-muted/60 px-3 py-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {k}
                </dt>
                <dd className="mt-1 font-display text-lg font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <ol className="space-y-3">
          {[
            "Compare the coupon cash price with the patient’s insurance copay. Use whichever costs less — coupons usually cannot combine with insurance.",
            "Run the Trump RX card through your standard discount / secondary adjudication path.",
            "Charge the patient the adjudicated counter price shown on their screen.",
            "If the claim rejects, try primary cash-discount routing or call the help desk printed on the coupon.",
          ].map((step, i) => (
            <li
              key={step}
              className="flex gap-3 rounded-2xl border border-border bg-card p-4"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed sm:text-base">{step}</p>
            </li>
          ))}
        </ol>

        <TrustCallout title="Not insurance">
          Trump RX is a private prescription discount program. It is not a
          government health plan and does not guarantee coverage.
        </TrustCallout>

        <div className="flex flex-wrap gap-2 print:hidden">
          <PrintGuideButton />
          <Link
            href="/help/counter-issue"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-h-11")}
          >
            Price mismatch help
          </Link>
          <Link
            href="/help"
            className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "min-h-11")}
          >
            How coupons work
          </Link>
        </div>
      </div>
    </div>
  );
}
