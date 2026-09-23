import ProjectVisual from "./ProjectVisual";

export default function ProjectGallery({ items = [] }) {
  if (!items.length) return null;

  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.src || item.label}>
          <ProjectVisual
            label={item.label}
            src={item.src}
            tone={item.tone}
            className="min-h-[200px]"
          />
          {item.caption ? (
            <p className="mt-3 text-sm text-sand/70">{item.caption}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
