import { chromium } from "playwright";

const BASE = process.env.PREVIEW_URL ?? "http://127.0.0.1:4173";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.addInitScript(() => localStorage.removeItem("thomas-house-data"));
await page.route("**/api/ollama/**", (route) => route.abort());
await page.route("**/wikipedia.org/**", (route) => route.abort());

await page.goto(BASE, { waitUntil: "networkidle" });

const splash = page.getByRole("dialog", { name: "Thomas" });
if (await splash.isVisible().catch(() => false)) {
  await splash.getByRole("button", { name: "Personal" }).click();
  await splash.waitFor({ state: "hidden" });
}

await page.getByRole("button", { name: "Chat", exact: true }).click();

async function ask(text) {
  const box = page.locator("textarea[aria-label='Message to Thomas']");
  await box.fill(text);
  await box.press("Enter");
  await page.waitForFunction(() => {
    const typing = document.querySelector(".exchange.typing");
    return !typing;
  }, null, { timeout: 20000 });
}

await ask("What pairs with baked flounder?");
await ask("What wine should I pour?");
await ask("And a vegetable side?");

const replies = await page.locator(".exchange.assistant .bubble").allTextContents();
const body = replies.map((t) => t.toLowerCase()).join("\n---\n");
console.log("--- assistant ---");
replies.forEach((t, i) => console.log(`[${i}] ${t.slice(0, 160)}`));

if (!body.includes("flounder")) {
  throw new Error("expected flounder to stay in the thread");
}
if (!body.includes("chablis") && !body.includes("chardonnay") && !body.includes("wine")) {
  throw new Error("expected a wine recommendation");
}
if (!body.includes("asparagus") && !body.includes("spinach") && !body.includes("fennel") && !body.includes("vegetable")) {
  throw new Error("expected a vegetable follow-up");
}

const unique = new Set(replies.map((t) => t.trim()));
if (unique.size < 3) throw new Error("follow-ups repeated the same line");

console.log("ok: multi-turn flounder pairings");
await browser.close();
