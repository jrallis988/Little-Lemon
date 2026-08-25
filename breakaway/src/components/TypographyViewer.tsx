import { useState } from "react";
import { TYPE_ROLES } from "../data/publication";
import "./TypographyViewer.css";

export function TypographyViewer() {
  const [active, setActive] = useState(0);
  const role = TYPE_ROLES[active];

  return (
    <div className="tv">
      <div className="tv-roles" role="tablist" aria-label="Typography roles">
        {TYPE_ROLES.map((r, i) => (
          <button
            key={r.role}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={i === active ? "is-active" : ""}
            onClick={() => setActive(i)}
          >
            {r.role}
          </button>
        ))}
      </div>
      <div className="tv-stage" data-role={role.role.toLowerCase()}>
        <p className="tv-font">{role.font}</p>
        <p className={`tv-sample tv-sample--${role.role.toLowerCase()}`}>{role.sample}</p>
        <div className="tv-meta">
          <p>
            <strong>Use</strong> {role.use}
          </p>
          <p>
            <strong>Specs</strong> {role.specs}
          </p>
        </div>
      </div>
    </div>
  );
}
