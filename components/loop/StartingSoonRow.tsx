"use client";

import Link from "next/link";
import { Clock3 } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import type { Profile, VibeMoment } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

export function StartingSoonRow({
  vibes,
  profiles,
  onRemind,
}: {
  vibes: VibeMoment[];
  profiles: Profile[];
  onRemind: (vibe: VibeMoment) => void;
}) {
  return (
    <div className="space-y-3">
      {vibes.map((vibe) => {
        const host = profiles.find((profile) => profile.userId === vibe.hostId);
        return (
          <article
            key={vibe.id}
            className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.04] p-3 text-white"
          >
            <Link
              href={`/vibe/${vibe.id}`}
              className="flex min-w-0 flex-1 items-center gap-3 hover:no-underline"
            >
              <div className="h-14 w-14 overflow-hidden rounded-[16px] bg-zinc-900">
                <img
                  src={vibe.coverUrl}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-black text-white">{vibe.title}</h3>
                <p className="mt-1 flex items-center gap-1 text-xs text-zinc-400">
                  <Clock3 className="h-3.5 w-3.5 text-brand-light" aria-hidden />
                  {formatDateTime(vibe.startsAt)}
                </p>
                <p className="mt-1 truncate text-xs text-zinc-500">
                  {vibe.locationName}
                </p>
              </div>
            </Link>
            {host ? (
              <Avatar name={host.displayName} src={host.avatarUrl} size="xs" />
            ) : null}
            <Button
              size="sm"
              className="rounded-full border-brand-light bg-brand text-white hover:bg-brand-light"
              onClick={() => onRemind(vibe)}
            >
              Remind
            </Button>
          </article>
        );
      })}
    </div>
  );
}
