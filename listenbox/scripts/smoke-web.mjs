import { chromium } from 'playwright';

const BASE = process.env.LISTENBOX_URL || 'http://localhost:8081';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.clearCookies();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (err) => errors.push(String(err)));

  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle', timeout: 60000 });

  await page.getByText('Your listening diary.').waitFor({ timeout: 30000 });
  await page.getByPlaceholder('e.g. Mira').fill('Alex Rivers');
  await page.getByPlaceholder('you@email.com').fill('alex@listenbox.app');
  await page.getByText('Enter Listenbox').click();
  await page.getByText('Friends are listening').waitFor({ timeout: 15000 });
  console.log('OK login + feed');

  await page.getByText('Log', { exact: true }).last().click();
  await page.getByText('Log a listen').waitFor({ timeout: 15000 });

  // MusicBrainz search path
  await page.getByTestId('album-search').fill('blonde frank ocean');
  const mbAlbum = page.locator('[data-testid^="album-mb-"]').first();
  await mbAlbum.waitFor({ timeout: 20000 });
  await mbAlbum.click({ force: true });
  await page.getByText('Selected').waitFor({ timeout: 5000 });
  await page.getByText('via MusicBrainz').waitFor({ timeout: 5000 });
  console.log('OK MusicBrainz search + select');

  await page.getByTestId('rating-5').click({ force: true });
  await page.getByPlaceholder('What stuck with you?').fill('Found via MusicBrainz search.');
  await page.getByText(/Like this album|Liked/).click({ force: true });
  await page.getByTestId('save-listen').click({ force: true });
  await page.getByText('Logged!').waitFor({ timeout: 5000 });
  console.log('OK save confirmed');

  await page.getByText('Friends are listening').waitFor({ timeout: 15000 });
  await page
    .locator('div')
    .filter({ hasText: /^Found via MusicBrainz search\.$/ })
    .first()
    .waitFor({ timeout: 10000 });
  await page.getByText('Alex Rivers').first().waitFor({ timeout: 10000 });
  console.log('OK logged listen appears in feed');

  await page.getByText('Profile', { exact: true }).last().click();
  await page.getByText('@alexrivers', { exact: true }).waitFor({ timeout: 10000 });
  await page.getByText('Your diary').waitFor({ timeout: 10000 });
  await page.getByText('Blonde').first().waitFor({ timeout: 10000 });
  console.log('OK profile diary');

  if (errors.length) {
    console.error('Page errors:', errors);
    process.exit(1);
  }
  console.log('SMOKE PASS');
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
