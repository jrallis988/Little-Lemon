"use client";

import { FormEvent, useId, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { THEME_PRESETS, type ThemePresetName } from "@/lib/themes/presets";
import {
  USERNAME_MAX,
  USERNAME_MIN,
  USERNAME_PATTERN,
} from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

const steps = ["Identity", "About", "Interests", "Theme"] as const;
const themePresetNames = Object.keys(THEME_PRESETS) as ThemePresetName[];

export interface OnboardingFormValues {
  displayName: string;
  username: string;
  photoUrl: string;
  location: string;
  bio: string;
  interests: string[];
  favoriteMusic: string;
  themePreset: ThemePresetName;
}

export interface OnboardingFormProps {
  initialValues?: Partial<OnboardingFormValues>;
  onComplete: (values: OnboardingFormValues) => void | Promise<void>;
  className?: string;
}

function parseList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function OnboardingForm({
  initialValues,
  onComplete,
  className,
}: OnboardingFormProps) {
  const displayNameId = useId();
  const usernameId = useId();
  const photoUrlId = useId();
  const locationId = useId();
  const bioId = useId();
  const interestsId = useId();
  const favoriteMusicId = useId();

  const [step, setStep] = useState(0);
  const [displayName, setDisplayName] = useState(initialValues?.displayName ?? "");
  const [username, setUsername] = useState(initialValues?.username ?? "");
  const [photoUrl, setPhotoUrl] = useState(initialValues?.photoUrl ?? "");
  const [location, setLocation] = useState(initialValues?.location ?? "");
  const [bio, setBio] = useState(initialValues?.bio ?? "");
  const [interests, setInterests] = useState(
    initialValues?.interests?.join(", ") ?? ""
  );
  const [favoriteMusic, setFavoriteMusic] = useState(
    initialValues?.favoriteMusic ?? ""
  );
  const [themePreset, setThemePreset] = useState<ThemePresetName>(
    initialValues?.themePreset ?? "Classic"
  );
  const [submitting, setSubmitting] = useState(false);

  const usernameError = useMemo(() => {
    if (!username) return undefined;
    return USERNAME_PATTERN.test(username)
      ? undefined
      : "Use 3-24 letters, numbers, or underscores.";
  }, [username]);

  const canContinue = useMemo(() => {
    if (step === 0) {
      return displayName.trim().length > 0 && USERNAME_PATTERN.test(username);
    }
    if (step === 2) {
      return parseList(interests).length > 0 || favoriteMusic.trim().length > 0;
    }
    return true;
  }, [displayName, favoriteMusic, interests, step, username]);

  function values(): OnboardingFormValues {
    return {
      displayName: displayName.trim(),
      username: username.trim(),
      photoUrl: photoUrl.trim(),
      location: location.trim(),
      bio: bio.trim(),
      interests: parseList(interests),
      favoriteMusic: favoriteMusic.trim(),
      themePreset,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canContinue) return;

    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    setSubmitting(true);
    try {
      await onComplete(values());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={cn("mp-card space-y-5 p-5", className)} onSubmit={handleSubmit}>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-[#6E6E6E]">
          Step {step + 1} of {steps.length}
        </p>
        <h1 className="mt-1 text-2xl font-black text-[#222222]">
          {steps[step]}
        </h1>
      </div>

      <div className="grid gap-2 sm:grid-cols-4" aria-label="Onboarding progress">
        {steps.map((label, index) => (
          <div key={label} className="space-y-1">
            <div
              className={cn(
                "h-2 rounded-full",
                index <= step ? "bg-[#7B61FF]" : "bg-[#E5E5E5]"
              )}
            />
            <p
              className={cn(
                "text-xs font-semibold",
                index === step ? "text-[#222222]" : "text-[#6E6E6E]"
              )}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      {step === 0 ? (
        <div className="space-y-4">
          <Input
            id={displayNameId}
            label="Display name"
            value={displayName}
            required
            onChange={(event) => setDisplayName(event.target.value)}
          />
          <Input
            id={usernameId}
            label="Username"
            value={username}
            required
            minLength={USERNAME_MIN}
            maxLength={USERNAME_MAX}
            pattern="[A-Za-z0-9_]{3,24}"
            hint="3-24 characters: letters, numbers, and underscores only."
            error={usernameError}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            id={photoUrlId}
            label="Photo URL"
            type="url"
            value={photoUrl}
            placeholder="https://example.com/avatar.jpg"
            onChange={(event) => setPhotoUrl(event.target.value)}
          />
        </div>
      ) : null}

      {step === 1 ? (
        <div className="space-y-4">
          <Input
            id={locationId}
            label="Location"
            value={location}
            placeholder="City, state, planet..."
            onChange={(event) => setLocation(event.target.value)}
          />
          <Textarea
            id={bioId}
            label="Bio"
            value={bio}
            rows={5}
            placeholder="Tell people what your place is about."
            onChange={(event) => setBio(event.target.value)}
          />
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <Input
            id={interestsId}
            label="Interests"
            value={interests}
            hint="Separate interests with commas."
            placeholder="web design, mixtapes, photography"
            onChange={(event) => setInterests(event.target.value)}
          />
          <Textarea
            id={favoriteMusicId}
            label="Favorite music"
            value={favoriteMusic}
            rows={4}
            placeholder="Bands, songs, playlists, or a current anthem."
            onChange={(event) => setFavoriteMusic(event.target.value)}
          />
        </div>
      ) : null}

      {step === 3 ? (
        <fieldset className="space-y-3">
          <legend className="text-sm font-bold text-[#222222]">
            Pick a theme preset
          </legend>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {themePresetNames.map((presetName) => {
              const preset = THEME_PRESETS[presetName];
              const selected = themePreset === presetName;

              return (
                <button
                  key={presetName}
                  type="button"
                  onClick={() => setThemePreset(presetName)}
                  className={cn(
                    "rounded-[4px] border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md",
                    selected
                      ? "border-[#FF7A18] ring-2 ring-[#7B61FF]/25"
                      : "border-[#E5E5E5]"
                  )}
                  aria-pressed={selected}
                >
                  <span
                    className="block h-14 rounded-[4px] border border-black/10"
                    style={{
                      background: `linear-gradient(135deg, ${preset.background_color}, ${preset.secondary_color})`,
                    }}
                  />
                  <span className="mt-2 flex items-center justify-between gap-2">
                    <span className="font-bold text-[#222222]">{presetName}</span>
                    {selected ? (
                      <Check className="h-4 w-4 text-[#1E824C]" aria-hidden="true" />
                    ) : null}
                  </span>
                  <span className="mt-1 block text-xs text-[#6E6E6E]">
                    {preset.display_mode} / {preset.heading_font}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <div className="flex items-center justify-between gap-3 border-t border-[#E5E5E5] pt-4">
        <Button
          type="button"
          variant="secondary"
          disabled={step === 0 || submitting}
          onClick={() => setStep((current) => Math.max(current - 1, 0))}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Button>
        <Button type="submit" disabled={!canContinue || submitting}>
          {step === steps.length - 1 ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" />
              {submitting ? "Finishing..." : "Finish"}
            </>
          ) : (
            <>
              Next
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export default OnboardingForm;
