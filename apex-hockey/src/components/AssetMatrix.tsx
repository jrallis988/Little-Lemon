import { assetMatrix } from "../data/content";

export function AssetMatrix() {
  return (
    <section className="section matrix" id="matrix" aria-labelledby="matrix-title">
      <div className="section__inner">
        <p className="section__eyebrow">Campaign Production System</p>
        <h2 id="matrix-title" className="section__title">
          One system. Every channel.
        </h2>
        <p className="section__lead">
          How the central creative expands across Instagram, TikTok, YouTube, web, and retail —
          presented as campaign architecture, not a spreadsheet.
        </p>

        <div className="matrix-board" role="table" aria-label="Campaign asset matrix">
          <div className="matrix-board__row matrix-board__row--head" role="row">
            <div role="columnheader">Campaign Asset</div>
            <div role="columnheader">Instagram</div>
            <div role="columnheader">TikTok</div>
            <div role="columnheader">YouTube</div>
            <div role="columnheader">Web</div>
            <div role="columnheader">Retail</div>
          </div>
          {assetMatrix.map((row) => (
            <div className="matrix-board__row" role="row" key={row.asset}>
              <div role="cell" className="matrix-board__asset">
                {row.asset}
              </div>
              {[row.ig, row.tt, row.yt, row.web, row.retail].map((on, i) => (
                <div role="cell" key={`${row.asset}-${i}`} className={on ? "is-on" : "is-off"}>
                  <span className="sr-only">{on ? "Included" : "Not applicable"}</span>
                  <span aria-hidden="true">{on ? "✓" : "—"}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
