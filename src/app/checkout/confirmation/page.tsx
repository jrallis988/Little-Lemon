import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Program information",
  description:
    "TrumpRx does not place medication orders. Saved program information belongs on your account tools — not a retail order confirmation.",
};

export default function ConfirmationRedirectPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">
        No medication order on TrumpRx
      </h1>
      <p className="mt-3 text-muted-foreground">
        TrumpRx does not run a retail checkout that sells or ships prescriptions.
        If you saved pharmacy program information while signed in, find it under
        your account tools. To access a price, open an included medication and
        choose <strong>Get this price</strong>.
      </p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
        <Link href="/search" className="text-primary hover:underline">
          Check coverage
        </Link>
        <Link href="/profile" className="text-primary hover:underline">
          Account tools
        </Link>
        <Link href="/faq" className="text-primary hover:underline">
          FAQ
        </Link>
      </div>
    </div>
  );
}
