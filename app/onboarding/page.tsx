"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, ChevronRight, Palette } from "lucide-react";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useAuth } from "@/lib/auth/AuthProvider";
import { mockApi } from "@/lib/mock/store";
import { createThemeFromPreset, THEME_PRESETS } from "@/lib/themes";
import type { ProfileThemePreset } from "@/lib/types";
import { cn, isValidUsername, slugifyUsername } from "@/lib/utils";

const steps = ["Identity", "Your page", "Interests", "Theme"];

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isLikelyUrl(value: string) {
  if (!value.trim()) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function OnboardingContent() {
  const router = useRouter();
  const { user, profile, completeOnboarding } = useAuth();
  const [step, setStep] = useState(0);
  const [displayName, setDisplayName] = useState(profile?.displayName || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl || "");
  const [location, setLocation] = useState(profile?.location || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [interests, setInterests] = useState((profile?.interests || []).join(", "));
  const [favoriteMusic, setFavoriteMusic] = useState(
    (profile?.favoriteMusic || []).join(", ")
  );
  const [themePreset, setThemePreset] = useState<ProfileThemePreset>(
    profile?.theme.preset || "classic-blue"
  );
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedTheme = useMemo(() => {
    return createThemeFromPreset(themePreset, profile?.id || "preview");
  }, [profile?.id, themePreset]);

  if (!user || !profile) return null;

  const validateStep = (targetStep = step) => {
    if (targetStep === 0) {
      if (!displayName.trim()) return "Display name is required.";
      if (!isValidUsername(username)) {
        return "Username must be 3-24 lowercase letters, numbers, or underscores.";
      }
      if (mockApi.isUsernameTaken(username, user.id)) {
        return "That username is already taken.";
      }
    }
    if (targetStep === 1 && !isLikelyUrl(avatarUrl)) {
      return "Profile photo must be a valid http or https URL.";
    }
    return "";
  };

  const goNext = () => {
    const message = validateStep();
    if (message) {
      setError(message);
      return;
    }
    setError("");
    setStep((current) => Math.min(steps.length - 1, current + 1));
  };

  const goBack = () => {
    setError("");
    setStep((current) => Math.max(0, current - 1));
  };

  const finish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    for (let index = 0; index < steps.length; index += 1) {
      const message = validateStep(index);
      if (message) {
        setStep(index);
        setError(message);
        return;
      }
    }

    setSubmitting(true);
    setError("");
    try {
      await completeOnboarding({
        displayName: displayName.trim(),
        username,
        avatarUrl: avatarUrl.trim() || undefined,
        location: location.trim() || undefined,
        bio: bio.trim() || undefined,
        interests: splitList(interests),
        favoriteMusic: splitList(favoriteMusic),
        themePreset,
      });
      router.push("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to finish onboarding.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-muted px-4 py-8 text-navy-900">
      <form onSubmit={finish} className="mx-auto max-w-3xl animate-slide-up">
        <Card className="overflow-hidden">
          <CardHeader className="bg-navy-900 text-white">
            <CardTitle className="text-white">Set up your vibe</CardTitle>
            <p className="mt-1 text-xs text-navy-100">
              A few details turn an account into a page that feels like you — school
              life, playlists, and all.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <ol className="grid gap-2 sm:grid-cols-4">
              {steps.map((label, index) => (
                <li
                  key={label}
                  className={cn(
                    "rounded-card border px-3 py-2 text-xs font-bold uppercase tracking-wide",
                    index === step
                      ? "border-brand bg-brand-soft text-brand-dark"
                      : index < step
                        ? "border-green-200 bg-green-50 text-green-800"
                        : "border-surface-border bg-surface-muted text-navy-500"
                  )}
                >
                  {index + 1}. {label}
                </li>
              ))}
            </ol>

            {step === 0 ? (
              <section className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Display name"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  required
                />
                <Input
                  label="Username"
                  value={username}
                  onChange={(event) => setUsername(slugifyUsername(event.target.value))}
                  helperText={
                    isValidUsername(username) && !mockApi.isUsernameTaken(username, user.id)
                      ? `@${username} is available.`
                      : "Lowercase letters, numbers, and underscores."
                  }
                  required
                />
              </section>
            ) : null}

            {step === 1 ? (
              <section className="grid gap-4 md:grid-cols-[140px_1fr]">
                <div className="rounded-card border border-surface-border bg-surface-muted p-4 text-center">
                  <Avatar
                    name={displayName || profile.displayName}
                    src={avatarUrl}
                    size="xl"
                    className="mx-auto bg-white"
                  />
                  <p className="mt-2 text-xs font-bold text-navy-600">Preview</p>
                </div>
                <div className="space-y-4">
                  <Input
                    label="Profile photo URL"
                    type="url"
                    value={avatarUrl}
                    onChange={(event) => setAvatarUrl(event.target.value)}
                    helperText="Paste an image URL, or keep the generated demo avatar."
                  />
                  <Input
                    label="City / area"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="City, State"
                    helperText="Keep it general if you want — city is enough."
                  />
                  <Textarea
                    label="Bio"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    rows={4}
                    maxLength={180}
                    helperText={`${bio.length}/180 — what should people know first?`}
                    placeholder="Sophomore · skate clips · always redoing my theme"
                  />
                </div>
              </section>
            ) : null}

            {step === 2 ? (
              <section className="space-y-4">
                <Textarea
                  label="Interests"
                  value={interests}
                  onChange={(event) => setInterests(event.target.value)}
                  rows={3}
                  helperText="Comma-separated: skating, robotics, soccer, fanfic, photography"
                />
                <Textarea
                  label="Favorite music"
                  value={favoriteMusic}
                  onChange={(event) => setFavoriteMusic(event.target.value)}
                  rows={3}
                  helperText="Comma-separated genres or playlist vibes: hyperpop, bedroom pop, marching band"
                />
              </section>
            ) : null}

            {step === 3 ? (
              <section className="grid gap-4 lg:grid-cols-[1fr_220px]">
                <div className="grid gap-3 sm:grid-cols-2">
                  {(Object.keys(THEME_PRESETS) as ProfileThemePreset[]).map((preset) => {
                    const theme = createThemeFromPreset(preset, profile.id);
                    const selected = themePreset === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setThemePreset(preset)}
                        className={cn(
                          "rounded-card border bg-white p-3 text-left transition hover:border-brand",
                          selected
                            ? "border-brand ring-2 ring-brand/20"
                            : "border-surface-border"
                        )}
                        aria-pressed={selected}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="font-bold text-navy-900">
                            {THEME_PRESETS[preset].label}
                          </span>
                          {selected ? <Check className="h-4 w-4 text-brand" aria-hidden /> : null}
                        </span>
                        <span className="mt-1 block text-xs text-navy-500">
                          {THEME_PRESETS[preset].description}
                        </span>
                        <span className="mt-3 flex gap-1">
                          {[theme.primaryColor, theme.secondaryColor, theme.backgroundColor].map(
                            (color) => (
                              <span
                                key={color}
                                className="h-5 flex-1 rounded-btn border border-navy-100"
                                style={{ backgroundColor: color }}
                              />
                            )
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="rounded-card border border-surface-border bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-navy-800">
                    <Palette className="h-4 w-4 text-brand" aria-hidden />
                    Theme preview
                  </div>
                  <div
                    className="mt-3 rounded-card border p-3"
                    style={{
                      backgroundColor: selectedTheme.backgroundColor,
                      color: selectedTheme.textColor,
                      borderColor: selectedTheme.primaryColor,
                      fontFamily: selectedTheme.bodyFont,
                    }}
                  >
                    <h3
                      className="font-black"
                      style={{
                        color: selectedTheme.primaryColor,
                        fontFamily: selectedTheme.headingFont,
                      }}
                    >
                      {displayName || profile.displayName}
                    </h3>
                    <p className="mt-2 text-xs">{bio || "Your profile intro will live here."}</p>
                  </div>
                </div>
              </section>
            ) : null}

            {error ? (
              <p className="rounded-card border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <div className="flex items-center justify-between gap-3 border-t border-surface-border pt-4">
              {step > 0 ? (
                <Button type="button" variant="secondary" onClick={goBack}>
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  Back
                </Button>
              ) : (
                <div />
              )}
              {step < steps.length - 1 ? (
                <Button type="button" onClick={goNext}>
                  Next
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Button>
              ) : (
                <Button type="submit" isLoading={submitting}>
                  Finish and Go Home
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}

export default function OnboardingPage() {
  return (
    <RequireAuth requireOnboarding={false}>
      <OnboardingContent />
    </RequireAuth>
  );
}
