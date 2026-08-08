import { expect, test } from '@playwright/test';

test('landing page opens the workspace', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /enter workspace/i })).toBeVisible();
  await page.getByRole('link', { name: /enter workspace/i }).click();
  await expect(page).toHaveURL(/\/app(\/holly)?\/?$/);
  await expect(page.getByRole('heading', { name: 'Holly' })).toBeVisible();
});

test('employee switching, tabs, chat, and theme work', async ({ page }) => {
  await page.goto('/app/holly');
  await expect(page.getByRole('heading', { name: 'Holly' })).toBeVisible();

  const tabs = page.getByRole('navigation', { name: 'Employee workspace tabs' });
  await page.getByLabel('Message composer').fill('Payroll looks short — investigate it');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Payroll looks short — investigate it').first()).toBeVisible();
  await expect(
    page.getByText(/HR Workforce Intelligence|Recommended approach|Immediate next steps/i).first(),
  ).toBeVisible({ timeout: 20_000 });

  await tabs.getByRole('button', { name: 'Actions' }).click();
  await expect(page.getByRole('heading', { name: 'Agent actions' })).toBeVisible();
  await page.getByRole('button', { name: 'Approve' }).first().click();

  await page.getByRole('link', { name: /Calvin/i }).first().click();
  await expect(page).toHaveURL(/\/app\/calvin/);
  await expect(page.getByRole('heading', { name: 'Calvin' })).toBeVisible();

  await page.goto('/app/settings');
  await page.getByRole('button', { name: 'dark', exact: true }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
});
