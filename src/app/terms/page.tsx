import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms for using the ${SITE_NAME} redesign prototype.`,
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Terms of Use
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: August 9, 2026
      </p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          This website is a portfolio / prototype experience branded {SITE_NAME}.
          It is not affiliated with, endorsed by, or connected to Walgreens Boots
          Alliance or its trademarks beyond nominative references for design
          demonstration.
        </p>
        <p>
          Product availability, pricing, pharmacy status, appointments, and
          orders shown here are simulated. Placing an “order” does not create a
          binding purchase or prescription fill.
        </p>
        <p>
          You agree not to misuse the demo, attempt to collect others’ data, or
          represent this site as an official Walgreens service.
        </p>
      </div>
    </article>
  );
}
