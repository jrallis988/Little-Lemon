import type { Metadata } from "next";
import { PageHero, CtaRow } from "@/components/PageChrome";
import { endorsements } from "@/lib/endorsements";

export const metadata: Metadata = {
  title: "Endorsements",
  description: "Supporters and endorsers standing with Varga for Senate.",
};

export default function EndorsementsPage() {
  const confirmed = endorsements.filter((item) => !item.placeholder);
  const waiting = confirmed.length === 0;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Endorsements" },
        ]}
        overline="Supporters"
        title="Endorsements"
        subtitle={
          waiting
            ? "Named endorsements from real New Hampshire supporters will appear here as they are confirmed."
            : "Neighbors and leaders standing with Nick."
        }
      />
      <div className="mx-auto max-w-content section-pad">
        {waiting ? (
          <div className="border border-dashed border-slate-line bg-paper px-6 py-10 text-center">
            <p className="font-display text-xl font-bold text-ink">
              Endorsements coming soon
            </p>
            <p className="mx-auto mt-3 max-w-xl text-base text-slate-muted">
              This page is ready for real names, titles, and quotes. Until the
              campaign confirms them, we are not showing placeholder
              testimonials.
            </p>
          </div>
        ) : (
          <ul className="grid gap-5 md:grid-cols-3">
            {confirmed.map((item) => (
              <li
                key={item.id}
                className="border border-slate-line bg-white p-6"
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
        )}
        <CtaRow
          primary={{ href: "/contact", label: "Offer an endorsement" }}
          secondary={{ href: "/volunteer", label: "Volunteer instead" }}
        />
      </div>
    </>
  );
}
