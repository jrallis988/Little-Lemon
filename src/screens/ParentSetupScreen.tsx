import { FormEvent, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { isValidPinFormat } from "@/services/parentGate";
import { useParentStore } from "@/stores/profileStore";
import { formatMinutes } from "@/lib/utils";
import { SurfLogo } from "@/components/brand/SurfLogo";

const DISALLOWED_PINS = new Set(["0000", "1111", "1234", "9999"]);

/**
 * First-run parent gate — blocks the app until a real PIN is set.
 * Replaces the old silent default of 0000.
 */
export function ParentSetupScreen() {
  const setPin = useParentStore((s) => s.setPin);
  const completeParentSetup = useParentStore((s) => s.completeParentSetup);
  const setDailyLimit = useParentStore((s) => s.setDailyLimit);
  const dailyLimitMinutes = useParentStore((s) => s.controls.dailyLimitMinutes);

  const [pin, setPinValue] = useState("");
  const [confirm, setConfirm] = useState("");
  const [limit, setLimit] = useState(dailyLimitMinutes);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

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
          Parent setup
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy md:text-4xl">
          Protect Surf before kids start
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate">
          Create a parent PIN, set today’s learning time, then Surf unlocks for
          search. There is no default PIN — you choose it once.
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
              onChange={(e) => setPinValue(e.target.value.replace(/\D/g, "").slice(0, 8))}
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

          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Saving…" : "Finish setup & open Surf"}
          </Button>
        </form>
      </div>
    </section>
  );
}
