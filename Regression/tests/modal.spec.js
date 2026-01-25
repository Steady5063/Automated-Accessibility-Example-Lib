import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Modal Focus Management Accessibility Tests', () => {

  const __dirname = path.join(process.cwd(), 'a11y-test-page.html')  

    // ** Common Selectors for Testing **
  let openModalBtn, modalTitle, modalClose, modalAction, modalOverlay;

  test.beforeEach(async ({ page }) => {
    openModalBtn = page.locator('#open-modal');
    modalClose = page.locator('#modal-close');
    modalAction = page.locator('#modal-action');
    modalTitle = page.locator('#modal-title');
    modalOverlay = page.locator('#modal-overlay');

   await page.goto('file://' + __dirname); 
  });

  test('focus should move to modal heading when opened with Enter key', async ({ page }) => {
    
    await openModalBtn.focus();
    await page.keyboard.press('Enter');
    
    await expect(modalTitle).toBeFocused();
  });

  test('focus should stay trapped within modal when tabbing', async ({ page }) => {
    await openModalBtn.focus();
    await page.keyboard.press('Enter');
    
    await expect(modalTitle).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(modalClose).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(modalAction).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(modalTitle).toBeFocused();
  });

  test('focus should stay trapped when shift-tabbing backwards', async ({ page }) => {

    await openModalBtn.focus();
    await page.keyboard.press('Enter');
    
    await expect(modalTitle).toBeFocused();
    
    await page.keyboard.press('Shift+Tab');
    await expect(modalAction).toBeFocused();
    
    await page.keyboard.press('Shift+Tab');
    await expect(modalClose).toBeFocused();
    
    await page.keyboard.press('Shift+Tab');
    await expect(modalTitle).toBeFocused();
  });

  test('focus should return to trigger button when modal closed with Escape key', async ({ page }) => {
    
    await openModalBtn.focus();
    await page.keyboard.press('Enter');
    
    await expect(modalOverlay).toBeVisible();
    
    await page.keyboard.press('Escape');
    
    await expect(modalOverlay).not.toBeVisible();
    await expect(openModalBtn).toBeFocused();
  });
});