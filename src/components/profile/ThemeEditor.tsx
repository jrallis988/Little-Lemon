"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Eye, RotateCcw, Save, Send, Sparkles, Trash2 } from "lucide-react";

import { BODY_FONTS, DEFAULT_MODULE_ORDER, HEADING_FONTS } from "@/lib/constants";
import type { ProfileSticker, ProfileTheme } from "@/lib/types/database";
import { THEME_PRESETS, type ThemePresetName } from "@/lib/themes/presets";
import { themeToCssVars } from "@/lib/themes/sanitize";
import { cn } from "@/lib/utils/cn";
import { contrastWarning } from "@/lib/utils/contrast";

type ThemeEditorProps = {
  theme: ProfileTheme;
  profileUsername?: string;
  children?: React.ReactNode;
  className?: string;
  onChange?: (theme: ProfileTheme) => void;
  onSave?: (theme: ProfileTheme) => void;
  onReset?: () => void;
  onPublish?: (theme: ProfileTheme) => void;
};

const STICKER_EMOJIS = ["⭐", "💖", "✨", "💿", "🎧", "🎤", "🔥", "🌙", "🦋", "🌈", "🖤", "👑"];

const MODULE_LABELS: Record<string, string> = {
  about: "About",
  details: "Details",
  music: "Music",
  featured_friends: "Featured Friends",
  photos: "Photos",
  blog: "Blog",
  comments: "Comments",
};

function fieldId(name: string) {
  return `theme-${name}`;
}

/**
 * Visual theme editor. The parent should sanitize the emitted theme with sanitizeTheme
 * before persisting or publishing it.
 */
export function ThemeEditor({
  theme,
  profileUsername,
  children,
  className,
  onChange,
  onSave,
  onReset,
  onPublish,
}: ThemeEditorProps) {
  const [draft, setDraft] = useState(theme);
  const [selectedStickerEmoji, setSelectedStickerEmoji] = useState(STICKER_EMOJIS[0]);

  useEffect(() => {
    setDraft(theme);
  }, [theme]);

  const warning = useMemo(
    () => contrastWarning(draft.text_color, draft.background_color, draft.link_color),
    [draft.background_color, draft.link_color, draft.text_color]
  );

  const updateDraft = (patch: Partial<ProfileTheme>) => {
    const next = { ...draft, ...patch, updated_at: new Date().toISOString() };
    setDraft(next);
    onChange?.(next);
  };

  const updateSticker = (stickerId: string, patch: Partial<ProfileSticker>) => {
    updateDraft({
      stickers: draft.stickers.map((sticker) =>
        sticker.id === stickerId ? { ...sticker, ...patch } : sticker
      ),
    });
  };

  const addSticker = () => {
    const sticker: ProfileSticker = {
      id: `sticker-${Date.now()}`,
      emoji: selectedStickerEmoji,
      x: 50,
      y: 50,
      size: 28,
    };
    updateDraft({ stickers: [...draft.stickers, sticker].slice(-12) });
  };

  const removeSticker = (stickerId: string) => {
    updateDraft({ stickers: draft.stickers.filter((sticker) => sticker.id !== stickerId) });
  };

  const moveModule = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= draft.module_order.length) return;
    const nextOrder = [...draft.module_order];
    [nextOrder[index], nextOrder[nextIndex]] = [nextOrder[nextIndex], nextOrder[index]];
    updateDraft({ module_order: nextOrder });
  };

  const applyPreset = (presetName: ThemePresetName) => {
    const preset = THEME_PRESETS[presetName];
    updateDraft({
      ...preset,
      preset_name: presetName,
      module_order: [...preset.module_order],
      stickers: preset.stickers.map((sticker) => ({ ...sticker })),
    });
  };

  const ensureModuleOrder = () => {
    const known = draft.module_order.filter((moduleKey) =>
      DEFAULT_MODULE_ORDER.includes(moduleKey as (typeof DEFAULT_MODULE_ORDER)[number])
    );
    const missing = DEFAULT_MODULE_ORDER.filter((moduleKey) => !known.includes(moduleKey));
    return [...known, ...missing];
  };

  const normalizedModuleOrder = ensureModuleOrder();

  return (
    <section className={cn("grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]", className)}>
      <div className="profile-module">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="profile-heading text-2xl font-black">Theme Editor</h2>
            <p className="mt-1 text-sm opacity-75">
              Parent components should sanitize changes before saving or publishing.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded border border-[color:var(--mp-primary,#1a365d)] bg-white px-3 py-2 text-sm font-bold text-[color:var(--mp-primary,#1a365d)] hover:bg-white/80"
              onClick={() => onSave?.(draft)}
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              Save changes
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded border border-current bg-white/70 px-3 py-2 text-sm font-bold hover:bg-white"
              onClick={onReset}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset theme
            </button>
            <Link
              href={`/profile/${profileUsername ?? draft.profile_id}`}
              className="inline-flex items-center gap-2 rounded border border-current bg-white/70 px-3 py-2 text-sm font-bold hover:bg-white"
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              Preview profile
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded bg-[color:var(--mp-primary,#1a365d)] px-3 py-2 text-sm font-bold text-white hover:brightness-110"
              onClick={() => onPublish?.({ ...draft, published: true })}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Publish changes
            </button>
          </div>
        </div>

        {warning ? (
          <p className="mt-4 rounded border border-amber-300 bg-amber-50 p-3 text-sm font-semibold text-amber-950">
            {warning}
          </p>
        ) : null}

        <div className="mt-6 grid gap-5">
          <fieldset className="rounded border border-[color-mix(in_srgb,var(--mp-primary,#1a365d)_20%,transparent)] p-4">
            <legend className="px-1 text-sm font-black uppercase tracking-wide">Preset</legend>
            <label htmlFor={fieldId("preset")} className="text-sm font-bold">
              Theme preset
            </label>
            <select
              id={fieldId("preset")}
              value={draft.preset_name}
              onChange={(event) => applyPreset(event.target.value as ThemePresetName)}
              className="mt-2 w-full rounded border border-slate-300 bg-white p-2 text-slate-950"
            >
              {(Object.keys(THEME_PRESETS) as ThemePresetName[]).map((presetName) => (
                <option key={presetName} value={presetName}>
                  {presetName}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="rounded border border-[color-mix(in_srgb,var(--mp-primary,#1a365d)_20%,transparent)] p-4">
            <legend className="px-1 text-sm font-black uppercase tracking-wide">Background</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-bold" htmlFor={fieldId("background-color")}>
                Background color
                <input
                  id={fieldId("background-color")}
                  type="color"
                  value={draft.background_color}
                  onChange={(event) => updateDraft({ background_color: event.target.value })}
                  className="mt-2 block h-10 w-full"
                />
              </label>
              <label className="text-sm font-bold" htmlFor={fieldId("background-image")}>
                Background image URL
                <input
                  id={fieldId("background-image")}
                  type="url"
                  value={draft.background_image_url ?? ""}
                  onChange={(event) =>
                    updateDraft({ background_image_url: event.target.value.trim() || null })
                  }
                  className="mt-2 block w-full rounded border border-slate-300 bg-white p-2 text-slate-950"
                  placeholder="https://..."
                />
              </label>
              <label className="text-sm font-bold" htmlFor={fieldId("background-repeat")}>
                Background repeat
                <select
                  id={fieldId("background-repeat")}
                  value={draft.background_repeat}
                  onChange={(event) =>
                    updateDraft({
                      background_repeat: event.target.value as ProfileTheme["background_repeat"],
                    })
                  }
                  className="mt-2 block w-full rounded border border-slate-300 bg-white p-2 text-slate-950"
                >
                  <option value="no-repeat">No repeat</option>
                  <option value="repeat">Repeat</option>
                  <option value="repeat-x">Repeat X</option>
                  <option value="repeat-y">Repeat Y</option>
                </select>
              </label>
              <label className="text-sm font-bold" htmlFor={fieldId("background-position")}>
                Background position
                <input
                  id={fieldId("background-position")}
                  value={draft.background_position}
                  onChange={(event) => updateDraft({ background_position: event.target.value })}
                  className="mt-2 block w-full rounded border border-slate-300 bg-white p-2 text-slate-950"
                  placeholder="center top"
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="rounded border border-[color-mix(in_srgb,var(--mp-primary,#1a365d)_20%,transparent)] p-4">
            <legend className="px-1 text-sm font-black uppercase tracking-wide">Colors</legend>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["primary_color", "Primary"],
                ["secondary_color", "Secondary"],
                ["text_color", "Text"],
                ["link_color", "Link"],
              ].map(([field, label]) => (
                <label key={field} className="text-sm font-bold" htmlFor={fieldId(field)}>
                  {label} color
                  <input
                    id={fieldId(field)}
                    type="color"
                    value={draft[field as keyof ProfileTheme] as string}
                    onChange={(event) =>
                      updateDraft({ [field]: event.target.value } as Partial<ProfileTheme>)
                    }
                    className="mt-2 block h-10 w-full"
                  />
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="rounded border border-[color-mix(in_srgb,var(--mp-primary,#1a365d)_20%,transparent)] p-4">
            <legend className="px-1 text-sm font-black uppercase tracking-wide">Typography</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-bold" htmlFor={fieldId("heading-font")}>
                Heading font
                <select
                  id={fieldId("heading-font")}
                  value={draft.heading_font}
                  onChange={(event) => updateDraft({ heading_font: event.target.value })}
                  className="mt-2 block w-full rounded border border-slate-300 bg-white p-2 text-slate-950"
                >
                  {HEADING_FONTS.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-bold" htmlFor={fieldId("body-font")}>
                Body font
                <select
                  id={fieldId("body-font")}
                  value={draft.body_font}
                  onChange={(event) => updateDraft({ body_font: event.target.value })}
                  className="mt-2 block w-full rounded border border-slate-300 bg-white p-2 text-slate-950"
                >
                  {BODY_FONTS.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </fieldset>

          <fieldset className="rounded border border-[color-mix(in_srgb,var(--mp-primary,#1a365d)_20%,transparent)] p-4">
            <legend className="px-1 text-sm font-black uppercase tracking-wide">Modules</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-bold" htmlFor={fieldId("border-style")}>
                Border style
                <select
                  id={fieldId("border-style")}
                  value={draft.border_style}
                  onChange={(event) =>
                    updateDraft({ border_style: event.target.value as ProfileTheme["border_style"] })
                  }
                  className="mt-2 block w-full rounded border border-slate-300 bg-white p-2 text-slate-950"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="double">Double</option>
                  <option value="none">None</option>
                </select>
              </label>
              <label className="text-sm font-bold" htmlFor={fieldId("transparency")}>
                Card transparency: {Math.round(draft.card_transparency * 100)}%
                <input
                  id={fieldId("transparency")}
                  type="range"
                  min="0.4"
                  max="1"
                  step="0.05"
                  value={draft.card_transparency}
                  onChange={(event) =>
                    updateDraft({ card_transparency: Number(event.target.value) })
                  }
                  className="mt-2 block w-full"
                />
              </label>
              <label className="text-sm font-bold" htmlFor={fieldId("layout")}>
                Layout
                <select
                  id={fieldId("layout")}
                  value={draft.layout}
                  onChange={(event) =>
                    updateDraft({ layout: event.target.value as ProfileTheme["layout"] })
                  }
                  className="mt-2 block w-full rounded border border-slate-300 bg-white p-2 text-slate-950"
                >
                  <option value="classic">Classic</option>
                  <option value="wide">Wide</option>
                  <option value="compact">Compact</option>
                </select>
              </label>
              <label className="text-sm font-bold" htmlFor={fieldId("music-style")}>
                Music player style
                <select
                  id={fieldId("music-style")}
                  value={draft.music_player_style}
                  onChange={(event) =>
                    updateDraft({
                      music_player_style: event.target.value as ProfileTheme["music_player_style"],
                    })
                  }
                  className="mt-2 block w-full rounded border border-slate-300 bg-white p-2 text-slate-950"
                >
                  <option value="classic">Classic</option>
                  <option value="compact">Compact</option>
                  <option value="card">Card</option>
                </select>
              </label>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-black">Module order</h3>
              <ol className="mt-2 space-y-2">
                {normalizedModuleOrder.map((moduleKey, index) => (
                  <li
                    key={moduleKey}
                    className="flex items-center justify-between gap-3 rounded border border-slate-200 bg-white/70 p-2 text-sm"
                  >
                    <span className="font-bold">{MODULE_LABELS[moduleKey] ?? moduleKey}</span>
                    <span className="flex gap-1">
                      <button
                        type="button"
                        className="rounded border p-1 disabled:opacity-40"
                        onClick={() => moveModule(index, -1)}
                        disabled={index === 0}
                        aria-label={`Move ${MODULE_LABELS[moduleKey] ?? moduleKey} up`}
                      >
                        <ArrowUp className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="rounded border p-1 disabled:opacity-40"
                        onClick={() => moveModule(index, 1)}
                        disabled={index === normalizedModuleOrder.length - 1}
                        aria-label={`Move ${MODULE_LABELS[moduleKey] ?? moduleKey} down`}
                      >
                        <ArrowDown className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </span>
                  </li>
                ))}
              </ol>
              {normalizedModuleOrder.length !== draft.module_order.length ? (
                <button
                  type="button"
                  className="mt-2 rounded border border-current px-3 py-1 text-xs font-bold"
                  onClick={() => updateDraft({ module_order: normalizedModuleOrder })}
                >
                  Repair module order
                </button>
              ) : null}
            </div>
          </fieldset>

          <fieldset className="rounded border border-[color-mix(in_srgb,var(--mp-primary,#1a365d)_20%,transparent)] p-4">
            <legend className="px-1 text-sm font-black uppercase tracking-wide">Header & effects</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-bold" htmlFor={fieldId("header-image")}>
                Header image URL
                <input
                  id={fieldId("header-image")}
                  type="url"
                  value={draft.header_image_url ?? ""}
                  onChange={(event) =>
                    updateDraft({ header_image_url: event.target.value.trim() || null })
                  }
                  className="mt-2 block w-full rounded border border-slate-300 bg-white p-2 text-slate-950"
                  placeholder="https://..."
                />
              </label>
              <div className="grid content-end gap-3">
                <label className="inline-flex items-center gap-2 text-sm font-bold">
                  <input
                    type="checkbox"
                    checked={draft.cursor_effect}
                    onChange={(event) => updateDraft({ cursor_effect: event.target.checked })}
                  />
                  Cursor effect
                </label>
                <div>
                  <p className="text-sm font-bold">Display mode</p>
                  <div className="mt-2 flex gap-3">
                    {(["retro", "modern"] as const).map((mode) => (
                      <label key={mode} className="inline-flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="display-mode"
                          value={mode}
                          checked={draft.display_mode === mode}
                          onChange={() => updateDraft({ display_mode: mode })}
                        />
                        {mode}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded border border-[color-mix(in_srgb,var(--mp-primary,#1a365d)_20%,transparent)] p-4">
            <legend className="px-1 text-sm font-black uppercase tracking-wide">Stickers</legend>
            <div className="flex flex-wrap items-end gap-3">
              <label className="text-sm font-bold" htmlFor={fieldId("sticker-emoji")}>
                Emoji
                <select
                  id={fieldId("sticker-emoji")}
                  value={selectedStickerEmoji}
                  onChange={(event) => setSelectedStickerEmoji(event.target.value)}
                  className="mt-2 block rounded border border-slate-300 bg-white p-2 text-slate-950"
                >
                  {STICKER_EMOJIS.map((emoji) => (
                    <option key={emoji} value={emoji}>
                      {emoji}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded border border-[color:var(--mp-primary,#1a365d)] bg-white px-3 py-2 text-sm font-bold text-[color:var(--mp-primary,#1a365d)]"
                onClick={addSticker}
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Add sticker
              </button>
            </div>

            {draft.stickers.length === 0 ? (
              <p className="mt-3 text-sm opacity-70">No stickers yet.</p>
            ) : (
              <div className="mt-4 grid gap-3">
                {draft.stickers.map((sticker) => (
                  <div
                    key={sticker.id}
                    className="grid gap-3 rounded border border-slate-200 bg-white/70 p-3 sm:grid-cols-[auto_1fr_auto]"
                  >
                    <span className="text-3xl" aria-hidden="true">
                      {sticker.emoji}
                    </span>
                    <div className="grid gap-2 sm:grid-cols-3">
                      <label className="text-xs font-bold">
                        X {Math.round(sticker.x)}%
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sticker.x}
                          onChange={(event) =>
                            updateSticker(sticker.id, { x: Number(event.target.value) })
                          }
                          className="block w-full"
                        />
                      </label>
                      <label className="text-xs font-bold">
                        Y {Math.round(sticker.y)}%
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sticker.y}
                          onChange={(event) =>
                            updateSticker(sticker.id, { y: Number(event.target.value) })
                          }
                          className="block w-full"
                        />
                      </label>
                      <label className="text-xs font-bold">
                        Size {Math.round(sticker.size)}px
                        <input
                          type="range"
                          min="12"
                          max="48"
                          value={sticker.size}
                          onChange={(event) =>
                            updateSticker(sticker.id, { size: Number(event.target.value) })
                          }
                          className="block w-full"
                        />
                      </label>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded border border-red-200 px-3 py-2 text-sm font-bold text-red-700 hover:bg-red-50"
                      onClick={() => removeSticker(sticker.id)}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </fieldset>
        </div>
      </div>

      <aside className="lg:sticky lg:top-4 lg:self-start">
        <div
          className={cn("profile-themed relative overflow-hidden rounded border p-4", draft.display_mode)}
          style={themeToCssVars(draft)}
        >
          {draft.header_image_url ? (
            <img
              src={draft.header_image_url}
              alt="Theme header preview"
              className="mb-4 h-28 w-full rounded object-cover"
            />
          ) : null}
          {draft.stickers.map((sticker) => (
            <span
              key={sticker.id}
              className="pointer-events-none absolute"
              style={{
                left: `${sticker.x}%`,
                top: `${sticker.y}%`,
                fontSize: `${sticker.size}px`,
                transform: "translate(-50%, -50%)",
              }}
              aria-hidden="true"
            >
              {sticker.emoji}
            </span>
          ))}
          {children ?? (
            <div className="profile-module">
              <h3 className="profile-heading text-xl font-black">Live Preview</h3>
              <p className="mt-2 text-sm">
                This sample module reflects your background, colors, fonts, borders, transparency,
                stickers, and display mode.
              </p>
              <a href="#theme-editor-preview" className="mt-3 inline-block text-sm font-bold underline">
                Example themed link
              </a>
            </div>
          )}
        </div>
      </aside>
    </section>
  );
}

export default ThemeEditor;
