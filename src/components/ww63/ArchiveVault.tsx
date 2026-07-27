import { useState } from "react";
import { archiveItems } from "../../data/ww63";

export function ArchiveVault() {
  const [activeId, setActiveId] = useState(archiveItems[0].id);
  const active = archiveItems.find((item) => item.id === activeId) ?? archiveItems[0];

  return (
    <section
      id="archive"
      className="relative overflow-hidden bg-mist/60 py-20 sm:py-28"
      aria-labelledby="archive-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(11,18,32,0.06) 0.8px, transparent 0.8px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden="true"
      />

      <div className="section-shell relative">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
            Archive vault
          </p>
          <h2
            id="archive-heading"
            className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
            style={{ fontWeight: 700 }}
          >
            Artifacts from the long arc.
          </h2>
          <p className="mt-4 font-serif text-lg leading-relaxed text-ink/65 sm:text-xl">
            Cookbook covers, meeting energy, and the digital shift—material memory for a
            behavioral institution.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[1.75rem] bg-ink">
            <img
              src={active.image}
              alt={active.alt}
              className="h-72 w-full object-cover opacity-90 sm:h-[28rem]"
            />
            <div className="border-t border-white/10 p-6 text-white sm:p-8">
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-tide">
                {active.kind} · {active.year}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl" style={{ fontWeight: 700 }}>
                {active.title}
              </h3>
              <p className="mt-3 max-w-xl font-serif text-base leading-relaxed text-white/70 sm:text-lg">
                {active.description}
              </p>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {archiveItems.map((item) => {
              const selected = item.id === activeId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    className={`flex w-full gap-3 rounded-2xl border p-3 text-left transition ${
                      selected
                        ? "border-cobalt-300 bg-white shadow-glow"
                        : "border-ink/8 bg-white/70 hover:border-cobalt-200"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="h-16 w-16 shrink-0 rounded-xl object-cover"
                    />
                    <span>
                      <span className="block font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink/40">
                        {item.year}
                      </span>
                      <span className="mt-1 block font-display text-base font-bold text-ink" style={{ fontWeight: 700 }}>
                        {item.title}
                      </span>
                      <span className="mt-1 block font-sans text-xs text-ink/55">{item.kind}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
