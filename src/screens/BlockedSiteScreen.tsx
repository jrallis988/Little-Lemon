import { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUrlInterceptor } from "@/hooks/useUrlInterceptor";
import { useNavigationStore } from "@/stores/navigationStore";
import { useParentStore } from "@/stores/profileStore";
import { ROUTES } from "@/routes/paths";

/** Screen 7 — Blocked Site Screen */
export function BlockedSiteScreen() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { goHome } = useUrlInterceptor();
  const blockedUrl =
    useNavigationStore((s) => s.blockedUrl) ?? params.get("url") ?? "";
  const blockedReason =
    useNavigationStore((s) => s.blockedReason) ??
    params.get("reason") ??
    "Only parent-approved educational sites can open in Surf.";
  const unlock = useParentStore((s) => s.unlock);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [showPin, setShowPin] = useState(false);

  const onAdultUnlock = async (event: FormEvent) => {
    event.preventDefault();
    const ok = await unlock(pin);
    if (!ok) {
      setError("That PIN didn’t match. Ask a parent for help.");
      return;
    }
    navigate(ROUTES.parent);
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#A8C4B0_0%,_#F4F0E8_45%,_#E8EEF4_100%)] px-6 animate-fade-in">
      <div className="w-full max-w-lg rounded-[2rem] border border-white/70 bg-white/80 p-8 text-center shadow-glass backdrop-blur-xl md:p-10">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-muted text-navy">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <h1 className="font-display text-3xl font-semibold text-navy">
          This page stays outside Surf
        </h1>
        <p className="mt-4 text-slate leading-relaxed">{blockedReason}</p>
        {blockedUrl && (
          <p className="mt-3 break-all rounded-2xl bg-cream px-3 py-2 text-xs text-slate-deep">
            {blockedUrl}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <Button size="lg" onClick={goHome}>
            Back to Surf Search
          </Button>
          <Button variant="ghost" onClick={() => setShowPin((v) => !v)}>
            Adult PIN unlock
          </Button>
        </div>

        {showPin && (
          <form onSubmit={onAdultUnlock} className="mt-6 space-y-3 text-left">
            <Label htmlFor="blocked-pin">Parent PIN</Label>
            <Input
              id="blocked-pin"
              type="password"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError("");
              }}
              placeholder="Enter 4–8 digit PIN"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" variant="secondary" className="w-full">
              Unlock Parent Dashboard
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
