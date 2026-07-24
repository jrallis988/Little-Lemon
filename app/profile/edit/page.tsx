"use client";

import * as React from "react";
import { Save } from "lucide-react";

import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { ThemeEditor } from "@/components/theme/ThemeEditor";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useAuth } from "@/lib/auth/AuthProvider";
import { mockApi } from "@/lib/mock/store";
import { friendProfiles, useMockStore } from "@/lib/mock/social";
import { createThemeFromPreset, themeToCssVars } from "@/lib/themes";
import type { Profile, ProfileDetails, ProfileTheme } from "@/lib/types";

const detailFields: Array<{
  key: keyof Omit<ProfileDetails, "hiddenFields">;
  label: string;
  multiline?: boolean;
}> = [
  { key: "aboutMe", label: "About me", multiline: true },
  { key: "whoIdLikeToMeet", label: "Who I'd like to meet", multiline: true },
  { key: "generalInterests", label: "General interests", multiline: true },
  { key: "music", label: "Music" },
  { key: "movies", label: "Movies" },
  { key: "television", label: "Television" },
  { key: "books", label: "Books" },
  { key: "heroes", label: "Heroes" },
  { key: "occupation", label: "Occupation" },
  { key: "education", label: "Education" },
  { key: "relationshipStatus", label: "Relationship status" },
  { key: "website", label: "Website" },
];

export default function EditProfilePage() {
  return (
    <RequireAuth>
      <AuthenticatedShell>
        <EditProfileContent />
      </AuthenticatedShell>
    </RequireAuth>
  );
}

function EditProfileContent() {
  const { user, profile: authProfile } = useAuth();
  const state = useMockStore();
  const profile =
    state.profiles.find((item) => item.userId === authProfile?.userId) ?? authProfile;
  const friends = user ? friendProfiles(state, user.id) : [];
  const [form, setForm] = React.useState(() => profileToForm(profile));
  const [draftTheme, setDraftTheme] = React.useState<ProfileTheme | null>(
    profile?.theme ?? null
  );
  const [featuredIds, setFeaturedIds] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    setForm(profileToForm(profile));
    setDraftTheme(profile?.theme ?? null);
    setFeaturedIds(profile ? state.featuredFriends[profile.id] ?? [] : []);
  }, [profile, state.featuredFriends]);

  if (!user || !profile || !draftTheme) return null;

  const updateForm = <K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const updateDetails = (
    key: keyof Omit<ProfileDetails, "hiddenFields">,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      details: { ...current.details, [key]: value },
    }));
  };

  const saveAll = async (theme = draftTheme, publish = false) => {
    setSaving(true);
    try {
      const patch = formToProfilePatch(form, profile);
      mockApi.updateProfile(user.id, patch);
      mockApi.updateTheme(user.id, {
        ...theme,
        updatedAt: new Date().toISOString(),
      });
      mockApi.updateFeaturedFriends(profile.id, featuredIds);
      setMessage(publish ? "Profile published." : "Profile saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const toggleFeatured = (friend: Profile) => {
    setFeaturedIds((current) => {
      if (current.includes(friend.id)) {
        return current.filter((id) => id !== friend.id);
      }
      if (current.length >= form.featuredFriendCount) return current;
      return [...current, friend.id];
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Edit profile</h1>
          <p className="text-sm text-navy-600">
            Update your public details, top friends, and custom theme.
          </p>
        </div>
        <Button onClick={() => saveAll()} isLoading={saving}>
          <Save className="h-4 w-4" aria-hidden />
          Save Profile
        </Button>
      </div>

      {message ? (
        <div className="rounded-card border border-brand/30 bg-brand-soft px-4 py-3 text-sm font-semibold text-brand-dark">
          {message}
        </div>
      ) : null}

      <div className="grid gap-5 xl:grid-cols-[430px_1fr]">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void saveAll();
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Basics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                label="Display name"
                value={form.displayName}
                onChange={(event) => updateForm("displayName", event.target.value)}
                required
              />
              <Input
                label="Pronouns"
                value={form.pronouns}
                onChange={(event) => updateForm("pronouns", event.target.value)}
                placeholder="they/them"
              />
              <Input
                label="Status"
                value={form.statusMessage}
                onChange={(event) => updateForm("statusMessage", event.target.value)}
                maxLength={140}
              />
              <Input
                label="Location"
                value={form.location}
                onChange={(event) => updateForm("location", event.target.value)}
              />
              <Textarea
                label="Short bio"
                value={form.bio}
                onChange={(event) => updateForm("bio", event.target.value)}
                rows={4}
                maxLength={280}
                helperText={`${form.bio.length}/280 characters`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {detailFields.map((field) =>
                field.multiline ? (
                  <Textarea
                    key={field.key}
                    label={field.label}
                    value={String(form.details[field.key] ?? "")}
                    onChange={(event) => updateDetails(field.key, event.target.value)}
                    rows={3}
                  />
                ) : (
                  <Input
                    key={field.key}
                    label={field.label}
                    value={String(form.details[field.key] ?? "")}
                    onChange={(event) => updateDetails(field.key, event.target.value)}
                  />
                )
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interests & music</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                label="Interests"
                value={form.interests}
                onChange={(event) => updateForm("interests", event.target.value)}
                helperText="Comma-separated interests."
              />
              <Textarea
                label="Favorite music"
                value={form.favoriteMusic}
                onChange={(event) => updateForm("favoriteMusic", event.target.value)}
                helperText="Comma-separated artists, genres, or songs."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured friends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="block space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wide text-navy-700">
                  Featured friend slots
                </span>
                <select
                  value={form.featuredFriendCount}
                  onChange={(event) => {
                    const count = Number(event.target.value) as Profile["featuredFriendCount"];
                    updateForm("featuredFriendCount", count);
                    setFeaturedIds((current) => current.slice(0, count));
                  }}
                  className="h-9 w-full rounded-card border border-surface-border bg-white px-3 text-sm"
                >
                  {[4, 8, 12, 16].map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid gap-2">
                {friends.map((friend) => {
                  const selected = featuredIds.includes(friend.id);
                  return (
                    <button
                      key={friend.id}
                      type="button"
                      onClick={() => toggleFeatured(friend)}
                      className={`flex items-center gap-3 rounded-card border p-2 text-left transition ${
                        selected
                          ? "border-brand bg-brand-soft"
                          : "border-surface-border bg-white hover:border-brand/50"
                      }`}
                    >
                      <Avatar
                        name={friend.displayName}
                        src={friend.avatarUrl}
                        size="sm"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-navy-900">
                          {friend.displayName}
                        </span>
                        <span className="block truncate text-xs text-navy-500">
                          @{friend.username}
                        </span>
                      </span>
                      {selected ? <Badge variant="info">Featured</Badge> : null}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </form>

        <ThemeEditor
          theme={draftTheme}
          onChange={setDraftTheme}
          onSave={(theme) => {
            mockApi.updateTheme(user.id, theme);
            setMessage("Theme saved.");
          }}
          onReset={() => {
            const reset = createThemeFromPreset("classic-blue", profile.id);
            setDraftTheme(reset);
            mockApi.updateTheme(user.id, reset);
            setMessage("Theme reset to Classic Blue.");
          }}
          onPreview={setDraftTheme}
          onPublish={(theme) => saveAll(theme, true)}
          preview={(theme) => <MiniProfilePreview profile={profile} theme={theme} />}
          previewTitle="Mini profile preview"
        />
      </div>
    </div>
  );
}

type ProfileForm = {
  displayName: string;
  pronouns: string;
  bio: string;
  statusMessage: string;
  location: string;
  details: ProfileDetails;
  interests: string;
  favoriteMusic: string;
  featuredFriendCount: Profile["featuredFriendCount"];
};

function profileToForm(profile?: Profile | null): ProfileForm {
  return {
    displayName: profile?.displayName ?? "",
    pronouns: profile?.pronouns ?? "",
    bio: profile?.bio ?? "",
    statusMessage: profile?.statusMessage ?? "",
    location: profile?.location ?? "",
    details: {
      hiddenFields: profile?.details.hiddenFields ?? [],
      aboutMe: profile?.details.aboutMe ?? "",
      whoIdLikeToMeet: profile?.details.whoIdLikeToMeet ?? "",
      generalInterests: profile?.details.generalInterests ?? "",
      music: profile?.details.music ?? "",
      movies: profile?.details.movies ?? "",
      television: profile?.details.television ?? "",
      books: profile?.details.books ?? "",
      heroes: profile?.details.heroes ?? "",
      occupation: profile?.details.occupation ?? "",
      education: profile?.details.education ?? "",
      relationshipStatus: profile?.details.relationshipStatus ?? "",
      website: profile?.details.website ?? "",
    },
    interests: profile?.interests.join(", ") ?? "",
    favoriteMusic: profile?.favoriteMusic.join(", ") ?? "",
    featuredFriendCount: profile?.featuredFriendCount ?? 8,
  };
}

function formToProfilePatch(form: ProfileForm, profile: Profile): Partial<Profile> {
  return {
    displayName: form.displayName.trim() || profile.displayName,
    pronouns: form.pronouns.trim() || undefined,
    bio: form.bio.trim() || undefined,
    statusMessage: form.statusMessage.trim() || undefined,
    location: form.location.trim() || undefined,
    details: form.details,
    interests: splitList(form.interests),
    favoriteMusic: splitList(form.favoriteMusic),
    featuredFriendCount: form.featuredFriendCount,
  };
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function MiniProfilePreview({
  profile,
  theme,
}: {
  profile: Profile;
  theme: ProfileTheme;
}) {
  return (
    <div
      className="mx-auto max-w-md rounded-card border p-4 shadow-card"
      style={{
        ...themeToCssVars(theme),
        borderColor: "var(--mp-primary)",
        borderStyle: "var(--mp-border-style)",
        backgroundColor: `rgb(255 255 255 / ${theme.cardTransparency})`,
        color: "var(--mp-text)",
        fontFamily: "var(--mp-body-font)",
      }}
    >
      <div className="flex items-center gap-3">
        <Avatar name={profile.displayName} src={profile.avatarUrl} size="lg" />
        <div>
          <h2
            className="text-xl font-black"
            style={{ color: theme.primaryColor, fontFamily: theme.headingFont }}
          >
            {profile.displayName}
          </h2>
          <p className="text-sm">@{profile.username}</p>
        </div>
      </div>
      <p className="mt-3 rounded-card border border-surface-border bg-white/70 p-3 text-sm">
        {profile.bio || "Your profile bio preview will appear here."}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {theme.moduleOrder.slice(0, 5).map((moduleId) => (
          <Badge key={moduleId}>{moduleId}</Badge>
        ))}
      </div>
      {theme.stickers.length ? (
        <p className="mt-3 text-lg">{theme.stickers.join(" ")}</p>
      ) : null}
    </div>
  );
}
