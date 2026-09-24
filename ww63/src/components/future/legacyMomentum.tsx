export function WwMomentumMock() {
  const signals = [
    { label: "Movement", value: "↑" },
    { label: "Protein goal", value: "✓" },
    { label: "Sleep", value: "improving ↑" },
    { label: "Strength", value: "3/3 ✓" },
  ];

  return (
    <div className="rounded-[1.75rem] border border-ink/10 bg-ink p-5 text-white sm:p-6">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-tide">
        WW Momentum · Concept
      </p>
      <p className="mt-3 font-display text-2xl font-bold" style={{ fontWeight: 700 }}>
        Weight changed this week—your routine stayed consistent.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {signals.map((signal) => (
          <div key={signal.label} className="rounded-2xl bg-white/5 px-4 py-3">
            <p className="font-sans text-xs text-white/55">{signal.label}</p>
            <p className="mt-1 font-display text-lg font-bold text-tide" style={{ fontWeight: 700 }}>
              {signal.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
