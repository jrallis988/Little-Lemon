import Link from "next/link";

import type { FeaturedFriend, Profile } from "@/lib/types/database";
import { PLACEHOLDER_AVATAR } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

type FeaturedFriendWithProfile = FeaturedFriend & {
  profile: Profile;
};

type FeaturedFriendEntry = Profile | FeaturedFriendWithProfile;

type FeaturedFriendsProps = {
  friends: FeaturedFriendEntry[];
  featuredFriendsCount?: Profile["featured_friends_count"];
  className?: string;
};

function isProfile(entry: FeaturedFriendEntry): entry is Profile {
  return "username" in entry;
}

function getProfile(entry: FeaturedFriendEntry) {
  return isProfile(entry) ? entry : entry.profile;
}

export function FeaturedFriends({
  friends,
  featuredFriendsCount = 8,
  className,
}: FeaturedFriendsProps) {
  const shownFriends = friends.slice(0, featuredFriendsCount).map(getProfile);

  return (
    <section className={cn("profile-module", className)}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="profile-heading text-xl font-black">Featured Friends</h2>
        <span className="rounded-full border border-current px-2 py-0.5 text-xs font-bold opacity-70">
          {shownFriends.length}/{featuredFriendsCount}
        </span>
      </div>

      {shownFriends.length === 0 ? (
        <p className="mt-3 text-sm opacity-75">No featured friends yet.</p>
      ) : (
        <div
          className={cn(
            "mt-4 grid gap-3",
            featuredFriendsCount <= 4
              ? "grid-cols-2 sm:grid-cols-4"
              : "grid-cols-2 sm:grid-cols-4 lg:grid-cols-4"
          )}
        >
          {shownFriends.map((friend) => (
            <Link
              key={friend.id}
              href={`/profile/${friend.username}`}
              className="group rounded border border-[color-mix(in_srgb,var(--mp-primary,#FF7A18)_20%,transparent)] bg-white/55 p-2 text-center transition hover:-translate-y-0.5 hover:bg-white/75"
            >
              <span className="relative mx-auto block aspect-square overflow-hidden rounded border bg-white">
                <img
                  src={friend.avatar_url ?? PLACEHOLDER_AVATAR}
                  alt={`${friend.display_name}'s avatar`}
                  className="h-full w-full object-cover"
                />
                <span
                  className={cn(
                    "absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white",
                    friend.online_status === "online"
                      ? "bg-emerald-500 animate-online"
                      : friend.online_status === "away"
                        ? "bg-amber-400"
                        : "bg-slate-400"
                  )}
                  aria-label={`${friend.display_name} is ${friend.online_status}`}
                />
              </span>
              <span className="mt-2 block truncate text-sm font-black group-hover:underline">
                {friend.display_name}
              </span>
              <span className="block truncate text-xs opacity-70">@{friend.username}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedFriends;
