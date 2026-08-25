import { useCallback, useEffect, useState } from "react";
import { SPREADS } from "../data/publication";
import { MagazineSpread } from "./MagazineSpread";
import "./SpreadViewer.css";

interface Props {
  showGrid?: boolean;
  initialId?: string;
}

export function SpreadViewer({ showGrid = false, initialId }: Props) {
  const start = Math.max(
    0,
    SPREADS.findIndex((s) => s.id === initialId),
  );
  const [index, setIndex] = useState(start < 0 ? 0 : start);
  const [fullscreen, setFullscreen] = useState(false);
  const spread = SPREADS[index];

  const prev = useCallback(() => setIndex((i) => (i > 0 ? i - 1 : SPREADS.length - 1)), []);
  const next = useCallback(() => setIndex((i) => (i < SPREADS.length - 1 ? i + 1 : 0)), []);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen, prev, next]);

  const viewer = (
    <div className={`sv${fullscreen ? " sv--fs" : ""}`}>
      <div className="sv-toolbar">
        <div className="sv-meta">
          <span className="sv-pages">{spread.pages}</span>
          <span className="sv-title">{spread.title}</span>
          <span className="sv-section">{spread.section}</span>
        </div>
        <div className="sv-actions">
          <button type="button" onClick={prev} aria-label="Previous spread">
            ←
          </button>
          <span className="sv-count">
            {index + 1} / {SPREADS.length}
          </span>
          <button type="button" onClick={next} aria-label="Next spread">
            →
          </button>
          <button
            type="button"
            className="sv-fs-btn"
            onClick={() => setFullscreen((f) => !f)}
            aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {fullscreen ? "Close" : "Full view"}
          </button>
        </div>
      </div>
      <div className="sv-stage">
        <MagazineSpread
          kind={spread.kind}
          variant={spread.id}
          showGrid={showGrid}
        />
      </div>
      <p className="sv-caption">{spread.caption}</p>
      <div className="sv-thumbs" role="tablist" aria-label="Publication spreads">
        {SPREADS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={i === index ? "is-active" : ""}
            onClick={() => setIndex(i)}
            title={s.title}
          >
            <span>{s.pages}</span>
          </button>
        ))}
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="sv-fs-portal" role="dialog" aria-modal="true" aria-label="Fullscreen spread viewer">
        {viewer}
      </div>
    );
  }

  return viewer;
}
