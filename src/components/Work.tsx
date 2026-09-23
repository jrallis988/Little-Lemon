import { scripts } from "@/data/scripts";

export default function Work() {
  const film = scripts.filter((script) => script.medium === "Film");
  const television = scripts.filter((script) => script.medium === "Television");

  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-border bg-background-elevated"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="mb-3 font-[family-name:var(--font-script)] text-sm text-accent">
            INT. PORTFOLIO — NIGHT
          </p>
          <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            Film & television.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Features, pilots, and series—with loglines. Full pages available for
            industry reads on request.
          </p>
        </div>

        <ScriptGroup title="Television" items={television} startIndex={1} />
        <ScriptGroup
          title="Film"
          items={film}
          startIndex={television.length + 1}
        />
      </div>
    </section>
  );
}

function ScriptGroup({
  title,
  items,
  startIndex,
}: {
  title: string;
  items: typeof scripts;
  startIndex: number;
}) {
  return (
    <div className="mb-14 last:mb-0 md:mb-16">
      <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-border pb-3">
        <h3 className="font-[family-name:var(--font-script)] text-sm tracking-[0.2em] text-accent uppercase">
          {title}
        </h3>
        <span className="text-xs tracking-[0.14em] text-muted uppercase">
          {items.length} {items.length === 1 ? "title" : "titles"}
        </span>
      </div>

      <ul className="divide-y divide-border border-y border-border">
        {items.map((script, index) => (
          <li key={script.id} id={script.id} className="scroll-mt-28">
            <article className="group grid gap-6 py-8 transition-colors md:grid-cols-12 md:gap-8 md:py-10">
              <div className="md:col-span-1">
                <span className="font-[family-name:var(--font-script)] text-sm text-muted">
                  {String(startIndex + index).padStart(2, "0")}
                </span>
              </div>

              <div className="md:col-span-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs tracking-[0.14em] text-muted uppercase">
                  <span className="text-accent">{script.medium}</span>
                  <span className="text-border">·</span>
                  <span>{script.format}</span>
                  <span className="text-border">·</span>
                  <span>{script.genre}</span>
                  <span className="text-border">·</span>
                  <span>{script.pages} pp</span>
                </div>
                <h3 className="mt-3 font-display text-3xl leading-none text-foreground transition-colors group-hover:text-accent md:text-[2rem]">
                  {script.title}
                </h3>
                <p className="mt-3 inline-flex border border-border px-2.5 py-1 text-[11px] tracking-[0.14em] text-accent uppercase">
                  {script.status}
                </p>
              </div>

              <div className="md:col-span-7 md:pt-1">
                <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
                  <span className="font-[family-name:var(--font-script)] text-sm text-muted">
                    LOGLINE —{" "}
                  </span>
                  {script.logline}
                </p>
                <a
                  href="#contact"
                  className="mt-5 inline-flex text-sm tracking-[0.14em] text-muted uppercase transition-colors hover:text-foreground"
                >
                  Request pages →
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
