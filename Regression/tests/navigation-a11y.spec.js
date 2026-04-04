const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Navigation Accessibility', () => {
  const pagePath = path.join(process.cwd(), 'a11y-test-page.html');

  test('should move focus to main content when the skip link is activated', async ({ page }) => {
    await page.goto(`file://${pagePath}`);

    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    const mainContent = page.locator('#main-content');

    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(mainContent).toBeFocused();
  });
});
