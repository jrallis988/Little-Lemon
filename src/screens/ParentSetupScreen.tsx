import { FormEvent, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { isValidPinFormat } from "@/services/parentGate";
import { useParentStore } from "@/stores/profileStore";
import { formatMinutes, cn } from "@/lib/utils";
import { SurfLogo } from "@/components/brand/SurfLogo";
import {
  PRIVACY_CONSENT_LABEL,
  PRIVACY_NOTICE_POINTS,
  PRIVACY_NOTICE_TITLE,
} from "@/brand/privacy";

const DISALLOWED_PINS = new Set(["0000", "1111", "1234", "9999"]);

/**
 * First-run parent gate — PIN, time limit, and privacy consent before kids search.
 */
export function ParentSetupScreen() {
  const setPin = useParentStore((s) => s.setPin);
  const completeParentSetup = useParentStore((s) => s.completeParentSetup);
  const setDailyLimit = useParentStore((s) => s.setDailyLimit);
  const acceptPrivacy = useParentStore((s) => s.acceptPrivacy);
  const dailyLimitMinutes = useParentStore((s) => s.controls.dailyLimitMinutes);

  const [step, setStep] = useState<"privacy" | "pin">("privacy");
  const [consent, setConsent] = useState(false);
  const [pin, setPinValue] = useState("");
  const [confirm, setConfirm] = useState("");
  const [limit, setLimit] = useState(dailyLimitMinutes);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onPrivacyContinue = (event: FormEvent) => {
    event.preventDefault();
    if (!consent) {
      setError("A parent or guardian must accept the privacy notice to continue.");
      return;
    }
    setError("");
    acceptPrivacy();
    setStep("pin");
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isValidPinFormat(pin)) {
      setError("PIN must be 4–8 digits.");
      return;
    }
    if (DISALLOWED_PINS.has(pin)) {
      setError("Choose a PIN that isn’t a common default (not 0000, 1111, 1234…).");
      return;
    }
    if (pin !== confirm) {
      setError("PINs don’t match. Try again.");
      return;
    }

    setBusy(true);
    setError("");
    try {
      await setPin(pin);
      setDailyLimit(limit);
      completeParentSetup();
    } catch {
      setError("Could not save your PIN. Please try again.");
      setBusy(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#5F9ED1_0%,_transparent_55%),linear-gradient(160deg,#234197_0%,#1a2f6e_45%,#288CC1_100%)]"
      />
      <div className="relative z-10 w-full max-w-lg animate-fade-in rounded-[2rem] border border-white/40 bg-white/95 p-8 shadow-soft backdrop-blur-xl md:p-10">
        <div className="mb-6 flex items-center justify-between gap-3">
          <SurfLogo />
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-foam">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>

        <p className="text-sm font-medium uppercase tracking-[0.14em] text-ocean">
          Parent setup · step {step === "privacy" ? "1" : "2"} of 2
        </p>

        {step === "privacy" ? (
          <>
            <h1 className="mt-2 font-display text-3xl font-semibold text-navy md:text-4xl">
              {PRIVACY_NOTICE_TITLE}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Read this once before kids start searching. You can revisit it anytime
              in Parent Controls.
            </p>
            <form onSubmit={onPrivacyContinue} className="mt-6 space-y-5">
              <ul className="space-y-3 rounded-2xl bg-cream/80 p-4 text-sm leading-relaxed text-slate">
                {PRIVACY_NOTICE_POINTS.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-sm text-navy">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[hsl(var(--ocean))]"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>{PRIVACY_CONSENT_LABEL}</span>
              </label>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={!consent}>
                Continue to PIN setup
              </Button>
            </form>
          </>
        ) : (
          <>
            <h1 className="mt-2 font-display text-3xl font-semibold text-navy md:text-4xl">
              Protect Surf before kids start
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Create a parent PIN and set today’s learning time. There is no default
              PIN — you choose it once.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="setup-pin">New parent PIN</Label>
                <Input
                  id="setup-pin"
                  type="password"
                  inputMode="numeric"
                  autoComplete="new-password"
                  value={pin}
                  onChange={(e) =>
                    setPinValue(e.target.value.replace(/\D/g, "").slice(0, 8))
                  }
                  placeholder="4–8 digits"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="setup-pin-confirm">Confirm PIN</Label>
                <Input
                  id="setup-pin-confirm"
                  type="password"
                  inputMode="numeric"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) =>
                    setConfirm(e.target.value.replace(/\D/g, "").slice(0, 8))
                  }
                  placeholder="Re-enter PIN"
                  required
                />
              </div>

              <div className="space-y-3 rounded-2xl bg-cream/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="setup-limit">Daily learning time</Label>
                  <span className="text-sm font-semibold text-navy">
                    {formatMinutes(limit)}
                  </span>
                </div>
                <Slider
                  id="setup-limit"
                  min={15}
                  max={180}
                  step={15}
                  value={[limit]}
                  onValueChange={(value) => setLimit(value[0] ?? 60)}
                />
                <p className="text-xs text-slate">
                  When the timer runs out, Surf pauses until tomorrow or you raise
                  the limit in Parent Controls.
                </p>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  className={cn("flex-1")}
                  onClick={() => {
                    setStep("privacy");
                    setError("");
                  }}
                >
                  Back
                </Button>
                <Button type="submit" className="flex-[1.4]" disabled={busy}>
                  {busy ? "Saving…" : "Finish setup & open Surf"}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
