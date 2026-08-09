"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

type OfflinePayload = {
  memberName?: string;
  plan?: string;
  clubName?: string;
  code?: string;
  expiresAt?: string;
  membershipId?: string;
};

export default function KeytagPage() {
  const [payload, setPayload] = useState<OfflinePayload | null>(null);
  const [bright, setBright] = useState(false);
  const [status, setStatus] = useState("Loading token…");

  async function refreshToken() {
    setStatus("Issuing door token…");
    try {
      const res = await fetch("/api/access/token", { method: "POST" });
      const data = (await res.json()) as {
        offline?: OfflinePayload;
        error?: string;
      };
      if (!res.ok || !data.offline) {
        throw new Error(data.error ?? "Could not issue token.");
      }
      setPayload(data.offline);
      localStorage.setItem("pf_keytag_cache", JSON.stringify(data.offline));
      setStatus("Live token ready · cached offline");
    } catch (err) {
      const cached = localStorage.getItem("pf_keytag_cache");
      if (cached) {
        setPayload(JSON.parse(cached) as OfflinePayload);
        setStatus("Showing offline cache");
      } else {
        setStatus(err instanceof Error ? err.message : "Token unavailable");
      }
    }
  }

  useEffect(() => {
    void refreshToken();
    const timer = window.setInterval(() => void refreshToken(), 60000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.style.filter = bright ? "brightness(1.25)" : "";
    return () => {
      document.documentElement.style.filter = "";
    };
  }, [bright]);

  return (
    <MemberScreen
      eyebrow="Screen 33–35 · Digital keytag"
      title="Digital keytag"
      subtitle="Signed door token with brightness boost and offline cache."
    >
      <MemberCard
        className={`bg-pf-purple text-center text-white ${bright ? "ring-4 ring-pf-yellow" : ""}`}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-pf-yellow">
          Planet Fitness
        </p>
        <p className="mt-2 font-display text-2xl">
          {payload?.memberName || "Member"}
        </p>
        <p className="text-sm text-white/70">
          {payload?.plan || "Member"} · {payload?.clubName || "Home club"}
        </p>
        <div className="mx-auto mt-5 h-24 w-full max-w-[14rem] rounded-xl bg-[repeating-linear-gradient(90deg,#111_0_2px,#fff_2px_4px)]" />
        <p className="mt-3 break-all px-2 font-mono text-[11px] tracking-wide text-white/85">
          {payload?.code?.slice(0, 64) || "····"}
        </p>
        <p className="mt-3 text-[11px] text-white/60">{status}</p>
        {payload?.expiresAt ? (
          <p className="mt-1 text-[11px] text-white/60">
            Expires {new Date(payload.expiresAt).toLocaleTimeString()}
          </p>
        ) : null}
      </MemberCard>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant={bright ? "purple" : "outline"}
          onClick={() => setBright((v) => !v)}
        >
          {bright ? "Brightness on" : "Boost brightness"}
        </Button>
        <Button type="button" variant="outline" onClick={() => void refreshToken()}>
          Refresh token
        </Button>
      </div>
    </MemberScreen>
  );
}
