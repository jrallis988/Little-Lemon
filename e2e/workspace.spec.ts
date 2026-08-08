import { expect, test } from '@playwright/test';

test('landing page opens the workspace', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /enter workspace/i })).toBeVisible();
  await page.getByRole('link', { name: /enter workspace/i }).click();
  await expect(page).toHaveURL(/\/app(\/calvin)?\/?$/);
  await expect(page.getByRole('heading', { name: 'Calvin' })).toBeVisible();
});

test('employee switching, tabs, chat, and theme work', async ({ page }) => {
  await page.goto('/app/calvin');
  await expect(page.getByRole('heading', { name: 'Calvin' })).toBeVisible();

  const tabs = page.getByRole('navigation', { name: 'Employee workspace tabs' });
  await tabs.getByRole('button', { name: 'Tasks' }).click();
  await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();

  await tabs.getByRole('button', { name: 'Chat' }).click();
  await page.getByLabel('Message composer').fill('Draft an onboarding checklist');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Draft an onboarding checklist').first()).toBeVisible();
  await expect(page.getByText(/Recommended approach|Immediate next steps/i)).toBeVisible({
    timeout: 15_000,
  });

  await page.getByRole('link', { name: /Holly/i }).first().click();
  await expect(page).toHaveURL(/\/app\/holly/);
  await expect(page.getByRole('heading', { name: 'Holly' })).toBeVisible();

  await page.goto('/app/settings');
  await page.getByRole('button', { name: 'dark', exact: true }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
});
