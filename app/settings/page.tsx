"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <RequireAuth>
      <AppShell title="Settings" showNav>
        <div className="space-y-3">
          <section className="rounded-xl bg-velvet/70 p-4 hairline">
            <p className="text-[11px] uppercase tracking-[0.16em] text-smoke">
              Signed in as
            </p>
            <p className="mt-1 font-display text-2xl uppercase tracking-[0.04em]">
              {user?.displayName}
            </p>
            <p className="text-sm text-smoke">@{user?.username}</p>
          </section>

          <Link
            href="/messages"
            className="block rounded-xl bg-velvet/70 p-4 text-sm hairline hover:bg-velvet"
          >
            Messages
          </Link>
          <Link
            href="/notifications"
            className="block rounded-xl bg-velvet/70 p-4 text-sm hairline hover:bg-velvet"
          >
            Notifications
          </Link>

          <section className="rounded-xl bg-velvet/70 p-4 hairline">
            <p className="text-sm text-mic">
              Greenroom MVP uses local demo auth. Connect Supabase or your API when
              you’re ready for real accounts, DMs, and mic claims.
            </p>
          </section>

          <Button
            variant="danger"
            className="w-full"
            onClick={() => {
              logout();
              router.replace("/");
            }}
          >
            Sign out
          </Button>
        </div>
      </AppShell>
    </RequireAuth>
  );
}
