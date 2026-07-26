"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Plus, School2, ShieldCheck, Sparkles } from "lucide-react";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { LoopFilters } from "@/components/loop/LoopFilters";
import { StartingSoonRow } from "@/components/loop/StartingSoonRow";
import { VibeCard } from "@/components/loop/VibeCard";
import { Badge } from "@/components/ui/Badge";
import type { LoopFilter, School, VibeMoment } from "@/lib/types";
import {
  activityCatalog,
  vibeMoments,
  vibeProfiles,
  vibeSchools,
} from "@/lib/mock/vibe-social";
import { useAuth } from "@/lib/auth/AuthProvider";
import { cn } from "@/lib/utils";

function schoolById(schools: School[]) {
  return schools.reduce<Record<string, School>>((acc, school) => {
    acc[school.id] = school;
    return acc;
  }, {});
}

function LoopHomeContent() {
  const { profile } = useAuth();
  const [activeFilter, setActiveFilter] = useState<LoopFilter>("now");
  const [notice, setNotice] = useState("");
  const schools = useMemo(() => schoolById(vibeSchools), []);
  const currentProfile =
    vibeProfiles.find((item) => item.userId === profile?.userId) ?? profile;
  const currentSchool = currentProfile?.schoolId
    ? schools[currentProfile.schoolId]
    : vibeSchools[0];

  const filteredVibes = useMemo(() => {
    if (!currentProfile) return vibeMoments;
    if (activeFilter === "now") {
      return vibeMoments.filter((vibe) => vibe.status === "live");
    }
    if (activeFilter === "school") {
      return vibeMoments.filter((vibe) => vibe.schoolId === currentProfile.schoolId);
    }
    if (activeFilter === "nearby") {
      return vibeMoments.filter((vibe) => Boolean(vibe.distanceLabel));
    }
    return vibeMoments.filter(
      (vibe) =>
        vibe.hostId === currentProfile.userId ||
        vibe.attendeeIds.includes(currentProfile.userId)
    );
  }, [activeFilter, currentProfile]);

  const liveVibes = filteredVibes.filter((vibe) => vibe.status === "live");
  const startingSoon = vibeMoments
    .filter((vibe) => vibe.status === "starting_soon")
    .slice(0, 4);
  const schoolVibes = vibeMoments.filter(
    (vibe) => vibe.schoolId === currentProfile?.schoolId
  );

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  const joinVibe = (vibe: VibeMoment) => {
    notify(
      vibe.status === "live"
        ? `Joined ${vibe.title}. Your friends can see you are interested.`
        : `Reminder set for ${vibe.title}.`
    );
  };

  return (
    <AuthenticatedShell mainClassName="max-w-none bg-zinc-950 px-0 py-0 text-white md:pb-0">
      <div className="mx-auto min-h-[calc(100vh-3.5rem)] max-w-7xl space-y-8 px-3 py-5 sm:px-4 lg:px-6">
        <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,122,24,0.28),transparent_34%),linear-gradient(135deg,#111111,#050505)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <Badge className="border-brand-light/40 bg-brand/15 text-brand-soft">
                <ShieldCheck className="h-3 w-3" aria-hidden />
                Verified student loop
              </Badge>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight text-white sm:text-6xl">
                Real Friends. Real Moments. Real You.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
                See what is live around school, start a low-pressure plan, and join
                moments that feel more group chat than endless feed.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/vibe/new"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-light bg-brand px-5 py-3 text-sm font-black text-white shadow-[0_10px_30px_rgba(255,122,24,0.35)] hover:bg-brand-light hover:no-underline"
                >
                  <Plus className="h-4 w-4" aria-hidden />
                  Start a Vibe
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-white hover:border-brand-light/60"
                  onClick={() =>
                    notify(`Showing school-only moments for ${currentSchool?.name}.`)
                  }
                >
                  <School2 className="h-4 w-4" aria-hidden />
                  {currentSchool?.name ?? "My school"}
                </button>
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-soft">
                Popular right now
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {activityCatalog
                  .filter((item) => item.popular)
                  .slice(0, 6)
                  .map((activity) => (
                    <button
                      key={activity.id}
                      type="button"
                      className="rounded-[18px] border border-white/10 bg-black/25 p-3 text-left transition hover:border-brand-light/70"
                      onClick={() => notify(`${activity.label} vibes moved up in your Loop.`)}
                    >
                      <span className="text-[10px] font-black text-[#FF8D4D]">
                        {activity.emoji}
                      </span>
                      <span className="mt-1 block text-sm font-black text-white">
                        {activity.label}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {notice ? (
          <div className="sticky top-16 z-30 rounded-[18px] border border-brand-light/40 bg-brand px-4 py-3 text-sm font-black text-white shadow-[0_12px_40px_rgba(255,122,24,0.28)]">
            {notice}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#FF8D4D]">
              Loop feed
            </p>
            <h2 className="font-display text-3xl font-black text-white">
              Happening Now
            </h2>
          </div>
          <LoopFilters active={activeFilter} onChange={setActiveFilter} />
        </div>

        <section className="overflow-x-auto pb-2">
          <div className="flex gap-4">
            {(liveVibes.length > 0 ? liveVibes : filteredVibes).map((vibe) => (
              <VibeCard
                key={vibe.id}
                vibe={vibe}
                profiles={vibeProfiles}
                school={vibe.schoolId ? schools[vibe.schoolId] : undefined}
                onJoin={joinVibe}
              />
            ))}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#FF8D4D]">
                  Up next
                </p>
                <h2 className="font-display text-2xl font-black text-white">
                  Starting Soon
                </h2>
              </div>
              <Link
                href="/events"
                className="text-sm font-black text-[#FF8D4D] hover:text-brand-soft"
              >
                See events
              </Link>
            </div>
            <StartingSoonRow
              vibes={startingSoon}
              profiles={vibeProfiles}
              onRemind={(vibe) => notify(`Reminder set for ${vibe.title}.`)}
            />
          </section>

          <section className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
            <div className="mb-4">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#FF8D4D]">
                Around your school
              </p>
              <h2 className="font-display text-2xl font-black text-white">
                {currentSchool?.name ?? "School"} pulse
              </h2>
            </div>
            <div className="space-y-3">
              {schoolVibes.slice(0, 4).map((vibe) => (
                <Link
                  key={vibe.id}
                  href={`/vibe/${vibe.id}`}
                  className={cn(
                    "block rounded-[18px] border border-white/10 bg-black/25 p-3 hover:border-brand-light/60 hover:no-underline",
                    vibe.status === "live" && "border-brand-light/40"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-white">{vibe.title}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {vibe.locationName}
                      </p>
                    </div>
                    <Badge
                      className={
                        vibe.status === "live"
                          ? "border-brand-light/40 bg-brand text-white"
                          : "border-white/10 bg-white/5 text-zinc-300"
                      }
                    >
                      {vibe.status === "live" ? "LIVE" : "soon"}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-[#FF8D4D]">
                <Sparkles className="h-4 w-4" aria-hidden />
                Not a copy-paste feed
              </p>
              <h2 className="mt-2 font-display text-2xl font-black text-white">
                Start something your real circle can actually join.
              </h2>
            </div>
            <Link
              href="/groups"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-white hover:border-brand-light/60 hover:no-underline"
            >
              Browse Groups & Circles
            </Link>
          </div>
        </section>
      </div>
    </AuthenticatedShell>
  );
}

export default function HomePage() {
  return (
    <RequireAuth>
      <LoopHomeContent />
    </RequireAuth>
  );
}
