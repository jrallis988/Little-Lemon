import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Program information",
  description:
    "TrumpRx does not run a retail medication checkout. Use Get this price on a medication page for the correct access pathway.",
};

interface PageProps {
  searchParams: Promise<{ drug?: string }>;
}

/** Legacy /checkout → access pathway (TrumpRx is not an ecommerce pharmacy). */
export default async function CheckoutRedirectPage({ searchParams }: PageProps) {
  const params = await searchParams;
  if (params.drug) {
    redirect(`/access?drug=${encodeURIComponent(params.drug)}`);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">
        TrumpRx does not sell medications
      </h1>
      <p className="mt-3 text-muted-foreground">
        There is no shopping-cart checkout here. If a medication is included,
        use <strong>See how to get this option</strong> on the medication page
        for the pharmacy pickup pathway. Confirm the final price at the counter.
      </p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
        <Link href="/search" className="text-primary underline-offset-2 hover:underline">
          Check coverage
        </Link>
        <Link
          href="/medications"
          className="text-primary underline-offset-2 hover:underline"
        >
          Browse included medications
        </Link>
        <Link
          href="/profile"
          className="text-primary underline-offset-2 hover:underline"
        >
          Saved program information (account)
        </Link>
      </div>
    </div>
  );
}
