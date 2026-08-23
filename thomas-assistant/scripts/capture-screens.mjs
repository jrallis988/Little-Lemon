import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";

const OUT = "/opt/cursor/artifacts/screenshots";
const BASE = "http://localhost:1420";

async function shot(page, name) {
  await page.screenshot({
    path: path.join(OUT, `${name}.png`),
    fullPage: false,
  });
  console.log(`saved ${name}.png`);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await mkdir(OUT, { recursive: true });
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(800);

// 1. Inventory (default)
await shot(page, "01-inventory");

// 2. Shift Close
await page.getByRole("button", { name: "Shift Close" }).click();
await page.waitForTimeout(500);
await shot(page, "02-shift-close-step1");

// Step 2 - back room
await page.getByRole("button", { name: "Continue →" }).click();
await page.waitForTimeout(400);
await shot(page, "03-shift-close-step2");

// Step 3 - sign off
await page.getByRole("button", { name: /Tap to confirm/ }).click();
await page.waitForTimeout(200);
await page.getByRole("button", { name: "Continue →" }).click();
await page.waitForTimeout(400);
await shot(page, "04-shift-close-step3");

// 3. Audit Log
await page.getByRole("button", { name: "Audit Log" }).click();
await page.waitForTimeout(500);
await shot(page, "05-audit-log");

// 4. Butler chat with pairing question
await page.getByRole("button", { name: "Inventory" }).click();
await page.waitForTimeout(300);
const chip = page.getByRole("button", { name: /grilled steak/i });
if (await chip.isVisible()) {
  await chip.click();
  await page.waitForTimeout(1200);
}
await shot(page, "06-butler-chat-pairing");

await browser.close();
console.log("done");
