import { chromium, devices } from '@playwright/test';
import { mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const outDir = '/opt/cursor/artifacts/screenshots/iphone';
mkdirSync(outDir, { recursive: true });

const iphone = devices['iPhone 14'];
const baseURL = process.env.BASE_URL ?? 'http://127.0.0.1:5173';

const shots = [
  { name: '01-landing', label: 'Landing', path: '/' },
  { name: '02-chats', label: 'Chats', path: '/app' },
  { name: '03-office', label: 'Office', path: '/app/team' },
  { name: '04-intelligence', label: 'Intelligence', path: '/app/intelligence' },
  { name: '05-tasks', label: 'Tasks', path: '/app/tasks' },
  { name: '06-settings', label: 'Settings', path: '/app/settings' },
  { name: '07-chat-holly', label: 'Chat · Holly', path: '/app/holly', tab: 'Chat' },
  { name: '08-actions-holly', label: 'Actions · Holly', path: '/app/holly', tab: 'Actions' },
  { name: '09-systems-holly', label: 'Systems · Holly', path: '/app/holly', tab: 'Systems' },
  { name: '10-badge-holly', label: 'Work Badge · Holly', path: '/app/holly', tab: 'Work Badge' },
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

const labeled = [];
for (const shot of shots) {
  await page.goto(shot.path);
  await page.waitForTimeout(450);
  if (shot.tab) {
    await page.getByRole('button', { name: shot.tab, exact: true }).click();
    await page.waitForTimeout(300);
  }
  const file = join(outDir, `${shot.name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log('wrote', file);

  const labeledFile = `/tmp/${shot.name}-labeled.png`;
  execSync(
    `convert "${file}" -background black -gravity north -splice 0x48 ` +
      `-fill white -font DejaVu-Sans-Bold -pointsize 22 ` +
      `-annotate +0+14 "${shot.label}" "${labeledFile}"`,
    { stdio: 'inherit' },
  );
  labeled.push(labeledFile);
}

await browser.close();

const collage = join(outDir, 'all-screens-collage.png');
const convert = 'convert';
execSync(
  `${convert} ${labeled.slice(0, 5).map((p) => `"${p}"`).join(' ')} +append /tmp/row1.png && ` +
    `${convert} ${labeled.slice(5).map((p) => `"${p}"`).join(' ')} +append /tmp/row2.png && ` +
    `${convert} /tmp/row1.png /tmp/row2.png -background black -gravity center -append ` +
    `-bordercolor black -border 24 "${collage}"`,
  { stdio: 'inherit' },
);
console.log('wrote', collage);

execSync(`cp "${collage}" "${join(outDir, 'working-intelligence-iphone-screens.png')}"`);

// Keep directory tidy — remove stale numbered aliases from earlier passes
for (const stale of [
  '02-inbox.png',
  '03-chat-calvin.png',
  '03-chat-holly.png',
  '04-actions.png',
  '04-office.png',
  '04-tasks.png',
  '05-intelligence.png',
  '05-systems.png',
  '05-team.png',
  '06-badge.png',
  '06-tasks.png',
]) {
  try {
    rmSync(join(outDir, stale));
  } catch {
    /* ignore */
  }
}
