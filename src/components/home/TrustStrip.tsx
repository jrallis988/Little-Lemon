const items = [
  { num: "#1", label: "Children's hospital\nin New England" },
  { num: "400+", label: "Specialties\nand programs" },
  { num: "$400M+", label: "Invested in research\neach year" },
];

export function TrustStrip() {
  return (
    <section className="border-t border-white/10 bg-blue" aria-label="Hospital facts">
      <div className="wrap">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.num}
              className={`px-s7 py-s6 text-center ${
                i < items.length - 1
                  ? "border-b border-white/10 sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <span className="mb-2 block text-[clamp(36px,5vw,58px)] font-black leading-none tracking-[-0.03em] text-white">
                {item.num}
              </span>
              <span className="whitespace-pre-line text-sm font-light leading-[1.5] text-white/50">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
