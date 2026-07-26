"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Mail, Search, Trash2, Users } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import type { Profile } from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";

export interface FriendsListProps {
  friends: Profile[];
  onRemove: (friend: Profile) => void | Promise<void>;
  onMessage: (friend: Profile) => void;
  className?: string;
}

function matchesSearch(friend: Profile, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  const searchable = [
    friend.display_name,
    friend.username,
    friend.location ?? "",
    friend.bio ?? "",
    ...friend.interests,
  ]
    .join(" ")
    .toLowerCase();

  return searchable.includes(normalizedQuery);
}

export function FriendsList({
  friends,
  onRemove,
  onMessage,
  className,
}: FriendsListProps) {
  const searchId = useId();
  const [query, setQuery] = useState("");

  const filteredFriends = useMemo(
    () => friends.filter((friend) => matchesSearch(friend, query)),
    [friends, query]
  );

  function handleRemove(friend: Profile) {
    const confirmed = window.confirm(
      `Remove ${friend.display_name} from your friends?`
    );
    if (confirmed) {
      void onRemove(friend);
    }
  }

  return (
    <section className={cn("space-y-4", className)}>
      <Input
        id={searchId}
        label="Search friends"
        type="search"
        value={query}
        placeholder="Search by name, username, location, or interest"
        onChange={(event) => setQuery(event.target.value)}
      />

      {friends.length === 0 ? (
        <EmptyState
          title="No friends yet"
          description="Add people to see them here and start messaging."
          icon={Users}
        />
      ) : filteredFriends.length === 0 ? (
        <EmptyState
          title="No friends match your search"
          description="Try a different name, username, or interest."
          icon={Search}
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filteredFriends.map((friend) => (
            <article key={friend.id} className="mp-card flex gap-3 p-4">
              <Link href={`/profile/${friend.username}`} className="shrink-0">
                <Avatar profile={friend} size="lg" showOnline />
                <span className="sr-only">
                  View profile for {friend.display_name}
                </span>
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/profile/${friend.username}`}
                  className="block truncate font-bold text-[#222222] hover:underline"
                >
                  {friend.display_name}
                </Link>
                <p className="truncate text-sm text-[#6E6E6E]">
                  @{friend.username}
                </p>
                {friend.bio ? (
                  <p className="mt-2 line-clamp-2 text-sm text-[#222222]">
                    {friend.bio}
                  </p>
                ) : null}

                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" variant="secondary" onClick={() => onMessage(friend)}>
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Message
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleRemove(friend)}>
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Remove
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default FriendsList;
