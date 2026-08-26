/**
 * Capture marketing + interior screens into public/previews/.
 * Prerequisite: `npm run build && npm run preview -- --host 127.0.0.1 --port 4173`
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public/previews");
const base = process.env.PREVIEW_URL || "http://127.0.0.1:4173/Little-Lemon";

const shots = [
  { file: "preview-age-gate.png", path: "/", width: 1280, height: 800, before: async (page) => {
    await page.evaluate(() => localStorage.removeItem("smuttynose-age-ok"));
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForTimeout(400);
  }},
  { file: "preview-hero-desktop.png", path: "/", width: 1280, height: 900 },
  { file: "preview-hero-mobile.png", path: "/", width: 390, height: 844 },
  { file: "preview-beers.png", path: "/#beers", width: 1280, height: 900 },
  { file: "preview-events.png", path: "/#events", width: 1280, height: 900 },
  { file: "preview-campus-events.png", path: "/#campus-events", width: 1280, height: 900 },
  { file: "preview-food.png", path: "/#food", width: 1280, height: 900 },
  { file: "preview-gallery.png", path: "/#gallery", width: 1280, height: 900 },
  { file: "preview-visit.png", path: "/#visit", width: 1280, height: 900 },
  { file: "preview-shop.png", path: "/#shop", width: 1280, height: 900 },
  { file: "preview-contact.png", path: "/#contact", width: 1280, height: 900 },
  { file: "preview-newsletter.png", path: "/#newsletter", width: 1280, height: 900 },
  { file: "preview-instagram.png", path: "/#instagram", width: 1280, height: 900 },
  { file: "preview-story.png", path: "/#story", width: 1280, height: 1100 },
  { file: "preview-mobile-menu.png", path: "/?menu=open", width: 390, height: 844 },
  { file: "preview-beer-pdp.png", path: "/beers/finestkind-ipa", width: 1280, height: 1100 },
  { file: "preview-shop-cart.png", path: "/shop", width: 1280, height: 900 },
  { file: "preview-finder.png", path: "/finder", width: 1280, height: 1100 },
  { file: "preview-private-events.png", path: "/events/private", width: 1280, height: 1100 },
  { file: "preview-be-kind.png", path: "/be-kind", width: 1280, height: 900 },
];

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const shot of shots) {
    await page.setViewportSize({ width: shot.width, height: shot.height });
    const url = `${base}${shot.path}`;

    if (shot.before) {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
      await shot.before(page);
    } else {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
      await page.evaluate(() => localStorage.setItem("smuttynose-age-ok", "1"));
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    }

    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(outDir, shot.file),
      fullPage: shot.width >= 1000,
    });
    console.log("wrote", shot.file);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
