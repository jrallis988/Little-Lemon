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
    localStorage.removeItem('wi-workspace-v3');
  });
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Chats' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();

  await page.getByRole('link', { name: /Nate Manager/i }).click();
  await page.waitForURL(/\/app\/nate$/);
  await expect(page.getByRole('button', { name: 'Back to chats' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Manager', exact: true })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary' })).toHaveCount(0);

  await page.getByRole('button', { name: 'Back to chats' }).click();
  await page.waitForURL(/\/app\/?$/);
  await expect(page.getByRole('heading', { name: 'Chats' })).toBeVisible();
});

test('iPhone office intelligence tasks and settings tabs work', async ({ page }) => {
  await page.goto('/app');
  const nav = page.getByRole('navigation', { name: 'Primary' });

  await nav.getByRole('link', { name: 'Office' }).click();
  await expect(page.getByRole('heading', { name: 'Your AI workforce' })).toBeVisible();
  await expect(page.getByText('Nate').first()).toBeVisible();
  await expect(page.getByText('Mia').first()).toBeVisible();

  await nav.getByRole('link', { name: 'Intelligence' }).click();
  await expect(page.getByRole('heading', { name: 'Intelligence layer' })).toBeVisible();

  await nav.getByRole('link', { name: 'Tasks' }).click();
  await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();

  await nav.getByRole('link', { name: 'Settings' }).click();
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
});
