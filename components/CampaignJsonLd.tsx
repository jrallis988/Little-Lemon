import { candidate, publicSocials, hasFecCommitteeId } from "@/lib/candidate";
import { getSiteUrl } from "@/lib/site";

/** Campaign Organization + Person JSON-LD for search engines. */
export function CampaignJsonLd() {
  const base = getSiteUrl();
  const sameAs = publicSocials().map((s) => s.href);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: candidate.committee,
        alternateName: candidate.brandName,
        url: base,
        email: candidate.email,
        ...(candidate.phone ? { telephone: candidate.phone } : {}),
        ...(candidate.mailAddress
          ? { address: { "@type": "PostalAddress", streetAddress: candidate.mailAddress } }
          : {}),
        ...(sameAs.length ? { sameAs } : {}),
        ...(hasFecCommitteeId()
          ? {
              identifier: {
                "@type": "PropertyValue",
                name: "FEC Committee ID",
                value: candidate.fecCommitteeId,
              },
            }
          : {}),
        slogan: candidate.tagline,
        areaServed: {
          "@type": "State",
          name: "New Hampshire",
        },
      },
      {
        "@type": "Person",
        "@id": `${base}/#candidate`,
        name: candidate.fullName,
        jobTitle: `Candidate for ${candidate.office}`,
        homeLocation: {
          "@type": "Place",
          name: `${candidate.hometown}, ${candidate.state}`,
        },
        affiliation: { "@id": `${base}/#organization` },
        url: `${base}/meet-nick`,
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: candidate.brandName,
        description: candidate.positioningLong,
        publisher: { "@id": `${base}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
