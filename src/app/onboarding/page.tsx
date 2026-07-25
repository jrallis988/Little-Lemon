"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useAuth } from "@/lib/auth/context";
import { updateTheme } from "@/lib/mock/store";
import { THEME_PRESETS, type ThemePresetName } from "@/lib/themes/presets";
import { AGE_MAX, AGE_MIN, PLATFORM_AUDIENCE, PLATFORM_NAME } from "@/lib/constants";
import { splitTags } from "@/app/_components/vibe-page-utils";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, profile, loading, updateProfile, refresh } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [school, setSchool] = useState("");
  const [activities, setActivities] = useState("");
  const [interests, setInterests] = useState("");
  const [favoriteMusic, setFavoriteMusic] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [themeName, setThemeName] = useState<ThemePresetName>("Classic Blue");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, router, user]);

  useEffect(() => {
    if (!profile) return;
    setDisplayName(profile.display_name);
    setBio(profile.bio ?? "");
    setLocation(profile.location ?? "");
    setInterests(profile.interests.join(", "));
    setFavoriteMusic(profile.favorite_music ?? "");
    setStatusMessage(profile.status_message ?? "");
    setSchool(profile.education ?? "");
    setActivities(profile.occupation ?? "");
    const signupAge = sessionStorage.getItem("vibe-signup-age");
    setAge(signupAge ?? (profile.age != null ? String(profile.age) : ""));
  }, [profile]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;
    const ageNum = Number(age);
    if (!Number.isInteger(ageNum) || ageNum < AGE_MIN || ageNum > AGE_MAX) {
      setError(`Enter an age between ${AGE_MIN} and ${AGE_MAX}.`);
      return;
    }
    setError("");
    const preset = THEME_PRESETS[themeName];
    updateProfile({
      display_name: displayName,
      bio,
      location,
      age: ageNum,
      show_age: true,
      education: school || null,
      occupation: activities || null,
      interests: splitTags(interests),
      favorite_music: favoriteMusic || null,
      status_message: statusMessage || null,
      onboarding_complete: true,
    });
    updateTheme(profile.id, {
      ...preset,
      preset_name: themeName,
      module_order: [...preset.module_order],
      stickers: preset.stickers.map((sticker) => ({ ...sticker })),
      published: true,
    });
    refresh();
    setStatus("Saved! Taking you to your dashboard...");
    router.push("/home");
  }

  if (loading || !profile) {
    return (
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-12">
        <section className="mp-card animate-pulse p-6 text-[#5b6b7c]">Loading onboarding...</section>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-[#e9eef4] px-4 py-12">
      <section className="mx-auto max-w-3xl">
        <div className="mp-card p-6">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#3b6ea5]">
            {PLATFORM_NAME} onboarding · {PLATFORM_AUDIENCE}
          </p>
          <h1 className="mt-2 text-3xl font-black text-[#0f2744]">Make your page feel like you</h1>
          <p className="mt-2 text-sm text-[#5b6b7c]">
            Add the teen basics, pick a starter theme, and you can remix everything later.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
            <Input
              id="onboarding-display-name"
              label="Display name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              required
            />
            <Textarea
              id="onboarding-bio"
              label="Short bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={3}
              placeholder="One line that sounds like you — clubs, music, chaos, whatever"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                id="onboarding-age"
                label={`Age (${AGE_MIN}–${AGE_MAX})`}
                type="number"
                min={AGE_MIN}
                max={AGE_MAX}
                value={age}
                onChange={(event) => setAge(event.target.value)}
                required
              />
              <Input
                id="onboarding-location"
                label="City / area"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="City, region"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                id="onboarding-school"
                label="School / grade"
                value={school}
                onChange={(event) => setSchool(event.target.value)}
                placeholder="Lincoln High · 10th grade"
              />
              <Input
                id="onboarding-activities"
                label="Clubs / activities"
                value={activities}
                onChange={(event) => setActivities(event.target.value)}
                placeholder="Dance team, yearbook, skate club..."
              />
            </div>
            <Input
              id="onboarding-favorite-music"
              label="Favorite music / on repeat"
              value={favoriteMusic}
              onChange={(event) => setFavoriteMusic(event.target.value)}
              placeholder="What's stuck in your head right now?"
            />
            <Input
              id="onboarding-interests"
              label="Interests"
              value={interests}
              onChange={(event) => setInterests(event.target.value)}
              hint="Comma-separated tags — thrifting, gaming, volleyball, etc."
            />
            <Input
              id="onboarding-status"
              label="Status message"
              value={statusMessage}
              onChange={(event) => setStatusMessage(event.target.value)}
              placeholder="What should your profile say today?"
            />
            <div>
              <label
                htmlFor="onboarding-theme"
                className="block text-xs font-semibold uppercase tracking-wide text-[#0f2744]"
              >
                Starter theme
              </label>
              <select
                id="onboarding-theme"
                value={themeName}
                onChange={(event) => setThemeName(event.target.value as ThemePresetName)}
                className="mt-1.5 block min-h-9 w-full rounded-[4px] border border-[#c5d0dc] bg-white px-3 py-2 text-sm text-[#1a2332]"
              >
                {(Object.keys(THEME_PRESETS) as ThemePresetName[]).map((preset) => (
                  <option key={preset} value={preset}>
                    {preset}
                  </option>
                ))}
              </select>
            </div>
            {error ? (
              <p className="rounded-[4px] border border-[#b42318]/40 bg-[#b42318]/10 px-3 py-2 text-sm font-medium text-[#b42318]">
                {error}
              </p>
            ) : null}
            {status ? (
              <p className="rounded-[4px] border border-[#3b6ea5]/30 bg-[#d7e4f3] px-3 py-2 text-sm font-medium text-[#0f2744]">
                {status}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <Button type="submit">Save and go home</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  router.push("/home");
                }}
              >
                Skip for now
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
