import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { TrustCallout } from "@/components/design/trust-callout";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Trump RX discount coupons, membership, insurance, and pharmacy visits.",
};

const FAQ = [
  {
    q: "Is Trump RX insurance?",
    a: "No. Trump RX is a private prescription discount program. Coupons generally cannot be combined with insurance on the same fill. Always ask the pharmacist which option costs less.",
  },
  {
    q: "How do I use a coupon at the pharmacy?",
    a: "Search your medication, pick a pharmacy, and open the digital coupon or pass. Show the barcode or BIN / PCN / Group / Member ID at the counter. See the pharmacist guide if the desk needs help processing a discount card.",
  },
  {
    q: "Why might the counter price differ from the app?",
    a: "Prices depend on exact strength, quantity, brand vs generic, and network updates. If something looks wrong, use the counter issue form before you leave the store.",
  },
  {
    q: "Can I transfer my prescription to another pharmacy?",
    a: "Yes. Submit a transfer request with your current pharmacy and preferred Trump RX location. The receiving pharmacy typically calls to complete the transfer.",
  },
  {
    q: "What is Trump RX Plus?",
    a: "Plus is an optional membership with deeper savings where available, family profiles (up to 5), and cross-device price alerts. Free coupon search remains available without a paywall.",
  },
  {
    q: "How do refill reminders work?",
    a: "When you track medications in your account and set next refill dates, Trump RX can email or text you a few days before a fill is due. Reminders are guidance only — confirm with your pharmacist.",
  },
  {
    q: "How does Insurance vs cash work?",
    a: "Save plan deductible and copay estimates in your account, then use the comparison tool on search results. It helps you think through today’s cost vs deductible progress — not a substitute for plan documents.",
  },
  {
    q: "Is my health data sold?",
    a: "No. Trump RX does not sell health query or medication search data. See the Privacy Policy for details.",
  },
] as const;

export default function FaqPage() {
  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
        <header className="space-y-1.5">
          <p className="text-sm font-medium text-primary">Help center</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Frequently asked questions
          </h1>
          <p className="text-muted-foreground">
            Quick answers about coupons, membership, insurance comparisons, and
            pharmacy visits.
          </p>
        </header>

        <TrustCallout variant="warning" title="Not insurance">
          Trump RX coupons are cash-discount cards. They do not guarantee coverage
          and are not a government health program.
        </TrustCallout>

        <div className="space-y-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-border bg-card p-4"
            >
              <summary className="cursor-pointer list-none font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                {item.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/help" className={cn(buttonVariants({ size: "lg" }), "min-h-11")}>
            How coupons work
          </Link>
          <Link
            href="/help/counter-issue"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-h-11")}
          >
            Counter issue help
          </Link>
          <Link
            href="/membership"
            className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "min-h-11")}
          >
            Membership
          </Link>
        </div>
      </div>
    </div>
  );
}
