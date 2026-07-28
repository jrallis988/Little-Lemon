const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

type Address = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry?: string;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Serialize structured data safely for an application/ld+json script. */
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildPhysician({
  name,
  description,
  path,
  medicalSpecialty,
  telephone,
  hospitalName = "Boston Children's Hospital",
}: {
  name: string;
  description: string;
  path: string;
  medicalSpecialty: string;
  telephone?: string;
  hospitalName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name,
    description,
    url: absoluteUrl(path),
    medicalSpecialty,
    ...(telephone ? { telephone } : {}),
    hospitalAffiliation: {
      "@type": "Hospital",
      name: hospitalName,
      url: SITE_URL,
    },
  };
}

export function buildMedicalCondition({
  name,
  description,
  path,
  medicalSpecialty,
}: {
  name: string;
  description: string;
  path: string;
  medicalSpecialty?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name,
    description,
    url: absoluteUrl(path),
    ...(medicalSpecialty ? { relevantSpecialty: medicalSpecialty } : {}),
  };
}

export function buildHospital({
  name,
  description,
  path,
  telephone,
  address,
  medicalSpecialty,
  type = "Hospital",
}: {
  name: string;
  description: string;
  path: string;
  telephone?: string;
  address?: Address;
  medicalSpecialty?: string;
  type?: "Hospital" | "MedicalClinic";
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: absoluteUrl(path),
    ...(telephone ? { telephone } : {}),
    ...(medicalSpecialty ? { medicalSpecialty } : {}),
    ...(address
      ? {
          address: {
            "@type": "PostalAddress",
            ...address,
            addressCountry: address.addressCountry ?? "US",
          },
        }
      : {}),
  };
}

export function buildBreadcrumbList(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
