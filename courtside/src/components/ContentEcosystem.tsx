import { photos } from "../data/brand";
import "./ContentEcosystem.css";

const nodes = [
  { id: "full", label: "1 Full YouTube Video", size: "lg" },
  { id: "trailer", label: "1 Trailer", size: "md" },
  { id: "s1", label: "Short · 60s highlight", size: "sm" },
  { id: "s2", label: "Short · 30s quote", size: "sm" },
  { id: "s3", label: "Short · 15s hook", size: "sm" },
  { id: "th1", label: "Thumb A · Athlete", size: "sm" },
  { id: "th2", label: "Thumb B · Action", size: "sm" },
  { id: "th3", label: "Thumb C · Quote", size: "sm" },
  { id: "community", label: "1 Community Post", size: "md" },
  { id: "social", label: "Social clips", size: "md" },
];

/** Visual map: one athlete feature → multi-platform content. */
export function ContentEcosystem() {
  return (
    <div className="eco">
      <div className="eco__source">
        <img src={photos.athletePortrait} alt="" />
        <div>
          <span className="eco__eyebrow">SOURCE PRODUCTION</span>
          <strong>Marcus Reed · Athlete Feature</strong>
          <p>One shoot. Multiple packaged assets.</p>
        </div>
      </div>
      <div className="eco__arrow" aria-hidden="true">
        ↓
      </div>
      <ul className="eco__grid">
        {nodes.map((n) => (
          <li key={n.id} className={`eco__node eco__node--${n.size}`}>
            {n.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
