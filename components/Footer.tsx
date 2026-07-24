import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-14">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight">
            Morgan Bright
          </p>
          <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-paper/70">
            Instruction shaped around the learner—not the other way around.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <nav aria-label="Footer" className="flex gap-5 font-sans text-sm">
            <a href="#approach" className="text-paper/75 transition-colors hover:text-paper">
              Approach
            </a>
            <a href="#curriculum" className="text-paper/75 transition-colors hover:text-paper">
              Curriculum
            </a>
            <a href="#start" className="text-paper/75 transition-colors hover:text-paper">
              Start
            </a>
          </nav>
          <p className="font-sans text-xs text-paper/45">
            © {year}{" "}
            <Link href="/" className="hover:text-paper/70">
              Morgan Bright
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
