"use client";

import { useEffect, useState } from "react";
import { Smartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "pf-app-banner-dismissed";

export function AppHandoffBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) !== "1") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Download the Planet Fitness app"
      className="fixed inset-x-0 bottom-0 z-50 animate-banner-in border-t border-white/10 bg-[#1a0d28] text-white"
    >
      <div className="flex items-center gap-3 px-3 py-2 md:px-6">
        <Smartphone className="h-4 w-4 shrink-0 text-pf-yellow" aria-hidden />
        <p className="min-w-0 flex-1 truncate text-sm text-white/85">
          <span className="font-semibold text-white">Already a member?</span>{" "}
          Check in and unlock the door in the app.
        </p>
        <Button asChild size="sm" className="shrink-0">
          <a
            href="https://www.planetfitness.com/mobileapp"
            target="_blank"
            rel="noreferrer"
            onClick={() => track("app_banner_click", { source: "banner" })}
          >
            Get the app
          </a>
        </Button>
        <button
          type="button"
          aria-label="Dismiss app banner"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-white/70 hover:text-white"
          onClick={() => {
            setVisible(false);
            try {
              window.localStorage.setItem(STORAGE_KEY, "1");
            } catch {
              /* ignore */
            }
          }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
