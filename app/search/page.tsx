"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth/AuthProvider";
import { mockApi } from "@/lib/mock/store";
import { friendshipStatus, profileByUserId, useMockStore } from "@/lib/mock/social";
import { formatDate } from "@/lib/utils";
import type { Profile } from "@/lib/types";

export default function SearchPage() {
  return (
    <RequireAuth>
      <AuthenticatedShell>
        <SearchContent />
      </AuthenticatedShell>
    </RequireAuth>
  );
}

function SearchContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const state = useMockStore();
  const q = params.get("q") ?? "";
  const [draft, setDraft] = React.useState(q);

  React.useEffect(() => setDraft(q), [q]);

  if (!user) return null;

  const query = q.toLowerCase().trim();
  const profileResults = query
    ? state.profiles.filter((profile) =>
        [
          profile.displayName,
          profile.username,
          profile.bio,
          profile.location,
          ...profile.interests,
          ...profile.favoriteMusic,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
    : [];
  const postResults = query
    ? state.blogPosts.filter((post) =>
        [post.title, post.body, post.mood, post.currentlyListening]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
    : [];

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?q=${encodeURIComponent(draft.trim())}`);
  };

  const addFriend = (profile: Profile) => {
    try {
      mockApi.sendFriendRequest(user.id, profile.userId);
    } catch {
      // The card already reflects accepted/pending state from the store.
    }
  };

  const message = (profile: Profile) => {
    const conversation = mockApi.startConversation(user.id, profile.userId);
    router.push(`/messages/${conversation.id}`);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-navy-900">Search Vibe</h1>
        <p className="text-sm text-navy-600">
          Find profiles and blog posts by keyword.
        </p>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
            <Input
              label="Search"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Try a username, interest, city, or blog title..."
              className="sm:w-[520px]"
            />
            <Button type="submit" className="self-end">
              <Search className="h-4 w-4" aria-hidden />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {query ? (
        <div className="grid gap-5 lg:grid-cols-2">
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-navy-900">Profiles</h2>
              <Badge>{profileResults.length}</Badge>
            </div>
            {profileResults.length ? (
              <div className="grid gap-3">
                {profileResults.map((profile) => (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    friendshipStatus={friendshipStatus(
                      state.friendships,
                      user.id,
                      profile.userId
                    )}
                    onAddFriend={profile.userId === user.id ? undefined : addFriend}
                    onMessage={profile.userId === user.id ? undefined : message}
                  />
                ))}
              </div>
            ) : (
              <EmptyState title="No matching profiles" />
            )}
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-navy-900">Blog posts</h2>
              <Badge>{postResults.length}</Badge>
            </div>
            {postResults.length ? (
              <div className="space-y-3">
                {postResults.map((post) => {
                  const author = profileByUserId(state.profiles, post.authorId);
                  return (
                    <Card key={post.id}>
                      <CardHeader>
                        <CardTitle>
                          <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-navy-500">
                          By {author?.displayName ?? "Unknown"} on{" "}
                          {formatDate(post.createdAt)}
                        </p>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-navy-700">
                          {post.body}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <EmptyState icon={BookOpen} title="No matching posts" />
            )}
          </section>
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="Search for something"
          description="Enter a query to search profiles and blog posts."
        />
      )}
    </div>
  );
}
