"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UpgradeButton() {
  const router = useRouter();
  const { update } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function upgrade() {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = (await response.json()) as {
        url?: string;
        mode?: "stripe" | "local";
        message?: string;
        error?: string;
      };

      if (response.status === 401) {
        router.push("/login");
        return;
      }
      if (!response.ok) {
        throw new Error(data.error ?? "Could not start the upgrade.");
      }
      if (data.url) {
        window.location.assign(data.url);
        return;
      }

      setMessage(
        data.message ?? "Trump RX Plus is active. Your account is being refreshed."
      );
      await update();
      router.refresh();
    } catch (caught) {
      setMessage(
        caught instanceof Error ? caught.message : "Could not start the upgrade."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5">
      <Button
        type="button"
        size="lg"
        variant="secondary"
        className="min-h-11 w-full"
        onClick={upgrade}
        disabled={loading}
      >
        {loading && <Loader2 className="animate-spin" />}
        Upgrade to Plus
      </Button>
      {message && (
        <p className="mt-2 text-center text-xs text-muted-foreground" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
