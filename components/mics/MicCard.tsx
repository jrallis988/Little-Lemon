import Link from "next/link";
import { format } from "date-fns";
import { MapPin } from "lucide-react";
import { getComic, getVenue } from "@/lib/mock/data";
import type { MicNight } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export function MicCard({ mic, index = 0 }: { mic: MicNight; index?: number }) {
  const venue = getVenue(mic.venueId);
  const host = getComic(mic.hostId);
  if (!venue || !host) return null;

  return (
    <article
      className="animate-rise hairline rounded-xl bg-velvet/80 p-4"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-spotlight">
            {format(new Date(mic.startsAt), "EEE · h:mma")}
          </p>
          <h2 className="mt-1 font-display text-2xl uppercase tracking-[0.04em]">
            {mic.title}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-smoke">
            <MapPin className="h-3.5 w-3.5" />
            {venue.name} · {venue.neighborhood}
          </p>
        </div>
        <div className="rounded-md bg-stage px-2.5 py-2 text-center hairline">
          <div className="font-display text-2xl text-spotlight">{mic.slotsLeft}</div>
          <div className="text-[10px] uppercase tracking-[0.12em] text-smoke">slots</div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-mic">{mic.notes}</p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <Link href={`/u/${host.username}`} className="text-xs text-smoke hover:text-foam">
          Hosted by {host.displayName}
        </Link>
        <Button size="sm">Claim slot</Button>
      </div>
    </article>
  );
}
