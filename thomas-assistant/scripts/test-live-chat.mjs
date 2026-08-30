import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.addInitScript(() => localStorage.removeItem("thomas-house-data"));
await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.getByRole("button", { name: "Chat", exact: true }).click();
await page.waitForTimeout(1000);

const pill = await page.locator(".ai-pill").first().textContent();
console.log("pill:", pill?.trim());

async function ask(text) {
  await page.locator("textarea").fill(text);
  await page.locator("textarea").press("Enter");
  await page.waitForTimeout(8000);
}

await ask("What pairs with grilled steak?");
await ask("Something from our tap list?");
await ask("What about wine instead?");

const bubbles = await page.locator(".exchange.assistant .bubble p").allTextContents();
console.log("--- assistant replies ---");
bubbles.forEach((t, i) => console.log(`[${i}] ${t.slice(0, 100)}`));
const unique = new Set(bubbles.map((t) => t.trim()));
console.log("unique:", unique.size, "total:", bubbles.length);
console.log("live:", pill?.includes("Live"));

await page.screenshot({ path: "/opt/cursor/artifacts/screenshots/chat-live-ai.png" });
await browser.close();
