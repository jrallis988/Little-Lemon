import { assets, brand } from "../data/content";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  inverted?: boolean;
};

/** Original APEX mark — replace /public/apex-mark.svg with final Illustrator/Figma export */
export function ApexLogo({ className = "", showWordmark = true, inverted = false }: LogoProps) {
  return (
    <div className={`apex-logo ${inverted ? "apex-logo--inv" : ""} ${className}`.trim()}>
      <div className="apex-logo__mark replace-slot" aria-hidden={!showWordmark}>
        <img src={assets.logo} alt="" width={48} height={48} />
        <span className="replace-slot__label">Logo</span>
      </div>
      {showWordmark ? (
        <div className="apex-logo__word">
          <span className="apex-logo__name">{brand.name.split(" ")[0]}</span>
          <span className="apex-logo__sub">Hockey</span>
        </div>
      ) : null}
    </div>
  );
}
