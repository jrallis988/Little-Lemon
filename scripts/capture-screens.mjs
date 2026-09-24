/**
 * Capture BioCross screens into /tmp/biocross-shots and build a collage.
 */
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const OUT = '/tmp/biocross-shots';
const BASE = 'http://localhost:8081';
const ARTIFACT = '/opt/cursor/artifacts/biocross_all_screens.jpg';

const SCREENS = [
  // Onboarding
  { id: '01_welcome', path: '/onboarding/welcome', label: 'Welcome' },
  { id: '02_create_profile', path: '/onboarding/create-profile', label: 'Create Profile' },
  { id: '03_health_profile', path: '/onboarding/health-profile', label: 'Health Profile' },
  { id: '04_review_import', path: '/onboarding/review-import', label: 'Review Import' },
  { id: '05_profile_ready', path: '/onboarding/profile-ready', label: 'Profile Ready' },
  { id: '05b_preferences', path: '/onboarding/preferences', label: 'Preferences' },
  { id: '06_complete', path: '/onboarding/complete', label: "You're All Set" },
  // Auth
  { id: '07_sign_in', path: '/auth/sign-in', label: 'Sign In' },
  { id: '08_sign_up', path: '/auth/sign-up', label: 'Sign Up' },
  // Tabs (after demo)
  { id: '09_home', path: '/(tabs)/home', label: 'Home', afterDemo: true },
  { id: '10_history', path: '/(tabs)/history', label: 'History', afterDemo: true },
  { id: '11_scan', path: '/(tabs)/check', label: 'Scan / Check', afterDemo: true },
  { id: '12_updates', path: '/(tabs)/updates', label: 'Updates', afterDemo: true },
  { id: '13_profile', path: '/(tabs)/profile', label: 'Profile', afterDemo: true },
  // Check flow
  { id: '14_search', path: '/check/search', label: 'Search', afterDemo: true },
  { id: '15_manual_barcode', path: '/check/manual-barcode', label: 'Manual Barcode', afterDemo: true },
  { id: '16_scanner', path: '/check/scanner', label: 'Scanner', afterDemo: true },
  { id: '17_confirm', path: '/check/confirm?supplementId=sup-catalog-testo', label: 'Confirm Product', afterDemo: true },
  { id: '18_analyzing', path: '/check/analyzing?supplementId=sup-catalog-mag', label: 'Analyzing', afterDemo: true, waitMs: 1200 },
  { id: '19_label_review', path: '/check/label-review?supplementId=sup-catalog-mag', label: 'Label Review', afterDemo: true },
  { id: '20_issue_unknown', path: '/check/issue?kind=unknown_product', label: 'Unknown Product', afterDemo: true },
  { id: '21_issue_permission', path: '/check/issue?kind=permission', label: 'Permission', afterDemo: true },
  { id: '22_issue_scan_fail', path: '/check/issue?kind=scan_failure', label: 'Scan Failure', afterDemo: true },
  // Profile & settings
  { id: '23_notifications', path: '/profile/notifications', label: 'Notifications', afterDemo: true },
  { id: '24_privacy', path: '/profile/privacy', label: 'Privacy', afterDemo: true },
  { id: '25_appearance', path: '/profile/appearance', label: 'Appearance', afterDemo: true },
  { id: '26_medications', path: '/profile/medications', label: 'Medications', afterDemo: true },
  { id: '27_add_medication', path: '/profile/add-item?section=medications', label: 'Add Medication', afterDemo: true },
  { id: '28_export', path: '/profile/export-data', label: 'Export Data', afterDemo: true },
  // Legal
  { id: '29_disclaimer', path: '/legal/disclaimer', label: 'Disclaimer', afterDemo: true },
  { id: '30_privacy_policy', path: '/legal/privacy', label: 'Privacy Policy', afterDemo: true },
  { id: '31_how_it_works', path: '/legal/how-it-works', label: 'How It Works', afterDemo: true },
  // Results
  { id: '32_result_high', path: '/result/check-sjw', label: 'High Risk Result', afterDemo: true },
  { id: '33_result_low', path: '/result/check-vitd', label: 'No Known Conflicts', afterDemo: true },
  { id: '34_result_caution', path: '/result/check-ash', label: 'Caution Result', afterDemo: true },
  { id: '35_result_more_info', path: '/result/check-more-info', label: 'More Info Needed', afterDemo: true },
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
  fs.mkdirSync('/opt/cursor/artifacts', { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: '/usr/local/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=390,844'],
    defaultViewport: { width: 390, height: 844, deviceScaleFactor: 2 },
  });

  const page = await browser.newPage();
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
  console.log('captured', results.length, 'screens — building collage…');

  execSync(`python3 /workspace/scripts/make-collage.py`, { stdio: 'inherit' });
  console.log('collage written to', ARTIFACT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
