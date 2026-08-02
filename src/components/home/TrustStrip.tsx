const items = [
  { num: "1869", label: "Year founded" },
  { num: "150+", label: "Years advancing\npediatric care" },
  { num: "4", label: "Mission pillars:\ncare, research,\neducation, community" },
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
              <span className="whitespace-pre-line text-sm font-light leading-[1.5] text-white/85">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
