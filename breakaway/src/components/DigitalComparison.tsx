import { useState } from "react";
import { DIGITAL_BREAKS } from "../data/publication";
import "./DigitalComparison.css";

export function DigitalComparison() {
  const [active, setActive] = useState(0);
  const device = DIGITAL_BREAKS[active];

  return (
    <div className="dc">
      <div className="dc-tabs">
        {DIGITAL_BREAKS.map((d, i) => (
          <button
            key={d.id}
            type="button"
            className={i === active ? "is-active" : ""}
            onClick={() => setActive(i)}
          >
            {d.label}
          </button>
        ))}
      </div>
      <p className="dc-note">{device.note}</p>
      <div className="dc-frame-wrap">
        <div
          className={`dc-frame dc-frame--${device.id}`}
          style={{ maxWidth: device.width }}
        >
          <header className="dc-chrome">
            <span>BREAKAWAY</span>
            <nav>
              <em>PLAY</em>
              <em>PEOPLE</em>
              <em>GEAR</em>
            </nav>
          </header>
          <article className="dc-article">
            <p className="dc-kicker">PLAY · FEATURE</p>
            <h3>
              THE 0.3
              <br />
              SECOND
            </h3>
            <p className="dc-deck">
              Inside the decision that happens before the puck leaves the stick.
            </p>
            <div className="dc-hero" />
            <div className={`dc-body dc-body--${device.id}`}>
              <p>
                The clock on the scoreboard lies. What looks continuous from the seats is, for the
                shooter, a sequence of micro-commitments.
              </p>
              <p>
                We spent a week with a release specialist and a high-speed camera crew to map that
                window.
              </p>
              {device.id === "desktop" && (
                <aside>
                  <p className="dc-stat">0.28</p>
                  <p className="dc-stat-label">SEC MEDIAN RELEASE</p>
                </aside>
              )}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
