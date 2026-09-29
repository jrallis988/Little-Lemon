import { useEffect, useState } from "react";
import { EventItem, weeklyEvents as fallback } from "../data/events";
import { asset } from "../lib/asset";

type EventsPayload = {
  weeklyEvents: EventItem[];
};

export function useWeeklyEvents() {
  const [weeklyEvents, setWeeklyEvents] = useState<EventItem[]>(fallback);

  useEffect(() => {
    let cancelled = false;

    fetch(asset("data/events.json"), { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: EventsPayload) => {
        if (cancelled) return;
        if (Array.isArray(data.weeklyEvents) && data.weeklyEvents.length) {
          setWeeklyEvents(data.weeklyEvents);
        }
      })
      .catch(() => {
        /* keep bundled fallbacks */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return weeklyEvents;
}
