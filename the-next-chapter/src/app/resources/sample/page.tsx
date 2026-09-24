import type { Metadata } from "next";
import Link from "next/link";
import { PrintActions } from "@/components/resources/PrintActions";
import { campaign } from "@/data/campaign";

export const metadata: Metadata = {
  title: "Sample Resource",
  description:
    "Printable sample educator resource from The Next Chapter Fall 2026 campaign.",
};

export default function SampleResourcePage() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-3xl px-5 py-10 md:px-8 print:py-4">
        <div className="mb-6 print:hidden">
          <p className="mb-4 text-sm text-ink-muted">
            Sample printable resource — use Print to save as PDF.
          </p>
          <PrintActions backHref="/educators" backLabel="← Resources" />
        </div>

        <article className="border border-line bg-cream p-8 md:p-12 print:border-0 print:p-0">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-burgundy">
            {campaign.name} · {campaign.season}
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold text-ink md:text-4xl">
            Sample Educator Resource
          </h1>
          <p className="mt-2 font-accent text-lg text-ink-muted">
            Discussion Guide Template
          </p>

          <div className="editorial-rule my-8" />

          <h2 className="font-display text-lg font-bold text-ink">
            Before Reading
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
            <li>What does the cover make you expect from this story?</li>
            <li>
              Have you read books in this genre before? What did you enjoy?
            </li>
            <li>Look at the age range and themes — what feels familiar?</li>
          </ol>

          <h2 className="mt-8 font-display text-lg font-bold text-ink">
            During Reading
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
            <li>Which character decisions surprised you, and why?</li>
            <li>Where does the setting shape what the characters can do?</li>
            <li>Track one theme across three chapters — how does it grow?</li>
          </ol>

          <h2 className="mt-8 font-display text-lg font-bold text-ink">
            After Reading
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
            <li>Would you recommend this book? To whom, and why?</li>
            <li>What question would you ask the author?</li>
            <li>Design a new cover that captures the story&apos;s heart.</li>
          </ol>

          <div className="mt-10 border-t border-line pt-6">
            <p className="font-display text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">
              Harborlight Press · Fall Reading Week companion material
            </p>
            <p className="mt-1 text-xs text-ink-muted">
              Physical materials use QR codes that return readers to The Next
              Chapter website.
            </p>
          </div>
        </article>

        <p className="mt-6 text-center text-xs text-ink-muted print:hidden">
          <Link href="/campaign" className="text-burgundy hover:underline">
            See the full campaign system
          </Link>
        </p>
      </div>
    </div>
  );
}
