import { chromium } from "playwright";

const BASE = process.env.PREVIEW_URL ?? "http://127.0.0.1:4173";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.addInitScript(() => localStorage.removeItem("thomas-house-data"));
await page.goto(BASE, { waitUntil: "networkidle" });

const splash = page.getByRole("dialog", { name: "Thomas" });
await splash.waitFor({ state: "visible" });
await splash.getByRole("button", { name: "Business" }).click();
await splash.waitFor({ state: "hidden" });

const body = await page.locator("body").innerText();
if (!body.trim()) throw new Error("empty body after splash");
if (body.includes("Cloud Demo")) throw new Error("Cloud Demo chrome still visible");
if (body.includes("What needs attention")) throw new Error("old crisis heading");

await page.getByRole("button", { name: "Settings" }).click();
await page.getByLabel("Your name").fill("Alex");
await page.getByRole("button", { name: "Save name" }).click();
await page.getByText("Thomas will greet you as Alex").waitFor();

await page.getByRole("button", { name: "Chat", exact: true }).click();
const greeting = await page.locator(".exchange.assistant .bubble").first().innerText();
if (!greeting.includes("Alex")) {
  throw new Error(`greeting missing name: ${greeting}`);
}

await page.getByRole("button", { name: "Settings" }).click();
const parInputs = page.getByLabel("Usual on-hand", { exact: true });
await parInputs.waitFor({ state: "visible" });

console.log("ok: splash, no demo chrome, named greeting, lineup cards");
await browser.close();
