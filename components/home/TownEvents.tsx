import Link from "next/link";
import { MapPin } from "lucide-react";
import { candidate } from "@/lib/candidate";
import { events } from "@/lib/events";
import { SectionIntro } from "@/components/SectionIntro";

export function TownEvents() {
  return (
    <section aria-labelledby="town-heading" className="bg-paper">
      <div className="mx-auto max-w-content section-pad">
        <SectionIntro
          overline="On the Road in New Hampshire"
          title="Want Nick in your town?"
          lead="We’re not waiting for voters to come to us. Tell us where you are — and we’ll bring the campaign to your community. Town halls, meet-and-greets, kitchen-table conversations. Your town. Your issues. Your voice."
          titleId="town-heading"
        />
        <p className="mt-4 text-body-lg font-semibold text-slate-text">
          Nick has committed to visiting every one of New Hampshire’s{" "}
          {candidate.townsCommitment} towns and cities before Election Day.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/come-to-my-town" className="btn-primary">
            Request a Visit →
          </Link>
          <Link href="/how-to-vote" className="btn-secondary">
            How to Vote Write-In
          </Link>
        </div>

        <div className="mt-14">
          <span className="accent-line" aria-hidden />
          <p className="section-overline">Upcoming Stops</p>
          <h3 className="section-headline !text-[clamp(1.4rem,2.4vw,1.9rem)]">
            Where Nick will be next
          </h3>
          <ul className="mt-6 divide-y divide-slate-line border-y border-slate-line">
            {events.map((event) => (
              <li key={event.id} className="py-4">
                <p className="font-semibold text-ink">
                  {event.tba ? "Date TBD · 2026" : event.date} — {event.title}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-body-sm text-slate-muted">
                  <MapPin className="h-3.5 w-3.5 text-red" aria-hidden />
                  {event.location}
                  {event.description ? ` — ${event.description}` : ""}
                </p>
              </li>
            ))}
          </ul>
          <Link href="/events" className="link-cta mt-5">
            All Events →
          </Link>
        </div>
      </div>
    </section>
  );
}
