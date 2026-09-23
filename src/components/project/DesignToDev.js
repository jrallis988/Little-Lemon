import ProjectVisual from "./ProjectVisual";

export default function DesignToDev({ copy, before, after }) {
  return (
    <div>
      {copy ? (
        <p className="text-base leading-relaxed text-sand/85 md:text-lg">{copy}</p>
      ) : null}
      {(before || after) && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {before ? (
            <figure>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-foam">
                Design / wireframe
              </p>
              <ProjectVisual
                label={before.label}
                src={before.src}
                tone={before.tone || "default"}
                className="min-h-[200px]"
              />
            </figure>
          ) : null}
          {after ? (
            <figure>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-foam">
                Built UI
              </p>
              <ProjectVisual
                label={after.label}
                src={after.src}
                tone={after.tone || "mediterranean"}
                className="min-h-[200px]"
              />
            </figure>
          ) : null}
        </div>
      )}
    </div>
  );
}
