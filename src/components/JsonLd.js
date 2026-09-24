import { useEffect } from "react";
import { campuses } from "../data/campuses";

const ORG_ID = "https://www.wmcc.edu/#organization";

function injectScript(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeScript(id) {
  document.getElementById(id)?.remove();
}

/**
 * Sitewide CollegeOrUniversity structured data.
 */
export function OrganizationJsonLd() {
  useEffect(() => {
    const berlin = campuses.find((c) => c.id === "Berlin");
    injectScript("wmcc-jsonld-org", {
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      "@id": ORG_ID,
      name: "White Mountains Community College",
      alternateName: "WMCC",
      url: "https://www.wmcc.edu/",
      logo: `${window.location.origin}/logo512.png`,
      telephone: berlin?.phone || "(603) 752-1113",
      email: "wmcc@ccsnh.edu",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2020 Riverside Drive",
        addressLocality: "Berlin",
        addressRegion: "NH",
        postalCode: "03570",
        addressCountry: "US",
      },
      department: campuses.map((campus) => ({
        "@type": "EducationalOrganization",
        name: campus.name,
        telephone: campus.phone,
        description: campus.role,
      })),
      sameAs: [
        "https://www.wmcc.edu/",
        "https://catalog.wmcc.edu/",
        "https://www.facebook.com/WhiteMountainsCC",
      ],
    });
  }, []);

  return null;
}

/**
 * Program / Course structured data for detail pages.
 */
export function ProgramJsonLd({ program }) {
  useEffect(() => {
    if (!program) {
      removeScript("wmcc-jsonld-program");
      return undefined;
    }

    injectScript("wmcc-jsonld-program", {
      "@context": "https://schema.org",
      "@type": "Course",
      name: program.title,
      description: program.summary,
      provider: {
        "@type": "CollegeOrUniversity",
        "@id": ORG_ID,
        name: "White Mountains Community College",
      },
      educationalCredentialAwarded: program.credential,
      url: `${window.location.origin}/academics/programs/${program.id}`,
      offers: {
        "@type": "Offer",
        category: program.kind,
        url: program.url,
      },
    });

    return () => removeScript("wmcc-jsonld-program");
  }, [program]);

  return null;
}

export default OrganizationJsonLd;
