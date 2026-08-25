import { useMemo, useState } from "react";
import { brand } from "../data/content";

type FormatId = "ig-post" | "ig-portrait" | "ig-story" | "tiktok" | "youtube";

const formats: { id: FormatId; label: string; ratio: string; note: string }[] = [
  { id: "ig-post", label: "Instagram Post", ratio: "1 / 1", note: "1080 × 1080" },
  { id: "ig-portrait", label: "Instagram Portrait", ratio: "4 / 5", note: "1080 × 1350" },
  { id: "ig-story", label: "Instagram Story", ratio: "9 / 16", note: "1080 × 1920" },
  { id: "tiktok", label: "TikTok", ratio: "9 / 16", note: "1080 × 1920 · UI safe areas" },
  { id: "youtube", label: "YouTube", ratio: "16 / 9", note: "1280 × 720 thumb" },
];

export function FormatPreviewer() {
  const [format, setFormat] = useState<FormatId>("ig-post");
  const [safeAreas, setSafeAreas] = useState(true);

  const active = useMemo(() => formats.find((f) => f.id === format)!, [format]);

  return (
    <section className="section previewer" id="previewer" aria-labelledby="previewer-title">
      <div className="section__inner">
        <p className="section__eyebrow">Social Format Previewer</p>
        <h2 id="previewer-title" className="section__title">
          Evaluate the art on-platform.
        </h2>
        <p className="section__lead">
          Switch formats to change aspect ratio instantly. Toggle safe-area overlays to stress-test
          hierarchy against platform UI.
        </p>

        <div className="previewer__controls">
          <div className="previewer__formats" role="radiogroup" aria-label="Social format">
            {formats.map((f) => (
              <button
                key={f.id}
                type="button"
                role="radio"
                aria-checked={format === f.id}
                className={format === f.id ? "is-active" : ""}
                onClick={() => setFormat(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`previewer__toggle ${safeAreas ? "is-active" : ""}`}
            aria-pressed={safeAreas}
            onClick={() => setSafeAreas((v) => !v)}
          >
            {safeAreas ? "Safe-area overlays: On" : "Safe-area overlays: Off"}
          </button>
        </div>

        <div className="previewer__stage">
          <div
            className={`preview-frame preview-frame--${format}`}
            style={{ aspectRatio: active.ratio }}
            data-safe={safeAreas ? "on" : "off"}
          >
            <div className="preview-frame__art">
              <p className="preview-frame__product">{brand.product}</p>
              <p className="preview-frame__line">{brand.line}</p>
              <p className="preview-frame__sub">Campaign artwork preview</p>
            </div>
            {safeAreas ? <div className="preview-frame__overlay" aria-hidden="true" /> : null}
          </div>
          <p className="previewer__meta">
            <strong>{active.label}</strong>
            <span>{active.note}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
