const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Modal Focus Order', () => {
  const pagePath = path.join(process.cwd(), 'a11y-test-page.html');


  //Opening the focus, ensuring keyboard focus is put directly into the modal
  test('should move focus into modal on open', async ({ page }) => {
    await page.goto(`file://${pagePath}`);

    const modalTrigger = page.locator('#open-modal');
    const modalTitle = page.locator('#modal-title');

    await modalTrigger.focus();
    await expect(modalTrigger).toBeFocused();

    await modalTrigger.press('Enter');
    await expect(modalTitle).toBeFocused();
  });

  //Opening the modal, then returning focus back to the trigger it came from
  test('should return focus to trigger when modal closes', async ({ page }) => {
    await page.goto(`file://${pagePath}`);

    const modalTrigger = page.locator('#open-modal');
    const modalTitle = page.locator('#modal-title');
    const modalClose = page.locator('#modal-close');

    await modalTrigger.focus();
    await expect(modalTrigger).toBeFocused();

    await modalTrigger.press('Enter');
    await expect(modalTitle).toBeFocused();

    await modalClose.press('Enter');
    await expect(modalTrigger).toBeFocused();
  });

  //Test that ensures focus stays trapped within the modal with shift+tab
  //TODO: adding in arrow keys as well
  test('should trap focus inside modal with Tab and Shift+Tab', async ({ page }) => {
    await page.goto(`file://${pagePath}`);

    const modalTrigger = page.locator('#open-modal');
    const modalClose = page.locator('#modal-close');
    const modalAction = page.locator('#modal-action');

    await modalTrigger.click();

    await modalClose.focus();
    await expect(modalClose).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(modalAction).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(modalClose).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(modalAction).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(modalClose).toBeFocused();
  });
});
