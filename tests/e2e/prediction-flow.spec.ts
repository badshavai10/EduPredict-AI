import { expect, test } from '@playwright/test';

test.describe('EduPredict AI Prediction Flow E2E', () => {
  test('navigates to prediction page and displays interface', async ({ page }) => {
    await page.goto('/prediction');
    await expect(page).toHaveTitle(/EduPredict AI/);
    await expect(page.locator('h1')).toContainText('Student Performance Inference');
  });
});
