import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.addInitScript(() => localStorage.removeItem("thomas-house-data"));
await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
await page.waitForTimeout(700);
await page.getByRole("button", { name: "Chat", exact: true }).click();
await page.waitForTimeout(400);

async function ask(text) {
  const box = page.locator("textarea");
  await box.fill(text);
  await box.press("Enter");
  await page.waitForTimeout(600);
}

await ask("What pairs with grilled steak?");
await ask("Something from our tap list?");
await ask("What about wine instead?");

const replies = await page.evaluate(() => {
  return [...document.querySelectorAll(".msg.assistant .bubble, .message.assistant, .assistant .content")]
    .map((el) => el.textContent.trim())
    .filter(Boolean);
});

// Fallback scrape
const fallback = await page.evaluate(() => {
  const root = document.querySelector(".messages") || document.querySelector(".chat-panel");
  if (!root) return [];
  return [...root.querySelectorAll(".bubble, p")]
    .map((el) => el.textContent.trim())
    .filter((t) => t.length > 50);
});

const list = replies.length ? replies : fallback;
console.log("--- replies ---");
list.forEach((r, i) => console.log(`[${i}] ${r.slice(0, 120)}`));
console.log("unique:", new Set(list).size, "of", list.length);
console.log("no_doorbell:", list.length >= 3 && list[list.length - 1] !== list[list.length - 2]);

await page.screenshot({ path: "/opt/cursor/artifacts/screenshots/chat-followup-test.png" });
await browser.close();
