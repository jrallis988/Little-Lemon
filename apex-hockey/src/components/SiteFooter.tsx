import { brand } from "../data/content";
import { ApexLogo } from "./ApexLogo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section__inner site-footer__inner">
        <ApexLogo />
        <div className="site-footer__copy">
          <p>
            {brand.product} · {brand.line}
          </p>
          <p>{brand.disclaimer}</p>
          <p>
            Presented by{" "}
            <a href="../../index.html">Artistic Fountain</a> — sports marketing case study.
          </p>
        </div>
      </div>
    </footer>
  );
}
