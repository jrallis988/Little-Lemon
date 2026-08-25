import { PROMO } from "../data/publication";
import "./PromoStrip.css";

export function PromoStrip() {
  return (
    <div className="ps">
      {PROMO.map((p) => (
        <article key={p.id} className={`ps-card ps-card--${p.id}`}>
          <div className="ps-art" aria-hidden="true">
            {p.id === "poster" && (
              <>
                <p className="ps-mast">BREAKAWAY</p>
                <p className="ps-big">08</p>
                <p className="ps-sub">BEYOND THE SCORE.</p>
              </>
            )}
            {p.id === "sub" && (
              <>
                <p className="ps-kicker">SUBSCRIBE</p>
                <p className="ps-line">Independent sports journalism, six issues a year.</p>
              </>
            )}
            {p.id === "newsstand" && (
              <>
                <p className="ps-mast">BREAKAWAY</p>
                <p className="ps-line">Winter 2026 · Now on stands</p>
              </>
            )}
            {p.id === "social" && (
              <>
                <p className="ps-mast">BREAKAWAY</p>
                <p className="ps-big-sm">THE 0.3 SECOND</p>
              </>
            )}
            {p.id === "email" && (
              <>
                <p className="ps-kicker">NEW ISSUE</p>
                <p className="ps-line">Issue 08 is live — beyond the score.</p>
              </>
            )}
          </div>
          <footer>
            <strong>{p.title}</strong>
            <span>{p.size}</span>
          </footer>
        </article>
      ))}
    </div>
  );
}
