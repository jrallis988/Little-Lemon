import type { Metadata } from "next";
import Link from "next/link";
import { isLimitedV1Launch } from "@/lib/launch-mode";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Practical answers about TrumpRx coverage, costs, eligibility, pharmacies, and support.",
};

type FaqItem = { q: string; a: string };
type FaqSection = { title: string; items: FaqItem[] };

function buildSections(limited: boolean): FaqSection[] {
  return [
    {
      title: "About TrumpRx",
      items: [
        {
          q: "What is TrumpRx?",
          a: limited
            ? "TrumpRx is a medication savings, eligibility, comparison, and access platform for a limited set of generic medications. It helps you see whether a pricing option is available, compare it with what you currently pay, understand eligibility, and learn how to pick it up at a participating pharmacy."
            : "TrumpRx is a medication savings, eligibility, comparison, and access platform for select medications. It helps you see whether a pricing option is available, compare it with what you currently pay, understand eligibility, and learn how to obtain the medication.",
        },
        {
          q: "What does TrumpRx actually do?",
          a: limited
            ? "TrumpRx guides the decision: coverage check → medication details → price comparison → eligibility notes → pharmacy pickup access pathway. It does not replace your clinician, insurer, or pharmacy."
            : "TrumpRx guides the decision: coverage check → medication details → price comparison → eligibility notes → clear access pathway (participating pharmacy or manufacturer-direct). It does not replace your clinician, insurer, or pharmacy.",
        },
        {
          q: "Does TrumpRx sell medications?",
          a: limited
            ? "No. TrumpRx does not sell, dispense, or ship medications. Payment and fulfillment happen at a participating pharmacy."
            : "No. TrumpRx does not sell, dispense, or ship medications. Payment and fulfillment happen at a participating pharmacy or through a manufacturer program, depending on the medication.",
        },
        {
          q: "Is TrumpRx a pharmacy?",
          a: "No. TrumpRx is not a pharmacy and is not a replacement for CVS, Walgreens, GoodRx, or your existing pharmacy.",
        },
        {
          q: "Why aren’t all medications included?",
          a: limited
            ? "v1 includes 10 generic pharmacy-pickup medications only. If yours is not listed, that is a coverage gap — not a site error. You can request it for future consideration."
            : "TrumpRx currently supports a limited selection of medications. Only listed medications have a program option. Coverage may expand over time, but the product never promises savings on every prescription.",
        },
      ],
    },
    {
      title: "Costs",
      items: [
        {
          q: "Do I have to pay TrumpRx?",
          a: limited
            ? "No. Checking coverage and comparing options is free. You pay the pharmacy for the medication when you fill. TrumpRx does not charge you for prescriptions."
            : "Using TrumpRx to check coverage and compare options does not mean TrumpRx is charging you for the medication. Optional membership tools may exist for account features — that is separate from paying for a prescription. “Free to use” does not mean medications are free.",
        },
        {
          q: "Is there a subscription or membership fee?",
          a: limited
            ? "Not in the limited v1 launch. Paid membership / Plus tools are disabled. Coverage check and pharmacy pickup pathways are free to use."
            : "Core coverage check and medication information are available without buying a medication from TrumpRx. If a membership tier is offered, it is for optional account tools (saved items, reminders) — not a promise that drugs are free.",
        },
        {
          q: "Who receives payment for medications?",
          a: limited
            ? "The participating pharmacy where you fill — not TrumpRx."
            : "The pharmacy (for pickup cash-discount fills) or the manufacturer / specialty partner (for manufacturer-direct programs) — not TrumpRx as the seller of the drug.",
        },
      ],
    },
    {
      title: "Medication",
      items: [
        {
          q: "Is this the brand-name medication?",
          a: "Each medication page states whether you are receiving a brand-name, generic, or compounded product under the TrumpRx option. In limited v1, listings are generics for pharmacy pickup.",
        },
        {
          q: "Are generics offered?",
          a: limited
            ? "Yes — the current launch list is generic medications for pharmacy pickup."
            : "Yes, when the listed TrumpRx option is for a generic product. The medication page labels this clearly.",
        },
        {
          q: "Why isn’t my medication included?",
          a: "It is outside the current select program. You can request the medication for future consideration and browse medications that are included today.",
        },
        {
          q: "How are medications added?",
          a: "TrumpRx evaluates program options over time. Submitting a request does not guarantee addition; it helps prioritize review.",
        },
      ],
    },
    {
      title: "Insurance & eligibility",
      items: [
        {
          q: "Can I use insurance?",
          a: "Cash-discount pharmacy options generally cannot be combined with insurance on the same fill — compare which costs less. Read the Eligibility section on the medication page.",
        },
        {
          q: "What if I have Medicare or Medicaid?",
          a: "Read the Medicare / Medicaid notes on the medication’s Eligibility & insurance section. Cash cards may be restricted. TrumpRx does not decide coverage.",
        },
        {
          q: "What if I don’t have insurance?",
          a: "Uninsured / self-pay patients are often a primary audience for pharmacy cash-discount options. Check eligibility on the medication page.",
        },
        {
          q: "Who determines eligibility?",
          a: limited
            ? "TrumpRx explains typical rules. Final determination is made by the pharmacy / processor — not by TrumpRx."
            : "TrumpRx explains typical rules. Final determination is made by the pharmacy / processor or by the manufacturer program administrator — not by TrumpRx.",
        },
      ],
    },
    {
      title: "Pharmacy",
      items: [
        {
          q: "Can I use my regular pharmacy?",
          a: "Only if it participates in the specific program for that medication. Ask before you fill.",
        },
        {
          q: "Can I use CVS or Walgreens?",
          a: "Often yes for pharmacy-pickup cash options when that location is in network for the medication — confirm on the medication page and with the pharmacist.",
        },
        {
          q: "What happens if my pharmacy doesn’t accept the program?",
          a: "Try another participating pharmacy, or use Report an issue.",
        },
        {
          q: "Does TrumpRx ship medications?",
          a: limited
            ? "No. Limited v1 is pharmacy pickup only. TrumpRx does not sell or ship medications."
            : "Only when a medication’s listed pathway is manufacturer-direct or specialty. The medication page names who ships. TrumpRx itself does not ship.",
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          q: "How do I get help?",
          a: "Use the automated Help assistant (lower-right on desktop; also linked from Help). It clearly identifies itself as automated.",
        },
        {
          q: "How do I report incorrect information?",
          a: "Use Report an issue on medication, pharmacy, pricing, and access screens. You will receive a reference number.",
        },
        {
          q: "Who handles pharmacy problems?",
          a: "Start with the pharmacy that attempted the fill. Report program-information problems to TrumpRx with Report an issue.",
        },
      ],
    },
  ];
}

export default function FaqPage() {
  const limited = isLimitedV1Launch();
  const sections = buildSections(limited);

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Help
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold uppercase tracking-tight">
            FAQ
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Straight answers about what TrumpRx is — and what it is not.
            {limited ? " Answers below reflect the limited v1 launch." : ""}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-6">
        {sections.map((section) => (
          <section key={section.title} className="space-y-4">
            <h2 className="font-display text-xl font-semibold uppercase tracking-tight">
              {section.title}
            </h2>
            <ul className="space-y-4">
              {section.items.map((item) => (
                <li key={item.q} className="border-b border-border pb-4">
                  <h3 className="font-semibold">{item.q}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="text-sm text-muted-foreground">
          Still stuck?{" "}
          <Link href="/help" className="font-medium text-primary hover:underline">
            Open Help
          </Link>{" "}
          or use Report an issue on a medication page.
        </p>
      </div>
    </div>
  );
}
