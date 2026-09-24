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
    await expect(page.getByText("Order placed", { exact: true }).first()).toBeVisible();
    await expect
      .poll(async () => page.getByText("Ready for pickup").count(), {
        timeout: 8000,
      })
      .toBeGreaterThan(0);
    await page.getByRole("button", { name: "I picked this up" }).click();
    await expect(page.getByText("Picked up", { exact: true }).first()).toBeVisible();
  });

  test("reorder from order history adds items to cart", async ({ page }) => {
    await page.goto("/shop");
    await page.getByRole("button", { name: "Add to cart" }).first().click();
    await page.goto("/checkout");
    await page.getByRole("button", { name: /Place order/i }).click();
    await expect(page.getByRole("heading", { name: "Order placed" })).toBeVisible();
    await page.goto("/account/orders");
    await expect(page.getByRole("heading", { name: "Order history" })).toBeVisible();
    await page.getByRole("button", { name: "Reorder" }).first().click();
    await expect(page).toHaveURL(/\/checkout/, { timeout: 8000 });
    await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
  });

  test("pharmacy refill advances tracker", async ({ page }) => {
    await page.goto("/pharmacy");
    await page.locator("#refill-label-rx-1001").first().click();
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
      page.getByRole("heading", { name: "Bring big moments to life" }),
    ).toBeVisible();
    await page.goto("/stores");
    await expect(page.getByRole("heading", { name: "Find a store" })).toBeVisible();
    await page.getByLabel("Search by ZIP, city, or store").fill("94102");
    await expect(page.getByText(/Showing \d+ of \d+ nearby stores/i)).toBeVisible();
  });

  test("wishlist save and pharmacy chat respond", async ({ page }) => {
    await page.goto("/shop/cerave-moisturizing-cream");
    await page.getByRole("button", { name: "Save for later" }).click();
    await expect(page.getByRole("button", { name: "Saved" })).toBeVisible();
    await page.goto("/wishlist");
    await expect(page.getByRole("heading", { name: "Wishlist" })).toBeVisible();
    await expect(page.getByText(/1 saved item/i)).toBeVisible();

    await page.goto("/pharmacy/chat");
    await expect(page.getByRole("heading", { name: "Pharmacy Chat" })).toBeVisible();
    await page.getByLabel("Chat message").fill("When is my refill ready?");
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByText(/Pharmacy dashboard/i).first()).toBeVisible();
  });

  test("store inventory shows pickup ETA and changes by store", async ({
    page,
  }) => {
    await page.goto("/shop");
    await expect(page.getByText(/Pickup ETAs for/i)).toBeVisible();
    await expect(page.getByText(/Ready in ~\d+ min/i).first()).toBeVisible();

    await page.goto("/shop/cerave-moisturizing-cream");
    await expect(
      page.getByText("Ready in ~30 min", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText(/Aisle 4/i).first()).toBeVisible();

    await page.goto("/stores");
    await page
      .locator("li")
      .filter({ hasText: "Mission & 16th" })
      .getByRole("button", { name: /Use this store/i })
      .click();
    await expect(page).toHaveURL(/\/pharmacy/);
    await page.goto("/shop/cerave-moisturizing-cream");
    await expect(page.getByText(/Out at Mission/i).first()).toBeVisible();
  });

  test("pdp size gallery and shop sort work", async ({ page }) => {
    await page.goto("/shop/cerave-moisturizing-cream");
    await expect(page.getByRole("heading", { name: "Moisturizing Cream" })).toBeVisible();
    await page.getByRole("button", { name: /16 oz/i }).click();
    await expect(page.getByText("$25.59").first()).toBeVisible();
    await page.getByRole("tab", { name: "Detail" }).click();
    await expect(page.getByText(/Viewing Detail/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Frequently bought with" })).toBeVisible();

    await page.goto("/shop");
    await page.getByLabel("Sort products").selectOption("price-asc");
    await expect(page.getByText(/Showing \d+ products/i)).toBeVisible();
  });

  test("clinical schedule offers day and time slots", async ({ page }) => {
    await page.goto("/pharmacy/schedule");
    await expect(page.getByRole("heading", { name: "Schedule a visit" })).toBeVisible();
    await page.getByRole("button", { name: /Mon|Tue|Wed|Thu|Fri|Sat/i }).first().click();
    await page.getByRole("button", { name: /^\d{2}:00$/ }).first().click();
    await page.getByRole("button", { name: "Request appointment" }).click();
    await expect(page.getByRole("heading", { name: "Request received" })).toBeVisible();
  });
});
