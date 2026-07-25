"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search, Sparkles } from "lucide-react";

import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  activityCatalog,
  vibeMoments,
  vibeProfiles,
  vibeSchools,
} from "@/lib/mock/vibe-social";
import type { VibeActivityCategory } from "@/lib/types";
import { useAuth } from "@/lib/auth/AuthProvider";
import { cn } from "@/lib/utils";

function StartVibeContent() {
  const router = useRouter();
  const { profile } = useAuth();
  const currentProfile =
    vibeProfiles.find((item) => item.userId === profile?.userId) ?? profile;
  const currentSchool = vibeSchools.find(
    (school) => school.id === currentProfile?.schoolId
  );
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<VibeActivityCategory>("skating");
  const [location, setLocation] = useState(currentSchool?.name ?? "");
  const [notice, setNotice] = useState("");

  const filteredActivities = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return activityCatalog;
    return activityCatalog.filter((activity) =>
      activity.label.toLowerCase().includes(normalized)
    );
  }, [query]);

  const startVibe = () => {
    const match =
      vibeMoments.find((vibe) => vibe.category === selected) ?? vibeMoments[0];
    setNotice(
      `Draft started for ${activityCatalog.find((item) => item.id === selected)?.label}.`
    );
    window.setTimeout(() => router.push(`/vibe/${match.id}`), 600);
  };

  return (
    <AuthenticatedShell mainClassName="max-w-5xl">
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[28px] bg-zinc-950 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-7">
          <Badge className="border-[#FF6A1A]/40 bg-[#FF5C00]/15 text-[#FFB68A]">
            <Sparkles className="h-3 w-3" aria-hidden />
            Start a Vibe
          </Badge>
          <h1 className="mt-4 font-display text-4xl font-black sm:text-5xl">
            What are you doing?
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            Pick an activity, add where it is happening, and invite verified friends
            without making it a big production.
          </p>
        </section>

        {notice ? (
          <div className="rounded-[18px] border border-[#FF6A1A]/30 bg-[#FF5C00] px-4 py-3 text-sm font-black text-white">
            {notice}
          </div>
        ) : null}

        <section className="rounded-[24px] border border-surface-border bg-white p-4 shadow-card sm:p-5">
          <label className="text-sm font-black text-navy-900" htmlFor="activity-search">
            Search activities
          </label>
          <div className="relative mt-2">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400"
              aria-hidden
            />
            <Input
              id="activity-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Skating, lunch, gaming..."
              className="pl-9"
            />
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-[24px] border border-surface-border bg-white p-4 shadow-card sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#FF5C00]">
                  Popular
                </p>
                <h2 className="font-display text-2xl font-black text-navy-900">
                  Choose a vibe
                </h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {filteredActivities
                .filter((activity) => activity.popular)
                .map((activity) => (
                  <button
                    key={activity.id}
                    type="button"
                    className={cn(
                      "rounded-[20px] border p-4 text-left transition",
                      selected === activity.id
                        ? "border-[#FF6A1A] bg-[#FF5C00] text-white shadow-[0_12px_35px_rgba(255,92,0,0.25)]"
                        : "border-surface-border bg-surface-muted text-navy-900 hover:border-[#FF6A1A]/60"
                    )}
                    onClick={() => {
                      setSelected(activity.id);
                      setNotice(`${activity.label} selected.`);
                    }}
                  >
                    <span className="text-xs font-black uppercase tracking-wide">
                      {activity.emoji}
                    </span>
                    <span className="mt-2 block font-display text-xl font-black">
                      {activity.label}
                    </span>
                  </button>
                ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[24px] border border-surface-border bg-white p-4 shadow-card">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#FF5C00]">
                More activities
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {filteredActivities
                  .filter((activity) => !activity.popular)
                  .map((activity) => (
                    <button
                      key={activity.id}
                      type="button"
                      className={cn(
                        "rounded-full border px-3 py-2 text-xs font-black transition",
                        selected === activity.id
                          ? "border-[#FF6A1A] bg-[#FF5C00] text-white"
                          : "border-surface-border bg-white text-navy-700 hover:border-[#FF6A1A]/60"
                      )}
                      onClick={() => {
                        setSelected(activity.id);
                        setNotice(`${activity.label} selected.`);
                      }}
                    >
                      {activity.label}
                    </button>
                  ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-surface-border bg-white p-4 shadow-card">
              <label className="text-sm font-black text-navy-900" htmlFor="vibe-location">
                Optional location
              </label>
              <div className="relative mt-2">
                <MapPin
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400"
                  aria-hidden
                />
                <Input
                  id="vibe-location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="School courtyard, library, online..."
                  className="pl-9"
                />
              </div>
              <Button
                className="mt-4 w-full rounded-full border-[#FF6A1A] bg-[#FF5C00] text-white hover:bg-[#FF6A1A]"
                onClick={startVibe}
              >
                Start this vibe
              </Button>
            </div>
          </aside>
        </section>
      </div>
    </AuthenticatedShell>
  );
}

export default function StartVibePage() {
  return (
    <RequireAuth>
      <StartVibeContent />
    </RequireAuth>
  );
}
