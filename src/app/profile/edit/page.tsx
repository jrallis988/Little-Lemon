"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ThemeEditor } from "@/components/profile/ThemeEditor";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useAuth } from "@/lib/auth/context";
import { updateTheme } from "@/lib/mock/store";
import { THEME_PRESETS } from "@/lib/themes/presets";
import type { Profile, ProfileTheme } from "@/lib/types/database";
import {
  Card,
  LoadingCard,
  VibeShell,
  joinTags,
  splitTags,
  themeForProfile,
  useMockStoreState,
} from "@/app/_components/vibe-page-utils";

type ProfileDraft = {
  display_name: string;
  pronouns: string;
  bio: string;
  location: string;
  age: string;
  show_age: boolean;
  occupation: string;
  education: string;
  relationship_status: string;
  website: string;
  avatar_url: string;
  header_image_url: string;
  status_message: string;
  about_me: string;
  who_id_like_to_meet: string;
  interests: string;
  music: string;
  movies: string;
  television: string;
  books: string;
  heroes: string;
  favorite_music: string;
};

function draftFromProfile(profile: Profile): ProfileDraft {
  return {
    display_name: profile.display_name,
    pronouns: profile.pronouns ?? "",
    bio: profile.bio ?? "",
    location: profile.location ?? "",
    age: profile.age?.toString() ?? "",
    show_age: profile.show_age,
    occupation: profile.occupation ?? "",
    education: profile.education ?? "",
    relationship_status: profile.relationship_status ?? "",
    website: profile.website ?? "",
    avatar_url: profile.avatar_url ?? "",
    header_image_url: profile.header_image_url ?? "",
    status_message: profile.status_message ?? "",
    about_me: profile.about_me ?? "",
    who_id_like_to_meet: profile.who_id_like_to_meet ?? "",
    interests: joinTags(profile.interests),
    music: joinTags(profile.music),
    movies: joinTags(profile.movies),
    television: joinTags(profile.television),
    books: joinTags(profile.books),
    heroes: joinTags(profile.heroes),
    favorite_music: profile.favorite_music ?? "",
  };
}

function ProfileEditContent() {
  const { profile, updateProfile, refresh: refreshAuth } = useAuth();
  const { store, refresh } = useMockStoreState();
  const [draft, setDraft] = useState<ProfileDraft | null>(null);
  const [themeDraft, setThemeDraft] = useState<ProfileTheme | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!profile) return;
    setDraft(draftFromProfile(profile));
  }, [profile]);

  useEffect(() => {
    if (!store || !profile) return;
    setThemeDraft(themeForProfile(store, profile.id) ?? null);
  }, [profile, store]);

  if (!profile || !store || !draft || !themeDraft) return <LoadingCard label="Loading editor..." />;
  const currentProfile = profile;
  const currentDraft = draft;
  const currentThemeDraft = themeDraft;

  function setField<K extends keyof ProfileDraft>(key: K, value: ProfileDraft[K]) {
    setDraft((current) => (current ? { ...current, [key]: value } : current));
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateProfile({
      display_name: currentDraft.display_name,
      pronouns: currentDraft.pronouns || null,
      bio: currentDraft.bio || null,
      location: currentDraft.location || null,
      age: currentDraft.age ? Number(currentDraft.age) : null,
      show_age: currentDraft.show_age,
      occupation: currentDraft.occupation || null,
      education: currentDraft.education || null,
      relationship_status: currentDraft.relationship_status || null,
      website: currentDraft.website || null,
      avatar_url: currentDraft.avatar_url || null,
      header_image_url: currentDraft.header_image_url || null,
      status_message: currentDraft.status_message || null,
      about_me: currentDraft.about_me || null,
      who_id_like_to_meet: currentDraft.who_id_like_to_meet || null,
      interests: splitTags(currentDraft.interests),
      music: splitTags(currentDraft.music),
      movies: splitTags(currentDraft.movies),
      television: splitTags(currentDraft.television),
      books: splitTags(currentDraft.books),
      heroes: splitTags(currentDraft.heroes),
      favorite_music: currentDraft.favorite_music || null,
    });
    refreshAuth();
    refresh();
    setStatus("Profile information saved.");
  }

  function saveTheme(theme: ProfileTheme, message = "Theme saved.") {
    const next = updateTheme(currentProfile.id, theme);
    setThemeDraft(next);
    refresh();
    setStatus(message);
  }

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-3xl font-black text-[#0f2744]">Edit profile</h1>
        <p className="mt-2 text-sm text-[#5b6b7c]">
          Update profile content, then tune and publish your visual theme.
        </p>
        {status ? <p className="mt-3 text-sm font-semibold text-[#1f7a4d]">{status}</p> : null}
      </Card>

      <form onSubmit={saveProfile} className="grid gap-4">
        <Card>
          <h2 className="mp-section-title">Profile info</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              id="edit-display-name"
              label="Display name"
              value={draft.display_name}
              onChange={(event) => setField("display_name", event.target.value)}
              required
            />
            <Input
              id="edit-pronouns"
              label="Pronouns"
              value={draft.pronouns}
              onChange={(event) => setField("pronouns", event.target.value)}
            />
            <Input
              id="edit-location"
              label="Location"
              value={draft.location}
              onChange={(event) => setField("location", event.target.value)}
            />
            <Input
              id="edit-age"
              label="Age"
              type="number"
              min="13"
              max="120"
              value={draft.age}
              onChange={(event) => setField("age", event.target.value)}
            />
            <label className="flex items-center gap-2 text-sm font-semibold text-[#0f2744] md:col-span-2">
              <input
                type="checkbox"
                checked={draft.show_age}
                onChange={(event) => setField("show_age", event.target.checked)}
              />
              Show my age on my profile
            </label>
            <Textarea
              id="edit-bio"
              label="Short bio"
              value={draft.bio}
              onChange={(event) => setField("bio", event.target.value)}
              rows={3}
              className="md:col-span-2"
            />
            <Input
              id="edit-status"
              label="Status message"
              value={draft.status_message}
              onChange={(event) => setField("status_message", event.target.value)}
              className="md:col-span-2"
            />
          </div>
        </Card>

        <Card>
          <h2 className="mp-section-title">Details and favorites</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              id="edit-occupation"
              label="School / activities"
              value={draft.occupation}
              onChange={(event) => setField("occupation", event.target.value)}
            />
            <Input
              id="edit-education"
              label="School / grade"
              value={draft.education}
              onChange={(event) => setField("education", event.target.value)}
            />
            <Input
              id="edit-relationship"
              label="Relationship status"
              value={draft.relationship_status}
              onChange={(event) => setField("relationship_status", event.target.value)}
            />
            <Input
              id="edit-website"
              label="Website"
              type="url"
              value={draft.website}
              onChange={(event) => setField("website", event.target.value)}
            />
            <Input
              id="edit-favorite-music"
              label="Favorite music"
              value={draft.favorite_music}
              onChange={(event) => setField("favorite_music", event.target.value)}
            />
            <Input
              id="edit-interests"
              label="Interests"
              value={draft.interests}
              onChange={(event) => setField("interests", event.target.value)}
              hint="Comma-separated."
            />
            <Input
              id="edit-music"
              label="Music"
              value={draft.music}
              onChange={(event) => setField("music", event.target.value)}
            />
            <Input
              id="edit-movies"
              label="Movies"
              value={draft.movies}
              onChange={(event) => setField("movies", event.target.value)}
            />
            <Input
              id="edit-tv"
              label="Television"
              value={draft.television}
              onChange={(event) => setField("television", event.target.value)}
            />
            <Input
              id="edit-books"
              label="Books"
              value={draft.books}
              onChange={(event) => setField("books", event.target.value)}
            />
            <Input
              id="edit-heroes"
              label="Heroes"
              value={draft.heroes}
              onChange={(event) => setField("heroes", event.target.value)}
              className="md:col-span-2"
            />
          </div>
        </Card>

        <Card>
          <h2 className="mp-section-title">Profile modules</h2>
          <div className="grid gap-4">
            <Textarea
              id="edit-about"
              label="About me"
              value={draft.about_me}
              onChange={(event) => setField("about_me", event.target.value)}
              rows={5}
            />
            <Textarea
              id="edit-meet"
              label="Looking to vibe with"
              value={draft.who_id_like_to_meet}
              onChange={(event) => setField("who_id_like_to_meet", event.target.value)}
              rows={4}
            />
            <Input
              id="edit-avatar"
              label="Avatar URL"
              type="url"
              value={draft.avatar_url}
              onChange={(event) => setField("avatar_url", event.target.value)}
            />
            <Input
              id="edit-header"
              label="Header image URL"
              type="url"
              value={draft.header_image_url}
              onChange={(event) => setField("header_image_url", event.target.value)}
            />
          </div>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Save profile info</Button>
          <Button
            variant="secondary"
            onClick={() => {
              setDraft(draftFromProfile(currentProfile));
              setStatus("Profile form reset to saved values.");
            }}
          >
            Reset profile form
          </Button>
        </div>
      </form>

      <ThemeEditor
        theme={currentThemeDraft}
        profileUsername={currentProfile.username}
        onChange={setThemeDraft}
        onSave={(theme) => saveTheme(theme)}
        onPublish={(theme) => saveTheme({ ...theme, published: true }, "Theme published.")}
        onReset={() => {
          const preset = THEME_PRESETS["Classic Blue"];
          saveTheme(
            {
              ...currentThemeDraft,
              ...preset,
              preset_name: "Classic Blue",
              module_order: [...preset.module_order],
              stickers: preset.stickers.map((sticker) => ({ ...sticker })),
            },
            "Theme reset to Classic Blue."
          );
        }}
      />
    </div>
  );
}

export default function ProfileEditPage() {
  return (
    <VibeShell>
      <ProfileEditContent />
    </VibeShell>
  );
}
