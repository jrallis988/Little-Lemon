"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export function RequireAuth({
  children,
  requireOnboarding = true,
}: {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user || !profile) {
      router.replace("/login");
      return;
    }
    if (requireOnboarding && !profile.onboardingComplete) {
      router.replace("/onboarding");
    }
  }, [user, profile, loading, router, requireOnboarding]);

  if (loading || !user || !profile) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <LoadingSkeleton lines={6} />
      </div>
    );
  }

  if (requireOnboarding && !profile.onboardingComplete) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <LoadingSkeleton lines={4} />
      </div>
    );
  }

  return <>{children}</>;
}
