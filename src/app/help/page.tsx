import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help center",
  description: "FAQs for pharmacy, pickup, rewards, and checkout at Walgreens RX.",
};

const FAQS = [
  {
    q: "How do I refill a prescription?",
    a: "Open Pharmacy, select the medications, and tap Refill selected. You’ll see status move from Received to Ready.",
  },
  {
    q: "Can I pick a different store?",
    a: "Yes — use Find a store, then Use this store. Your choice appears in the header and at checkout.",
  },
  {
    q: "What promo codes work?",
    a: "Try FAST15, STOCKUP25, or WELCOME10 at checkout on qualifying orders.",
  },
  {
    q: "Is this the real Walgreens site?",
    a: "No. This is an independent redesign prototype and is not affiliated with Walgreens Boots Alliance.",
  },
  {
    q: "How do I contact support?",
    a: "Email support@walgreensrx.demo (demo address) or call your selected store from the Find a store page.",
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Help center
      </h1>
      <p className="mt-3 text-muted-foreground">
        Quick answers for pharmacy, shopping, and your account.
      </p>

      <ul className="mt-10 divide-y divide-border border-y border-border">
        {FAQS.map((item) => (
          <li key={item.q} className="py-5">
            <h2 className="font-display text-lg font-semibold">{item.q}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-muted-foreground">
        Need legal details? Read our{" "}
        <Link href="/privacy" className="text-brand underline-offset-2 hover:underline">
          Privacy Policy
        </Link>
        ,{" "}
        <Link href="/terms" className="text-brand underline-offset-2 hover:underline">
          Terms
        </Link>
        , and{" "}
        <Link
          href="/pharmacy-notice"
          className="text-brand underline-offset-2 hover:underline"
        >
          Pharmacy notice
        </Link>
        .
      </p>
    </div>
  );
}
