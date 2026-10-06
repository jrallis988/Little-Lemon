"use client";

import { useEffect, useState } from "react";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

type Prefs = {
  textScale: number;
  highContrast: boolean;
  screenReaderHints: boolean;
  reducedMotion: boolean;
};

const DEFAULTS: Prefs = {
  textScale: 100,
  highContrast: false,
  screenReaderHints: true,
  reducedMotion: false,
};

export default function AccessibilityPage() {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--pf-member-text-scale",
      `${prefs.textScale / 100}`
    );
    document.documentElement.classList.toggle("pf-contrast", prefs.highContrast);
    document.documentElement.classList.toggle("pf-reduce-motion", prefs.reducedMotion);
  }, [prefs]);

  return (
    <MemberScreen
      eyebrow="Screens 71–74 · Accessibility"
      title="Accessibility"
      subtitle="Text size, contrast, screen-reader hints, and reduced motion."
    >
      <MemberCard className="space-y-4 text-sm">
        <label className="block">
          <span className="font-semibold text-pf-ink">Text size · {prefs.textScale}%</span>
          <input
            type="range"
            min={90}
            max={140}
            step={5}
            value={prefs.textScale}
            onChange={(e) =>
              setPrefs((p) => ({ ...p, textScale: Number(e.target.value) }))
            }
            className="mt-2 w-full"
          />
        </label>
        {(
          [
            ["highContrast", "High contrast"],
            ["screenReaderHints", "Extra screen-reader hints"],
            ["reducedMotion", "Reduce motion"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="flex items-center justify-between gap-3">
            <span className="font-semibold text-pf-ink">{label}</span>
            <input
              type="checkbox"
              checked={prefs[key]}
              onChange={(e) =>
                setPrefs((p) => ({ ...p, [key]: e.target.checked }))
              }
            />
          </label>
        ))}
      </MemberCard>
    </MemberScreen>
  );
}
