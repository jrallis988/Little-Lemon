"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function AnalyticsPageView({ path }: { path: string }) {
  useEffect(() => {
    track("page_view", { path });
  }, [path]);
  return null;
}
