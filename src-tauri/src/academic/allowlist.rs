//! Curated educational domain allowlist with legitimacy scoring.
//! Content farms and ad-driven SEO domains score near zero and are filtered out.

#[derive(Debug, Clone, Copy)]
pub struct TrustedDomain {
    pub host: &'static str,
    /// 0–100 legitimacy prior for this repository class.
    pub score: u8,
    pub label: &'static str,
}

/// Trusted educational / scientific repositories (USGS, Nat Geo, journals, museums…).
pub const TRUSTED_DOMAINS: &[TrustedDomain] = &[
    TrustedDomain {
        host: "usgs.gov",
        score: 98,
        label: "USGS",
    },
    TrustedDomain {
        host: "pubs.usgs.gov",
        score: 98,
        label: "USGS Publications",
    },
    TrustedDomain {
        host: "earthquake.usgs.gov",
        score: 98,
        label: "USGS Earthquake Hazards",
    },
    TrustedDomain {
        host: "nationalgeographic.com",
        score: 92,
        label: "National Geographic",
    },
    TrustedDomain {
        host: "kids.nationalgeographic.com",
        score: 90,
        label: "Nat Geo Kids",
    },
    TrustedDomain {
        host: "education.nationalgeographic.org",
        score: 94,
        label: "Nat Geo Education",
    },
    TrustedDomain {
        host: "nasa.gov",
        score: 97,
        label: "NASA",
    },
    TrustedDomain {
        host: "science.nasa.gov",
        score: 97,
        label: "NASA Science",
    },
    TrustedDomain {
        host: "spaceplace.nasa.gov",
        score: 93,
        label: "NASA Space Place",
    },
    TrustedDomain {
        host: "britannica.com",
        score: 91,
        label: "Encyclopædia Britannica",
    },
    TrustedDomain {
        host: "kids.britannica.com",
        score: 88,
        label: "Britannica Kids",
    },
    TrustedDomain {
        host: "si.edu",
        score: 95,
        label: "Smithsonian",
    },
    TrustedDomain {
        host: "amnh.org",
        score: 94,
        label: "American Museum of Natural History",
    },
    TrustedDomain {
        host: "loc.gov",
        score: 96,
        label: "Library of Congress",
    },
    TrustedDomain {
        host: "edu",
        score: 80,
        label: "Accredited .edu",
    },
    TrustedDomain {
        host: "nature.com",
        score: 99,
        label: "Nature",
    },
    TrustedDomain {
        host: "science.org",
        score: 99,
        label: "Science / AAAS",
    },
    TrustedDomain {
        host: "plos.org",
        score: 97,
        label: "PLOS",
    },
    TrustedDomain {
        host: "nih.gov",
        score: 98,
        label: "NIH",
    },
    TrustedDomain {
        host: "noaa.gov",
        score: 97,
        label: "NOAA",
    },
    TrustedDomain {
        host: "oceanservice.noaa.gov",
        score: 96,
        label: "NOAA Ocean Service",
    },
    TrustedDomain {
        host: "pbskids.org",
        score: 86,
        label: "PBS Kids",
    },
    TrustedDomain {
        host: "pbs.org",
        score: 90,
        label: "PBS Learning",
    },
    TrustedDomain {
        host: "khanacademy.org",
        score: 89,
        label: "Khan Academy",
    },
    TrustedDomain {
        host: "ck12.org",
        score: 87,
        label: "CK-12",
    },
    TrustedDomain {
        host: "openstax.org",
        score: 93,
        label: "OpenStax",
    },
    TrustedDomain {
        host: "edu.nationalgeographic.com",
        score: 93,
        label: "Nat Geo Edu",
    },
];

/// Known low-quality / content-farm patterns rejected by the legitimacy layer.
const CONTENT_FARM_MARKERS: &[&str] = &[
    "buzzfeed",
    "clickbait",
    "listicle",
    "viralnova",
    "content-farm",
    "essay mill",
    "homework-help-cheap",
    "softonic",
    "wikihow-spam",
];

const MIN_PASSING_SCORE: u8 = 55;

pub fn normalize_host(host: &str) -> String {
    host.trim()
        .trim_start_matches("www.")
        .to_ascii_lowercase()
}

pub fn is_content_farm(host: &str) -> bool {
    let host = normalize_host(host);
    CONTENT_FARM_MARKERS
        .iter()
        .any(|marker| host.contains(marker))
}

/// Cross-reference a domain against the curated educational allowlist.
/// Returns (legitimacy_score, matched_label). Farms and unknown spam score 0.
pub fn score_domain(host: &str) -> (u8, Option<&'static str>) {
    let host = normalize_host(host);
    if host.is_empty() || is_content_farm(&host) {
        return (0, None);
    }

    let mut best: Option<&TrustedDomain> = None;
    for entry in TRUSTED_DOMAINS {
        if host == entry.host || host.ends_with(&format!(".{}", entry.host)) {
            match best {
                Some(current) if current.host.len() >= entry.host.len() => {}
                _ => best = Some(entry),
            }
        }
    }

    match best {
        Some(entry) => (entry.score, Some(entry.label)),
        None => (0, None),
    }
}

/// Combine source base legitimacy with domain allowlist score.
pub fn combine_legitimacy(base: u8, domain_score: u8) -> u8 {
    if domain_score == 0 {
        return 0;
    }
    // Weight domain trust more heavily than publisher self-report.
    let blended = (u16::from(domain_score) * 7 + u16::from(base) * 3) / 10;
    blended.min(100) as u8
}

pub fn passes_legitimacy(score: u8) -> bool {
    score >= MIN_PASSING_SCORE
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn usgs_scores_high() {
        let (score, label) = score_domain("earthquake.usgs.gov");
        assert!(score >= 95);
        assert!(label.is_some());
    }

    #[test]
    fn farms_score_zero() {
        assert_eq!(score_domain("viralnova-clickbait.com").0, 0);
    }
}
