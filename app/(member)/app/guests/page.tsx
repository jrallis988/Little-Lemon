"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

type Pass = {
  id: string;
  guestName: string;
  clubName: string;
  code: string;
  status: string;
  expiresAt: string;
  createdAt: string;
};

export default function GuestsPage() {
  const [passes, setPasses] = useState<Pass[]>([]);
  const [guestName, setGuestName] = useState("");
  const [active, setActive] = useState<Pass | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function refresh() {
    const res = await fetch("/api/guests");
    const data = (await res.json()) as { passes?: Pass[] };
    setPasses(data.passes ?? []);
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function createPass() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestName }),
      });
      const data = (await res.json()) as { error?: string; pass?: Pass };
      if (!res.ok || !data.pass) throw new Error(data.error ?? "Could not create pass.");
      setActive(data.pass);
      setGuestName("");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <MemberScreen
      eyebrow="Screen 36–39 · Guest passes"
      title="Guest passes"
      subtitle="Black Card members can bring a guest. Managed here in the app."
    >
      <MemberCard className="space-y-3">
        <p className="font-semibold text-pf-ink">Bring a guest today</p>
        <Input
          className="border-pf-line"
          placeholder="Guest name"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button
          type="button"
          variant="purple"
          className="w-full"
          disabled={busy}
          onClick={() => void createPass()}
        >
          {busy ? "Creating…" : "Create guest pass"}
        </Button>
      </MemberCard>

      {active ? (
        <MemberCard className="mt-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-pf-purple">
            Screen 38 · Guest QR
          </p>
          <p className="mt-2 font-display text-2xl">{active.guestName}</p>
          <div className="mx-auto mt-4 grid h-36 w-36 place-items-center rounded-2xl border-2 border-dashed border-pf-purple/40 bg-pf-mist font-mono text-lg text-pf-purple">
            {active.code}
          </div>
          <p className="mt-2 text-xs text-pf-ink/55">
            Expires {new Date(active.expiresAt).toLocaleString()} · {active.clubName}
          </p>
        </MemberCard>
      ) : null}

      <div className="mt-4 space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wide text-pf-purple">
          Screen 39 · History
        </p>
        {passes.length === 0 ? (
          <p className="text-sm text-pf-ink/55">No guest passes yet.</p>
        ) : (
          passes.map((pass) => (
            <MemberCard key={pass.id}>
              <div className="flex items-center justify-between gap-2 text-sm">
                <div>
                  <p className="font-semibold text-pf-ink">{pass.guestName}</p>
                  <p className="text-xs text-pf-ink/55">
                    {new Date(pass.createdAt).toLocaleDateString()} · {pass.code}
                  </p>
                </div>
                <span className="text-xs font-semibold capitalize text-pf-purple">
                  {pass.status}
                </span>
              </div>
            </MemberCard>
          ))
        )}
      </div>
    </MemberScreen>
  );
}
