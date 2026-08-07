import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getClubById, getClubBySlug, getClubs } from "@/lib/clubs";
import { formatCurrency, getLocalPricing } from "@/lib/pricing";
import { formatHours } from "@/lib/hours";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getClubs().map((club) => ({ slug: club.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const club = getClubBySlug(slug);
  if (!club) return { title: "Club not found" };
  return {
    title: `${club.name} | Gym in ${club.city}, ${club.state}`,
    description: `Hours, amenities, and membership rates for ${club.name} at ${club.address}, ${club.city}, ${club.state}.`,
    openGraph: {
      title: club.name,
      description: `Join ${club.name}. Classic from ${formatCurrency(club.pricing.classic.monthlyDues)}/mo.`,
      images: [club.image],
    },
  };
}

export default async function ClubPage({ params }: PageProps) {
  const { slug } = await params;
  const club = getClubBySlug(slug) ?? getClubById(slug);
  if (!club) notFound();

  const classic = getLocalPricing(club, "classic");
  const black = getLocalPricing(club, "black-card");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: club.name,
    image: club.image,
    telephone: club.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: club.address,
      addressLocality: club.city,
      addressRegion: club.state,
      postalCode: club.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: club.latitude,
      longitude: club.longitude,
    },
  };

  return (
    <div className="bg-white text-pf-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative h-56 md:h-72">
        <Image
          src={club.image}
          alt={`Interior of ${club.name}`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pf-purple-ink via-pf-purple/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-5 md:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-pf-yellow">
            Club details
          </p>
          <h1 className="font-display text-3xl tracking-tight text-white md:text-5xl">
            {club.name}
          </h1>
          <p className="mt-1 text-sm text-white/80">{club.todayLabel}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-6">
        <div className="space-y-6">
          <div>
            <p className="flex items-start gap-2 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 text-pf-purple" aria-hidden />
              <span>
                {club.address}
                <br />
                {club.city}, {club.state} {club.zip}
              </span>
            </p>
            <a
              href={`tel:${club.phone.replace(/[^\d+]/g, "")}`}
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-pf-purple"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {club.phone}
            </a>
            <Badge className="ml-3" variant={club.openNow ? "success" : "muted"}>
              {club.openNow ? "Open now" : "Closed"}
            </Badge>
          </div>

          <div>
            <h2 className="font-display text-2xl">Hours</h2>
            <ul className="mt-2 space-y-1 text-sm">
              {club.hours.map((slot) => (
                <li key={slot.day} className="flex justify-between gap-4">
                  <span>{slot.day}</span>
                  <span className="text-pf-ink/60">{formatHours(slot)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl">On the floor</h2>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {club.amenities.map((amenity) => (
                <li
                  key={amenity}
                  className="rounded-full bg-pf-mist px-2.5 py-1 text-xs font-medium text-pf-ink"
                >
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="h-fit rounded-3xl border border-pf-line bg-pf-mist/50 p-5">
          <h2 className="font-display text-2xl">Memberships</h2>
          <p className="mt-1 text-sm text-pf-ink/65">
            Local rates for this club.
          </p>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="rounded-2xl bg-white p-3">
              <dt className="font-semibold">Classic</dt>
              <dd className="mt-1 text-pf-purple">
                {formatCurrency(classic.monthlyDues)}/mo* · enroll{" "}
                {formatCurrency(classic.enrollmentFee)}
              </dd>
            </div>
            <div className="rounded-2xl pf-grad-black-card p-3 text-white">
              <dt className="font-semibold">PF Black Card®</dt>
              <dd className="mt-1 text-pf-yellow">
                {black.available
                  ? `${formatCurrency(black.monthlyDues)}/mo* · enroll ${formatCurrency(black.enrollmentFee)}`
                  : "Not offered here"}
              </dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-col gap-2">
            <Button asChild variant="purple">
              <Link
                href={`/join?club=${club.id}&plan=${
                  black.available ? "black-card" : "classic"
                }`}
              >
                Join Now
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/#pricing">Compare Memberships</Link>
            </Button>
            <Button asChild variant="outline">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  `${club.address}, ${club.city}, ${club.state} ${club.zip}`
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Directions
              </a>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
