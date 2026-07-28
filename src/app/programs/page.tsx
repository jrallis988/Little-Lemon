import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { contentApi } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programs & Services",
  description:
    "Browse specialized clinical programs at Boston Children's Hospital.",
};

export default function ProgramsIndexPage() {
  const grouped = contentApi.groupByLetter(contentApi.programs);

  return (
    <>
      <PageHero
        id="programs-az"
        eyebrow="Programs & services"
        title="Clinical programs"
        lead="Each program brings together specialists, researchers, and support services for complex pediatric care."
        actions={
          <Button href="/appointments/request" variant="ocean">
            Request an Appointment
          </Button>
        }
      />

      <div className="wrap py-s7 pb-s10">
        <div className="mb-s7 grid grid-cols-1 gap-s4 md:grid-cols-2 lg:grid-cols-4">
          {contentApi.departments.map((dept) => (
            <div
              key={dept.slug}
              className="rounded-md border border-border bg-surface p-s4"
            >
              <h2 className="mb-s2 text-base font-bold text-blue">{dept.name}</h2>
              <p className="mb-s3 text-sm font-light text-text-body">
                {dept.summary}
              </p>
              <ul className="flex flex-col gap-1">
                {dept.programSlugs.map((slug) => {
                  const prog = contentApi.getProgram(slug);
                  if (!prog) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/programs/${slug}`}
                        className="text-sm font-semibold text-ocean no-underline hover:text-blue"
                      >
                        {prog.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

          {Array.from(grouped.entries()).map(([letter, items]) => (
          <section key={letter} className="mb-s7" aria-label={`Programs ${letter}`}>
            <h2 className="mb-s4 border-b border-border pb-s2 text-xl font-bold text-ocean">
              {letter}
            </h2>
            <div className="grid grid-cols-1 gap-s4 md:grid-cols-2">
              {items.map((prog) => (
                <Link
                  key={prog.slug}
                  href={`/programs/${prog.slug}`}
                  className="block overflow-hidden rounded-md border border-border bg-white no-underline transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className={`relative h-[120px] overflow-hidden ${prog.photoClass}`}>
                    {prog.imageUrl ? (
                      <Image
                        src={prog.imageUrl}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="p-s4">
                    <span className="eyebrow">{prog.specialty}</span>
                    <span className="mt-1 block text-lg font-bold text-text">
                      {prog.name}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm font-light text-text-body">
                      {prog.description}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
