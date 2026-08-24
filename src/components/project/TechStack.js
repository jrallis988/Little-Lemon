export default function TechStack({ items = [], className = "" }) {
  if (!items.length) return null;

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Technologies">
      {items.map((item) => (
        <li
          key={item}
          className="border border-sand/20 px-3 py-1.5 text-sm text-sand/85"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
