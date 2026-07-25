"use client";

import { useEffect, useState } from "react";
import { Smartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      className="fixed inset-x-0 bottom-0 z-50 animate-banner-in border-t border-pf-purple/20 bg-[linear-gradient(90deg,#2f124a,#5c2d91)] text-white shadow-[0_-12px_40px_-20px_rgba(47,18,74,0.55)]"
    >
      <div className="container flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex items-start gap-3 sm:items-center">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/10 sm:mt-0">
            <Smartphone className="h-5 w-5 text-pf-yellow" aria-hidden />
          </div>
          <div>
            <p className="font-display text-lg tracking-tight">
              Already a member? Use the app.
            </p>
            <p className="text-sm text-white/75">
              Check-ins, digital keytag, crowd meter, and account management live
              in the Planet Fitness app—not on this site.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button asChild size="sm" className="min-w-36">
            <a
              href="https://www.planetfitness.com/mobileapp"
              target="_blank"
              rel="noreferrer"
            >
              Get the app
            </a>
          </Button>
          <button
            type="button"
            aria-label="Dismiss app banner"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white/80 transition hover:bg-white/10 hover:text-white"
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
    </div>
  );
}
