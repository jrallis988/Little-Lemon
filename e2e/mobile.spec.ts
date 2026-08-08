import { expect, test, devices } from '@playwright/test';

const iphone = devices['iPhone 14'];

test.use({
  viewport: iphone.viewport,
  userAgent: iphone.userAgent,
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: iphone.deviceScaleFactor,
});

test('iPhone inbox opens chat and returns', async ({ page }) => {
  await page.goto('/app');
  await expect(page.getByRole('heading', { name: 'Chats' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();

  await page.getByRole('link', { name: /Holly/i }).first().click();
  await expect(page).toHaveURL(/\/app\/holly/);
  await expect(page.getByRole('heading', { name: 'Holly' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary' })).toHaveCount(0);

  await page.getByRole('button', { name: 'Back to chats' }).click();
  await expect(page).toHaveURL(/\/app\/?$/);
  await expect(page.getByRole('heading', { name: 'Chats' })).toBeVisible();
});

test('iPhone team and settings tabs work', async ({ page }) => {
  await page.goto('/app');
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Team' }).click();
  await expect(page.getByRole('heading', { name: 'Your AI team' })).toBeVisible();

  await page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: 'Settings' })
    .click();
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
});
