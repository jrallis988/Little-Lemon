"use client";

import { useMemo, useState } from "react";
import { CalendarPlus, MapPin } from "lucide-react";
import {
  buildGoogleCalendarUrl,
  buildIcsDataUri,
  events,
  formatEventDate,
  type NhRegion,
} from "@/lib/events";

const regions: Array<"All" | NhRegion> = [
  "All",
  "Rockingham",
  "Hillsborough",
  "Grafton",
  "Merrimack",
  "Strafford",
  "Carroll",
];

export function Events() {
  const [region, setRegion] = useState<"All" | NhRegion>("All");
  const [sort, setSort] = useState<"soonest" | "latest">("soonest");

  const filtered = useMemo(() => {
    const list =
      region === "All"
        ? [...events]
        : events.filter((e) => e.region === region);
    list.sort((a, b) =>
      sort === "soonest"
        ? a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
        : b.date.localeCompare(a.date) || b.time.localeCompare(a.time)
    );
    return list;
  }, [region, sort]);

  return (
    <section
      id="events"
      aria-labelledby="events-heading"
      className="scroll-mt-20 bg-snow"
    >
      <div className="mx-auto max-w-content section-pad">
        <h2 id="events-heading" className="section-title">
          Town Halls & Meetups
        </h2>
        <p className="section-lead">
          Meet neighbors across New Hampshire counties. Filter by region, then
          add an event to your calendar.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
          <div className="min-w-[12rem] flex-1 sm:max-w-xs">
            <label htmlFor="region-filter" className="label-field">
              Region / County
            </label>
            <select
              id="region-filter"
              className="input-field"
              value={region}
              onChange={(e) => setRegion(e.target.value as "All" | NhRegion)}
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r === "All" ? "All regions" : `${r} County`}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-[12rem] flex-1 sm:max-w-xs">
            <label htmlFor="date-sort" className="label-field">
              Sort by date
            </label>
            <select
              id="date-sort"
              className="input-field"
              value={sort}
              onChange={(e) =>
                setSort(e.target.value as "soonest" | "latest")
              }
            >
              <option value="soonest">Soonest first</option>
              <option value="latest">Latest first</option>
            </select>
          </div>
        </div>

        <ul className="mt-8 divide-y divide-granite-200 border-y border-granite-200">
          {filtered.length === 0 ? (
            <li className="py-10 text-center text-granite-500">
              No upcoming events in this region. Check back soon or choose All
              regions.
            </li>
          ) : (
            filtered.map((event) => (
              <li
                key={event.id}
                className="flex flex-col gap-4 py-6 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex gap-4">
                  <div
                    className="flex w-16 shrink-0 flex-col items-center justify-center border border-granite-200 bg-mist px-2 py-3 text-center"
                    aria-hidden
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-pine-700">
                      {formatEventDate(event.date).split(" ")[1]}
                    </span>
                    <span className="font-serif text-2xl font-bold text-granite-800">
                      {event.date.split("-")[2]}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">
                      {event.type} · {event.region} County
                    </p>
                    <h3 className="mt-1 font-serif text-xl font-bold text-granite-800">
                      {event.title}
                    </h3>
                    <p className="mt-1 flex items-start gap-1.5 text-sm text-granite-500">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0"
                        aria-hidden
                      />
                      <span>
                        {event.location}, {event.city}, NH ·{" "}
                        {formatTime(event.time)}–{formatTime(event.endTime)}
                      </span>
                    </p>
                    <p className="mt-2 max-w-xl text-base leading-relaxed text-granite-600">
                      {event.description}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                  <a
                    href={buildGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost px-4 py-2 text-sm"
                  >
                    <CalendarPlus className="h-4 w-4" aria-hidden />
                    Google Calendar
                  </a>
                  <a
                    href={buildIcsDataUri(event)}
                    download={`${event.id}.ics`}
                    className="text-sm font-semibold text-pine-700 underline-offset-2 hover:underline"
                  >
                    Download .ics
                  </a>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}

function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
}
