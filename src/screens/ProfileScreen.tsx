import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useProfileStore } from "@/stores/profileStore";
import { useSessionStore } from "@/stores/sessionStore";
import { cn } from "@/lib/utils";

/** Screen 9 — Profile identity switcher + accessibility */
export function ProfileScreen() {
  const profiles = useProfileStore((s) => s.profiles);
  const activeProfileId = useProfileStore((s) => s.activeProfileId);
  const setActiveProfile = useProfileStore((s) => s.setActiveProfile);
  const updateAccessibility = useProfileStore((s) => s.updateAccessibility);
  const startSession = useSessionStore((s) => s.startSession);
  const showLearningMode = useSessionStore((s) => s.showLearningMode);

  const active = profiles.find((p) => p.id === activeProfileId);

  return (
    <section className="animate-fade-in pb-16">
      <header className="mb-8 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-ocean">
          Profiles
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-navy">
          Who’s surfing?
        </h1>
        <p className="mt-3 text-slate">
          Switch identities and tune accessibility — no noisy gamification.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {profiles.map((profile) => {
          const selected = profile.id === activeProfileId;
          return (
            <button
              key={profile.id}
              type="button"
              onClick={() => {
                setActiveProfile(profile.id);
                startSession(profile.id);
                showLearningMode();
              }}
              className={cn(
                "rounded-3xl border p-5 text-left shadow-soft transition",
                selected
                  ? "border-ocean bg-white"
                  : "border-white/60 bg-white/70 hover:bg-white",
              )}
            >
              <AvatarMark
                primary={profile.avatar.primary}
                secondary={profile.avatar.secondary}
                shape={profile.avatar.shape}
              />
              <h2 className="mt-4 font-display text-2xl font-semibold text-navy">
                {profile.displayName}
              </h2>
              <p className="mt-1 text-sm text-slate">
                {selected ? "Active now" : "Tap to switch"}
              </p>
            </button>
          );
        })}
      </div>

      {active && (
        <div className="mt-10 max-w-xl rounded-3xl border border-white/60 bg-white/75 p-6 shadow-soft">
          <div className="mb-5 flex items-center gap-2 text-navy">
            <Settings2 className="h-5 w-5" />
            <h3 className="font-display text-xl font-semibold">
              Accessibility
            </h3>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Label>High contrast</Label>
                <p className="text-sm text-slate">
                  Stronger edges for easier reading
                </p>
              </div>
              <Switch
                checked={active.accessibility.highContrast}
                onCheckedChange={(checked) =>
                  updateAccessibility(active.id, { highContrast: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <Label>Large text</Label>
                <p className="text-sm text-slate">
                  Increases base type size across Surf
                </p>
              </div>
              <Switch
                checked={active.accessibility.largeText}
                onCheckedChange={(checked) =>
                  updateAccessibility(active.id, { largeText: checked })
                }
              />
            </div>
          </div>

          <Button
            className="mt-6"
            variant="secondary"
            onClick={() => showLearningMode()}
          >
            Preview Learning Mode
          </Button>
        </div>
      )}
    </section>
  );
}

function AvatarMark({
  primary,
  secondary,
  shape,
}: {
  primary: string;
  secondary: string;
  shape: string;
}) {
  const radius =
    shape === "circle"
      ? "9999px"
      : shape === "rounded-square"
        ? "1rem"
        : shape === "hex"
          ? "1.25rem"
          : "40% 60% 55% 45% / 45% 40% 60% 55%";

  return (
    <div
      className="h-16 w-16"
      style={{
        borderRadius: radius,
        background: `linear-gradient(135deg, ${primary}, ${secondary})`,
      }}
      aria-hidden
    />
  );
}
