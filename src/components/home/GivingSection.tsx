import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    title: "Help children year-round",
    body: "As a monthly partner, you are always there for patients and families. Your gift supports kids with chronic illnesses who need ongoing care.",
    cta: "Give monthly",
    href: "/about/community",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
    alt: "Hands holding a phone with a donate screen",
  },
  {
    title: "Fundraise your way",
    body: "Create an online fundraising page or turn your favorite activity into a fundraising event.",
    cta: "Fundraise your way",
    href: "/about/community",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=900&q=80",
    alt: "Hands holding fundraise cards under a blue sky",
  },
  {
    title: "Walk to save kids' lives",
    body: "The path to healthy futures starts with you. Register now for the Eversource Walk for Boston Children’s Hospital on June 14.",
    cta: "Join us",
    href: "/about/community",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    alt: "Community walk participants outdoors",
  },
];

export function GivingSection() {
  return (
    <section
      id="giving"
      className="bg-surface py-s9"
      aria-labelledby="giving-heading"
    >
      <div className="wrap">
        <h2
          id="giving-heading"
          className="mb-s7 text-center text-2xl font-bold text-blue sm:text-3xl"
        >
          Giving at Boston Children&apos;s
        </h2>
        <div className="grid grid-cols-1 gap-s5 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-lg border border-border bg-white text-center shadow-sm"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-s3 px-s5 py-s5">
                <h3 className="text-lg font-bold text-blue">{card.title}</h3>
                <p className="text-sm font-light leading-relaxed text-blue/90">
                  {card.body}
                </p>
                <div className="pt-s2">
                  <Link
                    href={card.href}
                    className="inline-flex min-h-11 items-center justify-center rounded-sm bg-blue px-s5 text-sm font-bold text-white no-underline hover:bg-nav-dark"
                  >
                    {card.cta}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
