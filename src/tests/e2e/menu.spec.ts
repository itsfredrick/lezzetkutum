import { test, expect } from '@playwright/test';

test('Menu Page Visual Smoke Test', async ({ page }) => {
    await page.goto('/menu');

    // Check for week selector
    await expect(page.getByText('Bu Hafta')).toBeVisible();

    // Check for recipe cards
    await expect(page.getByText('Izgara Tavuk ve Kök Sebzeler')).toBeVisible();

    // Check for filters
    await expect(page.getByText('İmza Tabaklar')).toBeVisible();

    // Visual snapshots
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({ path: 'src/tests/e2e/screenshots/baseline/menu-desktop.png' });

    await page.setViewportSize({ width: 360, height: 800 });
    await page.screenshot({ path: 'src/tests/e2e/screenshots/baseline/menu-mobile.png' });
});
