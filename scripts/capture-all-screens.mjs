import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const outDir = '/opt/cursor/artifacts/screenshots/all-screens'
const base = 'http://127.0.0.1:4173'

await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
})
const page = await context.newPage()

async function shot(name) {
  const file = path.join(outDir, `${name}.png`)
  await page.screenshot({ path: file, fullPage: false })
  console.log(`saved ${name}`)
}

await page.goto(`${base}/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await shot('01-landing')

await page.goto(`${base}/onboarding`, { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await shot('02-onboarding-1')
await page.getByRole('button', { name: 'Continue' }).click()
await page.waitForTimeout(350)
await shot('03-onboarding-2')
await page.getByRole('button', { name: 'Continue' }).click()
await page.waitForTimeout(350)
await shot('04-onboarding-3')

await page.goto(`${base}/discover`, { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await shot('05-discover')

await page.goto(`${base}/c/maya.kill`, { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await shot('06-profile-maya')

await page.goto(`${base}/c/frame.roast`, { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await shot('07-profile-frame')

await page.goto(`${base}/c/devonroast`, { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await shot('08-profile-devon')

await page.goto(`${base}/messages`, { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await shot('09-messages')

await page.goto(`${base}/settings`, { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await shot('10-settings')

await page.goto(`${base}/c/maya.kill`, { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
await page.getByRole('button', { name: /Backstage|Ink Club|Green Room/i }).click()
await page.waitForTimeout(450)
await shot('11-unlock-subscribe')

await page.getByRole('button', { name: 'Close' }).click()
await page.waitForTimeout(300)
await page.getByRole('button', { name: 'Tip' }).first().click()
await page.waitForTimeout(450)
await shot('12-unlock-tip')

await browser.close()
console.log('done')
