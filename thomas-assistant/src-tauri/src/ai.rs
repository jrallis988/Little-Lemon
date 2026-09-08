use serde::{Deserialize, Serialize};

const OLLAMA_URL: &str = "http://localhost:11434/api/chat";
const DEFAULT_MODEL: &str = "llama3";

const SYSTEM_PROMPT: &str = "You are Thomas, the guest's own personal bartender at a brewery and taproom. \
You are a beer and wine connoisseur who speaks with warm, discreet, \
unhurried hospitality. Never stiff, never robotic, never like an engineer or software assistant.\n\n\
VOICE:\n\
- Open with grace: 'Certainly', 'If I may', 'Might I suggest', 'A fine choice', 'At your service'.\n\
- Describe drinks through the senses: aroma, body, finish, how they companion a dish.\n\
- Address guests respectfully when natural (sir, madam) — sparingly, not every sentence.\n\
- Keep answers concise: two to four sentences unless asked for more.\n\n\
NEVER SAY (these break character):\n\
SKU, variance, critical, tolerance, audit, export, CSV, JSON, logged, on-premise, system, database, \
operator, PIN, reconcile, flag, escalate, panel, scan, manifest, or any technical jargon.\n\n\
INSTEAD SAY:\n\
- Stock: 'we appear short on the house Porter', 'the cellar count for the IPA looks right'.\n\
- Till: 'the register is nearly balanced', 'a small discrepancy in the drawer'.\n\
- Records: 'I've made a careful note', 'the proprietor may review at their leisure'.\n\n\
EXPERTISE:\n\
Pairings (beer AND wine with meals), tasting notes, serving suggestions, guiding guests through the \
brewery's lineup — house IPA, Porter, Golden Lager, Pilsner, Session IPA, etc.\n\
You also quietly notice back-room matters (counts, closing the till) but speak of them as a bartender would, \
never as IT support.\n\n\
EXAMPLE — guest asks what goes with steak:\n\
'Might I suggest our house Porter? The roasted malt stands up beautifully to char. \
If wine is preferred, a bold Cabernet would be equally at home.'\n\n\
EXAMPLE — bad (never do this):\n\
'SKU-8842 shows critical variance of -10. Recommend manager review.'";

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
        format!(
            "House notes (speak of these as a bartender would, never with technical language):\n{context}\n\nGuest says: {user_message}"
        )
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
            "Forgive me — I cannot reach my full faculties at the moment. \
            Ollama may need to be started locally (ollama pull llama3)."
                .to_string()
        })?;

    if !response.status().is_success() {
        return Err(
            "I'm afraid something went awry behind the scenes. \
            A model may need to be prepared (ollama pull llama3)."
                .to_string(),
        );
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
        return "A fine question. With grilled steak, I might suggest a bold India Pale Ale — \
        roasted malts and a bright bitterness that stands up beautifully to char. \
        If wine is your preference, a Cabernet Sauvignon will do nicely. \
        Shall I recommend something specific from our list?".to_string();
    }

    if lower.contains("wine") || lower.contains("salmon") || lower.contains("rosé") || lower.contains("rose") {
        return "Salmon calls for something with lift — a crisp Sauvignon Blanc, or perhaps a dry Rosé. \
        If your guest leans toward beer, a witbier with a whisper of citrus can be quite elegant. \
        How is the fish prepared, if I may ask?".to_string();
    }

    if lower.contains("beer")
        || lower.contains("brew")
        || lower.contains("ipa")
        || lower.contains("lager")
        || lower.contains("beginner")
    {
        return "For someone new to craft beer, I'd begin gently — our Golden Lager is clean and welcoming. \
        When they're ready for a little more character, the Session IPA offers aroma without overwhelming \
        the palate. I'm happy to walk through anything on today's board.".to_string();
    }

    if lower.contains("light") || lower.contains("summer") || lower.contains("cookout") {
        return "For a summer gathering, might I suggest a Kölsch or a bright Pilsner from the tap? \
        Something effervescent and easy — it keeps good company with burgers and salads.".to_string();
    }

    if lower.contains("variance")
        || lower.contains("inventory")
        || lower.contains("sku")
        || lower.contains("stock")
        || lower.contains("count")
        || lower.contains("short")
    {
        return "I've been through the back room. One item wants a closer look before service — \
        we're rather short on a popular line. The rest is in good order. Would you like me to elaborate?"
            .to_string();
    }

    if lower.contains("shift")
        || lower.contains("cash")
        || lower.contains("register")
        || lower.contains("close")
        || lower.contains("till")
    {
        return "The evening's accounts are nearly settled — the till is balanced to within a few dollars, \
        and the cellar is secured. A quiet close, if I may say so.".to_string();
    }

    if lower.contains("audit") || lower.contains("export") || lower.contains("record") {
        return "I've kept careful note of everything this shift. Should the proprietor wish to review, \
        the records are ready at hand.".to_string();
    }

    "A pleasure. Ask me what to pour, what suits a meal, or what's worth trying from the brewery. \
    I'm equally happy to quietly keep an eye on what's in the back.".to_string()
}
