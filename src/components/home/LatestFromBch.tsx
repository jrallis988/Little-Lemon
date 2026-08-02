import Image from "next/image";
import Link from "next/link";
import { CircleLink } from "@/components/home/CircleLink";

const columns = [
  {
    heading: "News Stories",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    alt: "Children raising hands in a classroom",
    tag: "In the News",
    date: "July 27, 2026",
    title: "Watch: Tips to ease back-to-school stress for kids",
    source: "WCVB-TV",
    href: "/about",
    cta: "Visit the Newsroom",
  },
  {
    heading: "Latest Videos",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
    alt: "Clinical care team webinar visual",
    tag: "Programs & Services",
    date: null,
    title: "Cuatro preguntas para mejores visitas médicas",
    body: "Únase a la Dra. Eva Gómez y a la Especialista Certificada en Vida Infantil, Fiorella Downey, para un seminario web sobre cómo comunicarse con los proveedores de salud.",
    href: "/programs",
    cta: "See All Videos",
  },
  {
    heading: "Podcasts",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=900&q=80",
    alt: "Parent podcast episode artwork",
    tag: null,
    date: null,
    title: "My child is using AI a lot. Should I be worried?",
    meta: "Parentcast: Season 4, Episode 5 | 31 min",
    body: "Artificial intelligence is quickly becoming part of everyday life for children and teens. Many students now use AI tools like ChatGPT for homework, studying, writing, and answering questions.",
    href: "/patients-families",
    cta: "Check Out All Episodes",
  },
];

export function LatestFromBch() {
  return (
    <section className="bg-white py-s9" aria-labelledby="latest-heading">
      <div className="wrap">
        <h2
          id="latest-heading"
          className="mb-s7 text-2xl font-bold text-text sm:text-3xl"
        >
          Latest from Boston Children&apos;s
        </h2>

        <div className="grid grid-cols-1 gap-s7 lg:grid-cols-3">
          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col">
              <h3 className="mb-s4 text-lg font-bold text-text">{col.heading}</h3>
              <article className="flex flex-1 flex-col">
                <div className="relative mb-s4 aspect-[16/10] overflow-hidden rounded-md">
                  <Image
                    src={col.image}
                    alt={col.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                {col.tag ? (
                  <span className="mb-s2 inline-flex self-start rounded-full bg-surface-2 px-3 py-1 text-xs font-bold text-text">
                    {col.tag}
                  </span>
                ) : null}
                {col.date ? (
                  <p className="mb-s2 text-sm text-text-meta">{col.date}</p>
                ) : null}
                <Link
                  href={col.href}
                  className="mb-s2 text-lg font-bold leading-snug text-ocean no-underline hover:underline"
                >
                  {col.title}
                </Link>
                {"meta" in col && col.meta ? (
                  <p className="mb-s2 text-sm font-bold text-blue">{col.meta}</p>
                ) : null}
                {"body" in col && col.body ? (
                  <p className="mb-s3 text-sm font-light leading-relaxed text-text-body">
                    {col.body}
                  </p>
                ) : null}
                {"source" in col && col.source ? (
                  <p className="mb-s3 text-xs italic text-text-meta">
                    {col.source}
                  </p>
                ) : null}
                <div className="mt-auto pt-s3">
                  <CircleLink href={col.href}>{col.cta}</CircleLink>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
