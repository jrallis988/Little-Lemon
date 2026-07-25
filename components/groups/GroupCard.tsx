"use client";

import Link from "next/link";
import { Lock, School, UsersRound } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { CircleGroup, Profile, School as SchoolType } from "@/lib/types";

export function GroupCard({
  group,
  profiles,
  school,
  isMember,
  onJoin,
}: {
  group: CircleGroup;
  profiles: Profile[];
  school?: SchoolType;
  isMember?: boolean;
  onJoin: (group: CircleGroup) => void;
}) {
  const members = group.memberIds
    .map((id) => profiles.find((profile) => profile.userId === id))
    .filter((profile): profile is Profile => Boolean(profile));

  return (
    <article className="overflow-hidden rounded-[20px] border border-surface-border bg-white shadow-card">
      <Link href={`/groups/${group.id}`} className="block hover:no-underline">
        <div className="relative h-36">
          <img
            src={group.coverUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
          <div className="absolute bottom-3 left-3 right-3">
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge className="border-white/20 bg-white/15 text-white">
                {group.kind}
              </Badge>
              <Badge className="border-white/20 bg-white/15 text-white">
                {group.visibility === "private" ? (
                  <Lock className="h-3 w-3" aria-hidden />
                ) : (
                  <School className="h-3 w-3" aria-hidden />
                )}
                {group.visibility}
              </Badge>
            </div>
            <h3 className="font-display text-xl font-black text-white">{group.name}</h3>
          </div>
        </div>
      </Link>
      <div className="space-y-4 p-4">
        <p className="line-clamp-2 text-sm leading-5 text-navy-600">
          {group.description}
        </p>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex -space-x-2">
              {members.slice(0, 5).map((profile) => (
                <Avatar
                  key={profile.id}
                  name={profile.displayName}
                  src={profile.avatarUrl}
                  size="xs"
                  className="border-2 border-white"
                />
              ))}
            </div>
            <p className="mt-2 flex items-center gap-1 text-xs font-bold text-navy-500">
              <UsersRound className="h-3.5 w-3.5" aria-hidden />
              {members.length} members
              {school ? ` · ${school.name}` : ""}
            </p>
          </div>
          <Button
            size="sm"
            className="rounded-full border-[#FF6A1A] bg-[#FF5C00] text-white hover:bg-[#FF6A1A]"
            onClick={() => onJoin(group)}
          >
            {isMember ? "Open" : "Join"}
          </Button>
        </div>
      </div>
    </article>
  );
}
