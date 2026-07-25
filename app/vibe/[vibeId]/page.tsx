"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BellPlus, MapPin, Radio, Send, Share2, UsersRound } from "lucide-react";

import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import {
  vibeMoments,
  vibeProfiles,
  vibeSchools,
} from "@/lib/mock/vibe-social";
import type { Profile, VibeMoment } from "@/lib/types";
import { useAuth } from "@/lib/auth/AuthProvider";
import { formatDateTime, formatRelativeTime } from "@/lib/utils";

type LocalUpdate = VibeMoment["updates"][number];

function profileMap(profiles: Profile[]) {
  return profiles.reduce<Record<string, Profile>>((acc, profile) => {
    acc[profile.userId] = profile;
    return acc;
  }, {});
}

function VibeDetailContent() {
  const params = useParams<{ vibeId: string }>();
  const { profile } = useAuth();
  const vibe = vibeMoments.find((item) => item.id === params.vibeId);
  const profilesByUserId = useMemo(() => profileMap(vibeProfiles), []);
  const currentProfile =
    vibeProfiles.find((item) => item.userId === profile?.userId) ?? profile;
  const [notice, setNotice] = useState("");
  const [body, setBody] = useState("");
  const [localUpdates, setLocalUpdates] = useState<LocalUpdate[]>([]);

  if (!vibe) {
    return (
      <AuthenticatedShell mainClassName="max-w-3xl">
        <div className="rounded-[24px] border border-surface-border bg-white p-6 text-center shadow-card">
          <h1 className="font-display text-3xl font-black text-navy-900">
            Vibe not found
          </h1>
          <p className="mt-2 text-navy-600">That moment is not in the demo Loop.</p>
          <Link
            href="/home"
            className="mt-4 inline-flex rounded-full bg-[#FF5C00] px-5 py-3 text-sm font-black text-white hover:bg-[#FF6A1A] hover:no-underline"
          >
            Back to Loop
          </Link>
        </div>
      </AuthenticatedShell>
    );
  }

  const host = profilesByUserId[vibe.hostId];
  const school = vibe.schoolId
    ? vibeSchools.find((item) => item.id === vibe.schoolId)
    : undefined;
  const attendeeProfiles = vibe.attendeeIds
    .map((id) => profilesByUserId[id])
    .filter((item): item is Profile => Boolean(item));
  const hereNowProfiles = vibe.hereNowIds
    .map((id) => profilesByUserId[id])
    .filter((item): item is Profile => Boolean(item));
  const allUpdates = [...localUpdates, ...vibe.updates];
  const live = vibe.status === "live";

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  const postUpdate = () => {
    if (!body.trim() || !currentProfile) {
      notify("Write a quick update first.");
      return;
    }
    setLocalUpdates([
      {
        id: `local-${Date.now()}`,
        authorId: currentProfile.userId,
        body: body.trim(),
        createdAt: new Date().toISOString(),
      },
      ...localUpdates,
    ]);
    setBody("");
    notify("Update posted to this vibe.");
  };

  return (
    <AuthenticatedShell mainClassName="max-w-6xl bg-zinc-950 text-white">
      <div className="space-y-5">
        <section className="overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="relative h-[360px]">
            <img src={vibe.coverUrl} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              <Badge className="border-white/15 bg-[#FF5C00] text-white">
                <Radio className={live ? "h-3 w-3 animate-pulse" : "h-3 w-3"} aria-hidden />
                {live ? "LIVE" : vibe.status === "starting_soon" ? "Starting soon" : "Ended"}
              </Badge>
              <Badge className="border-white/15 bg-black/55 text-white">
                {vibe.visibility}
              </Badge>
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#FFB68A]">
                {school?.name ?? "Vibe Loop"}
              </p>
              <h1 className="mt-2 max-w-3xl font-display text-4xl font-black text-white sm:text-6xl">
                {vibe.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-[#FF6A1A]" aria-hidden />
                  {vibe.locationName}
                </span>
                <span>{formatDateTime(vibe.startsAt)}</span>
                {host ? <span>Hosted by {host.displayName}</span> : null}
              </div>
            </div>
          </div>
        </section>

        {notice ? (
          <div className="rounded-[18px] border border-[#FF6A1A]/40 bg-[#FF5C00] px-4 py-3 text-sm font-black text-white">
            {notice}
          </div>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <main className="space-y-5">
            <section className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <h2 className="font-display text-2xl font-black text-white">
                Live details
              </h2>
              <p className="mt-3 leading-7 text-zinc-300">{vibe.description}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button
                  className="rounded-full border-[#FF6A1A] bg-[#FF5C00] text-white hover:bg-[#FF6A1A]"
                  onClick={() =>
                    notify(live ? "You are marked here." : "Reminder saved.")
                  }
                >
                  {live ? "I'm here" : "Remind me"}
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/15"
                  onClick={() => notify("Invite link copied for your friends.")}
                >
                  <Share2 className="h-4 w-4" aria-hidden />
                  Invite
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full text-zinc-200 hover:bg-white/10"
                  onClick={() => notify("You will get updates from this vibe.")}
                >
                  <BellPlus className="h-4 w-4" aria-hidden />
                  Follow updates
                </Button>
              </div>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <h2 className="font-display text-2xl font-black text-white">
                Updates
              </h2>
              <div className="mt-4 space-y-3">
                <Textarea
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  placeholder="Drop a quick update for everyone joining..."
                  className="min-h-24 border-white/10 bg-black/30 text-white placeholder:text-zinc-500"
                />
                <Button
                  className="rounded-full border-[#FF6A1A] bg-[#FF5C00] text-white hover:bg-[#FF6A1A]"
                  onClick={postUpdate}
                >
                  <Send className="h-4 w-4" aria-hidden />
                  Post update
                </Button>
              </div>

              <div className="mt-6 space-y-4">
                {allUpdates.map((update) => {
                  const author = profilesByUserId[update.authorId];
                  return (
                    <article
                      key={update.id}
                      className="rounded-[20px] border border-white/10 bg-black/25 p-4"
                    >
                      <div className="flex gap-3">
                        {author ? (
                          <Avatar
                            name={author.displayName}
                            src={author.avatarUrl}
                            size="sm"
                          />
                        ) : null}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-black text-white">
                              {author?.displayName ?? "Vibe update"}
                            </p>
                            <span className="text-xs text-zinc-500">
                              {formatRelativeTime(update.createdAt)}
                            </span>
                          </div>
                          <p className="mt-2 leading-6 text-zinc-300">{update.body}</p>
                          {update.photoUrl ? (
                            <img
                              src={update.photoUrl}
                              alt=""
                              className="mt-3 max-h-56 w-full rounded-[18px] object-cover"
                              loading="lazy"
                            />
                          ) : null}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </main>

          <aside className="space-y-5">
            <section className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <h2 className="flex items-center gap-2 font-display text-2xl font-black text-white">
                <UsersRound className="h-5 w-5 text-[#FF6A1A]" aria-hidden />
                Who&apos;s here
              </h2>
              <div className="mt-4 space-y-3">
                {(hereNowProfiles.length ? hereNowProfiles : attendeeProfiles).map(
                  (attendee) => (
                    <Link
                      key={attendee.id}
                      href={`/profile/${attendee.username}`}
                      className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-black/25 p-3 hover:border-[#FF6A1A]/60 hover:no-underline"
                    >
                      <Avatar
                        name={attendee.displayName}
                        src={attendee.avatarUrl}
                        size="sm"
                        online={vibe.hereNowIds.includes(attendee.userId)}
                        showOnlineIndicator
                      />
                      <span className="min-w-0">
                        <span className="block truncate font-black text-white">
                          {attendee.displayName}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {vibe.hereNowIds.includes(attendee.userId)
                            ? "Here now"
                            : "Interested"}
                        </span>
                      </span>
                    </Link>
                  )
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </AuthenticatedShell>
  );
}

export default function VibeDetailPage() {
  return (
    <RequireAuth>
      <VibeDetailContent />
    </RequireAuth>
  );
}
