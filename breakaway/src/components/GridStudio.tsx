import { useState } from "react";
import { GRID_EXAMPLES } from "../data/publication";
import { MagazineSpread } from "./MagazineSpread";
import type { SpreadKind } from "../data/publication";
import "./GridStudio.css";

const KIND_MAP: Record<string, SpreadKind> = {
  standard: "feature-body",
  photo: "photo",
  data: "data",
  opening: "feature-open",
  interview: "interview",
};

export function GridStudio() {
  const [active, setActive] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const example = GRID_EXAMPLES[active];

  return (
    <div className="gs">
      <div className="gs-controls">
        <div className="gs-tabs">
          {GRID_EXAMPLES.map((g, i) => (
            <button
              key={g.id}
              type="button"
              className={i === active ? "is-active" : ""}
              onClick={() => setActive(i)}
            >
              {g.name}
            </button>
          ))}
        </div>
        <label className="gs-toggle">
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
          />
          Grid overlay
        </label>
      </div>
      <p className="gs-desc">{example.desc}</p>
      <div className="gs-stage">
        <MagazineSpread
          kind={KIND_MAP[example.id]}
          variant={example.id === "photo" ? "moment-2" : undefined}
          showGrid={showGrid}
        />
      </div>
    </div>
  );
}
