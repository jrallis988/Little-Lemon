import { useState } from "react";
import { ApexLogo } from "./ApexLogo";
import { MediaSlot } from "./MediaSlot";
import {
  assets,
  colorReasons,
  hockeyGeometry,
  movementCycle,
  typeBehaviors,
  typeScale,
} from "../data/content";

export function BrandSystem() {
  const [device, setDevice] = useState<(typeof hockeyGeometry)[number]["id"]>("blueline");

  return (
    <section className="section brand" id="system" aria-labelledby="system-title">
      <div className="section__inner">
        <p className="section__eyebrow">04–07 — Campaign System</p>
        <h2 id="system-title" className="section__title">
          Built from hockey — not generic sports.
        </h2>
        <p className="section__lead">
          Rink geometry, equipment color, scoreboard data, and the physics of a shift become the
          design system. Someone should recognize APEX before they see the logo.
        </p>

        <div className="brand__logo-block">
          <h3 className="headline">Logo</h3>
          <p className="brand__note">
            Peak + blue line + faceoff point + impact tick. Replaceable with final Illustrator mark.
          </p>
          <div className="brand__logo-stage replace-slot">
            <ApexLogo className="brand__logo-large" />
            <span className="replace-slot__label">Replaceable logo area</span>
          </div>
        </div>

        <div className="brand__type">
          <h3 className="headline">Typography</h3>
          <p className="brand__note">
            Technical and competitive — not stereotypical condensed sports defaults. Data lives in
            mono as identity.
          </p>
          <ul className="brand__type-list">
            {typeScale.map((item) => (
              <li key={item.name} className="brand__type-item">
                <div className="brand__type-meta">
                  <strong>{item.name}</strong>
                  <span>{item.note}</span>
                </div>
                <p className={`type-sample ${item.className}`}>{item.sample}</p>
              </li>
            ))}
          </ul>
          <ul className="type-behaviors">
            {typeBehaviors.map((b) => (
              <li key={b.name}>
                <strong>{b.name}</strong>
                <span>{b.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="brand__palette">
          <h3 className="headline">Color — with reasons</h3>
          <p className="brand__note">
            Not default black + red + white aggression. Every major color has a job in the
            performance system.
          </p>
          <ul className="brand__swatches brand__swatches--reasoned">
            {colorReasons.map((c) => (
              <li key={c.hex}>
                <button
                  type="button"
                  className="brand__swatch"
                  style={{ background: c.hex }}
                  aria-label={`${c.name} ${c.hex}`}
                  title={`${c.name} · ${c.varName}`}
                />
                <span>{c.name}</span>
                <code>{c.hex}</code>
                <p>{c.reason}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="brand__devices">
          <div className="brand__devices-copy">
            <h3 className="headline">Hockey geometry</h3>
            <p className="brand__note">
              Building blocks — not stickers. These control grids, crops, and movement.
            </p>
            <div className="brand__device-tabs" role="tablist" aria-label="Hockey geometry">
              {hockeyGeometry.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  role="tab"
                  aria-selected={device === d.id}
                  className={device === d.id ? "is-active" : ""}
                  onClick={() => setDevice(d.id)}
                >
                  {d.title}
                </button>
              ))}
            </div>
            <p>{hockeyGeometry.find((d) => d.id === device)?.desc}</p>
          </div>
          <div className="brand__device-stage" data-device={device} aria-live="polite">
            {device === "blueline" && (
              <div className="device-demo device-demo--blueline" aria-hidden="true">
                <span />
                <span />
              </div>
            )}
            {device === "redline" && (
              <div className="device-demo device-demo--redline" aria-hidden="true">
                <span />
              </div>
            )}
            {device === "crease" && (
              <div className="device-demo device-demo--crease" aria-hidden="true">
                <div />
              </div>
            )}
            {device === "faceoff" && (
              <MediaSlot src={assets.athleteCrop} label="Faceoff-circle crop" framed ratio="1 / 1" />
            )}
            {device === "shotchart" && (
              <div className="device-demo device-demo--shotchart" aria-hidden="true">
                {Array.from({ length: 28 }).map((_, i) => (
                  <i key={i} style={{ ["--i" as string]: i }} />
                ))}
              </div>
            )}
            {device === "trajectory" && (
              <div className="device-demo device-demo--trajectory" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
        </div>

        <div className="brand__cycle">
          <h3 className="headline">Movement cycle</h3>
          <p className="brand__note">
            Hockey is not one continuous direction. Layouts and motion follow the shift:
          </p>
          <ol className="movement-cycle">
            {movementCycle.map((beat) => (
              <li key={beat.id} data-beat={beat.id}>
                <strong>{beat.label}</strong>
                <span>{beat.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
