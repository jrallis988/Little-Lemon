/**
 * Capture BioCross screens into /tmp/biocross-shots for collage.
 */
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const OUT = '/tmp/biocross-shots';
const BASE = 'http://localhost:8081';

const SCREENS = [
  { id: '01_welcome', path: '/onboarding/welcome', label: 'Welcome' },
  { id: '02_create_profile', path: '/onboarding/create-profile', label: 'Create Profile' },
  { id: '03_health_profile', path: '/onboarding/health-profile', label: 'Health Profile' },
  { id: '04_review_import', path: '/onboarding/review-import', label: 'Review Import' },
  { id: '05_preferences', path: '/onboarding/preferences', label: 'Preferences' },
  { id: '06_complete', path: '/onboarding/complete', label: "You're All Set" },
  { id: '07_home', path: '/(tabs)/home', label: 'Home', afterDemo: true },
  { id: '08_history', path: '/(tabs)/history', label: 'History', afterDemo: true },
  { id: '09_scan', path: '/(tabs)/check', label: 'Scan / Check', afterDemo: true },
  { id: '10_updates', path: '/(tabs)/updates', label: 'Updates', afterDemo: true },
  { id: '11_profile', path: '/(tabs)/profile', label: 'Profile', afterDemo: true },
  { id: '12_search', path: '/check/search', label: 'Search', afterDemo: true },
  { id: '13_manual_barcode', path: '/check/manual-barcode', label: 'Manual Barcode', afterDemo: true },
  { id: '14_confirm', path: '/check/confirm?supplementId=sup-catalog-testo', label: 'Confirm Product', afterDemo: true },
  { id: '15_analyzing', path: '/check/analyzing?supplementId=sup-catalog-mag', label: 'Analyzing', afterDemo: true, waitMs: 1200 },
  { id: '16_label_review', path: '/check/label-review?supplementId=sup-catalog-mag', label: 'Label Review', afterDemo: true },
  { id: '17_issue_unknown', path: '/check/issue?kind=unknown_product', label: 'Unknown Product', afterDemo: true },
  { id: '18_issue_permission', path: '/check/issue?kind=permission', label: 'Permission', afterDemo: true },
  { id: '19_issue_scan_fail', path: '/check/issue?kind=scan_failure', label: 'Scan Failure', afterDemo: true },
  { id: '20_notifications', path: '/profile/notifications', label: 'Notifications', afterDemo: true },
  { id: '21_privacy', path: '/profile/privacy', label: 'Privacy', afterDemo: true },
  { id: '22_medications', path: '/profile/medications', label: 'Medications', afterDemo: true },
  { id: '23_result_high', path: '/result/check-sjw', label: 'High Risk Result', afterDemo: true },
  { id: '24_result_low', path: '/result/check-vitd', label: 'Low Risk Result', afterDemo: true },
  { id: '25_result_caution', path: '/result/check-ash', label: 'Caution Result', afterDemo: true },
];

async function shot(page, screen) {
  const url = `${BASE}${screen.path}`;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, screen.waitMs ?? 900));
  const file = path.join(OUT, `${screen.id}.png`);
  await page.screenshot({ path: file, type: 'png' });
  console.log('captured', screen.id, screen.label);
  return { ...screen, file };
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'manifest.json'), '[]');

  const browser = await puppeteer.launch({
    executablePath: '/usr/local/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=390,844'],
    defaultViewport: { width: 390, height: 844, deviceScaleFactor: 2 },
  });

  const page = await browser.newPage();
  // Complete onboarding via demo first so tab screens work
  await page.goto(`${BASE}/demo`, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));

  const results = [];
  for (const screen of SCREENS) {
    try {
      results.push(await shot(page, screen));
    } catch (e) {
      console.error('FAILED', screen.id, e.message);
    }
  }

  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(results, null, 2));
  await browser.close();
  console.log('done', results.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
