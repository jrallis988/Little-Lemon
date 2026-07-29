use crate::state::UrlCheckResponse;
use url::Url;

const ALWAYS_BLOCKED: &[&str] = &[
    "tiktok.com",
    "instagram.com",
    "facebook.com",
    "x.com",
    "twitter.com",
    "reddit.com",
    "youtube.com",
    "youtu.be",
];

fn host_matches(host: &str, rule: &str) -> bool {
    let host = host.trim_start_matches("www.").to_lowercase();
    let rule = rule.trim_start_matches("www.").to_lowercase();
    host == rule || host.ends_with(&format!(".{rule}"))
}

/// Native URL interceptor used by the web layer via IPC.
#[tauri::command]
pub fn check_url(url: String, whitelist: Vec<String>) -> UrlCheckResponse {
    let parsed = match Url::parse(&url).or_else(|_| Url::parse(&format!("https://{url}"))) {
        Ok(value) => value,
        Err(_) => {
            return UrlCheckResponse {
                allowed: false,
                domain: url,
                reason: Some("That address could not be understood.".into()),
            };
        }
    };

    let domain = parsed
        .host_str()
        .unwrap_or_default()
        .trim_start_matches("www.")
        .to_string();

    if ALWAYS_BLOCKED
        .iter()
        .any(|blocked| host_matches(&domain, blocked))
    {
        return UrlCheckResponse {
            allowed: false,
            domain,
            reason: Some("This site isn’t part of Surf’s calm learning spaces.".into()),
        };
    }

    let allowed = whitelist
        .iter()
        .any(|entry| host_matches(&domain, entry));

    if !allowed {
        return UrlCheckResponse {
            allowed: false,
            domain,
            reason: Some(
                "Only parent-approved educational sites can open in Surf right now.".into(),
            ),
        };
    }

    UrlCheckResponse {
        allowed: true,
        domain,
        reason: None,
    }
}
