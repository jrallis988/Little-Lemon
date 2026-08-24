export default function SkillGroup({ title, items = [] }) {
  if (!items.length) return null;

  return (
    <article className="reveal border-t border-foam/35 pt-5">
      <h3 className="font-display text-xl font-bold text-foam-soft md:text-2xl">{title}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="border border-sand/20 px-3 py-1.5 text-sm text-sand/85"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
