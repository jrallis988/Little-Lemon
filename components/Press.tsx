import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPressDate, pressItems } from "@/lib/press";

export function Press() {
  return (
    <section
      id="press"
      aria-labelledby="press-heading"
      className="scroll-mt-28 bg-snow"
    >
      <div className="mx-auto max-w-content section-pad">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="press-heading" className="section-title">
              In the news
            </h2>
            <p className="section-lead">
              Coverage from across New Hampshire as the campaign hits the trail.
            </p>
          </div>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {pressItems.map((item) => (
            <li key={item.id}>
              <article className="flex h-full flex-col border border-granite-200 bg-white p-6 transition-colors hover:border-pine-400">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-pine-700">
                  {item.outlet}
                </p>
                <p className="mt-1 text-sm text-granite-400">
                  {formatPressDate(item.date)}
                </p>
                <h3 className="mt-4 font-serif text-xl font-bold leading-snug text-granite-800">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-granite-500">
                  {item.excerpt}
                </p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-pine-700 underline-offset-2 hover:underline"
                >
                  Read more
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
