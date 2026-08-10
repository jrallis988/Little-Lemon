import { expect, test } from "@playwright/test";

test.describe("Walgreens RX smoke flows", () => {
  test("home shows Walgreens RX branding", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Walgreens RX home" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "drugstore",
    );
  });

  test("shop add to cart updates badge and checkout confirms", async ({
    page,
  }) => {
    await page.goto("/shop");
    await page.getByRole("button", { name: "Add to cart" }).first().click();
    await expect(page.getByRole("button", { name: /Cart, 1 item/i })).toBeVisible({
      timeout: 8000,
    });

    await page.goto("/checkout");
    await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
    await page.getByRole("button", { name: /Place order/i }).click();
    await expect(page.getByRole("heading", { name: "Order placed" })).toBeVisible();
  });

  test("pharmacy refill advances tracker", async ({ page }) => {
    await page.goto("/pharmacy");
    await page.locator("#refill-label-rx-1001").click();
    await page.getByRole("button", { name: /Refill selected \(1\)/i }).click();
    await expect(page.getByText(/Refill submitted/i)).toBeVisible();
    await expect(page.getByText("Processing…")).toBeVisible();
    await expect
      .poll(async () => page.getByText("Ready").count(), { timeout: 6000 })
      .toBeGreaterThan(0);
  });

  test("product detail page loads", async ({ page }) => {
    await page.goto("/shop/cerave-moisturizing-cream");
    await expect(
      page.getByRole("heading", { name: "Moisturizing Cream" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Add to cart" }).first().click();
    await expect(page.getByText("Added to cart")).toBeVisible();
  });

  test("deals photo and stores pages render", async ({ page }) => {
    await page.goto("/deals");
    await expect(page.getByRole("heading", { name: "Weekly deals" })).toBeVisible();
    await page.goto("/photo");
    await expect(
      page.getByRole("heading", { name: "Make summer memories" }),
    ).toBeVisible();
    await page.goto("/stores");
    await expect(page.getByRole("heading", { name: "Find a store" })).toBeVisible();
  });
});
