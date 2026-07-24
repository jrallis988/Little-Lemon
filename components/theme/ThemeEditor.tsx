"use client";

import * as React from "react";
import {
  AlertTriangle,
  Eye,
  GripVertical,
  Palette,
  RotateCcw,
  Save,
  Send,
} from "lucide-react";

import type {
  BorderStyle,
  DisplayMode,
  LayoutMode,
  MusicPlayerStyle,
  ProfileModuleId,
  ProfileTheme,
  ProfileThemePreset,
} from "@/lib/types";
import { cn, hasPoorContrast } from "@/lib/utils";
import {
  THEME_PRESETS,
  sanitizeTheme,
  themeToCssVars,
} from "@/lib/themes";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export interface ThemeEditorProps {
  theme: ProfileTheme;
  onChange: (theme: ProfileTheme) => void;
  onSave: (theme: ProfileTheme) => void | Promise<void>;
  onReset: () => void | Promise<void>;
  onPreview: (theme: ProfileTheme) => void;
  onPublish: (theme: ProfileTheme) => void | Promise<void>;
  preview?: React.ReactNode | ((theme: ProfileTheme) => React.ReactNode);
  previewTitle?: string;
  className?: string;
}

const moduleLabels: Record<ProfileModuleId, string> = {
  about: "About Me",
  details: "Details",
  music: "Music",
  photos: "Photos",
  blog: "Blog",
  friends: "Friends",
  comments: "Comments",
  interests: "Interests",
};

const colorFields: Array<{
  key: keyof Pick<
    ProfileTheme,
    "backgroundColor" | "primaryColor" | "secondaryColor" | "textColor" | "linkColor"
  >;
  label: string;
}> = [
  { key: "backgroundColor", label: "Background" },
  { key: "primaryColor", label: "Primary" },
  { key: "secondaryColor", label: "Secondary" },
  { key: "textColor", label: "Text" },
  { key: "linkColor", label: "Links" },
];

const fontChoices = [
  "Verdana, Geneva, sans-serif",
  "Tahoma, Geneva, sans-serif",
  "Georgia, serif",
  "'Trebuchet MS', sans-serif",
  "system-ui, sans-serif",
  "Courier New, monospace",
  "Impact, Haettenschweiler, sans-serif",
];

export function ThemeEditor({
  theme,
  onChange,
  onSave,
  onReset,
  onPreview,
  onPublish,
  preview,
  previewTitle = "Live preview",
  className,
}: ThemeEditorProps) {
  const [draft, setDraft] = React.useState(theme);
  const [saving, setSaving] = React.useState(false);
  const [publishing, setPublishing] = React.useState(false);
  const [draggedModule, setDraggedModule] = React.useState<ProfileModuleId | null>(
    null
  );

  React.useEffect(() => {
    setDraft(theme);
  }, [theme]);

  const commit = (next: ProfileTheme) => {
    const sanitized = sanitizeTheme(next) as ProfileTheme;
    setDraft(sanitized);
    onChange(sanitized);
  };

  const update = (patch: Partial<ProfileTheme>) => {
    commit({
      ...draft,
      ...patch,
      preset: patch.preset ?? (patch.preset === undefined ? draft.preset : "custom"),
      updatedAt: new Date().toISOString(),
    });
  };

  const updateAsCustom = (patch: Partial<ProfileTheme>) => {
    update({ ...patch, preset: "custom" });
  };

  const applyPreset = (preset: ProfileThemePreset) => {
    const { label: _label, description: _description, ...presetTheme } =
      THEME_PRESETS[preset];
    commit({
      ...draft,
      ...presetTheme,
      preset,
      id: draft.id,
      profileId: draft.profileId,
      updatedAt: new Date().toISOString(),
    });
  };

  const moveModule = (from: number, to: number) => {
    if (from === to || to < 0 || to >= draft.moduleOrder.length) return;
    const next = [...draft.moduleOrder];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    updateAsCustom({ moduleOrder: next });
  };

  const submitSave = async () => {
    setSaving(true);
    try {
      await onSave(draft);
    } finally {
      setSaving(false);
    }
  };

  const submitPublish = async () => {
    setPublishing(true);
    try {
      await onPublish(draft);
    } finally {
      setPublishing(false);
    }
  };

  const poorTextContrast = hasPoorContrast(draft.textColor, draft.backgroundColor);
  const poorLinkContrast = hasPoorContrast(draft.linkColor, draft.backgroundColor);
  const previewContent =
    typeof preview === "function" ? preview(draft) : preview ?? defaultPreview(draft);

  return (
    <div className={cn("grid gap-4 lg:grid-cols-[360px_1fr]", className)}>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Theme Presets</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {(Object.keys(THEME_PRESETS) as ProfileThemePreset[]).map((preset) => {
              const option = THEME_PRESETS[preset];
              const selected = draft.preset === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  className={cn(
                    "rounded-card border p-3 text-left transition",
                    selected
                      ? "border-brand bg-brand-soft"
                      : "border-surface-border bg-white hover:border-brand/50"
                  )}
                  onClick={() => applyPreset(preset)}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-bold text-navy-900">{option.label}</span>
                    {selected ? <Badge variant="info">Active</Badge> : null}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-navy-600">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Colors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {colorFields.map((field) => (
              <label
                key={field.key}
                className="grid grid-cols-[1fr_auto] items-center gap-3"
              >
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wide text-navy-700">
                    {field.label}
                  </span>
                  <span className="text-xs text-navy-500">{draft[field.key]}</span>
                </span>
                <input
                  type="color"
                  value={draft[field.key]}
                  onChange={(event) =>
                    updateAsCustom({ [field.key]: event.target.value })
                  }
                  className="h-9 w-14 cursor-pointer rounded-card border border-surface-border bg-white p-1"
                />
              </label>
            ))}
            {poorTextContrast || poorLinkContrast ? (
              <div className="flex gap-2 rounded-card border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <p>
                  Contrast warning:{" "}
                  {poorTextContrast ? "text color" : "link color"} may be hard to
                  read on the selected background.
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Typography & Layout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="block space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wide text-navy-700">
                Heading font
              </span>
              <select
                value={draft.headingFont}
                onChange={(event) =>
                  updateAsCustom({ headingFont: event.target.value })
                }
                className="h-9 w-full rounded-card border border-surface-border bg-white px-3 text-sm"
              >
                {fontChoices.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wide text-navy-700">
                Body font
              </span>
              <select
                value={draft.bodyFont}
                onChange={(event) => updateAsCustom({ bodyFont: event.target.value })}
                className="h-9 w-full rounded-card border border-surface-border bg-white px-3 text-sm"
              >
                {fontChoices.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <SelectField
                label="Layout"
                value={draft.layout}
                values={["classic", "stacked", "wide"] satisfies LayoutMode[]}
                onChange={(value) => updateAsCustom({ layout: value as LayoutMode })}
              />
              <SelectField
                label="Display"
                value={draft.displayMode}
                values={["retro", "modern"] satisfies DisplayMode[]}
                onChange={(value) =>
                  updateAsCustom({ displayMode: value as DisplayMode })
                }
              />
              <SelectField
                label="Border"
                value={draft.borderStyle}
                values={["solid", "dashed", "double", "none"] satisfies BorderStyle[]}
                onChange={(value) =>
                  updateAsCustom({ borderStyle: value as BorderStyle })
                }
              />
              <SelectField
                label="Player"
                value={draft.musicPlayerStyle}
                values={["compact", "expanded", "vinyl"] satisfies MusicPlayerStyle[]}
                onChange={(value) =>
                  updateAsCustom({
                    musicPlayerStyle: value as MusicPlayerStyle,
                  })
                }
              />
            </div>
            <label className="block space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wide text-navy-700">
                Card transparency
              </span>
              <input
                type="range"
                min="0.4"
                max="1"
                step="0.01"
                value={draft.cardTransparency}
                onChange={(event) =>
                  updateAsCustom({ cardTransparency: Number(event.target.value) })
                }
                className="w-full accent-brand"
              />
              <span className="text-xs text-navy-500">
                {Math.round(draft.cardTransparency * 100)}%
              </span>
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images & Extras</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              label="Background image URL"
              value={draft.backgroundImage ?? ""}
              onChange={(event) =>
                updateAsCustom({ backgroundImage: event.target.value || undefined })
              }
              placeholder="https://example.com/pattern.png"
            />
            <Input
              label="Header image URL"
              value={draft.headerImage ?? ""}
              onChange={(event) =>
                updateAsCustom({ headerImage: event.target.value || undefined })
              }
              placeholder="https://example.com/header.jpg"
            />
            <div className="grid grid-cols-2 gap-3">
              <SelectField
                label="Repeat"
                value={draft.backgroundRepeat}
                values={["no-repeat", "repeat", "repeat-x", "repeat-y"]}
                onChange={(value) =>
                  updateAsCustom({
                    backgroundRepeat: value as ProfileTheme["backgroundRepeat"],
                  })
                }
              />
              <Input
                label="Position"
                value={draft.backgroundPosition}
                onChange={(event) =>
                  updateAsCustom({ backgroundPosition: event.target.value })
                }
              />
            </div>
            <Input
              label="Stickers"
              helperText="Comma-separated, up to 8 short stickers."
              value={draft.stickers.join(", ")}
              onChange={(event) =>
                updateAsCustom({
                  stickers: event.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                })
              }
            />
            <label className="flex items-center gap-2 text-sm font-semibold text-navy-700">
              <input
                type="checkbox"
                checked={draft.cursorEffect}
                onChange={(event) =>
                  updateAsCustom({ cursorEffect: event.target.checked })
                }
                className="h-4 w-4 rounded border-surface-border accent-brand"
              />
              Enable cursor sparkle effect
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Module Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {draft.moduleOrder.map((moduleId, index) => (
              <div
                key={moduleId}
                draggable
                onDragStart={() => setDraggedModule(moduleId)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => {
                  const from = draft.moduleOrder.indexOf(draggedModule as ProfileModuleId);
                  moveModule(from, index);
                  setDraggedModule(null);
                }}
                className="flex items-center gap-2 rounded-card border border-surface-border bg-white p-2 shadow-soft"
              >
                <GripVertical className="h-4 w-4 text-navy-400" aria-hidden />
                <span className="flex-1 text-sm font-bold text-navy-800">
                  {moduleLabels[moduleId]}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2"
                  onClick={() => moveModule(index, index - 1)}
                  disabled={index === 0}
                >
                  Up
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2"
                  onClick={() => moveModule(index, index + 1)}
                  disabled={index === draft.moduleOrder.length - 1}
                >
                  Down
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="sticky top-16 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle>{previewTitle}</CardTitle>
            <Badge variant={draft.preset === "custom" ? "warning" : "info"}>
              {THEME_PRESETS[draft.preset].label}
            </Badge>
          </CardHeader>
          <CardContent>
            <div
              className="min-h-80 rounded-card border border-surface-border p-4"
              style={{
                ...themeToCssVars(draft),
                backgroundColor: "var(--mp-bg)",
                backgroundImage: "var(--mp-bg-image)",
                backgroundRepeat: "var(--mp-bg-repeat)",
                backgroundPosition: "var(--mp-bg-position)",
                color: "var(--mp-text)",
                fontFamily: "var(--mp-body-font)",
              }}
            >
              {previewContent}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-wrap justify-end gap-2">
            <Button variant="secondary" onClick={onReset}>
              <RotateCcw className="h-4 w-4" aria-hidden />
              Reset
            </Button>
            <Button variant="ghost" onClick={() => onPreview(draft)}>
              <Eye className="h-4 w-4" aria-hidden />
              Preview
            </Button>
            <Button onClick={submitSave} isLoading={saving}>
              <Save className="h-4 w-4" aria-hidden />
              Save
            </Button>
            <Button variant="secondary" onClick={submitPublish} isLoading={publishing}>
              <Send className="h-4 w-4" aria-hidden />
              Publish
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SelectField<T extends string>({
  label,
  value,
  values,
  onChange,
}: {
  label: string;
  value: T;
  values: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-bold uppercase tracking-wide text-navy-700">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="h-9 w-full rounded-card border border-surface-border bg-white px-3 text-sm"
      >
        {values.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

function defaultPreview(theme: ProfileTheme) {
  return (
    <div
      className="mx-auto max-w-xl overflow-hidden rounded-card border p-4 shadow-card"
      style={{
        borderStyle: theme.borderStyle,
        borderColor: theme.primaryColor,
        backgroundColor: `rgb(255 255 255 / ${theme.cardTransparency})`,
      }}
    >
      <div
        className="mb-3 rounded-card px-3 py-2 text-white"
        style={{
          backgroundColor: theme.primaryColor,
          fontFamily: theme.headingFont,
        }}
      >
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4" aria-hidden />
          <strong>My custom corner</strong>
        </div>
      </div>
      <p className="text-sm leading-6" style={{ color: theme.textColor }}>
        This preview shows cards, headings, links, stickers, and module order with
        your current theme settings.
      </p>
      <a
        href="#theme-preview"
        className="mt-2 inline-block text-sm font-bold"
        style={{ color: theme.linkColor }}
        onClick={(event) => event.preventDefault()}
      >
        Preview link
      </a>
      {theme.stickers.length > 0 ? (
        <div className="mt-3 flex gap-2 text-lg">
          {theme.stickers.map((sticker, index) => (
            <span key={`${sticker}-${index}`}>{sticker}</span>
          ))}
        </div>
      ) : null}
      <ol className="mt-4 grid gap-2 text-xs">
        {theme.moduleOrder.slice(0, 4).map((moduleId, index) => (
          <li
            key={moduleId}
            className="rounded-card border border-surface-border bg-white/80 px-3 py-2"
          >
            {index + 1}. {moduleLabels[moduleId]}
          </li>
        ))}
      </ol>
    </div>
  );
}
