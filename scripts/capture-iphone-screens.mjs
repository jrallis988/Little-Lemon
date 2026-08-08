import { chromium, devices } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const outDir = '/opt/cursor/artifacts/screenshots/iphone';
mkdirSync(outDir, { recursive: true });

const iphone = devices['iPhone 14'];
const baseURL = process.env.BASE_URL ?? 'http://127.0.0.1:5173';

const shots = [
  { name: '01-landing', path: '/' },
  { name: '02-inbox', path: '/app' },
  { name: '03-office', path: '/app/team' },
  { name: '04-intelligence', path: '/app/intelligence' },
  { name: '05-tasks', path: '/app/tasks' },
  { name: '06-settings', path: '/app/settings' },
  { name: '07-chat-holly', path: '/app/holly', tab: 'Chat' },
  { name: '08-actions-holly', path: '/app/holly', tab: 'Actions' },
  { name: '09-systems-holly', path: '/app/holly', tab: 'Systems' },
  { name: '10-badge-holly', path: '/app/holly', tab: 'Work Badge' },
];

const browser = await chromium.launch();
const context = await browser.newContext({
  ...iphone,
  baseURL,
});
const page = await context.newPage();

await page.goto('/app');
await page.evaluate(() => {
  localStorage.removeItem('wi-workspace');
  localStorage.removeItem('wi-workspace-v2');
  localStorage.setItem('wi-theme', 'dark');
});

for (const shot of shots) {
  await page.goto(shot.path);
  await page.waitForTimeout(400);
  if (shot.tab) {
    await page.getByRole('button', { name: shot.tab, exact: true }).click();
    await page.waitForTimeout(250);
  }
  const file = join(outDir, `${shot.name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log('wrote', file);
}

await browser.close();

const collage = join(outDir, 'all-screens-collage.png');
const inputs = shots.map((s) => join(outDir, `${s.name}.png`));
const convert = 'convert';
try {
  execSync(
    `${convert} ${inputs.slice(0, 5).map((p) => `"${p}"`).join(' ')} +append /tmp/row1.png && ` +
      `${convert} ${inputs.slice(5).map((p) => `"${p}"`).join(' ')} +append /tmp/row2.png && ` +
      `${convert} /tmp/row1.png /tmp/row2.png -background black -gravity center -append "${collage}"`,
    { stdio: 'inherit' },
  );
  console.log('wrote', collage);
} catch (error) {
  console.warn('ImageMagick collage failed; individual screens are still available.', error);
}
