import type { Metadata } from "next";
import Link from "next/link";
import { ReportIssueButton } from "@/components/support/report-issue-button";

export const metadata: Metadata = {
  title: "Help",
  description:
    "Automated help topics for TrumpRx coverage, access pathways, eligibility, and reporting issues.",
};

const TOPICS = [
  {
    q: "Why isn’t my medication listed?",
    a: "TrumpRx only includes select medications. Use Check coverage to confirm, Request this medication if missing, or browse the included directory.",
  },
  {
    q: "How do I get my medication?",
    a: "Open the medication page → How can I get it? → Get this price. Pathways are pharmacy pickup or manufacturer-direct — TrumpRx does not sell or ship drugs.",
  },
  {
    q: "Does my insurance qualify?",
    a: "Read Eligibility & insurance on the medication page. TrumpRx explains typical rules; the pharmacy or manufacturer makes the final determination.",
  },
  {
    q: "Can I use CVS or Walgreens?",
    a: "Depends on the medication’s fulfillment path. Pharmacy-pickup options often work at participating retail locations; manufacturer-direct usually does not.",
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Support
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold uppercase tracking-tight">
            Help
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Use the floating <strong>Help</strong> button for Automated Help (not
            a human representative). For deeper answers, see the{" "}
            <Link href="/faq" className="font-medium text-primary hover:underline">
              FAQ
            </Link>
            .
          </p>
          <div className="mt-4">
            <ReportIssueButton />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-3xl space-y-3 px-4 py-8 sm:px-6">
        {TOPICS.map((t) => (
          <article
            key={t.q}
            className="rounded-lg border border-border bg-card px-4 py-3"
          >
            <h2 className="text-sm font-semibold">{t.q}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.a}</p>
          </article>
        ))}
        <p className="pt-2 text-sm text-muted-foreground">
          Pharmacist processing notes remain at{" "}
          <Link
            href="/help/pharmacist"
            className="font-medium text-primary hover:underline"
          >
            /help/pharmacist
          </Link>{" "}
          for participating pharmacy pickup programs.
        </p>
      </div>
    </div>
  );
}
