"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UpgradeButton() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const isPlus =
    session?.user?.membershipTier === "plus" &&
    session.user.membershipStatus === "active";

  async function upgrade() {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = (await response.json()) as {
        url?: string;
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

      throw new Error(data.error ?? "Checkout did not return a payment URL.");
    } catch (caught) {
      setMessage(
        caught instanceof Error ? caught.message : "Could not start the upgrade."
      );
    } finally {
      setLoading(false);
    }
  }

  async function openPortal() {
    setPortalLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/stripe/portal", { method: "POST" });
      const data = (await response.json()) as { url?: string; error?: string };
      if (response.status === 401) {
        router.push("/login");
        return;
      }
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Could not open billing portal.");
      }
      window.location.assign(data.url);
    } catch (caught) {
      setMessage(
        caught instanceof Error ? caught.message : "Could not open billing portal."
      );
    } finally {
      setPortalLoading(false);
    }
  }

  return (
    <div className="mt-5 space-y-2">
      {isPlus ? (
        <Button
          type="button"
          size="lg"
          variant="outline"
          className="min-h-11 w-full"
          onClick={openPortal}
          disabled={portalLoading}
        >
          {portalLoading && <Loader2 className="animate-spin" />}
          Manage billing
        </Button>
      ) : (
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
      )}
      {message && (
        <p className="text-center text-xs text-muted-foreground" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
