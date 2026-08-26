import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Practical answers about TrumpRx coverage, costs, eligibility, pharmacies, delivery, and support.",
};

type FaqItem = { q: string; a: string };
type FaqSection = { title: string; items: FaqItem[] };

const SECTIONS: FaqSection[] = [
  {
    title: "About TrumpRx",
    items: [
      {
        q: "What is TrumpRx?",
        a: "TrumpRx is a medication savings, eligibility, comparison, and access platform for select medications. It helps you see whether a pricing option is available, compare it with what you currently pay, understand eligibility, and learn how to obtain the medication.",
      },
      {
        q: "What does TrumpRx actually do?",
        a: "TrumpRx guides the decision: coverage check → medication details → price comparison → eligibility notes → clear access pathway (participating pharmacy or manufacturer-direct). It does not replace your clinician, insurer, or pharmacy.",
      },
      {
        q: "Does TrumpRx sell medications?",
        a: "No. TrumpRx does not sell, dispense, or ship medications. Payment and fulfillment happen at a participating pharmacy or through a manufacturer program, depending on the medication.",
      },
      {
        q: "Is TrumpRx a pharmacy?",
        a: "No. TrumpRx is not a pharmacy and is not a replacement for CVS, Walgreens, GoodRx, or your existing pharmacy.",
      },
      {
        q: "Why aren’t all medications included?",
        a: "TrumpRx currently supports a limited selection of medications. Only listed medications have a program option. Coverage may expand over time, but the product never promises savings on every prescription.",
      },
    ],
  },
  {
    title: "Costs",
    items: [
      {
        q: "Do I have to pay TrumpRx?",
        a: "Using TrumpRx to check coverage and compare options does not mean TrumpRx is charging you for the medication. Optional membership tools may exist for account features — that is separate from paying for a prescription. “Free to use” does not mean medications are free.",
      },
      {
        q: "Is there a subscription or membership fee?",
        a: "Core coverage check and medication information are available without buying a medication from TrumpRx. If a membership tier is offered, it is for optional account tools (saved items, reminders) — not a promise that drugs are free.",
      },
      {
        q: "Who receives payment for medications?",
        a: "The pharmacy (for pickup cash-discount fills) or the manufacturer / specialty partner (for manufacturer-direct programs) — not TrumpRx as the seller of the drug.",
      },
    ],
  },
  {
    title: "Medication",
    items: [
      {
        q: "Is this the brand-name medication?",
        a: "Each medication page states whether you are receiving a brand-name, generic, or compounded product under the TrumpRx option. Do not assume it matches whatever your usual pharmacy would dispense without reading that section.",
      },
      {
        q: "Are generics offered?",
        a: "Yes, when the listed TrumpRx option is for a generic product. The medication page labels this clearly.",
      },
      {
        q: "Are compounded medications offered?",
        a: "Only if a listed option is explicitly labeled as compounded. Most current listings are brand or generic products.",
      },
      {
        q: "Why isn’t my medication included?",
        a: "It is outside the current select program. You can request the medication for future consideration and browse medications that are included today.",
      },
      {
        q: "How are medications added?",
        a: "TrumpRx evaluates program options over time. Submitting a request does not guarantee addition; it helps prioritize review. We do not use vague promises like “many more drugs are coming soon.”",
      },
    ],
  },
  {
    title: "Insurance & eligibility",
    items: [
      {
        q: "Can I use insurance?",
        a: "It depends on the medication pathway. Cash-discount pharmacy options generally cannot be combined with insurance on the same fill — compare which costs less. Manufacturer programs often have their own insurance rules.",
      },
      {
        q: "What if I have Medicare?",
        a: "Read the Medicare notes on the medication’s Eligibility & insurance section. Many manufacturer programs exclude Medicare; pharmacy cash cards may also be restricted. TrumpRx does not decide Medicare coverage.",
      },
      {
        q: "What if I have Medicaid?",
        a: "Medicaid usually follows state Medicaid pharmacy rules. Cash programs typically cannot replace a Medicaid claim. See the medication eligibility section.",
      },
      {
        q: "What if I don’t have insurance?",
        a: "Uninsured / self-pay patients are often a primary audience for pharmacy cash-discount options. Manufacturer programs vary — check eligibility on the medication page.",
      },
      {
        q: "Who determines eligibility?",
        a: "TrumpRx explains typical rules. Final determination is made by the pharmacy / processor or by the manufacturer program administrator — not by TrumpRx pretending to adjudicate eligibility.",
      },
    ],
  },
  {
    title: "Pharmacy",
    items: [
      {
        q: "Can I use my regular pharmacy?",
        a: "Only if it participates in the specific program for that medication. Ask before you fill. The medication page explains whether retail pickup applies.",
      },
      {
        q: "Can I use CVS?",
        a: "Often yes for pharmacy-pickup cash options when that location is in network for the medication — confirm on the medication page and with the pharmacist.",
      },
      {
        q: "Can I use Walgreens?",
        a: "Same as CVS: many locations accept participating cash programs when in network. Manufacturer-direct medications usually are not filled as a simple retail Walgreens cash coupon.",
      },
      {
        q: "What happens if my pharmacy doesn’t accept the program?",
        a: "Try another participating pharmacy, or use Report an issue. For manufacturer-direct medications, retail rejection is expected — follow the manufacturer pathway instead.",
      },
    ],
  },
  {
    title: "Delivery",
    items: [
      {
        q: "Who ships my medication?",
        a: "Only when the pathway is manufacturer-direct or specialty. The medication page names who ships. TrumpRx does not ship medications.",
      },
      {
        q: "How long does shipping take?",
        a: "Typical timing is listed on the medication’s fulfillment section and varies by manufacturer / specialty partner.",
      },
      {
        q: "Is expedited delivery available?",
        a: "Only if the fulfilling organization offers it. TrumpRx does not control shipping speed.",
      },
      {
        q: "Can I track my medication?",
        a: "Tracking comes from the manufacturer or specialty shipper’s confirmation — not from a TrumpRx package tracker.",
      },
      {
        q: "Who do I contact if my medication doesn’t arrive?",
        a: "Contact the shipper / manufacturer program listed on your enrollment confirmation. Use Report an issue on TrumpRx if program information on our site looks wrong.",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        q: "How do I get help?",
        a: "Use the automated Help assistant (lower-right on desktop; also linked from Help). It clearly identifies itself as automated. For account or ops issues, signed-in support tools may also apply.",
      },
      {
        q: "How do I report incorrect information?",
        a: "Use Report an issue on medication, pharmacy, pricing, and access screens. You will receive a reference number.",
      },
      {
        q: "Who handles pharmacy problems?",
        a: "Start with the pharmacy that attempted the fill. Report program-information problems to TrumpRx with Report an issue.",
      },
      {
        q: "Who handles manufacturer or shipping problems?",
        a: "The manufacturer program or shipper. TrumpRx can take reports about incorrect site information but does not operate their fulfillment desk.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Help center
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold uppercase tracking-tight">
            FAQ
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Practical answers — not promotional copy. Still stuck?{" "}
            <Link href="/help" className="font-medium text-primary hover:underline">
              Open Help
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-6">
        {SECTIONS.map((section) => (
          <section key={section.title} aria-labelledby={section.title}>
            <h2
              id={section.title}
              className="font-display text-xl font-semibold uppercase tracking-tight"
            >
              {section.title}
            </h2>
            <div className="mt-3 divide-y divide-border border border-border bg-card">
              {section.items.map((item) => (
                <details key={item.q} className="group px-4 py-3">
                  <summary className="cursor-pointer list-none text-sm font-semibold marker:content-none">
                    {item.q}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
