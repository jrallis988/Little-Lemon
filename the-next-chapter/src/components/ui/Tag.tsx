interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "burgundy" | "forest" | "amber";
}

const variants = {
  default: "bg-cream-dark text-ink-muted border-line",
  burgundy: "bg-burgundy/10 text-burgundy border-burgundy/20",
  forest: "bg-forest/10 text-forest border-forest/20",
  amber: "bg-amber/15 text-rust border-amber/30",
};

export function Tag({ children, variant = "default" }: TagProps) {
  return (
    <span
      className={`inline-block border px-2.5 py-0.5 font-display text-[0.65rem] font-bold uppercase tracking-wider ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
