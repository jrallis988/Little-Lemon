"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, School2 } from "lucide-react";

import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  scheduledSchoolEvents,
  vibeMoments,
  vibeProfiles,
  vibeSchools,
} from "@/lib/mock/vibe-social";
import { useAuth } from "@/lib/auth/AuthProvider";
import { formatDateTime } from "@/lib/utils";

function EventsContent() {
  const { profile } = useAuth();
  const [notice, setNotice] = useState("");
  const currentProfile =
    vibeProfiles.find((item) => item.userId === profile?.userId) ?? profile;

  const upcomingVibes = useMemo(
    () =>
      vibeMoments
        .filter((vibe) => vibe.status !== "ended")
        .map((vibe) => ({
          id: vibe.id,
          title: vibe.title,
          startsAt: vibe.startsAt,
          locationName: vibe.locationName,
          schoolId: vibe.schoolId,
          category: vibe.category,
          attendeeIds: vibe.attendeeIds,
          href: `/vibe/${vibe.id}`,
          source: "vibe" as const,
        })),
    []
  );

  const events = [...upcomingVibes, ...scheduledSchoolEvents.map((event) => ({
    ...event,
    href: "/events",
    source: "school" as const,
  }))].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
  );

  return (
    <AuthenticatedShell mainClassName="max-w-6xl">
      <div className="space-y-6">
        <section className="rounded-[28px] bg-zinc-950 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.25)] sm:p-7">
          <Badge className="border-brand-light/40 bg-brand/15 text-brand-soft">
            <CalendarDays className="h-3 w-3" aria-hidden />
            School-connected events
          </Badge>
          <h1 className="mt-4 font-display text-4xl font-black sm:text-5xl">
            What is coming up?
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            Upcoming school moments, official-ish reminders, and live vibes worth
            showing up for.
          </p>
        </section>

        {notice ? (
          <div className="rounded-[18px] border border-brand-light/30 bg-brand px-4 py-3 text-sm font-black text-white">
            {notice}
          </div>
        ) : null}

        <section className="grid gap-4">
          {events.map((event) => {
            const school = event.schoolId
              ? vibeSchools.find((item) => item.id === event.schoolId)
              : undefined;
            const isMine = event.schoolId === currentProfile?.schoolId;
            return (
              <article
                key={event.id}
                className="rounded-[24px] border border-surface-border bg-white p-4 shadow-card transition hover:border-brand-light/50 sm:p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        className={
                          event.source === "vibe"
                            ? "border-brand-light/30 bg-brand/10 text-brand-dark"
                            : undefined
                        }
                      >
                        {event.source === "vibe" ? "Vibe" : "Event"}
                      </Badge>
                      {isMine ? (
                        <Badge variant="success">
                          <School2 className="h-3 w-3" aria-hidden />
                          Your school
                        </Badge>
                      ) : null}
                    </div>
                    <h2 className="mt-3 font-display text-2xl font-black text-navy-900">
                      {event.source === "vibe" ? (
                        <Link
                          href={event.href}
                          className="hover:text-brand hover:no-underline"
                        >
                          {event.title}
                        </Link>
                      ) : (
                        event.title
                      )}
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-navy-600">
                      <span>{formatDateTime(event.startsAt)}</span>
                      {event.source === "vibe" ? (
                        <Link
                          href={event.href}
                          className="inline-flex items-center gap-1 hover:text-brand hover:no-underline"
                        >
                          <MapPin className="h-4 w-4 text-brand" aria-hidden />
                          {event.locationName}
                        </Link>
                      ) : (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-brand" aria-hidden />
                          {event.locationName}
                        </span>
                      )}
                      {school ? <span>{school.name}</span> : null}
                    </div>
                  </div>
                  <Button
                    className="rounded-full border-brand-light bg-brand text-white hover:bg-brand-light"
                    onClick={() => setNotice(`RSVP saved for ${event.title}.`)}
                  >
                    RSVP
                  </Button>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </AuthenticatedShell>
  );
}

export default function EventsPage() {
  return (
    <RequireAuth>
      <EventsContent />
    </RequireAuth>
  );
}
