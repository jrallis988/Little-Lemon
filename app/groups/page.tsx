"use client";

import { useMemo, useState } from "react";
import { Compass, UsersRound } from "lucide-react";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { GroupCard } from "@/components/groups/GroupCard";
import { Badge } from "@/components/ui/Badge";
import type { CircleGroup, School } from "@/lib/types";
import {
  circleGroups,
  vibeProfiles,
  vibeSchools,
} from "@/lib/mock/vibe-social";
import { useAuth } from "@/lib/auth/AuthProvider";
import { cn } from "@/lib/utils";

type GroupTab = "all" | "mine";

function schoolById(schools: School[]) {
  return schools.reduce<Record<string, School>>((acc, school) => {
    acc[school.id] = school;
    return acc;
  }, {});
}

function GroupsContent() {
  const { profile } = useAuth();
  const [tab, setTab] = useState<GroupTab>("all");
  const [joinedIds, setJoinedIds] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const schools = useMemo(() => schoolById(vibeSchools), []);
  const currentProfile =
    vibeProfiles.find((item) => item.userId === profile?.userId) ?? profile;

  const isMember = (group: CircleGroup) =>
    Boolean(
      currentProfile &&
        (group.memberIds.includes(currentProfile.userId) || joinedIds.includes(group.id))
    );

  const visibleGroups = circleGroups.filter((group) =>
    tab === "mine" ? isMember(group) : true
  );

  const joinGroup = (group: CircleGroup) => {
    if (isMember(group)) {
      setNotice(`Opening ${group.name}.`);
      return;
    }
    setJoinedIds((ids) => [...ids, group.id]);
    setNotice(`Joined ${group.name}.`);
  };

  return (
    <AuthenticatedShell mainClassName="max-w-7xl">
      <div className="space-y-6">
        <section className="rounded-[28px] bg-zinc-950 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.25)] sm:p-7">
          <Badge className="border-[#FF6A1A]/40 bg-[#FF5C00]/15 text-[#FFB68A]">
            <UsersRound className="h-3 w-3" aria-hidden />
            Groups & Circles
          </Badge>
          <h1 className="mt-4 font-display text-4xl font-black sm:text-5xl">
            Find your real circle.
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            Join clubs, teams, interest spaces, and verified local hangouts that
            connect back to school life without feeling like old social feeds.
          </p>
        </section>

        {notice ? (
          <div className="rounded-[18px] border border-[#FF6A1A]/30 bg-[#FF5C00] px-4 py-3 text-sm font-black text-white">
            {notice}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#FF5C00]">
              Discovery
            </p>
            <h2 className="font-display text-3xl font-black text-navy-900">
              Browse groups
            </h2>
          </div>
          <div className="flex rounded-full border border-surface-border bg-white p-1 shadow-soft">
            {(["all", "mine"] as GroupTab[]).map((item) => (
              <button
                key={item}
                type="button"
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-black capitalize transition",
                  tab === item
                    ? "bg-[#FF5C00] text-white"
                    : "text-navy-600 hover:bg-surface-muted"
                )}
                onClick={() => setTab(item)}
              >
                {item === "mine" ? "My Groups" : "All"}
              </button>
            ))}
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              profiles={vibeProfiles}
              school={group.schoolId ? schools[group.schoolId] : undefined}
              isMember={isMember(group)}
              onJoin={joinGroup}
            />
          ))}
        </section>

        {visibleGroups.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-surface-border bg-white p-8 text-center">
            <Compass className="mx-auto h-10 w-10 text-[#FF5C00]" aria-hidden />
            <h3 className="mt-3 font-display text-2xl font-black text-navy-900">
              No groups yet
            </h3>
            <p className="mt-2 text-navy-600">Join a group from All to see it here.</p>
          </div>
        ) : null}
      </div>
    </AuthenticatedShell>
  );
}

export default function GroupsPage() {
  return (
    <RequireAuth>
      <GroupsContent />
    </RequireAuth>
  );
}
