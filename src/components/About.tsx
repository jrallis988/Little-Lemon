import { writer } from "@/data/scripts";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 md:grid-cols-12 md:gap-10 md:px-8 md:py-28">
        <div className="md:col-span-5">
          <p className="mb-3 font-[family-name:var(--font-script)] text-sm text-accent">
            ABOUT THE WRITER
          </p>
          <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            A screenwriter built for the page—and the East Coast.
          </h2>
        </div>

        <div className="md:col-span-7 md:pt-8">
          {writer.bio.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-5 text-lg leading-relaxed text-foreground/90 first:mt-0 md:text-xl"
            >
              {paragraph}
            </p>
          ))}

          <div className="script-page mt-12 border border-border p-6 md:p-8">
            <p className="font-[family-name:var(--font-script)] text-sm text-muted">
              THEMES
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {writer.themes.map((theme) => (
                <li
                  key={theme}
                  className="border-l border-accent/50 pl-4 text-base text-foreground"
                >
                  {theme}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
