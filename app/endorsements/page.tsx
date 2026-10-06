import type { Metadata } from "next";
import { PageHero, CtaRow } from "@/components/PageChrome";
import { endorsements } from "@/lib/endorsements";
import { PortfolioDisclaimer } from "@/components/PortfolioDisclaimer";

export const metadata: Metadata = {
  title: "Endorsements",
  description: "Supporters and endorsers standing with Varga for Senate.",
};

export default function EndorsementsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Endorsements" },
        ]}
        overline="Supporters"
        title="Endorsements"
        subtitle="Neighbors and leaders standing with Nick."
      />
      <div className="mx-auto max-w-content section-pad">
        <ul className="grid gap-5 md:grid-cols-3">
          {endorsements.map((item) => (
            <li key={item.id} className="border border-slate-line bg-white p-6">
              <p className="font-display text-lg italic leading-relaxed text-slate-text">
                “{item.quote}”
              </p>
              <p className="mt-4 text-sm font-semibold text-ink">{item.name}</p>
              <p className="text-sm text-slate-muted">{item.role}</p>
            </li>
          ))}
        </ul>
        <PortfolioDisclaimer className="mt-8 text-sm text-slate-muted" />
        <CtaRow
          primary={{ href: "/contact", label: "Offer an endorsement" }}
          secondary={{ href: "/volunteer", label: "Volunteer instead" }}
        />
      </div>
    </>
  );
}
