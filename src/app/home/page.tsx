"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { useAuth } from "@/lib/auth/context";
import {
  getOrCreateConversation,
  postStatus,
  respondFriendRequest,
  toggleReaction,
} from "@/lib/mock/store";
import { DEMO_ANNOUNCEMENTS, DEMO_BIRTHDAYS } from "@/lib/mock/data";
import { formatRelative } from "@/lib/utils/format";
import {
  Card,
  LoadingCard,
  VibeShell,
  ProfileListItem,
  SectionTitle,
  conversationSummaries,
  friendsForProfile,
  friendshipBetween,
  getUnreadMessageCount,
  pendingRequestsForProfile,
  profileById,
  useMockStoreState,
} from "@/app/_components/vibe-page-utils";

function StatusComposer({
  profileId,
  onPosted,
}: {
  profileId: string;
  onPosted: () => void;
}) {
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = body.trim();
    if (!value) return;
    postStatus(profileId, value);
    setBody("");
    setStatus("Status posted to your feed.");
    onPosted();
  }

  return (
    <Card>
      <SectionTitle title="Update your status" />
      <form onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          id="status-body"
          label="What are you doing right now?"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          maxLength={280}
          rows={3}
          placeholder="Share a status update..."
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-[#6E6E6E]">{body.length}/280</span>
          <Button type="submit">Post status</Button>
        </div>
        {status ? <p className="text-sm font-semibold text-[#1E824C]">{status}</p> : null}
      </form>
    </Card>
  );
}

function ActivityFeed({
  profileId,
  onChanged,
}: {
  profileId: string;
  onChanged: () => void;
}) {
  const { store } = useMockStoreState();

  if (!store) return <LoadingCard label="Loading activity..." />;

  return (
    <Card>
      <SectionTitle title="Friend activity" />
      <div className="space-y-3">
        {store.feed.map((item) => {
          const actor = profileById(store, item.actor_id);
          const targetType = item.type === "status" ? "status" : "feed_item";
          const targetId = item.type === "status" ? item.reference_id : item.id;
          const reactions = store.reactions.filter(
            (reaction) => reaction.target_type === targetType && reaction.target_id === targetId
          );
          const reacted = reactions.some((reaction) => reaction.actor_id === profileId);

          return (
            <article
              key={item.id}
              className="rounded-[4px] border border-[#E5E5E5] bg-white p-3"
            >
              <div className="flex gap-3">
                <Avatar profile={actor} showOnline />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/profile/${actor?.username ?? ""}`}
                      className="font-bold text-[#222222] no-underline"
                    >
                      {actor?.display_name ?? "Vibe member"}
                    </Link>
                    <span className="text-xs text-[#6E6E6E]">{formatRelative(item.created_at)}</span>
                  </div>
                  <p className="mt-1 text-sm text-[#222222]">{item.body}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Button
                      size="sm"
                      variant={reacted ? "primary" : "secondary"}
                      onClick={() => {
                        toggleReaction(profileId, targetType, targetId, "like");
                        onChanged();
                      }}
                    >
                      {reacted ? "Liked" : "Like"} ({reactions.length})
                    </Button>
                    {actor ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          window.location.href = `/profile/${actor.username}`;
                        }}
                      >
                        View profile
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Card>
  );
}

function HomeDashboard() {
  const router = useRouter();
  const { profile, refresh: refreshAuth } = useAuth();
  const { store, refresh } = useMockStoreState();
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState<string[]>([]);

  const dashboard = useMemo(() => {
    if (!store || !profile) return null;
    const friends = friendsForProfile(store, profile.id);
    const pending = pendingRequestsForProfile(store, profile.id);
    const conversations = conversationSummaries(store, profile.id);
    const unreadMessages = getUnreadMessageCount(store, profile.id);
    const suggested = store.profiles
      .filter((candidate) => {
        if (candidate.id === profile.id) return false;
        return !friendshipBetween(store, profile.id, candidate.id);
      })
      .slice(0, 4);
    const recentlyOnline = store.profiles
      .filter((candidate) => candidate.id !== profile.id && candidate.online_status !== "offline")
      .sort((a, b) => new Date(b.last_active_at).getTime() - new Date(a.last_active_at).getTime())
      .slice(0, 4);

    return { friends, pending, conversations, unreadMessages, suggested, recentlyOnline };
  }, [profile, store]);

  function refreshAll() {
    refresh();
    refreshAuth();
  }

  if (!profile || !store || !dashboard) return <LoadingCard />;

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)_300px]">
      <aside className="space-y-4">
        <Card>
          <div className="text-center">
            <Avatar profile={profile} size="xl" showOnline className="mx-auto" />
            <h1 className="mt-3 text-2xl font-black text-[#222222]">{profile.display_name}</h1>
            <p className="text-sm text-[#6E6E6E]">@{profile.username}</p>
            <p className="mt-3 rounded bg-[#EEE9FF] p-2 text-sm font-semibold text-[#222222]">
              {profile.status_message ?? "No status yet."}
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center text-sm">
            <div className="rounded border border-[#E5E5E5] bg-white p-2">
              <strong className="block text-lg text-[#222222]">{dashboard.friends.length}</strong>
              friends
            </div>
            <div className="rounded border border-[#E5E5E5] bg-white p-2">
              <strong className="block text-lg text-[#222222]">{dashboard.unreadMessages}</strong>
              new messages
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Button
              className="w-full"
              onClick={() => {
                router.push(`/profile/${profile.username}`);
              }}
            >
              View My Profile
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                router.push("/profile/edit");
              }}
            >
              Edit Profile
            </Button>
          </div>
          <p className="mt-4 text-sm text-[#6E6E6E]">
            Online status: <strong>{profile.online_status}</strong>
          </p>
        </Card>
      </aside>

      <section className="space-y-4">
        <StatusComposer profileId={profile.id} onPosted={refreshAll} />
        <ActivityFeed profileId={profile.id} onChanged={refreshAll} />
      </section>

      <aside className="space-y-4">
        <Card>
          <SectionTitle title="Friend requests" action={<Link href="/friends">View all</Link>} />
          {dashboard.pending.length === 0 ? (
            <p className="text-sm text-[#6E6E6E]">No pending requests.</p>
          ) : (
            <div className="space-y-2">
              {dashboard.pending.map(({ friendship, requester }) => (
                <ProfileListItem
                  key={friendship.id}
                  profile={requester}
                  action={
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        onClick={() => {
                          respondFriendRequest(friendship.id, true);
                          refreshAll();
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          respondFriendRequest(friendship.id, false);
                          refreshAll();
                        }}
                      >
                        Decline
                      </Button>
                    </div>
                  }
                />
              ))}
            </div>
          )}
        </Card>

        <Card>
          <SectionTitle title="Upcoming birthdays" />
          <ul className="space-y-2 text-sm">
            {DEMO_BIRTHDAYS.map((birthday) => {
              const birthdayProfile = profileById(store, birthday.profile_id);
              return (
                <li key={birthday.profile_id} className="flex items-center justify-between gap-2">
                  <span>{birthday.label}</span>
                  {birthdayProfile ? <Link href={`/profile/${birthdayProfile.username}`}>Say hi</Link> : null}
                </li>
              );
            })}
          </ul>
        </Card>

        <Card>
          <SectionTitle title="Suggested profiles" action={<Link href="/browse">Discover</Link>} />
          <div className="space-y-2">
            {dashboard.suggested.map((candidate) => (
              <ProfileCard key={candidate.id} profile={candidate} interestsLimit={2} />
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle title="Recently online" />
          <div className="space-y-2">
            {dashboard.recentlyOnline.map((candidate) => (
              <ProfileListItem
                key={candidate.id}
                profile={candidate}
                meta={`Active ${formatRelative(candidate.last_active_at)}`}
                action={
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      const conversationId = getOrCreateConversation(profile.id, candidate.id);
                      router.push(`/messages/${conversationId}`);
                    }}
                  >
                    Message
                  </Button>
                }
              />
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle title="Announcements" />
          <div className="space-y-3">
            {DEMO_ANNOUNCEMENTS.filter(
              (announcement) => !dismissedAnnouncements.includes(announcement.id)
            ).map((announcement) => (
              <article key={announcement.id} className="rounded border border-[#E5E5E5] bg-white p-3">
                <h3 className="font-bold text-[#222222]">{announcement.title}</h3>
                <p className="mt-1 text-sm text-[#6E6E6E]">{announcement.body}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  className="mt-2"
                  onClick={() =>
                    setDismissedAnnouncements((items) => [...items, announcement.id])
                  }
                >
                  Dismiss
                </Button>
              </article>
            ))}
            {DEMO_ANNOUNCEMENTS.every((announcement) =>
              dismissedAnnouncements.includes(announcement.id)
            ) ? (
              <p className="text-sm text-[#6E6E6E]">All caught up.</p>
            ) : null}
          </div>
        </Card>
      </aside>
    </div>
  );
}

export default function HomePage() {
  return (
    <VibeShell>
      <HomeDashboard />
    </VibeShell>
  );
}
