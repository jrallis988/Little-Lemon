use serde::{Deserialize, Serialize};

const OLLAMA_URL: &str = "http://localhost:11434/api/chat";
const DEFAULT_MODEL: &str = "llama3";

const SYSTEM_PROMPT: &str = "You are Thomas, a personal beverage butler and beer & wine connoisseur \
serving a brewery and taproom. You speak with refined, warm, attentive butler manners — never stiff, \
never robotic. Address the guest respectfully (sir, madam, or simply 'you' if tone fits). \
Your expertise: alcoholic beverage recommendations, food pairings (beer and wine with meals), \
tasting notes, serving suggestions, and guiding guests through the brewery's lineup. \
You also quietly support back-room operations — inventory counts, shift reconciliation, audit logs — \
but your primary presence is that of a trusted personal butler for drink recommendations. \
When asked what goes with a meal, give specific beer AND wine options with brief reasoning. \
Reference the brewery's own offerings when possible (house IPA, Porter, Golden Lager, Pilsner, etc.). \
Keep responses concise but gracious — two to four sentences unless detail is requested. \
You run entirely on-premise; never mention cloud services.";

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
        format!("Session context (back-room, if relevant):\n{context}\n\nGuest asks: {user_message}")
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

pub fn offline_response(user_message: &str, _context: &str) -> String {
    let lower = user_message.to_lowercase();

    if lower.contains("pair")
        || lower.contains("goes well")
        || lower.contains("go well")
        || lower.contains("meal")
        || lower.contains("steak")
        || lower.contains("grill")
        || lower.contains("dinner")
        || lower.contains("food")
    {
        return "For grilled steak, I'd suggest a malty amber ale or a bold Cabernet — \
        the caramel notes complement char beautifully. From our taproom, our house Porter \
        carries roasted malt that stands up to ribeye splendidly. Shall I suggest a wine alternative?".to_string();
    }

    if lower.contains("wine") || lower.contains("salmon") || lower.contains("rosé") || lower.contains("rose") {
        return "For salmon, a crisp Sauvignon Blanc or dry Rosé is classic. \
        If your guest prefers beer, a Belgian-style witbier with citrus notes pairs elegantly. \
        I can narrow this by preparation — grilled, cured, or sashimi?".to_string();
    }

    if lower.contains("beer")
        || lower.contains("brew")
        || lower.contains("ipa")
        || lower.contains("lager")
        || lower.contains("beginner")
    {
        return "For newcomers, I'd start with our Golden Lager — approachable and clean. \
        Our Session IPA is a fine second step: aromatic without overwhelming bitterness. \
        Happy to walk through tasting notes for anything on today's board.".to_string();
    }

    if lower.contains("light") || lower.contains("summer") || lower.contains("cookout") {
        return "For a summer cookout, may I suggest a Kölsch or a sparkling wine spritz? \
        Our Pilsner is tapped fresh — bright, crisp, and crowd-pleasing alongside burgers and salads.".to_string();
    }

    if lower.contains("variance") || lower.contains("inventory") || lower.contains("sku") || lower.contains("stock") {
        return "I've noted the back-room counts. Critical shortages warrant a recount and manager review; \
        minor variances need a second look. The scan panel has the latest figures — shall I flag anything?".to_string();
    }

    if lower.contains("shift") || lower.contains("cash") || lower.contains("register") {
        return "Shift reconciliation follows three steps: cash count, back-room check, and PIN sign-off. \
        Variances above five dollars should be escalated before close. I'm happy to walk you through.".to_string();
    }

    if lower.contains("audit") || lower.contains("export") {
        return "Every action is logged locally with timestamp and user ID. \
        Export CSV or JSON from the audit panel whenever management requires a review.".to_string();
    }

    "A pleasure to assist. Ask me about beer and wine pairings, our brewery offerings, \
    or what's suited to any meal. I can also keep an eye on inventory behind the scenes.".to_string()
}
