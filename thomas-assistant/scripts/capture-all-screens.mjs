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

async function shot(page, name) {
  await page.screenshot({
    path: path.join(OUT, `${name}.png`),
    fullPage: false,
  });
  console.log(`saved ${name}.png`);
}

async function go(page) {
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
}

async function seedChat(page) {
  await page.addInitScript((messages) => {
    const existing = localStorage.getItem("thomas-house-data");
    const data = existing ? JSON.parse(existing) : {};
    data.chatMessages = messages;
    localStorage.setItem("thomas-house-data", JSON.stringify(data));
  }, previewMessages);
}

const browser = await chromium.launch();
await mkdir(OUT, { recursive: true });

// --- Mobile (390) ---
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await go(page);
  await shot(page, "screen-mobile-00-home");

  await page.getByRole("button", { name: "Chat" }).click();
  await page.waitForTimeout(400);
  await shot(page, "screen-mobile-01-chat");

  await page.getByRole("button", { name: "Cellar" }).click();
  await page.waitForTimeout(400);
  await shot(page, "screen-mobile-02-cellar");

  await page.getByRole("button", { name: "Close" }).click();
  await page.waitForTimeout(400);
  await shot(page, "screen-mobile-03-close-step1");

  await page.getByRole("button", { name: "Continue →" }).click();
  await page.waitForTimeout(300);
  await shot(page, "screen-mobile-04-close-step2");

  await page.getByRole("button", { name: /Confirm cellar is secured/ }).click();
  await page.waitForTimeout(200);
  await page.getByRole("button", { name: "Continue →" }).click();
  await page.waitForTimeout(300);
  await shot(page, "screen-mobile-05-close-step3");

  await page.getByRole("button", { name: "Record" }).click();
  await page.waitForTimeout(400);
  await shot(page, "screen-mobile-06-record");
  await page.close();
}

// --- Mobile conversation ---
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await seedChat(page);
  await go(page);
  await page.getByRole("button", { name: "Chat" }).click();
  await page.waitForTimeout(500);
  await shot(page, "screen-mobile-07-chat-conversation");
  await page.close();
}

// --- Desktop (1280) ---
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await go(page);
  await shot(page, "screen-desktop-00-home");

  await page.getByRole("button", { name: "Cellar Check" }).click();
  await page.waitForTimeout(400);
  await shot(page, "screen-desktop-01-cellar-chat");

  await page.getByRole("button", { name: "Close the Night" }).click();
  await page.waitForTimeout(400);
  await shot(page, "screen-desktop-02-close");

  await page.getByRole("button", { name: "The Record" }).click();
  await page.waitForTimeout(400);
  await shot(page, "screen-desktop-03-record");
  await page.close();
}

// --- Desktop conversation ---
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await seedChat(page);
  await go(page);
  await page.getByRole("button", { name: "Cellar Check" }).click().catch(() => {});
  await page.waitForTimeout(500);
  await shot(page, "screen-desktop-04-chat-conversation");
  await page.close();
}

await browser.close();
console.log("done");
