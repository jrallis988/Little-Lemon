import Link from "next/link";
import { MapPin } from "lucide-react";
import { candidate } from "@/lib/candidate";
import { events } from "@/lib/events";

export function TownEvents() {
  return (
    <section
      aria-labelledby="town-heading"
      className="bg-mist"
    >
      <div className="mx-auto max-w-content section-pad">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine-600">
          On the Road in New Hampshire
        </p>
        <h2
          id="town-heading"
          className="mt-2 font-serif text-3xl font-bold text-granite-800 sm:text-4xl"
        >
          Want Nick in your town?
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-granite-600">
          We’re not waiting for voters to come to us. Tell us where you are — and
          we’ll bring the campaign to your community. Town halls, meet-and-greets,
          kitchen-table conversations. Your town. Your issues. Your voice.
        </p>
        <p className="mt-4 text-base font-semibold text-granite-700">
          Nick has committed to visiting every one of New Hampshire’s{" "}
          {candidate.townsCommitment} towns and cities before Election Day.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/come-to-my-town" className="btn-primary">
            Request a Visit →
          </Link>
          <Link href="/how-to-vote" className="btn-outline">
            How to Vote Write-In
          </Link>
        </div>

        <div className="mt-14">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-granite-500">
            Upcoming Stops
          </p>
          <h3 className="mt-2 font-serif text-2xl font-bold text-granite-800">
            Where Nick will be next
          </h3>
          <ul className="mt-5 divide-y divide-granite-200 border-y border-granite-200">
            {events.map((event) => (
              <li key={event.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-granite-800">
                    {event.tba ? "Date TBD · 2026" : event.date} — {event.title}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-granite-500">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {event.location}
                    {event.description ? ` — ${event.description}` : ""}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/events"
            className="mt-5 inline-flex text-sm font-semibold text-pine-700 underline-offset-2 hover:underline"
          >
            All Events →
          </Link>
        </div>
      </div>
    </section>
  );
}
