"use client";

import * as React from "react";
import { Filter, Search } from "lucide-react";
import { useRouter } from "next/navigation";

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
import { friendshipStatus, useMockStore } from "@/lib/mock/social";
import type { Profile } from "@/lib/types";

export default function BrowsePage() {
  return (
    <RequireAuth>
      <AuthenticatedShell>
        <BrowseContent />
      </AuthenticatedShell>
    </RequireAuth>
  );
}

function BrowseContent() {
  const { user, profile } = useAuth();
  const state = useMockStore();
  const router = useRouter();
  const [filters, setFilters] = React.useState({
    text: "",
    location: "",
    interests: "",
    music: "",
    recentlyActive: false,
    newMembers: false,
  });
  const [notice, setNotice] = React.useState<string | null>(null);

  if (!user || !profile) return null;

  const locations = Array.from(
    new Set(state.profiles.map((item) => item.location).filter(Boolean))
  ) as string[];
  const interestOptions = Array.from(
    new Set(state.profiles.flatMap((item) => item.interests.map((i) => i.trim())))
  ).filter(Boolean);
  const musicOptions = Array.from(
    new Set(state.profiles.flatMap((item) => item.favoriteMusic))
  );

  const results = state.profiles
    .filter((item) => item.userId !== user.id)
    .filter((item) => item.visibility === "public")
    .filter((item) => matchesFilters(item, filters));

  const addFriend = (target: Profile) => {
    try {
      mockApi.sendFriendRequest(user.id, target.userId);
      setNotice(`Friend request sent to ${target.displayName}.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not send request.");
    }
  };

  const message = (target: Profile) => {
    const conversation = mockApi.startConversation(user.id, target.userId);
    router.push(`/messages/${conversation.id}`);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-navy-900">Browse people</h1>
        <p className="text-sm text-navy-600">
          Discover public profiles by name, location, interests, music, and activity.
        </p>
      </div>

      {notice ? (
        <div className="rounded-card border border-brand/30 bg-brand-soft px-4 py-3 text-sm font-semibold text-brand-dark">
          {notice}
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>
            <Filter className="inline h-4 w-4" aria-hidden /> Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Input
            label="Name or username"
            value={filters.text}
            onChange={(event) =>
              setFilters((current) => ({ ...current, text: event.target.value }))
            }
            placeholder="Search people..."
          />
          <SelectFilter
            label="Location"
            value={filters.location}
            options={locations}
            onChange={(location) =>
              setFilters((current) => ({ ...current, location }))
            }
          />
          <SelectFilter
            label="Interest"
            value={filters.interests}
            options={interestOptions}
            onChange={(interests) =>
              setFilters((current) => ({ ...current, interests }))
            }
          />
          <SelectFilter
            label="Music"
            value={filters.music}
            options={musicOptions}
            onChange={(music) => setFilters((current) => ({ ...current, music }))}
          />
          <label className="flex items-center gap-2 rounded-card border border-surface-border bg-white p-3 text-sm font-semibold text-navy-800">
            <input
              type="checkbox"
              checked={filters.recentlyActive}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  recentlyActive: event.target.checked,
                }))
              }
              className="h-4 w-4 accent-brand"
            />
            Recently active
          </label>
          <label className="flex items-center gap-2 rounded-card border border-surface-border bg-white p-3 text-sm font-semibold text-navy-800">
            <input
              type="checkbox"
              checked={filters.newMembers}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  newMembers: event.target.checked,
                }))
              }
              className="h-4 w-4 accent-brand"
            />
            New members
          </label>
          <Button
            variant="secondary"
            className="self-end"
            onClick={() =>
              setFilters({
                text: "",
                location: "",
                interests: "",
                music: "",
                recentlyActive: false,
                newMembers: false,
              })
            }
          >
            Clear filters
          </Button>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-navy-900">Results</h2>
        <Badge>{results.length} profiles</Badge>
      </div>

      {results.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result) => (
            <ProfileCard
              key={result.id}
              profile={result}
              friendshipStatus={friendshipStatus(
                state.friendships,
                user.id,
                result.userId
              )}
              onAddFriend={addFriend}
              onMessage={message}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="No matching profiles"
          description="Try broadening your filters."
        />
      )}
    </div>
  );
}

function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-bold uppercase tracking-wide text-navy-700">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 w-full rounded-card border border-surface-border bg-white px-3 text-sm"
      >
        <option value="">Any</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function matchesFilters(
  profile: Profile,
  filters: {
    text: string;
    location: string;
    interests: string;
    music: string;
    recentlyActive: boolean;
    newMembers: boolean;
  }
) {
  const text = filters.text.toLowerCase().trim();
  if (
    text &&
    ![profile.displayName, profile.username]
      .join(" ")
      .toLowerCase()
      .includes(text)
  ) {
    return false;
  }
  if (filters.location && profile.location !== filters.location) return false;
  if (
    filters.interests &&
    !profile.interests.some(
      (interest) => interest.trim().toLowerCase() === filters.interests.toLowerCase()
    )
  ) {
    return false;
  }
  if (filters.music && !profile.favoriteMusic.includes(filters.music)) return false;
  if (
    filters.recentlyActive &&
    Date.now() - new Date(profile.lastActiveAt).getTime() > 24 * 60 * 60 * 1000
  ) {
    return false;
  }
  if (
    filters.newMembers &&
    Date.now() - new Date(profile.memberSince).getTime() > 60 * 24 * 60 * 60 * 1000
  ) {
    return false;
  }
  return true;
}
