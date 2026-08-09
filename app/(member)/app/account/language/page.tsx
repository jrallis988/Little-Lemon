"use client";

import { useState } from "react";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  "English",
  "Español",
  "Français",
  "Português",
  "中文",
];

export default function LanguagePickerPage() {
  const [selected, setSelected] = useState("English");

  return (
    <MemberScreen
      eyebrow="Screen 70 · Language"
      title="Language"
      subtitle="Choose the language for member app copy and support."
    >
      <MemberCard className="space-y-2">
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setSelected(lang)}
            className={cn(
              "flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left text-sm font-semibold transition",
              selected === lang
                ? "border-pf-purple bg-pf-purple-soft text-pf-purple"
                : "border-pf-line bg-white text-pf-ink"
            )}
          >
            {lang}
            {selected === lang ? <span aria-hidden>✓</span> : null}
          </button>
        ))}
      </MemberCard>
    </MemberScreen>
  );
}
