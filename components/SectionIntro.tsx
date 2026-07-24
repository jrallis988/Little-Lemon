import type { ReactNode } from "react";

type Tone = "light" | "dark";

export function SectionIntro({
  overline,
  title,
  lead,
  tone = "light",
  titleId,
}: {
  overline: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: Tone;
  titleId?: string;
}) {
  return (
    <div>
      <span className="accent-line" aria-hidden />
      <p className="section-overline">{overline}</p>
      <h2
        id={titleId}
        className={tone === "dark" ? "section-headline-light" : "section-headline"}
      >
        {title}
      </h2>
      {lead && (
        <div className={tone === "dark" ? "section-lead-light" : "section-lead"}>
          {lead}
        </div>
      )}
    </div>
  );
}
