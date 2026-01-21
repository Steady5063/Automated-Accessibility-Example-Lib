const { test, expect } = require('@playwright/test');
import path from 'path'

test.describe('Accordian Accessibility', () => {
  let page,browser; 
  const __dirname = path.join(process.cwd(), 'a11y-test-page.html')

  // ** Common Selectors for Testing **
  let accordionButton = null , accordionContent = null;

  test.beforeEach(async ({ page }) => {
    await page.goto('file://' + __dirname); 
    
    // ** Common Selectors for Testing **
    accordionButton = page.locator('#accordion-trigger');
    accordionContent = page.locator('#accordion-content');
  });

  /*
   * Checking the state of accordian by default is set to false
  */
  test('should have aria-expanded="false" by default', async ({ page }) => {
    await expect(accordionButton).toHaveAttribute('aria-expanded', 'false');
  });


  /*
   * The content is hidden by default
  */
  test('should be hidden by default', async ({ page }) => {
    await expect(accordionContent).toHaveClass(/hidden/);
    
    await expect(accordionContent).not.toBeVisible();
  });

  /*
   * On pressing Enter (OR you could use space as well), the content opens and aria-expanded state is properly set
  */
  test('should change aria-expanded to true on key press', async ({ page }) => {
    await accordionButton.focus();
    
    await page.keyboard.press('Enter');
    
    await expect(accordionButton).toHaveAttribute('aria-expanded', 'true');
  });

  /*
   * On pressing Enter (OR you could use space as well), the content is no longer hidden and available
  */
  test('should change to aria-expanded', async ({ page }) => {
    await accordionButton.focus();
    
    await page.keyboard.press('Enter');

    await expect(accordionContent).toBeVisible();
    await expect(accordionContent).not.toHaveClass(/hidden/);
  });

  /*
   * On pressing Enter (OR you could use space as well) TWICE, the content properly sets aria-expanded to false
  */
  test('should change aria-expanded to false on key press', async ({ page }) => {
    const accordionButton = page.locator('#accordion-trigger');
    
    await accordionButton.focus();
    
    await page.keyboard.press('Enter');
     await page.keyboard.press('Enter');
    
    await expect(accordionButton).toHaveAttribute('aria-expanded', 'false');
  });


});