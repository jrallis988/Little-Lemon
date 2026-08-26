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
          How the Apex Mark system expands across social, web, retail, and the arena — campaign
          architecture, not a spreadsheet.
        </p>

        <div className="matrix-board" role="table" aria-label="Campaign asset matrix">
          <div className="matrix-board__row matrix-board__row--head" role="row">
            <div role="columnheader">Campaign Asset</div>
            <div role="columnheader">IG</div>
            <div role="columnheader">TikTok</div>
            <div role="columnheader">YT</div>
            <div role="columnheader">Web</div>
            <div role="columnheader">Retail</div>
            <div role="columnheader">Arena</div>
          </div>
          {assetMatrix.map((row) => (
            <div className="matrix-board__row matrix-board__row--6" role="row" key={row.asset}>
              <div role="cell" className="matrix-board__asset">
                {row.asset}
              </div>
              {[row.ig, row.tt, row.yt, row.web, row.retail, row.arena].map((on, i) => (
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
