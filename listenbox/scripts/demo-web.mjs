/**
 * Headed demo for screen recording — walks login → log → feed → profile.
 * Expects Expo web on LISTENBOX_URL (default http://localhost:8081).
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.LISTENBOX_URL || 'http://localhost:8081';
const OUT = process.env.DEMO_OUT || '/opt/cursor/artifacts';

async function pause(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=420,900', '--window-position=80,40'],
  });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle', timeout: 60000 });
  await page.getByText('Your listening diary.').waitFor({ timeout: 30000 });
  await pause(800);
  await page.screenshot({ path: `${OUT}/listenbox_demo_login.png` });

  await page.getByPlaceholder('e.g. Mira').fill('Alex Rivers');
  await page.getByPlaceholder('you@email.com').fill('alex@listenbox.app');
  await pause(500);
  await page.getByText('Enter Listenbox').click();
  await page.getByText('Friends are listening').waitFor({ timeout: 15000 });
  await pause(900);
  await page.screenshot({ path: `${OUT}/listenbox_demo_feed.png` });

  await page.getByText('Log', { exact: true }).last().click();
  await page.getByText('Log a listen').waitFor({ timeout: 15000 });
  await page.getByTestId('album-album-blonde').click({ force: true });
  await page.getByText('RATING').waitFor({ timeout: 5000 });
  await page.getByTestId('rating-5').click({ force: true });
  await page.getByPlaceholder('What stuck with you?').fill('Midnight re-listen — still perfect.');
  await page.getByText(/Like this album|Liked/).click({ force: true });
  await pause(700);
  await page.screenshot({ path: `${OUT}/listenbox_demo_log.png` });
  await page.getByTestId('save-listen').click({ force: true });
  await page.getByText('Logged!').waitFor({ timeout: 5000 });

  await page.getByText('Friends are listening').waitFor({ timeout: 15000 });
  await page
    .locator('div')
    .filter({ hasText: /^Midnight re-listen — still perfect\.$/ })
    .first()
    .waitFor({ timeout: 10000 });
  await page.getByText('Alex Rivers').first().waitFor({ timeout: 10000 });
  await pause(2200);
  await page.screenshot({ path: `${OUT}/listenbox_demo_feed_with_log.png` });

  await page.getByText('Profile', { exact: true }).last().click();
  await page.getByText('@alexrivers', { exact: true }).waitFor({ timeout: 10000 });
  await page.getByText('Your diary').waitFor({ timeout: 10000 });
  await pause(2200);
  await page.screenshot({ path: `${OUT}/listenbox_demo_profile.png` });

  console.log('DEMO COMPLETE');
  await pause(1000);
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
