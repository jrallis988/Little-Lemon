import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { PageHero, CtaRow } from "@/components/PageChrome";
import { events } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming stops for Nick Varga across New Hampshire.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        overline="Upcoming Stops"
        title="Events"
        subtitle="Where Nick will be next — town halls, meet-and-greets, and kitchen-table conversations."
      />
      <div className="mx-auto max-w-content section-pad">
        <ul className="divide-y divide-slate-line border-y border-slate-line">
          {events.map((event) => (
            <li key={event.id} className="py-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-red">
                {event.type}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink">
                {event.title}
              </h2>
              <p className="mt-2 flex items-start gap-1.5 text-base text-slate-muted">
                <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden />
                <span>
                  {event.tba ? "Date TBD · 2026" : event.date} — {event.location}
                </span>
              </p>
              <p className="mt-2 text-base text-slate-text">{event.description}</p>
            </li>
          ))}
        </ul>
        <CtaRow
          primary={{ href: "/come-to-my-town", label: "Request a Visit →" }}
          secondary={{ href: "/#join", label: "Get email updates" }}
        />
        <p className="mt-6 text-sm text-slate-muted">
          More stops will be posted here and shared on social.{" "}
          <Link href="/contact" className="font-semibold text-red underline-offset-2 hover:underline">
            Contact us
          </Link>{" "}
          with venue ideas.
        </p>
      </div>
    </>
  );
}
