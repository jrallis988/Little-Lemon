"use client";

import { useMemo, useState } from "react";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  LoadingCard,
  VibeShell,
  SectionTitle,
  useMockStoreState,
} from "@/app/_components/vibe-page-utils";

function BrowseContent() {
  const { store } = useMockStoreState();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [interest, setInterest] = useState("");
  const [music, setMusic] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [recentlyActive, setRecentlyActive] = useState(false);
  const [newMembers, setNewMembers] = useState(false);

  const results = useMemo(() => {
    if (!store) return [];
    const now = Date.now();
    return store.profiles.filter((profile) => {
      const q = query.trim().toLowerCase();
      if (
        q &&
        !`${profile.display_name} ${profile.username}`.toLowerCase().includes(q)
      ) {
        return false;
      }
      if (
        location.trim() &&
        !(profile.location ?? "").toLowerCase().includes(location.trim().toLowerCase())
      ) {
        return false;
      }
      if (
        interest.trim() &&
        !profile.interests.some((item) =>
          item.toLowerCase().includes(interest.trim().toLowerCase())
        )
      ) {
        return false;
      }
      const musicNeedle = music.trim().toLowerCase();
      if (
        musicNeedle &&
        ![profile.favorite_music ?? "", ...profile.music]
          .join(" ")
          .toLowerCase()
          .includes(musicNeedle)
      ) {
        return false;
      }
      if (minAge && (!profile.age || profile.age < Number(minAge))) return false;
      if (maxAge && (!profile.age || profile.age > Number(maxAge))) return false;
      if (recentlyActive && now - new Date(profile.last_active_at).getTime() > 24 * 60 * 60 * 1000) {
        return false;
      }
      if (newMembers && now - new Date(profile.member_since).getTime() > 120 * 24 * 60 * 60 * 1000) {
        return false;
      }
      return true;
    });
  }, [interest, location, maxAge, minAge, music, newMembers, query, recentlyActive, store]);

  if (!store) return <LoadingCard label="Loading people..." />;

  function resetFilters() {
    setQuery("");
    setLocation("");
    setInterest("");
    setMusic("");
    setMinAge("");
    setMaxAge("");
    setRecentlyActive(false);
    setNewMembers(false);
  }

  return (
    <div className="space-y-5">
      <Card>
        <h1 className="text-3xl font-black text-[#0f2744]">Browse people</h1>
        <p className="mt-2 text-sm text-[#5b6b7c]">
          Discover profiles by name, location, interests, music, age, and activity.
        </p>
      </Card>

      <Card>
        <SectionTitle title="Filters" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Input
            id="browse-query"
            label="Username or display name"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Input
            id="browse-location"
            label="Location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
          <Input
            id="browse-interest"
            label="Interest"
            value={interest}
            onChange={(event) => setInterest(event.target.value)}
          />
          <Input
            id="browse-music"
            label="Favorite music"
            value={music}
            onChange={(event) => setMusic(event.target.value)}
          />
          <Input
            id="browse-min-age"
            label="Min age"
            type="number"
            min="13"
            value={minAge}
            onChange={(event) => setMinAge(event.target.value)}
          />
          <Input
            id="browse-max-age"
            label="Max age"
            type="number"
            min="13"
            value={maxAge}
            onChange={(event) => setMaxAge(event.target.value)}
          />
          <label className="flex items-center gap-2 text-sm font-semibold text-[#0f2744]">
            <input
              type="checkbox"
              checked={recentlyActive}
              onChange={(event) => setRecentlyActive(event.target.checked)}
            />
            Recently active
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-[#0f2744]">
            <input
              type="checkbox"
              checked={newMembers}
              onChange={(event) => setNewMembers(event.target.checked)}
            />
            New members
          </label>
        </div>
        <Button variant="secondary" className="mt-4" onClick={resetFilters}>
          Reset filters
        </Button>
      </Card>

      <section>
        <h2 className="mb-3 text-xl font-black text-[#0f2744]">
          {results.length} profile{results.length === 1 ? "" : "s"} found
        </h2>
        {results.length === 0 ? (
          <Card className="text-sm text-[#5b6b7c]">No profiles match those filters.</Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {results.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <VibeShell>
      <BrowseContent />
    </VibeShell>
  );
}
