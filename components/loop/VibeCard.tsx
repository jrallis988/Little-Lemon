"use client";

import Link from "next/link";
import { MapPin, Radio, Users } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Profile, School, VibeMoment } from "@/lib/types";
import { cn, formatDateTime, formatRelativeTime } from "@/lib/utils";

function statusLabel(vibe: VibeMoment) {
  if (vibe.status === "live") return "LIVE";
  if (vibe.status === "starting_soon") return "Starting soon";
  return "Ended";
}

export function VibeCard({
  vibe,
  profiles,
  school,
  onJoin,
  compact = false,
  className,
}: {
  vibe: VibeMoment;
  profiles: Profile[];
  school?: School;
  onJoin?: (vibe: VibeMoment) => void;
  compact?: boolean;
  className?: string;
}) {
  const host = profiles.find((profile) => profile.userId === vibe.hostId);
  const attendees = vibe.attendeeIds
    .map((id) => profiles.find((profile) => profile.userId === id))
    .filter((profile): profile is Profile => Boolean(profile));
  const hereNow = vibe.hereNowIds
    .map((id) => profiles.find((profile) => profile.userId === id))
    .filter((profile): profile is Profile => Boolean(profile));
  const live = vibe.status === "live";

  return (
    <article
      className={cn(
        "overflow-hidden rounded-[20px] border border-white/10 bg-zinc-950 text-white shadow-[0_18px_60px_rgba(0,0,0,0.32)]",
        compact ? "min-w-[280px]" : "min-w-[310px]",
        className
      )}
    >
      <Link href={`/vibe/${vibe.id}`} className="block hover:no-underline">
        <div className={cn("relative", compact ? "h-36" : "h-44")}>
          <img
            src={vibe.coverUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge
              className={cn(
                "border-white/15 text-white",
                live ? "bg-[#FF5C00]" : "bg-black/60"
              )}
            >
              <Radio className={cn("h-3 w-3", live && "animate-pulse")} aria-hidden />
              {statusLabel(vibe)}
            </Badge>
            <Badge className="border-white/15 bg-black/55 text-white">
              {vibe.visibility}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#FFB68A]">
              {school?.name ?? "Vibe Loop"}
            </p>
            <h3 className="mt-1 line-clamp-2 font-display text-xl font-black text-white">
              {vibe.title}
            </h3>
          </div>
        </div>
      </Link>

      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3 text-sm text-zinc-300">
          <div className="min-w-0 space-y-1">
            <p className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#FF6A1A]" aria-hidden />
              <span className="truncate">{vibe.locationName}</span>
            </p>
            <p className="text-xs text-zinc-500">
              {live ? formatRelativeTime(vibe.startsAt) : formatDateTime(vibe.startsAt)}
              {vibe.distanceLabel ? ` · ${vibe.distanceLabel}` : ""}
            </p>
          </div>
          {host ? (
            <Avatar
              name={host.displayName}
              src={host.avatarUrl}
              size="sm"
              className="border-white/20"
            />
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex -space-x-2">
              {attendees.slice(0, 5).map((profile) => (
                <Avatar
                  key={profile.id}
                  name={profile.displayName}
                  src={profile.avatarUrl}
                  size="xs"
                  className="border-2 border-zinc-950"
                />
              ))}
            </div>
            <p className="mt-2 flex items-center gap-1 text-xs font-bold text-zinc-400">
              <Users className="h-3.5 w-3.5" aria-hidden />
              {hereNow.length > 0
                ? `${hereNow.length} here now`
                : `${attendees.length} planning to go`}
            </p>
          </div>
          <Button
            size="sm"
            className="rounded-full border-[#FF6A1A] bg-[#FF5C00] px-4 text-white hover:bg-[#FF6A1A]"
            onClick={() => onJoin?.(vibe)}
          >
            {live ? "Join" : "Remind me"}
          </Button>
        </div>
      </div>
    </article>
  );
}
