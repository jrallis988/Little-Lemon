import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const outDir = '/opt/cursor/artifacts/screenshots/product-spine'
const base = 'http://127.0.0.1:4173'

await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
})
const page = await context.newPage()

async function shot(name) {
  await page.screenshot({
    path: path.join(outDir, `${name}.png`),
    fullPage: false,
  })
  console.log(`saved ${name}`)
}

await page.goto(`${base}/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
await shot('01-landing')

await page.goto(`${base}/onboarding`, { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
await shot('02-onboarding')

await page.goto(`${base}/auth?mode=signup&role=fan`, { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
await shot('03-auth')

await page.goto(`${base}/discover`, { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
await shot('04-discover')

await page.goto(`${base}/creators`, { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
await shot('05-creators')

await page.goto(`${base}/c/maya.kill`, { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
await shot('06-profile')

// unlock then tip
await page.getByRole('button', { name: /Backstage/i }).click()
await page.waitForTimeout(400)
await shot('07-unlock')
await page.getByRole('button', { name: /Unlock Backstage/i }).click()
await page.waitForTimeout(900)

await page.goto(`${base}/c/maya.kill`, { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
// play a public clip if visible
const playBtn = page.locator('button').filter({ hasText: /Crowdwork|Premise/i }).first()
if (await playBtn.count()) {
  // click media via play - open first unlocked media by clicking article media
}
await page.locator('article button').first().click().catch(() => {})
await page.waitForTimeout(500)
await shot('08-player-or-profile')

await page.goto(`${base}/messages`, { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
await shot('09-backstage')

await page.goto(`${base}/settings`, { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
await shot('10-settings')

await browser.close()
console.log('done')
