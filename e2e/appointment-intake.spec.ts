import { expect, test } from "@playwright/test";

test.describe("appointment intake", () => {
  test("submits a request and shows a reference ticket", async ({ page }) => {
    await page.goto("/appointments/request");

    await page.getByRole("combobox", { name: /condition or department/i }).click();
    await page.getByRole("option").first().click();
    await page.getByRole("button", { name: "Continue" }).click();

    await page.getByRole("combobox", { name: /insurance carrier/i }).click();
    await page.getByRole("option").first().click();
    await page.getByRole("button", { name: "Continue" }).click();

    await page.getByRole("radio", { name: /Longwood/i }).check();
    await page.getByRole("button", { name: "Continue" }).click();

    await page.getByLabel(/Parent \/ caregiver name/i).fill("Alex Parent");
    await page.getByLabel(/^Email/i).fill("alex.parent@example.com");
    await page.getByLabel(/Phone number/i).fill("(617) 555-0199");
    await page.getByRole("button", { name: "Submit request" }).click();

    await expect(page.getByRole("heading", { name: /Request received/i })).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByTestId("appointment-reference")).toHaveText(/BCH-\d{6}/);
  });
});

test.describe("health + seo", () => {
  test("health endpoint reports ok", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  test("robots and sitemap are available", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    const body = await sitemap.text();
    expect(body).toContain("/find-a-doctor");
  });
});
