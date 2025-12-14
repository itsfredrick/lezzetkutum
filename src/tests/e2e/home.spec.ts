import { test, expect } from '@playwright/test';

test('Home Page Visual Smoke Test', async ({ page }) => {
    await page.goto('/');

    // Check for hero text
    await expect(page.getByText('Akşam Yemeği Derdine Son')).toBeVisible();

    // Check for key sections
    await expect(page.getByText('Nasıl Çalışır?')).toBeVisible();
    await expect(page.getByText('Bu Haftanın Menüsü')).toBeVisible();

    // Responsive Screenshots
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({ path: 'src/tests/e2e/screenshots/baseline/home-desktop.png' });

    await page.setViewportSize({ width: 768, height: 900 });
    await page.screenshot({ path: 'src/tests/e2e/screenshots/baseline/home-tablet.png' });

    await page.setViewportSize({ width: 360, height: 800 });
    await page.screenshot({ path: 'src/tests/e2e/screenshots/baseline/home-mobile.png' });
});
