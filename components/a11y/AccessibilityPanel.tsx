"use client";

import { useEffect, useId, useRef } from "react";
import { Accessibility, X } from "lucide-react";
import { useA11y } from "@/components/a11y/AccessibilityProvider";
import type {
  MotionPref,
  SpacingScale,
  TextScale,
  ThemeMode,
} from "@/lib/a11y-prefs";

function Fieldset({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-3 border-b border-slate-line pb-5">
      <legend className="font-display text-sm font-normal uppercase tracking-[0.12em] text-navy">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

function RadioRow<T extends string>({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <label
            key={opt.value}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-cta border px-3 py-2 text-sm font-semibold ${
              selected
                ? "border-navy bg-navy text-white"
                : "border-slate-line bg-white text-slate-text hover:border-navy"
            }`}
          >
            <input
              type="radio"
              className="sr-only"
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
            />
            {opt.label}
          </label>
        );
      })}
    </div>
  );
}

function Toggle({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <label htmlFor={id} className="text-sm font-semibold text-slate-text">
          {label}
        </label>
        {description && (
          <p id={`${id}-desc`} className="mt-0.5 text-sm text-slate-muted">
            {description}
          </p>
        )}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={description ? `${id}-desc` : undefined}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2 ${
          checked ? "bg-navy" : "bg-granite"
        }`}
      >
        <span
          aria-hidden
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
        <span className="sr-only">{checked ? "On" : "Off"}</span>
      </button>
    </div>
  );
}

export function AccessibilityLauncher() {
  const { openPanel } = useA11y();
  return (
    <button
      type="button"
      onClick={openPanel}
      className="inline-flex items-center gap-2 rounded-cta border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
      aria-haspopup="dialog"
    >
      <Accessibility className="h-4 w-4" aria-hidden />
      Accessibility
    </button>
  );
}

export function AccessibilityPanel() {
  const { prefs, setPrefs, resetPrefs, panelOpen, closePanel } = useA11y();
  const titleId = useId();
  const descId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closePanel();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const main = document.getElementById("main-content");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      previouslyFocused?.focus?.();
    };
  }, [panelOpen, closePanel]);

  if (!panelOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-ink/55"
        aria-label="Close accessibility settings"
        onClick={closePanel}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-warm-white shadow-xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-line px-5 py-4">
          <div>
            <h2 id={titleId} className="font-display text-xl text-ink">
              Accessibility settings
            </h2>
            <p id={descId} className="mt-1 text-sm text-slate-muted">
              Customize how this site looks and moves. Preferences are saved on
              this device.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="btn-ghost !px-3 !py-2"
            aria-label="Close accessibility settings"
            onClick={closePanel}
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
          <Fieldset legend="Color theme">
            <RadioRow<ThemeMode>
              name="theme"
              value={prefs.theme}
              onChange={(theme) => setPrefs({ ...prefs, theme })}
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
                { value: "system", label: "System" },
              ]}
            />
          </Fieldset>

          <Fieldset legend="Contrast & text">
            <Toggle
              id="high-contrast"
              label="High contrast"
              description="Stronger borders and higher-contrast text."
              checked={prefs.highContrast}
              onChange={(highContrast) => setPrefs({ ...prefs, highContrast })}
            />
            <div className="pt-2">
              <p className="mb-2 text-sm font-semibold text-slate-text">Text size</p>
              <RadioRow<TextScale>
                name="text-scale"
                value={prefs.textScale}
                onChange={(textScale) => setPrefs({ ...prefs, textScale })}
                options={[
                  { value: "100", label: "100%" },
                  { value: "125", label: "125%" },
                  { value: "150", label: "150%" },
                ]}
              />
            </div>
            <Toggle
              id="dyslexia-font"
              label="Dyslexia-friendly font"
              description="Uses Lexend for body text."
              checked={prefs.dyslexiaFont}
              onChange={(dyslexiaFont) => setPrefs({ ...prefs, dyslexiaFont })}
            />
          </Fieldset>

          <Fieldset legend="Spacing">
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-text">Line spacing</p>
              <RadioRow<SpacingScale>
                name="line-spacing"
                value={prefs.lineSpacing}
                onChange={(lineSpacing) => setPrefs({ ...prefs, lineSpacing })}
                options={[
                  { value: "normal", label: "Normal" },
                  { value: "relaxed", label: "Relaxed" },
                  { value: "loose", label: "Loose" },
                ]}
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-text">Letter spacing</p>
              <RadioRow<SpacingScale>
                name="letter-spacing"
                value={prefs.letterSpacing}
                onChange={(letterSpacing) => setPrefs({ ...prefs, letterSpacing })}
                options={[
                  { value: "normal", label: "Normal" },
                  { value: "relaxed", label: "Wide" },
                  { value: "loose", label: "Wider" },
                ]}
              />
            </div>
          </Fieldset>

          <Fieldset legend="Motion & links">
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-text">Motion</p>
              <RadioRow<MotionPref>
                name="motion"
                value={prefs.motion}
                onChange={(motion) => setPrefs({ ...prefs, motion })}
                options={[
                  { value: "system", label: "System" },
                  { value: "reduce", label: "Reduce" },
                  { value: "no-preference", label: "Allow" },
                ]}
              />
            </div>
            <Toggle
              id="underline-links"
              label="Underline links"
              description="Always underline in-content links."
              checked={prefs.underlineLinks}
              onChange={(underlineLinks) => setPrefs({ ...prefs, underlineLinks })}
            />
            <Toggle
              id="big-targets"
              label="Bigger click targets"
              description="Larger buttons and navigation hit areas."
              checked={prefs.bigTargets}
              onChange={(bigTargets) => setPrefs({ ...prefs, bigTargets })}
            />
          </Fieldset>
        </div>

        <div className="flex gap-3 border-t border-slate-line px-5 py-4">
          <button type="button" className="btn-ghost flex-1" onClick={resetPrefs}>
            Reset
          </button>
          <button type="button" className="btn-primary flex-1" onClick={closePanel}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
