use serde::{Deserialize, Serialize};

const OLLAMA_URL: &str = "http://localhost:11434/api/chat";
const DEFAULT_MODEL: &str = "llama3";

const SYSTEM_PROMPT: &str = "You are Thomas, a local-first retail operations assistant. \
You help back-room staff with inventory discrepancies, shift reconciliation, and audit logging. \
Be concise, actionable, and flag risks clearly. When variance is critical, recommend manager review. \
You run entirely on-premise with no cloud dependency.";

#[derive(Serialize)]
struct ChatRequest {
    model: String,
    messages: Vec<ChatMessage>,
    stream: bool,
}

#[derive(Serialize, Deserialize, Clone)]
struct ChatMessage {
    role: String,
    content: String,
}

#[derive(Deserialize)]
struct ChatResponse {
    message: ChatMessageBody,
}

#[derive(Deserialize)]
struct ChatMessageBody {
    content: String,
}

pub fn chat(user_message: &str, context: &str) -> Result<String, String> {
    let client = reqwest::blocking::Client::builder()
        .timeout(std::time::Duration::from_secs(60))
        .build()
        .map_err(|e| e.to_string())?;

    let user_content = if context.is_empty() {
        user_message.to_string()
    } else {
        format!("Context:\n{context}\n\nQuestion: {user_message}")
    };

    let request = ChatRequest {
        model: DEFAULT_MODEL.to_string(),
        messages: vec![
            ChatMessage {
                role: "system".to_string(),
                content: SYSTEM_PROMPT.to_string(),
            },
            ChatMessage {
                role: "user".to_string(),
                content: user_content,
            },
        ],
        stream: false,
    };

    let response = client
        .post(OLLAMA_URL)
        .json(&request)
        .send()
        .map_err(|_| {
            "Ollama is not reachable at localhost:11434. Start Ollama locally and pull a model (e.g. ollama pull llama3).".to_string()
        })?;

    if !response.status().is_success() {
        return Err(format!(
            "Ollama returned HTTP {}. Ensure a model is available (ollama pull llama3).",
            response.status()
        ));
    }

    let body: ChatResponse = response.json().map_err(|e| e.to_string())?;
    Ok(body.message.content)
}

pub fn offline_response(user_message: &str, context: &str) -> String {
    let lower = user_message.to_lowercase();

    if lower.contains("variance") || lower.contains("discrepancy") || lower.contains("inventory") {
        return "I see inventory activity in the local log. Green = exact match, yellow = minor variance (recount recommended), red = critical shortage (manager lock). Check the scan panel for the latest flagged SKUs.".to_string();
    }

    if lower.contains("shift") || lower.contains("cash") || lower.contains("register") {
        return "Shift reconciliation has three steps: register cash count, back-room status check, and PIN sign-off. Any cash variance over $5.00 should be escalated to a manager before closing.".to_string();
    }

    if lower.contains("audit") || lower.contains("export") {
        return "All actions are logged locally with timestamp and user ID. Use Export in the audit panel to download CSV or JSON for management review — no cloud upload required.".to_string();
    }

    if !context.is_empty() {
        return format!(
            "Thomas (offline mode): Based on current session data — {context}. Ask me about inventory, shifts, or audit exports. Connect Ollama for full conversational AI."
        );
    }

    "Thomas (offline mode): I'm running locally without Ollama. I can help with inventory scans, shift reconciliation, and audit exports. Start Ollama for full natural-language assistance.".to_string()
}
