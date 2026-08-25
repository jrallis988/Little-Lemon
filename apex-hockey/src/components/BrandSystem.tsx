import { useState } from "react";
import { ApexLogo } from "./ApexLogo";
import { MediaSlot } from "./MediaSlot";
import { assets, palette, typeScale } from "../data/content";

const devices = [
  { id: "rules", title: "Directional Rules", desc: "Trajectory / speed lines at fixed angles" },
  { id: "frames", title: "Crop Frames", desc: "Signal-red corner brackets for photo systems" },
  { id: "nums", title: "Number Treatments", desc: "Tabular condensed stats for reaction metrics" },
  { id: "slash", title: "Slash Panels", desc: "Asymmetric panels that imply forward motion" },
] as const;

export function BrandSystem() {
  const [device, setDevice] = useState<(typeof devices)[number]["id"]>("rules");

  return (
    <section className="section brand" id="brand" aria-labelledby="brand-title">
      <div className="section__inner">
        <p className="section__eyebrow">Brand System</p>
        <h2 id="brand-title" className="section__title">
          Identity under the campaign.
        </h2>
        <p className="section__lead">
          A restrained athletic system designed so final Illustrator, Figma, and photography assets
          can drop in without rebuilding the experience.
        </p>

        <div className="brand__logo-block">
          <h3 className="headline">Logo</h3>
          <div className="brand__logo-stage replace-slot">
            <ApexLogo className="brand__logo-large" />
            <span className="replace-slot__label">Replaceable logo area</span>
          </div>
        </div>

        <div className="brand__type">
          <h3 className="headline">Typography System</h3>
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
        </div>

        <div className="brand__palette">
          <h3 className="headline">Color Palette</h3>
          <p className="brand__note">
            Placeholder athletic palette — swap CSS variables when final brand colors are locked.
          </p>
          <ul className="brand__swatches">
            {palette.map((c) => (
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
              </li>
            ))}
          </ul>
        </div>

        <div className="brand__devices">
          <div className="brand__devices-copy">
            <h3 className="headline">Graphic Devices</h3>
            <div className="brand__device-tabs" role="tablist" aria-label="Graphic devices">
              {devices.map((d) => (
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
            <p>{devices.find((d) => d.id === device)?.desc}</p>
          </div>
          <div className="brand__device-stage" data-device={device} aria-live="polite">
            {device === "rules" && (
              <div className="device-demo device-demo--rules" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            )}
            {device === "frames" && (
              <MediaSlot
                src={assets.athleteCrop}
                label="Cropping system demo"
                framed
                ratio="4 / 5"
              />
            )}
            {device === "nums" && (
              <div className="device-demo device-demo--nums">
                <p className="stat-num">0.18</p>
                <p>SEC · RELEASE WINDOW</p>
              </div>
            )}
            {device === "slash" && (
              <div className="device-demo device-demo--slash" aria-hidden="true">
                <div />
                <div />
              </div>
            )}
          </div>
        </div>

        <div className="brand__photo">
          <h3 className="headline">Photography Direction</h3>
          <div className="brand__photo-grid">
            <MediaSlot src={assets.athleteCrop} label="Athlete — tight crop" framed ratio="4 / 5" />
            <MediaSlot
              src={assets.productDetail}
              label="Product — detail framing"
              framed
              ratio="5 / 4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
