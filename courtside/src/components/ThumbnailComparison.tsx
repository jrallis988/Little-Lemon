import { useState } from "react";
import type { ThumbnailConcept } from "../data/brand";
import { YouTubeThumbnail } from "./YouTubeThumbnail";
import "./ThumbnailComparison.css";

export type ThumbSize = "large" | "search" | "recommended" | "mobile";

const sizeMeta: Record<
  ThumbSize,
  { label: string; width: number; note: string }
> = {
  large: { label: "Large", width: 640, note: "Design canvas (~1280×720 scaled)" },
  search: { label: "Search Results", width: 360, note: "Desktop search row" },
  recommended: { label: "Recommended", width: 246, note: "Sidebar / home card" },
  mobile: { label: "Mobile", width: 168, note: "Phone feed scale" },
};

interface Props {
  versionA: ThumbnailConcept;
  versionB: ThumbnailConcept;
  labelA?: string;
  labelB?: string;
}

/** Compare thumbnail versions at real viewing sizes. */
export function ThumbnailComparison({
  versionA,
  versionB,
  labelA = "VERSION A",
  labelB = "VERSION B",
}: Props) {
  const [size, setSize] = useState<ThumbSize>("recommended");
  const [actual, setActual] = useState(false);
  const width = actual ? sizeMeta[size].width : undefined;

  return (
    <div className="thumb-compare">
      <div className="thumb-compare__controls" role="group" aria-label="Thumbnail size">
        {(Object.keys(sizeMeta) as ThumbSize[]).map((key) => (
          <button
            key={key}
            type="button"
            className={`btn btn--ghost ${size === key ? "is-active" : ""}`}
            onClick={() => setSize(key)}
            aria-pressed={size === key}
          >
            {sizeMeta[key].label}
          </button>
        ))}
        <button
          type="button"
          className={`btn ${actual ? "btn--signal" : "btn--ghost"}`}
          onClick={() => setActual((v) => !v)}
          aria-pressed={actual}
        >
          View at actual size
        </button>
      </div>
      <p className="thumb-compare__note">{sizeMeta[size].note}</p>
      <div className={`thumb-compare__stage thumb-compare__stage--${size}`}>
        <div
          className="thumb-compare__col"
          style={width ? { width, maxWidth: "100%" } : undefined}
        >
          <span className="label-chip">{labelA}</span>
          <YouTubeThumbnail concept={versionA} />
        </div>
        <div
          className="thumb-compare__col"
          style={width ? { width, maxWidth: "100%" } : undefined}
        >
          <span className="label-chip">{labelB}</span>
          <YouTubeThumbnail concept={versionB} />
        </div>
      </div>
      <p className="thumb-compare__principle">
        A thumbnail that looks excellent at 1280 × 720 may fail when reduced to
        actual viewing size. Test hierarchy, contrast, and cropping at the sizes
        audiences actually see.
      </p>
    </div>
  );
}
