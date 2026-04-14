const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Navigation Accessibility', () => {
  const pagePath = path.join(process.cwd(), 'a11y-test-page.html');
  let skipLink;
  let mainContent;
  let accordionLink;
  let modalLink;
  let resourcesLink;
  let supportLink;
  let moreButton;
  let guidesLink;
  let examplesLink;
  let contactLink;

  test.beforeEach(async ({ page }) => {
    await page.goto(`file://${pagePath}`);

    skipLink = page.getByRole('link', { name: 'Skip to main content' });
    mainContent = page.locator('#main-content');
    accordionLink = page.getByRole('link', { name: 'Accordion' });
    modalLink = page.getByRole('link', { name: 'Modal' });
    resourcesLink = page.getByRole('link', { name: 'Resources' });
    supportLink = page.getByRole('link', { name: 'Support' });
    moreButton = page.getByRole('button', { name: 'More' });
    guidesLink = page.getByRole('link', { name: 'Guides' });
    examplesLink = page.getByRole('link', { name: 'Examples' });
    contactLink = page.getByRole('link', { name: 'Contact' });
  });

  //Navigating to the skip link, and ensuring it goes to the main content of the site
  test('should move focus to main content when the skip link is activated', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(mainContent).toBeFocused();
  });

  //Navigating and ensure all items in the navigation are focusable with tab key. 
  test('should allow users to tab through each top-level navigation item', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(accordionLink).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(modalLink).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(resourcesLink).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(supportLink).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(moreButton).toBeFocused();
  });

  //Navigating to the "more" dropdown of the menu, and ensuring each item is navigable with tab key (TODO: add arrow key test)
  test('should open the More menu and allow users to tab through its links', async ({ page }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(moreButton).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(moreButton).toHaveAttribute('aria-expanded', 'true');
    await expect(guidesLink).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(guidesLink).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(examplesLink).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(contactLink).toBeFocused();
  });
});
