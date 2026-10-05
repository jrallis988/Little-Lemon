use serde::{Deserialize, Serialize};

const OLLAMA_URL: &str = "http://localhost:11434/api/chat";
const DEFAULT_MODEL: &str = "llama3";

const SYSTEM_PROMPT: &str = "You are Thomas: expert personal bartender and beverage operations intelligence. \
You are a sommelier-level pairing authority — wine, beer, spirits, sides, and vegetables — \
who also quietly keeps the cellar and the night in order.\n\n\
VOICE:\n\
- Warm, professional, unhurried hospitality. Speak with authority, never like IT support.\n\
- Open with grace: 'Certainly', 'If I may', 'Might I suggest', 'At your service'.\n\
- Describe drinks through the senses: aroma, body, finish, how they companion a dish.\n\
- Keep answers concise: two to four sentences unless asked for more.\n\
- Remember the full conversation. Follow-ups ('what wine?', 'and a vegetable?') stay on the same dish.\n\n\
NEVER SAY: SKU, variance, critical, audit, CSV, JSON, database, system, operator, panel, reconcile.\n\n\
PAIRINGS: Use house notes when present. Do not invent street addresses.\n\n\
EXAMPLE — baked flounder:\n\
'Might I suggest a Chablis — mineral, lemon, no oak so the fish stays delicate. \
On the plate, asparagus quickly roasted, and steamed new potatoes with parsley.'";

#[derive(Serialize, Deserialize, Clone)]
pub struct ChatTurn {
    pub role: String,
    pub content: String,
}

#[derive(Serialize)]
struct ChatRequest {
    model: String,
    messages: Vec<ChatTurn>,
    stream: bool,
}

#[derive(Deserialize)]
struct ChatResponse {
    message: ChatMessageBody,
}

#[derive(Deserialize)]
struct ChatMessageBody {
    content: String,
}

pub fn chat(
    user_message: &str,
    context: &str,
    history: &[ChatTurn],
) -> Result<String, String> {
    let client = reqwest::blocking::Client::builder()
        .timeout(std::time::Duration::from_secs(60))
        .build()
        .map_err(|e| e.to_string())?;

    let mut system = SYSTEM_PROMPT.to_string();
    if !context.is_empty() {
        system.push_str(
            "\n\nHouse notes (speak of these as a bartender would, never with technical language):\n",
        );
        system.push_str(context);
    }

    let mut messages = vec![ChatTurn {
        role: "system".to_string(),
        content: system,
    }];

    for turn in history {
        if turn.role == "system" {
            continue;
        }
        messages.push(ChatTurn {
            role: turn.role.clone(),
            content: turn.content.clone(),
        });
    }

    let last_is_user = match messages.last() {
        Some(m) => m.role == "user" && m.content == user_message,
        None => false,
    };
    if !last_is_user && !user_message.is_empty() {
        messages.push(ChatTurn {
            role: "user".to_string(),
            content: user_message.to_string(),
        });
    }

    let request = ChatRequest {
        model: DEFAULT_MODEL.to_string(),
        messages,
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

pub fn offline_response(user_message: &str, _context: &str, history: &[ChatTurn]) -> String {
    let lower = user_message.to_lowercase();
    let mut thread = String::new();
    for turn in history {
        thread.push_str(&turn.content);
        thread.push(' ');
    }
    thread.push_str(user_message);
    let hay = thread.to_lowercase();

    let flounder = hay.contains("flounder")
        || hay.contains("sole")
        || hay.contains("white fish")
        || hay.contains("halibut");
    let wine_q = lower.contains("wine") || lower.contains("white") || lower.contains("red");
    let veg_q = lower.contains("veg") || lower.contains("green") || lower.contains("asparagus");
    let side_q = lower.contains("side") || lower.contains("potato");

    if flounder && veg_q {
        return "Still with the baked flounder — asparagus or broccolini, quickly roasted so it stays green, \
        or sautéed spinach with lemon zest. Fennel, shaved or gently braised, is lovely with a glass of Chablis."
            .to_string();
    }
    if flounder && side_q {
        return "Alongside the flounder, steamed new potatoes with parsley, or lemon-butter orzo. \
        Keep a sharp green salad if you want contrast."
            .to_string();
    }
    if flounder && wine_q {
        return "For baked flounder I'd pour Chablis or an unoaked Chardonnay — mineral, lemon, no heavy oak. \
        Muscadet or Pinot Grigio if you want even more snap."
            .to_string();
    }
    if flounder
        || lower.contains("pair")
            && (lower.contains("fish") || lower.contains("flounder") || lower.contains("sole"))
    {
        return "With baked flounder, Chablis or unoaked Chardonnay — mineral, lemon, so the fish stays delicate. \
        If beer, a bright Pilsner. On the plate: steamed new potatoes and asparagus quickly roasted. \
        Shall I take the wine or the vegetable further?"
            .to_string();
    }

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
