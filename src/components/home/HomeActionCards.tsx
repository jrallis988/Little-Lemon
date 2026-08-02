import Link from "next/link";

const cards = [
  {
    title: "Our Locations",
    href: "/locations",
    bg: "bg-ocean",
    icon: (
      <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
        <path d="M12 52V24l10-8h20l10 8v28" />
        <path d="M24 52V36h16v16" />
        <path d="M40 18c0-6 4-10 8-10s8 4 8 10-8 14-8 14-8-8-8-14z" />
        <circle cx="48" cy="18" r="2.5" fill="white" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Online Second Opinion",
    href: "/professionals/second-opinion",
    bg: "bg-blue",
    icon: (
      <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
        <circle cx="28" cy="22" r="10" />
        <path d="M12 52c2-12 10-18 16-18s14 6 16 18" />
        <circle cx="46" cy="40" r="10" />
        <path d="M46 35v10M41 40h10" />
      </svg>
    ),
  },
  {
    title: "Make a Donation",
    href: "#giving",
    bg: "bg-pink",
    icon: (
      <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
        <path d="M32 50s-18-10-18-24a10 10 0 0118-6 10 10 0 0118 6c0 14-18 24-18 24z" />
        <path d="M18 28c-6 2-10 8-10 14" />
        <path d="M46 28c6 2 10 8 10 14" />
      </svg>
    ),
  },
];

export function HomeActionCards() {
  return (
    <section className="bg-white py-s7" aria-label="Quick actions">
      <div className="wrap grid grid-cols-1 gap-s4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`flex min-h-[220px] flex-col items-center justify-center gap-s5 rounded-lg px-s5 py-s7 text-center no-underline transition-transform hover:-translate-y-0.5 ${card.bg}`}
          >
            {card.icon}
            <span className="inline-flex min-h-11 items-center rounded-md border-2 border-white px-s5 py-2 text-base font-bold text-white">
              {card.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
