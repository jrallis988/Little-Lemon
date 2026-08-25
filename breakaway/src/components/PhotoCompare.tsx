import { useState } from "react";
import "./PhotoCompare.css";

export function PhotoCompare() {
  const [pos, setPos] = useState(55);

  return (
    <div className="pc">
      <p className="pc-label">Before / after — crop &amp; grade for print</p>
      <div className="pc-stage">
        <div className="pc-layer pc-layer--after" />
        <div className="pc-layer pc-layer--before" style={{ width: `${pos}%` }} />
        <div className="pc-handle" style={{ left: `${pos}%` }}>
          <span />
        </div>
        <input
          className="pc-range"
          type="range"
          min={8}
          max={92}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare original and print-ready photograph"
        />
        <span className="pc-tag pc-tag--l">Camera RAW</span>
        <span className="pc-tag pc-tag--r">Print CMYK</span>
      </div>
      <p className="pc-note">
        Photoshop preparation: exposure balance, skin/ice separation, sharpening for 300 ppi, soft
        proof to SWOP-coated.
      </p>
    </div>
  );
}
