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
  await page.evaluate(() => {
    localStorage.removeItem('wi-workspace');
    localStorage.removeItem('wi-workspace-v2');
  });
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Chats' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();

  await page.getByRole('link', { name: /HR Intelligence/i }).first().click();
  await expect(page).toHaveURL(/\/app\/holly/);
  await expect(page.getByRole('heading', { name: 'HR Intelligence' })).toBeVisible();
  await expect(page.getByText('Holly', { exact: true }).first()).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary' })).toHaveCount(0);

  await page.getByRole('button', { name: 'Back to chats' }).click();
  await expect(page).toHaveURL(/\/app\/?$/);
  await expect(page.getByRole('heading', { name: 'Chats' })).toBeVisible();
});

test('iPhone office intelligence tasks and settings tabs work', async ({ page }) => {
  await page.goto('/app');
  const nav = page.getByRole('navigation', { name: 'Primary' });

  await nav.getByRole('link', { name: 'Office' }).click();
  await expect(page.getByRole('heading', { name: 'Your AI workforce' })).toBeVisible();

  await nav.getByRole('link', { name: 'Intelligence' }).click();
  await expect(page.getByRole('heading', { name: 'Intelligence layer' })).toBeVisible();

  await nav.getByRole('link', { name: 'Tasks' }).click();
  await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();

  await nav.getByRole('link', { name: 'Settings' }).click();
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
});
