import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy practices for the ${SITE_NAME} redesign prototype.`,
};

export default function PrivacyPage() {
  return (
    <article className="prose-sm mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-4 text-muted-foreground">
        Last updated: August 9, 2026
      </p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          {SITE_NAME} is a design and engineering prototype. It is not operated
          by Walgreens Boots Alliance and does not provide real pharmacy or
          payment services.
        </p>
        <p>
          Data you enter (cart items, account email, checkout details, store
          selection, appointment requests) is stored in your browser via
          localStorage or sessionStorage. Nothing is transmitted to a production
          backend or payment processor in this demo.
        </p>
        <p>
          Do not enter real protected health information, real payment card
          numbers you care about, or credentials you use elsewhere. Use the
          provided demo account when trying member features.
        </p>
        <p>
          If this project were productionized, it would need a full privacy
          program covering account data, analytics, pharmacy PHI (HIPAA), and
          third-party processors.
        </p>
      </div>
    </article>
  );
}
