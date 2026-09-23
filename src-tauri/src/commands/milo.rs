use serde::{Deserialize, Serialize};
use std::env;
use std::time::Duration;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MiloAskRequest {
    pub prompt: String,
    pub system: String,
    pub history: Vec<MiloChatMessage>,
    pub provider: Option<String>,
    pub model: Option<String>,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct MiloChatMessage {
    pub role: String,
    pub content: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MiloAskResponse {
    pub reply: String,
    pub live: bool,
    pub provider: String,
}

/// Ask Milo via the Rust backend so API keys never ship in the web bundle.
/// Reads SURF_AI_API_KEY (or ANTHROPIC_API_KEY / OPENAI_API_KEY) from the process env.
#[tauri::command]
pub async fn ask_milo(request: MiloAskRequest) -> Result<MiloAskResponse, String> {
    let prompt = request.prompt.trim().to_string();
    if prompt.is_empty() {
        return Err("Ask Milo a question first.".into());
    }

    let provider = request
        .provider
        .as_deref()
        .unwrap_or_else(|| {
            if env::var("OPENAI_API_KEY").is_ok() && env::var("ANTHROPIC_API_KEY").is_err() {
                "openai"
            } else {
                "anthropic"
            }
        })
        .to_lowercase();

    let key = env::var("SURF_AI_API_KEY")
        .or_else(|_| {
            if provider == "openai" {
                env::var("OPENAI_API_KEY")
            } else {
                env::var("ANTHROPIC_API_KEY")
            }
        })
        .map_err(|_| {
            "Live Milo is not configured. Set SURF_AI_API_KEY in the desktop environment."
                .to_string()
        })?;

    let model = request.model.unwrap_or_else(|| {
        if provider == "openai" {
            "gpt-4o-mini".into()
        } else {
            "claude-sonnet-4-6".into()
        }
    });

    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(25))
        .build()
        .map_err(|err| err.to_string())?;

    let reply = if provider == "openai" {
        call_openai(&client, &key, &model, &request.system, &request.history, &prompt).await?
    } else {
        call_anthropic(&client, &key, &model, &request.system, &request.history, &prompt).await?
    };

    Ok(MiloAskResponse {
        reply,
        live: true,
        provider,
    })
}

async fn call_anthropic(
    client: &reqwest::Client,
    key: &str,
    model: &str,
    system: &str,
    history: &[MiloChatMessage],
    prompt: &str,
) -> Result<String, String> {
    let mut messages = Vec::new();
    for message in history.iter().take(8) {
        messages.push(serde_json::json!({
            "role": message.role,
            "content": message.content,
        }));
    }
    messages.push(serde_json::json!({
        "role": "user",
        "content": prompt,
    }));

    let response = client
        .post("https://api.anthropic.com/v1/messages")
        .header("content-type", "application/json")
        .header("x-api-key", key)
        .header("anthropic-version", "2023-06-01")
        .json(&serde_json::json!({
            "model": model,
            "max_tokens": 500,
            "system": system,
            "messages": messages,
        }))
        .send()
        .await
        .map_err(|err| format!("Could not reach Anthropic: {err}"))?;

    if !response.status().is_success() {
        return Err(format!("Anthropic HTTP {}", response.status()));
    }

    let data: serde_json::Value = response
        .json()
        .await
        .map_err(|err| format!("Bad Anthropic payload: {err}"))?;

    data["content"]
        .as_array()
        .and_then(|parts| {
            parts.iter().find_map(|part| {
                if part["type"].as_str() == Some("text") {
                    part["text"].as_str().map(str::to_string)
                } else {
                    None
                }
            })
        })
        .filter(|text| !text.trim().is_empty())
        .ok_or_else(|| "Empty Anthropic response".to_string())
}

async fn call_openai(
    client: &reqwest::Client,
    key: &str,
    model: &str,
    system: &str,
    history: &[MiloChatMessage],
    prompt: &str,
) -> Result<String, String> {
    let mut messages = vec![serde_json::json!({
        "role": "system",
        "content": system,
    })];
    for message in history.iter().take(8) {
        messages.push(serde_json::json!({
            "role": message.role,
            "content": message.content,
        }));
    }
    messages.push(serde_json::json!({
        "role": "user",
        "content": prompt,
    }));

    let response = client
        .post("https://api.openai.com/v1/chat/completions")
        .header("content-type", "application/json")
        .bearer_auth(key)
        .json(&serde_json::json!({
            "model": model,
            "temperature": 0.4,
            "messages": messages,
        }))
        .send()
        .await
        .map_err(|err| format!("Could not reach OpenAI: {err}"))?;

    if !response.status().is_success() {
        return Err(format!("OpenAI HTTP {}", response.status()));
    }

    let data: serde_json::Value = response
        .json()
        .await
        .map_err(|err| format!("Bad OpenAI payload: {err}"))?;

    data["choices"]
        .as_array()
        .and_then(|choices| choices.first())
        .and_then(|choice| choice["message"]["content"].as_str())
        .map(str::trim)
        .filter(|text| !text.is_empty())
        .map(str::to_string)
        .ok_or_else(|| "Empty OpenAI response".to_string())
}
