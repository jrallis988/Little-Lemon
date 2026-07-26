"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Palette,
  ShieldCheck,
} from "lucide-react";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useAuth } from "@/lib/auth/AuthProvider";
import { mockApi } from "@/lib/mock/store";
import { createThemeFromPreset, THEME_PRESETS } from "@/lib/themes";
import type { Profile, ProfileThemePreset, StudentVerificationMethod } from "@/lib/types";
import {
  cn,
  isValidUsername,
  slugifyUsername,
  teenAgeError,
} from "@/lib/utils";

const steps = ["Identity", "School verification", "Photo & bio", "Interests", "Theme"];

const schools = [
  { id: "northview-high", name: "Northview High", domain: "northview.edu" },
  { id: "pine-ridge-middle", name: "Pine Ridge Middle", domain: "pineridge.edu" },
  { id: "westfield-high", name: "Westfield High", domain: "westfield.edu" },
  { id: "riverdale-academy", name: "Riverdale Academy", domain: "riverdale.edu" },
];

const grades = ["6", "7", "8", "9", "10", "11", "12"];

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

function asVerificationMethod(method: string): StudentVerificationMethod {
  if (method === "school_email") return "school_email";
  if (method === "code") return "code";
  return "demo";
}

function OnboardingContent() {
  const router = useRouter();
  const { user, profile, completeOnboarding } = useAuth();
  const [step, setStep] = useState(0);
  const [displayName, setDisplayName] = useState(profile?.displayName || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [birthdate, setBirthdate] = useState(profile?.birthdate || "");
  const [schoolId, setSchoolId] = useState(profile?.schoolId || schools[0].id);
  const [grade, setGrade] = useState(profile?.grade || "");
  const [verificationMethod, setVerificationMethod] = useState<StudentVerificationMethod>(
    profile?.verificationMethod || "demo"
  );
  const [schoolEmail, setSchoolEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl || "");
  const [location, setLocation] = useState(profile?.location || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [moodEmoji, setMoodEmoji] = useState(profile?.mood?.split(" ")[0] || "✨");
  const [moodText, setMoodText] = useState(profile?.mood?.replace(/^\S+\s*/, "") || "ready");
  const [interests, setInterests] = useState((profile?.interests || []).join(", "));
  const [favoriteMusic, setFavoriteMusic] = useState(
    (profile?.favoriteMusic || []).join(", ")
  );
  const [clubs, setClubs] = useState((profile?.clubs || []).join(", "));
  const [themePreset, setThemePreset] = useState<ProfileThemePreset>(
    profile?.theme.preset || "classic-blue"
  );
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedTheme = useMemo(() => {
    return createThemeFromPreset(themePreset, profile?.id || "preview");
  }, [profile?.id, themePreset]);

  const selectedSchool = schools.find((school) => school.id === schoolId) ?? schools[0];

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
      const ageMessage = teenAgeError(birthdate);
      if (ageMessage) return ageMessage;
    }
    if (targetStep === 1) {
      if (!schoolId) return "Choose your school.";
      if (!grade) return "Choose your grade.";
      if (verificationMethod === "school_email") {
        const email = schoolEmail.trim().toLowerCase();
        if (!email.endsWith(`@${selectedSchool.domain}`)) {
          return `Use a ${selectedSchool.name} email ending in @${selectedSchool.domain}.`;
        }
      }
      if (verificationMethod === "code" && inviteCode.trim().toUpperCase() !== "VIBE2026") {
        return "Invite code did not match. Try VIBE2026 for this demo.";
      }
    }
    if (targetStep === 2 && !isLikelyUrl(avatarUrl)) {
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

    const verifiedProfilePatch: Partial<Profile> & { themePreset?: ProfileThemePreset } = {
      displayName: displayName.trim(),
      username,
      birthdate,
      showAge: true,
      schoolId,
      schoolName: selectedSchool.name,
      grade,
      studentVerified: true,
      verificationMethod: asVerificationMethod(verificationMethod),
      avatarUrl: avatarUrl.trim() || undefined,
      location: location.trim() || undefined,
      hometown: location.trim() || undefined,
      bio: bio.trim() || undefined,
      mood: `${moodEmoji.trim() || "✨"} ${moodText.trim() || "ready"}`.trim(),
      interests: splitList(interests),
      favoriteMusic: splitList(favoriteMusic),
      clubs: splitList(clubs),
      hereFor: "Real friends, school groups, photo sets, playlists, and kind comments.",
      schoolOnlyBoundary: true,
      themePreset,
    };

    setSubmitting(true);
    setError("");
    try {
      await completeOnboarding(verifiedProfilePatch);
      router.push("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to finish onboarding.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] px-4 py-8 text-navy-900">
      <form onSubmit={finish} className="mx-auto max-w-4xl animate-slide-up">
        <Card className="overflow-hidden border-brand/20 shadow-xl">
          <CardHeader className="bg-[linear-gradient(135deg,#2456a4,#3d73c0)] text-white">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="text-white">Verified Student Onboarding</CardTitle>
                <p className="mt-1 text-sm text-blue-50">
                  Build a page for real classmates and teen peers in a closed-loop student
                  ecosystem.
                </p>
              </div>
              <Badge className="border-white/25 bg-white/15 text-white">
                Ages 13-17
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 bg-[#fffaf0]">
            <ol className="grid gap-2 md:grid-cols-5">
              {steps.map((label, index) => (
                <li
                  key={label}
                  className={cn(
                    "rounded-card border px-3 py-2 text-xs font-bold uppercase tracking-wide",
                    index === step
                      ? "border-brand bg-brand-soft text-brand-dark"
                      : index < step
                        ? "border-green-200 bg-green-50 text-green-800"
                        : "border-surface-border bg-white text-navy-500"
                  )}
                >
                  {index + 1}. {label}
                </li>
              ))}
            </ol>

            {step === 0 ? (
              <section className="space-y-4">
                <div className="rounded-card border border-brand/20 bg-white p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark" aria-hidden />
                    <div>
                      <h2 className="font-display text-lg font-black text-navy-900">
                        First, confirm this is your teen profile.
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-navy-600">
                        Vibe is for students ages 13-17. Your birthday keeps the community
                        teen-only, and your profile can stay personality-first.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
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
                  <Input
                    label="Birthday"
                    type="date"
                    value={birthdate}
                    onChange={(event) => setBirthdate(event.target.value)}
                    helperText="Required for the 13-17 student boundary."
                    required
                  />
                </div>
              </section>
            ) : null}

            {step === 1 ? (
              <section className="space-y-4">
                <div className="rounded-card border border-accent/30 bg-accent-soft/50 p-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark" aria-hidden />
                    <div>
                      <h2 className="font-display text-lg font-black text-navy-900">
                        Verify your school loop.
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-navy-700">
                        Pick your school and grade so Vibe can keep friend requests,
                        groups, and comments closer to real student peers.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
                  <label className="space-y-1.5">
                    <span className="block text-xs font-bold uppercase tracking-wide text-navy-700">
                      School
                    </span>
                    <select
                      value={schoolId}
                      onChange={(event) => setSchoolId(event.target.value)}
                      className="h-9 w-full rounded-card border border-surface-border bg-white px-3 text-sm text-navy-900 shadow-soft outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    >
                      {schools.map((school) => (
                        <option key={school.id} value={school.id}>
                          {school.name}
                        </option>
                      ))}
                    </select>
                    <span className="text-xs text-navy-500">
                      Demo domain: @{selectedSchool.domain}
                    </span>
                  </label>
                  <label className="space-y-1.5">
                    <span className="block text-xs font-bold uppercase tracking-wide text-navy-700">
                      Grade
                    </span>
                    <select
                      value={grade}
                      onChange={(event) => setGrade(event.target.value)}
                      className="h-9 w-full rounded-card border border-surface-border bg-white px-3 text-sm text-navy-900 shadow-soft outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    >
                      <option value="">Choose grade</option>
                      {grades.map((item) => (
                        <option key={item} value={item}>
                          Grade {item}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    ["school_email", "School email", "Use your student email domain."],
                    ["code", "Invite code", "Enter VIBE2026 for this demo."],
                    ["demo", "Demo verify", "Continue with mock verification."],
                  ].map(([value, label, helper]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setVerificationMethod(asVerificationMethod(value))}
                      className={cn(
                        "rounded-card border bg-white p-3 text-left transition hover:border-brand",
                        verificationMethod === value
                          ? "border-brand ring-2 ring-brand/20"
                          : "border-surface-border"
                      )}
                    >
                      <span className="block text-sm font-black text-navy-900">{label}</span>
                      <span className="mt-1 block text-xs leading-5 text-navy-600">
                        {helper}
                      </span>
                    </button>
                  ))}
                </div>
                {verificationMethod === "school_email" ? (
                  <Input
                    label="School email"
                    type="email"
                    value={schoolEmail}
                    onChange={(event) => setSchoolEmail(event.target.value)}
                    placeholder={`you@${selectedSchool.domain}`}
                    helperText="This mock accepts the selected school's demo domain."
                  />
                ) : null}
                {verificationMethod === "code" ? (
                  <Input
                    label="Invite code"
                    value={inviteCode}
                    onChange={(event) => setInviteCode(event.target.value.toUpperCase())}
                    placeholder="VIBE2026"
                    helperText="Demo code VIBE2026 always verifies."
                  />
                ) : null}
              </section>
            ) : null}

            {step === 2 ? (
              <section className="grid gap-4 md:grid-cols-[150px_1fr]">
                <div className="rounded-card border border-surface-border bg-white p-4 text-center">
                  <Avatar
                    name={displayName || profile.displayName}
                    src={avatarUrl}
                    size="xl"
                    className="mx-auto bg-white"
                  />
                  <p className="mt-2 text-xs font-bold text-navy-600">Profile preview</p>
                  <p className="mt-1 text-2xl" aria-label="Mood preview">
                    {moodEmoji || "✨"}
                  </p>
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
                    helperText="Keep it general; city or region is enough."
                  />
                  <div className="grid gap-4 sm:grid-cols-[96px_1fr]">
                    <Input
                      label="Mood emoji"
                      value={moodEmoji}
                      onChange={(event) => setMoodEmoji(event.target.value.slice(0, 4))}
                      placeholder="✨"
                    />
                    <Input
                      label="Mood"
                      value={moodText}
                      onChange={(event) => setMoodText(event.target.value)}
                      placeholder="ready for Friday"
                    />
                  </div>
                  <Textarea
                    label="Bio"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    rows={4}
                    maxLength={180}
                    helperText={`${bio.length}/180 - what should classmates know first?`}
                    placeholder="Sophomore - skate clips - always redoing my theme"
                  />
                </div>
              </section>
            ) : null}

            {step === 3 ? (
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
                <Textarea
                  label="Clubs & activities"
                  value={clubs}
                  onChange={(event) => setClubs(event.target.value)}
                  rows={2}
                  helperText="Comma-separated: art club, soccer, yearbook, robotics"
                />
              </section>
            ) : null}

            {step === 4 ? (
              <section className="grid gap-4 lg:grid-cols-[1fr_240px]">
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
                    <p className="mt-2 text-xs">
                      {moodEmoji} {moodText || "ready"} - {bio || "Your profile intro will live here."}
                    </p>
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
                  Verify and Enter Vibe
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
