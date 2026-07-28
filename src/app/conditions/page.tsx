import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { contentApi } from "@/lib/content";

export const metadata: Metadata = {
  title: "Conditions A–Z",
  description:
    "Browse conditions and treatments at Boston Children's Hospital.",
};

export default function ConditionsIndexPage() {
  const grouped = contentApi.groupByLetter(contentApi.conditions);

  return (
    <>
      <PageHero
        id="conditions-az"
        eyebrow="Conditions & treatments"
        title="Conditions A–Z"
        lead="Learn about pediatric conditions, when to seek care, and how Boston Children's approaches diagnosis and treatment."
        actions={
          <>
            <Button href="/appointments/request" variant="ocean">
              Request an Appointment
            </Button>
            <Button href="/find-a-doctor" variant="ghost-white">
              Find a Doctor
            </Button>
          </>
        }
      />

      <div className="wrap py-s7 pb-s10">
        <div className="mb-s6 flex flex-wrap gap-2">
          {Array.from(grouped.keys()).map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-white text-sm font-bold text-blue no-underline hover:border-ocean"
            >
              {letter}
            </a>
          ))}
        </div>

        {Array.from(grouped.entries()).map(([letter, items]) => (
          <section
            key={letter}
            id={`letter-${letter}`}
            className="mb-s8 scroll-mt-[120px]"
            aria-labelledby={`heading-${letter}`}
          >
            <h2
              id={`heading-${letter}`}
              className="mb-s4 border-b border-border pb-s2 text-2xl font-bold text-ocean"
            >
              {letter}
            </h2>
            <ul className="grid grid-cols-1 gap-s3 md:grid-cols-2">
              {items.map((cond) => (
                <li key={cond.slug}>
                  <Link
                    href={`/conditions/${cond.slug}`}
                    className="block rounded-md border border-border bg-white p-s4 no-underline transition-all hover:border-border-strong hover:shadow-sm"
                  >
                    <span className="eyebrow">{cond.specialty}</span>
                    <span className="mt-1 block text-lg font-bold text-text">
                      {cond.name}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm font-light text-text-body">
                      {cond.lead}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
