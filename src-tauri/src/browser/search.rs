//! Educational search backed by DuckDuckGo's HTML endpoint.
//!
//! Surf intentionally parses live search results instead of generating canned
//! entries. If DuckDuckGo's HTML result structure cannot be parsed, the command
//! returns an error so the UI can fail closed.

use regex::Regex;
use scraper::{ElementRef, Html, Selector};
use serde::Serialize;
use sha2::{Digest, Sha256};
use std::time::Duration;
use thiserror::Error;
use url::Url;

const DUCKDUCKGO_HTML: &str = "https://html.duckduckgo.com/html/";
const MAX_RESULTS: usize = 25;

#[derive(Debug, Clone, Serialize)]
pub struct EducationalSearchResult {
    pub id: String,
    pub title: String,
    pub url: String,
    pub domain: String,
    pub description: String,
    pub favicon_url: String,
    pub source: String,
    pub category: String,
    pub trust_score: u8,
    pub reading_level: String,
    pub estimated_minutes: u32,
}

#[derive(Debug, Error)]
pub enum SearchError {
    #[error("Please enter a search query.")]
    EmptyQuery,
    #[error("DuckDuckGo search request failed: {0}")]
    Request(#[from] reqwest::Error),
    #[error("DuckDuckGo returned HTTP {0}")]
    HttpStatus(reqwest::StatusCode),
    #[error("DuckDuckGo HTML selectors could not be prepared")]
    Selector,
    #[error("DuckDuckGo HTML results could not be parsed")]
    ParseFailed,
}

pub async fn educational_search(
    query: String,
    limit: Option<usize>,
) -> Result<Vec<EducationalSearchResult>, SearchError> {
    let query = query.trim();
    if query.is_empty() {
        return Err(SearchError::EmptyQuery);
    }

    let limit = limit.unwrap_or(10).clamp(1, MAX_RESULTS);
    let encoded_query: String = url::form_urlencoded::byte_serialize(query.as_bytes()).collect();
    let search_url = format!("{DUCKDUCKGO_HTML}?q={encoded_query}");

    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(10))
        .user_agent("SurfEducationalBrowser/0.1 (+https://surf.local)")
        .build()?;
    let response = client
        .get(search_url)
        .header(reqwest::header::ACCEPT, "text/html,application/xhtml+xml")
        .header(reqwest::header::ACCEPT_LANGUAGE, "en-US,en;q=0.9")
        .header(reqwest::header::ACCEPT_ENCODING, "identity")
        .send()
        .await?;

    if !response.status().is_success() {
        return Err(SearchError::HttpStatus(response.status()));
    }

    let html = response.text().await?;
    parse_duckduckgo_html(&html, limit)
}

fn parse_duckduckgo_html(
    html: &str,
    limit: usize,
) -> Result<Vec<EducationalSearchResult>, SearchError> {
    let document = Html::parse_document(html);
    let result_selector = selector(".result")?;
    let title_selector = selector(".result__a")?;
    let snippet_selector = selector(".result__snippet")?;
    let fallback_snippet_selector = selector(".result__body")?;

    let mut parsed_any = false;
    let mut results = Vec::new();

    for result in document.select(&result_selector) {
        let Some(title_link) = result.select(&title_selector).next() else {
            continue;
        };

        let Some(href) = title_link.value().attr("href") else {
            continue;
        };
        let Some(target_url) = normalize_result_url(href) else {
            continue;
        };
        let Some(domain) = target_url.host_str().map(normalize_domain) else {
            continue;
        };

        let title = collect_text(title_link);
        if title.is_empty() {
            continue;
        }

        let description = result
            .select(&snippet_selector)
            .next()
            .or_else(|| result.select(&fallback_snippet_selector).next())
            .map(collect_text)
            .unwrap_or_default();

        parsed_any = true;
        let trust_score = trust_score(&target_url, &domain, &title, &description);
        if trust_score < 45 {
            continue;
        }

        results.push(EducationalSearchResult {
            id: stable_result_id(target_url.as_str()),
            title,
            url: target_url.to_string(),
            domain: domain.clone(),
            description: description.clone(),
            favicon_url: format!("https://icons.duckduckgo.com/ip3/{domain}.ico"),
            source: "DuckDuckGo HTML".to_string(),
            category: category_for(&target_url, &domain),
            trust_score,
            reading_level: reading_level_for(&domain, &description),
            estimated_minutes: estimated_minutes(&description),
        });
    }

    if !parsed_any {
        return Err(SearchError::ParseFailed);
    }

    results.sort_by(|left, right| {
        right
            .trust_score
            .cmp(&left.trust_score)
            .then_with(|| left.title.cmp(&right.title))
    });
    results.truncate(limit);
    Ok(results)
}

fn selector(selector: &str) -> Result<Selector, SearchError> {
    Selector::parse(selector).map_err(|_| SearchError::Selector)
}

fn normalize_result_url(href: &str) -> Option<Url> {
    let base = Url::parse(DUCKDUCKGO_HTML).ok()?;
    let candidate = if href.starts_with("//") {
        Url::parse(&format!("https:{href}")).ok()?
    } else if href.starts_with('/') {
        base.join(href).ok()?
    } else {
        Url::parse(href).or_else(|_| base.join(href)).ok()?
    };

    if candidate
        .host_str()
        .is_some_and(|host| host.ends_with("duckduckgo.com"))
        && candidate.path().starts_with("/l/")
    {
        return candidate
            .query_pairs()
            .find(|(key, _)| key == "uddg")
            .and_then(|(_, value)| Url::parse(value.as_ref()).ok());
    }

    Some(candidate)
}

fn normalize_domain(host: &str) -> String {
    host.trim_start_matches("www.").to_lowercase()
}

fn collect_text(element: ElementRef<'_>) -> String {
    element
        .text()
        .map(str::trim)
        .filter(|part| !part.is_empty())
        .collect::<Vec<_>>()
        .join(" ")
        .split_whitespace()
        .collect::<Vec<_>>()
        .join(" ")
}

fn stable_result_id(url: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(url.as_bytes());
    hex::encode(hasher.finalize())[..16].to_string()
}

fn trust_score(url: &Url, domain: &str, title: &str, description: &str) -> u8 {
    let mut score = 35_i32;

    if domain.ends_with(".gov") {
        score += 35;
    }
    if domain.ends_with(".edu") {
        score += 32;
    }

    score += match_special_domain(domain);

    let path = url.path().to_lowercase();
    if path.contains("learn") || path.contains("education") || path.contains("kids") {
        score += 8;
    }

    let combined = format!("{title} {description}").to_lowercase();
    if combined.contains("lesson")
        || combined.contains("student")
        || combined.contains("classroom")
        || combined.contains("science")
        || combined.contains("history")
        || combined.contains("research")
    {
        score += 7;
    }

    score.clamp(0, 100) as u8
}

fn match_special_domain(domain: &str) -> i32 {
    let weighted_domains = [
        ("nasa.gov", 38),
        ("nih.gov", 38),
        ("ncbi.nlm.nih.gov", 40),
        ("pubmed.ncbi.nlm.nih.gov", 42),
        ("noaa.gov", 36),
        ("loc.gov", 35),
        ("archives.gov", 35),
        ("si.edu", 34),
        ("smithsonianmag.com", 30),
        ("nationalgeographic.com", 30),
        ("britannica.com", 30),
        ("khanacademy.org", 36),
        ("ck12.org", 34),
        ("openstax.org", 36),
        ("pbs.org", 28),
        ("pbskids.org", 32),
        ("ted.com", 26),
        ("ed.ted.com", 32),
        ("arxiv.org", 32),
        ("amnh.org", 30),
        ("exploratorium.edu", 38),
        ("duolingo.com", 24),
        ("wikiversity.org", 24),
        ("wikipedia.org", 20),
    ];

    weighted_domains
        .iter()
        .find_map(|(rule, score)| {
            if domain == *rule || domain.ends_with(&format!(".{rule}")) {
                Some(*score)
            } else {
                None
            }
        })
        .unwrap_or(0)
}

fn category_for(url: &Url, domain: &str) -> String {
    if domain.ends_with(".gov") {
        return "Government learning resource".to_string();
    }
    if domain.ends_with(".edu") {
        return "University or school resource".to_string();
    }
    if domain.contains("nasa")
        || domain.contains("noaa")
        || domain.contains("nationalgeographic")
        || domain.contains("amnh")
        || domain.contains("exploratorium")
    {
        return "Science and nature".to_string();
    }
    if domain.contains("nih") || domain.contains("pubmed") {
        return "Health and research".to_string();
    }
    if domain.contains("loc.gov")
        || domain.contains("archives.gov")
        || domain.contains("smithsonian")
    {
        return "History and culture".to_string();
    }
    if domain.contains("khanacademy") || domain.contains("ck12") || domain.contains("openstax") {
        return "Curriculum".to_string();
    }
    if domain.contains("ted.com") || url.path().contains("ted-ed") {
        return "Educational video".to_string();
    }

    "Educational reference".to_string()
}

fn reading_level_for(domain: &str, description: &str) -> String {
    if domain.contains("pbskids") || domain.contains("kids.nationalgeographic") {
        return "Elementary".to_string();
    }
    if domain.contains("pubmed") || domain.contains("arxiv") {
        return "Advanced".to_string();
    }

    let words = words(description);
    if words.is_empty() {
        return "General".to_string();
    }

    let total_chars: usize = words.iter().map(|word| word.len()).sum();
    let average = total_chars as f64 / words.len() as f64;
    if average >= 6.5 {
        "High school".to_string()
    } else if average >= 5.4 {
        "Middle school".to_string()
    } else {
        "Elementary".to_string()
    }
}

fn estimated_minutes(description: &str) -> u32 {
    let word_count = words(description).len().max(80);
    ((word_count as f64 / 200.0).ceil() as u32).max(1)
}

fn words(text: &str) -> Vec<String> {
    let re = Regex::new(r"[A-Za-z0-9']+").expect("static word regex compiles");
    re.find_iter(text)
        .map(|match_| match_.as_str().to_string())
        .collect()
}
