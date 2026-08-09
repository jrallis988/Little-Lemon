use regex::Regex;
use serde::Serialize;
use std::time::Duration;
use url::Url;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct FetchedArticle {
    pub url: String,
    pub title: String,
    pub source: String,
    pub content_html: String,
    pub estimated_minutes: u32,
    pub fetched_live: bool,
}

/// Fetch an allowlisted learning page and return calm reader HTML.
/// Strips scripts/styles/nav noise with lightweight HTML cleanup (no full browser).
#[tauri::command]
pub async fn fetch_article(url: String) -> Result<FetchedArticle, String> {
    let parsed = Url::parse(&url).or_else(|_| Url::parse(&format!("https://{url}")))
        .map_err(|_| "That address could not be understood.".to_string())?;
    let host = parsed
        .host_str()
        .unwrap_or_default()
        .trim_start_matches("www.")
        .to_string();

    if !is_fetch_allowed(&host) {
        return Err("Surf only fetches parent-approved educational domains in reader mode.".into());
    }

    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(12))
        .user_agent("SurfEducationalBrowser/0.1 (+https://surf.local)")
        .redirect(reqwest::redirect::Policy::limited(4))
        .build()
        .map_err(|err| err.to_string())?;

    let response = client
        .get(parsed.clone())
        .header(reqwest::header::ACCEPT, "text/html,application/xhtml+xml")
        .send()
        .await
        .map_err(|err| format!("Could not reach the page: {err}"))?;

    if !response.status().is_success() {
        return Err(format!("Page returned HTTP {}", response.status()));
    }

    let html = response.text().await.map_err(|err| err.to_string())?;
    let title = extract_title(&html).unwrap_or_else(|| host.clone());
    let body = extract_main_text(&html);
    if body.trim().is_empty() {
        return Err("No readable educational content was found on that page.".into());
    }

    let paragraphs = body
        .split("\n\n")
        .map(str::trim)
        .filter(|part| part.len() > 40)
        .take(18)
        .map(|part| format!("<p>{}</p>", escape_html(part)))
        .collect::<Vec<_>>()
        .join("");

    let content_html = format!(
        r#"<article class="surf-reader">
      <header>
        <p class="source">{source}</p>
        <h1>{title}</h1>
      </header>
      {paragraphs}
      <p class="calm-note">Fetched live through Surf reader mode. Scripts, ads, and side chrome were removed.</p>
    </article>"#,
        source = escape_html(&host),
        title = escape_html(&title),
        paragraphs = if paragraphs.is_empty() {
            format!("<p>{}</p>", escape_html(&body.chars().take(1200).collect::<String>()))
        } else {
            paragraphs
        }
    );

    let estimated_minutes = ((body.split_whitespace().count() as f32) / 160.0)
        .ceil()
        .clamp(2.0, 20.0) as u32;

    Ok(FetchedArticle {
        url: parsed.to_string(),
        title,
        source: host,
        content_html,
        estimated_minutes,
        fetched_live: true,
    })
}

fn is_fetch_allowed(host: &str) -> bool {
    const ALLOWED: &[&str] = &[
        "usgs.gov",
        "nasa.gov",
        "science.nasa.gov",
        "spaceplace.nasa.gov",
        "noaa.gov",
        "oceanservice.noaa.gov",
        "nationalgeographic.com",
        "kids.nationalgeographic.com",
        "education.nationalgeographic.org",
        "britannica.com",
        "kids.britannica.com",
        "si.edu",
        "amnh.org",
        "loc.gov",
        "ck12.org",
        "khanacademy.org",
        "openstax.org",
        "nature.com",
        "science.org",
        "openalex.org",
        "doi.org",
        "pbskids.org",
        "pbs.org",
    ];
    ALLOWED
        .iter()
        .any(|rule| host == *rule || host.ends_with(&format!(".{rule}")))
}

fn extract_title(html: &str) -> Option<String> {
    let re = Regex::new(r"(?is)<title[^>]*>(.*?)</title>").ok()?;
    let caps = re.captures(html)?;
    let raw = caps.get(1)?.as_str();
    let cleaned = strip_tags(raw);
    let trimmed = cleaned.trim();
    if trimmed.is_empty() {
        None
    } else {
        Some(trimmed.to_string())
    }
}

fn extract_main_text(html: &str) -> String {
    let mut text = html.to_string();
    for pattern in [
        r"(?is)<script[^>]*>.*?</script>",
        r"(?is)<style[^>]*>.*?</style>",
        r"(?is)<noscript[^>]*>.*?</noscript>",
        r"(?is)<nav[^>]*>.*?</nav>",
        r"(?is)<footer[^>]*>.*?</footer>",
        r"(?is)<header[^>]*>.*?</header>",
        r"(?is)<!--.*?-->",
    ] {
        if let Ok(re) = Regex::new(pattern) {
            text = re.replace_all(&text, " ").to_string();
        }
    }

    // Prefer <article> or <main> blocks when present.
    if let Ok(re) = Regex::new(r"(?is)<article[^>]*>(.*?)</article>") {
        if let Some(caps) = re.captures(&text) {
            text = caps.get(1).map(|m| m.as_str().to_string()).unwrap_or(text);
        } else if let Ok(main_re) = Regex::new(r"(?is)<main[^>]*>(.*?)</main>") {
            if let Some(caps) = main_re.captures(&text) {
                text = caps.get(1).map(|m| m.as_str().to_string()).unwrap_or(text);
            }
        }
    }

    text = Regex::new(r"(?i)<br\s*/?>")
        .unwrap()
        .replace_all(&text, "\n")
        .to_string();
    text = Regex::new(r"(?i)</p\s*>")
        .unwrap()
        .replace_all(&text, "\n\n")
        .to_string();
    text = strip_tags(&text);
    text = Regex::new(r"[ \t]+")
        .unwrap()
        .replace_all(&text, " ")
        .to_string();
    text = Regex::new(r"\n{3,}")
        .unwrap()
        .replace_all(&text, "\n\n")
        .to_string();
    text.trim().to_string()
}

fn strip_tags(value: &str) -> String {
    Regex::new(r"(?is)<[^>]+>")
        .unwrap()
        .replace_all(value, " ")
        .replace("&nbsp;", " ")
        .replace("&amp;", "&")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
        .replace("&quot;", "\"")
        .replace("&#39;", "'")
}

fn escape_html(value: &str) -> String {
    value
        .replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
        .replace('\'', "&#39;")
}
