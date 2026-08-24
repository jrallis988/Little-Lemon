export default function ProcessStep({ steps = [] }) {
  if (!steps.length) return null;

  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {steps.map((step, index) => (
        <li key={step.id || step.label} className="reveal border-t border-foam/35 pt-4">
          <p className="text-sm uppercase tracking-[0.16em] text-sand/60">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="mt-2 font-display text-lg font-bold text-chalk md:text-xl">
            {step.label}
          </p>
        </li>
      ))}
    </ol>
  );
}
