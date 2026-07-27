const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const OUT = '/opt/cursor/artifacts/screenshots';
const BASE = 'http://127.0.0.1:8081';

fs.mkdirSync(OUT, { recursive: true });

async function waitForApp(page) {
  await page.waitForSelector('body', { timeout: 60000 });
  // Expo web root
  await page.waitForFunction(
    () => {
      const t = document.body?.innerText || '';
      return t.includes('staticvolume') || t.includes('Home') || t.includes('Activity');
    },
    { timeout: 90000 },
  );
  await new Promise((r) => setTimeout(r, 1200));
}

async function shot(page, name) {
  const file = path.join(OUT, name);
  await page.screenshot({ path: file, fullPage: false });
  console.log('saved', file);
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    defaultViewport: { width: 390, height: 844, deviceScaleFactor: 2 },
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(90000);

  // Home mobile
  await page.goto(BASE, { waitUntil: 'networkidle0' });
  await waitForApp(page);
  await shot(page, 'sv-letterboxd-home-mobile.png');

  // Scroll a bit to show reviews
  await page.evaluate(() => window.scrollBy(0, 700));
  await new Promise((r) => setTimeout(r, 600));
  await shot(page, 'sv-letterboxd-home-reviews-mobile.png');

  // Activity tab — click bottom tab by text
  await page.evaluate(() => window.scrollTo(0, 0));
  const clickedActivity = await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll('div, span, a, button'));
    const el = nodes.find((n) => n.childNodes.length === 1 && n.textContent?.trim() === 'Activity');
    if (el) {
      el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      return true;
    }
    return false;
  });
  if (!clickedActivity) {
    await page.goto(`${BASE}/following`, { waitUntil: 'networkidle0' });
  }
  await new Promise((r) => setTimeout(r, 1500));
  await waitForApp(page);
  await shot(page, 'sv-letterboxd-activity-mobile.png');

  // Profile
  await page.goto(`${BASE}/profile`, { waitUntil: 'networkidle0' });
  await waitForApp(page);
  await shot(page, 'sv-letterboxd-profile-mobile.png');

  // Track detail
  await page.goto(`${BASE}/track/track-snow-on-the-tape`, { waitUntil: 'networkidle0' });
  await waitForApp(page);
  await shot(page, 'sv-letterboxd-track-mobile.png');

  // Desktop home
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  await page.goto(BASE, { waitUntil: 'networkidle0' });
  await waitForApp(page);
  await shot(page, 'sv-letterboxd-home-desktop.png');

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
