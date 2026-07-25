"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MessageSquarePlus, Share2, UsersRound } from "lucide-react";

import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import {
  circleGroups,
  vibeMoments,
  vibeProfiles,
  vibeSchools,
} from "@/lib/mock/vibe-social";
import type { Profile } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

function profileMap(profiles: Profile[]) {
  return profiles.reduce<Record<string, Profile>>((acc, profile) => {
    acc[profile.userId] = profile;
    return acc;
  }, {});
}

function GroupHubContent() {
  const params = useParams<{ groupId: string }>();
  const group = circleGroups.find((item) => item.id === params.groupId);
  const profilesByUserId = useMemo(() => profileMap(vibeProfiles), []);
  const [post, setPost] = useState("");
  const [notice, setNotice] = useState("");
  const [localPosts, setLocalPosts] = useState<string[]>([]);

  if (!group) {
    return (
      <AuthenticatedShell mainClassName="max-w-3xl">
        <div className="rounded-[24px] border border-surface-border bg-white p-6 text-center shadow-card">
          <h1 className="font-display text-3xl font-black text-navy-900">
            Group not found
          </h1>
          <Link
            href="/groups"
            className="mt-4 inline-flex rounded-full bg-[#FF5C00] px-5 py-3 text-sm font-black text-white hover:bg-[#FF6A1A] hover:no-underline"
          >
            Back to groups
          </Link>
        </div>
      </AuthenticatedShell>
    );
  }

  const school = group.schoolId
    ? vibeSchools.find((item) => item.id === group.schoolId)
    : undefined;
  const members = group.memberIds
    .map((id) => profilesByUserId[id])
    .filter((profile): profile is Profile => Boolean(profile));
  const relatedVibes = vibeMoments.filter(
    (vibe) =>
      vibe.schoolId === group.schoolId ||
      group.memberIds.includes(vibe.hostId) ||
      vibe.attendeeIds.some((id) => group.memberIds.includes(id))
  );

  const publishPost = () => {
    if (!post.trim()) {
      setNotice("Write a post for the circle first.");
      return;
    }
    setLocalPosts([post.trim(), ...localPosts]);
    setPost("");
    setNotice("Posted to the group hub.");
  };

  return (
    <AuthenticatedShell mainClassName="max-w-6xl">
      <div className="space-y-5">
        <section className="overflow-hidden rounded-[28px] border border-surface-border bg-white shadow-card">
          <div className="relative h-72">
            <img src={group.coverUrl} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/10" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex flex-wrap gap-2">
                <Badge className="border-white/20 bg-white/15 text-white">
                  {group.kind}
                </Badge>
                <Badge className="border-white/20 bg-white/15 text-white">
                  {school?.name ?? group.visibility}
                </Badge>
              </div>
              <h1 className="mt-3 font-display text-4xl font-black text-white sm:text-6xl">
                {group.name}
              </h1>
              <p className="mt-3 max-w-2xl text-zinc-200">{group.description}</p>
            </div>
          </div>
        </section>

        {notice ? (
          <div className="rounded-[18px] border border-[#FF6A1A]/30 bg-[#FF5C00] px-4 py-3 text-sm font-black text-white">
            {notice}
          </div>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <main className="space-y-5">
            <section className="rounded-[24px] border border-surface-border bg-white p-5 shadow-card">
              <h2 className="font-display text-2xl font-black text-navy-900">
                Group board
              </h2>
              <div className="mt-4 space-y-3">
                <Textarea
                  value={post}
                  onChange={(event) => setPost(event.target.value)}
                  placeholder="Share a plan, prompt, or update with this circle..."
                />
                <div className="flex flex-wrap gap-3">
                  <Button
                    className="rounded-full border-[#FF6A1A] bg-[#FF5C00] text-white hover:bg-[#FF6A1A]"
                    onClick={publishPost}
                  >
                    <MessageSquarePlus className="h-4 w-4" aria-hidden />
                    Post
                  </Button>
                  <Button
                    variant="secondary"
                    className="rounded-full"
                    onClick={() => setNotice("Invite link copied for this group.")}
                  >
                    <Share2 className="h-4 w-4" aria-hidden />
                    Invite
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {localPosts.map((item, index) => (
                  <article
                    key={`${item}-${index}`}
                    className="rounded-[18px] border border-surface-border bg-surface-muted p-4"
                  >
                    <p className="text-sm leading-6 text-navy-700">{item}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#FF5C00]">
                      just now
                    </p>
                  </article>
                ))}
                <article className="rounded-[18px] border border-surface-border bg-surface-muted p-4">
                  <p className="font-black text-navy-900">Weekly prompt</p>
                  <p className="mt-2 text-sm leading-6 text-navy-700">
                    Drop one plan you would actually show up for this week.
                  </p>
                </article>
              </div>
            </section>

            <section className="rounded-[24px] border border-surface-border bg-white p-5 shadow-card">
              <h2 className="font-display text-2xl font-black text-navy-900">
                Related vibes
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {relatedVibes.slice(0, 4).map((vibe) => (
                  <Link
                    key={vibe.id}
                    href={`/vibe/${vibe.id}`}
                    className="rounded-[18px] border border-surface-border bg-surface-muted p-4 hover:border-[#FF6A1A]/60 hover:no-underline"
                  >
                    <p className="font-black text-navy-900">{vibe.title}</p>
                    <p className="mt-1 text-xs text-navy-500">
                      {formatDateTime(vibe.startsAt)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </main>

          <aside className="rounded-[24px] border border-surface-border bg-white p-5 shadow-card">
            <h2 className="flex items-center gap-2 font-display text-2xl font-black text-navy-900">
              <UsersRound className="h-5 w-5 text-[#FF5C00]" aria-hidden />
              Members
            </h2>
            <div className="mt-4 space-y-3">
              {members.map((member) => (
                <Link
                  key={member.id}
                  href={`/profile/${member.username}`}
                  className="flex items-center gap-3 rounded-[18px] p-2 hover:bg-brand-soft hover:no-underline"
                >
                  <Avatar name={member.displayName} src={member.avatarUrl} size="sm" />
                  <span className="min-w-0">
                    <span className="block truncate font-black text-navy-900">
                      {member.displayName}
                    </span>
                    <span className="text-xs text-navy-500">
                      Grade {member.grade ?? "10"}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </AuthenticatedShell>
  );
}

export default function GroupHubPage() {
  return (
    <RequireAuth>
      <GroupHubContent />
    </RequireAuth>
  );
}
