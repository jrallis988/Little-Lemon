import type { Metadata } from "next";
import { PageHero, CtaRow } from "@/components/PageChrome";
import { endorsements } from "@/lib/endorsements";

export const metadata: Metadata = {
  title: "Endorsements",
  description:
    "Supporters and endorsers standing with Nick Varga for U.S. Senate.",
};

export default function EndorsementsPage() {
  return (
    <>
      <PageHero
        overline="Supporters"
        title="Endorsements"
        subtitle="Named endorsements from real New Hampshire supporters will appear here as they are confirmed."
      />
      <div className="mx-auto max-w-content section-pad">
        <ul className="grid gap-5 md:grid-cols-3">
          {endorsements.map((item) => (
            <li
              key={item.id}
              className="border border-dashed border-slate-line bg-white p-6"
            >
              <p className="font-display text-lg italic leading-relaxed text-slate-text">
                “{item.quote}”
              </p>
              <p className="mt-4 text-sm font-semibold text-ink">
                {item.name}
              </p>
              <p className="text-sm text-slate-muted">{item.role}</p>
            </li>
          ))}
        </ul>
        <CtaRow
          primary={{ href: "/contact", label: "Offer an endorsement" }}
          secondary={{ href: "/volunteer", label: "Volunteer instead" }}
        />
      </div>
    </>
  );
}
