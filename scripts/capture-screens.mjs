import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"
import path from "node:path"

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:5173"
const OUT = process.env.OUT_DIR ?? "/opt/cursor/artifacts/screenshots"
const PREVIEW = "/workspace/public/previews"

await mkdir(OUT, { recursive: true })
await mkdir(PREVIEW, { recursive: true })

const screens = [
  { name: "01-home", path: "/", fullPage: true },
  { name: "02-catalog", path: "/catalog?department=Women", fullPage: true },
  { name: "03-pdp", path: "/product/structured-wool-blazer-camel", fullPage: true },
  { name: "04-department-women", path: "/department/women", fullPage: true },
  { name: "05-fit-quiz", path: "/fit-quiz", fullPage: true },
  { name: "06-designer-shop", path: "/shop/designer", fullPage: true },
  { name: "07-under-50", path: "/shop/under-50", fullPage: true },
  { name: "08-clearance", path: "/shop/clearance", fullPage: true },
  { name: "09-stores", path: "/stores", fullPage: true },
  { name: "10-wishlist", path: "/wishlist", fullPage: false },
  { name: "11-account", path: "/account", fullPage: false },
  { name: "12-gift-cards", path: "/gift-cards", fullPage: false },
  { name: "13-shipping-returns", path: "/shipping-returns", fullPage: true },
  { name: "14-order-status", path: "/order-status", fullPage: false },
  { name: "15-bag", path: "/bag", fullPage: false },
  { name: "16-404", path: "/this-page-does-not-exist", fullPage: false },
]

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
})
const page = await context.newPage()

// Dismiss welcome modal if present by seeding localStorage
await page.addInitScript(() => {
  localStorage.setItem("marshalls-email-modal-dismissed", "1")
  localStorage.setItem(
    "marshalls-account",
    JSON.stringify({
      state: {
        user: null,
        orders: [],
        emailSubscribers: [],
        chatTickets: [],
      },
      version: 0,
    }),
  )
})

async function shot(name, fullPage = false) {
  const file = `${name}.png`
  const dest = path.join(OUT, file)
  await page.screenshot({ path: dest, fullPage })
  await page.screenshot({ path: path.join(PREVIEW, file), fullPage: false })
  console.log("saved", file)
}

for (const screen of screens) {
  await page.goto(BASE + screen.path, { waitUntil: "networkidle", timeout: 60000 })
  await page.waitForTimeout(600)
  // Close any dialogs/modals that still appear
  const close = page.locator('[aria-label="Close"]').first()
  if (await close.isVisible().catch(() => false)) {
    await close.click().catch(() => {})
  }
  await shot(screen.name, screen.fullPage)
}

// Checkout needs a cart item — seed via PDP add
await page.goto(BASE + "/product/structured-wool-blazer-camel", {
  waitUntil: "networkidle",
})
await page.waitForTimeout(400)
const sizeBtn = page.getByRole("button", { name: "2", exact: true })
if (await sizeBtn.isVisible().catch(() => false)) await sizeBtn.click()
const add = page.getByRole("button", { name: /Add to bag/i })
if (await add.isVisible().catch(() => false)) await add.click()
await page.waitForTimeout(500)
await page.goto(BASE + "/checkout", { waitUntil: "networkidle" })
await page.waitForTimeout(500)
await shot("17-checkout", true)

// Chat open on home
await page.goto(BASE + "/", { waitUntil: "networkidle" })
await page.waitForTimeout(400)
const chat = page.getByRole("button", { name: /Open support chat|Chat/i }).first()
if (await chat.isVisible().catch(() => false)) {
  await chat.click()
  await page.waitForTimeout(500)
  await shot("18-chat", false)
}

// Mobile home
await page.setViewportSize({ width: 390, height: 844 })
await page.goto(BASE + "/", { waitUntil: "networkidle" })
await page.waitForTimeout(500)
await shot("19-home-mobile", true)
await page.goto(BASE + "/product/structured-wool-blazer-camel", {
  waitUntil: "networkidle",
})
await page.waitForTimeout(500)
await shot("20-pdp-mobile", true)

await browser.close()
console.log("done", OUT)
