//! Shared URL safety policy for Surf's native browser surface.
//!
//! Commands and Tauri webview navigation hooks both call this module so a URL
//! cannot pass through a weaker path after being blocked elsewhere.

use crate::state::UrlCheckResponse;
use url::Url;

const ALWAYS_BLOCKED: &[&str] = &[
    "tiktok.com",
    "instagram.com",
    "facebook.com",
    "x.com",
    "twitter.com",
    "reddit.com",
    "snapchat.com",
    "discord.com",
    "twitch.tv",
];
// Note: YouTube is not hard-blocked so parents can whitelist educational video hosts.
// Without an allowlist entry / .edu/.gov match, YouTube remains blocked by default policy.

const DEFAULT_EXACT_ALLOW: &[&str] = &[
    "nasa.gov",
    "spaceplace.nasa.gov",
    "climate.nasa.gov",
    "nih.gov",
    "medlineplus.gov",
    "noaa.gov",
    "weather.gov",
    "loc.gov",
    "archives.gov",
    "si.edu",
    "smithsonianmag.com",
    "nationalgeographic.com",
    "britannica.com",
    "khanacademy.org",
    "ck12.org",
    "openstax.org",
    "pbs.org",
    "pbskids.org",
    "ted.com",
    "ed.ted.com",
    "pubmed.ncbi.nlm.nih.gov",
    "arxiv.org",
    "kids.nationalgeographic.com",
    "howstuffworks.com",
    "sciencenews.org",
    "sciencehistory.org",
    "amnh.org",
    "exploratorium.edu",
    "duolingo.com",
    "wikiversity.org",
    "wikipedia.org",
];

const DEFAULT_TLD_ALLOW: &[&str] = &["edu", "gov"];

#[derive(Debug, Clone)]
pub struct FilterDecision {
    pub allowed: bool,
    pub normalized_url: Option<Url>,
    pub domain: String,
    pub reason: Option<String>,
}

impl FilterDecision {
    pub fn into_response(self) -> UrlCheckResponse {
        UrlCheckResponse {
            allowed: self.allowed,
            domain: self.domain,
            reason: self.reason,
        }
    }
}

pub fn normalize_url(raw_url: &str) -> Result<Url, String> {
    let trimmed = raw_url.trim();
    if trimmed.is_empty() {
        return Err("Please enter a website address.".to_string());
    }

    Url::parse(trimmed)
        .or_else(|_| Url::parse(&format!("https://{trimmed}")))
        .map_err(|_| "That address could not be understood.".to_string())
}

pub fn evaluate_url(raw_url: &str, parent_allowlist: &[String]) -> FilterDecision {
    let parsed = match normalize_url(raw_url) {
        Ok(value) => value,
        Err(reason) => {
            return FilterDecision {
                allowed: false,
                normalized_url: None,
                domain: raw_url.to_string(),
                reason: Some(reason),
            };
        }
    };

    evaluate_parsed_url(parsed, parent_allowlist)
}

pub fn evaluate_parsed_url(parsed: Url, parent_allowlist: &[String]) -> FilterDecision {
    if parsed.scheme() == "about" && parsed.as_str() == "about:blank" {
        return FilterDecision {
            allowed: true,
            normalized_url: Some(parsed),
            domain: "about:blank".to_string(),
            reason: None,
        };
    }

    if !matches!(parsed.scheme(), "http" | "https") {
        return FilterDecision {
            allowed: false,
            normalized_url: Some(parsed),
            domain: String::new(),
            reason: Some("Surf can only open secure learning websites.".to_string()),
        };
    }

    let domain = parsed
        .host_str()
        .unwrap_or_default()
        .trim_start_matches("www.")
        .to_lowercase();

    if domain.is_empty() {
        return FilterDecision {
            allowed: false,
            normalized_url: Some(parsed),
            domain,
            reason: Some("That address does not include a website domain.".to_string()),
        };
    }

    if ALWAYS_BLOCKED
        .iter()
        .any(|blocked| host_matches(&domain, blocked))
    {
        return FilterDecision {
            allowed: false,
            normalized_url: Some(parsed),
            domain,
            reason: Some("This site is not part of Surf's calm learning spaces.".to_string()),
        };
    }

    let allowed = is_default_allowed(&domain)
        || parent_allowlist
            .iter()
            .any(|entry| host_matches(&domain, entry));

    if !allowed {
        return FilterDecision {
            allowed: false,
            normalized_url: Some(parsed),
            domain,
            reason: Some(
                "Only parent-approved educational sites can open in Surf right now.".to_string(),
            ),
        };
    }

    FilterDecision {
        allowed: true,
        normalized_url: Some(parsed),
        domain,
        reason: None,
    }
}

pub fn host_matches(host: &str, rule: &str) -> bool {
    let host = host.trim_start_matches("www.").to_lowercase();
    let rule = rule.trim_start_matches("www.").to_lowercase();
    host == rule || host.ends_with(&format!(".{rule}"))
}

fn is_default_allowed(domain: &str) -> bool {
    DEFAULT_TLD_ALLOW
        .iter()
        .any(|tld| domain.ends_with(&format!(".{tld}")))
        || DEFAULT_EXACT_ALLOW
            .iter()
            .any(|entry| host_matches(domain, entry))
}
