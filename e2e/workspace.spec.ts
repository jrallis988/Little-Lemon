import { expect, test } from '@playwright/test';

test('landing page opens the workspace', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /open workspace/i }).first()).toBeVisible();
  await page.getByRole('link', { name: /enter workspace/i }).click();
  await expect(page).toHaveURL(/\/app\/calvin/);
  await expect(page.getByRole('heading', { name: 'Calvin' })).toBeVisible();
});

test('employee switching works from sidebar', async ({ page }) => {
  await page.goto('/app/calvin');
  await page.getByRole('link', { name: /Holly/i }).first().click();
  await expect(page).toHaveURL(/\/app\/holly/);
  await expect(page.getByRole('heading', { name: 'Holly' })).toBeVisible();
});
