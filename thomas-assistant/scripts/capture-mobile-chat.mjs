import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";

const OUT = "/opt/cursor/artifacts/screenshots";
const BASE = process.env.PREVIEW_URL ?? "http://localhost:4173";

const previewMessages = [
  {
    role: "assistant",
    content: "Good evening, James. What shall we pour?",
    timestamp: "2026-08-23T20:00:00.000Z",
  },
  {
    role: "user",
    content: "What pairs with grilled steak?",
    timestamp: "2026-08-23T20:00:12.000Z",
  },
  {
    role: "assistant",
    content:
      "With grilled steak, I'd reach for a bold house IPA — roasted malts and bitterness that stand up beautifully to char. A Cabernet works if wine is preferred.",
    timestamp: "2026-08-23T20:00:18.000Z",
  },
  {
    role: "user",
    content: "Something from our tap list?",
    timestamp: "2026-08-23T20:00:35.000Z",
  },
  {
    role: "assistant",
    content:
      "Our House Porter would be my first recommendation — rich, slightly chocolatey, and it loves a good sear. The Session IPA is a lighter option if your guest prefers something brighter.",
    timestamp: "2026-08-23T20:00:42.000Z",
  },
];

async function seedConversation(page) {
  await page.addInitScript((messages) => {
    const existing = localStorage.getItem("thomas-house-data");
    const data = existing ? JSON.parse(existing) : {};
    data.chatMessages = messages;
    localStorage.setItem("thomas-house-data", JSON.stringify(data));
  }, previewMessages);
}

const browser = await chromium.launch();
await mkdir(OUT, { recursive: true });

// Initial state
const initial = await browser.newPage({ viewport: { width: 390, height: 844 } });
await initial.goto(BASE, { waitUntil: "networkidle" });
await initial.waitForTimeout(600);
await initial.screenshot({
  path: path.join(OUT, "thomas-mobile-chat-refined.png"),
  fullPage: false,
});
console.log("saved thomas-mobile-chat-refined.png");

// Conversation state
const conversation = await browser.newPage({ viewport: { width: 390, height: 844 } });
await seedConversation(conversation);
await conversation.goto(BASE, { waitUntil: "networkidle" });
await conversation.waitForTimeout(600);
await conversation.screenshot({
  path: path.join(OUT, "thomas-mobile-chat-conversation.png"),
  fullPage: false,
});
console.log("saved thomas-mobile-chat-conversation.png");

await browser.close();
