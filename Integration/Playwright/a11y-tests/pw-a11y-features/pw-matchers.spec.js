const { test, expect } = require('@playwright/test');

test.describe('Watch example site', () => {
  let page, browser; 


  //Injecting axe into the page object before every test case
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async ({ browser }) => {
    await browser.close();
  });

  //Test case showcasing how to toHaveAccessibleName matcher
  test('Playwright matcher - toHaveAccessibleName()', async () => {
    await page.goto('https://www.normalil.gov/');

    const rightSlideIcon = page.locator('.alwaysDisplayArrowNew.next');
    const leftSlideIcon = page.locator('.alwaysDisplayArrowNew.prev');

    await expect(leftSlideIcon).toHaveAccessibleName('Previous Slide'); 
    await expect(rightSlideIcon).toHaveAccessibleName('Next Slide');

  });

  //Test case showcasing how to use toHaveAccessibleErrorMessage() matcher
  //NOTE: This requires the use of aria-errormessage to work, if you use aria desribedby see test case below
  test('Playwright matcher - toHaveAccessibleErrorMessage()', async () => {
     await page.goto('https://accessibility.deque.com/contact-us-ga');
    
    const emailField = page.locator('input[name="firstname"]');

    await page.locator('input[type="submit"]').click();

    await expect(emailField).toHaveAccessibleErrorMessage('Please complete this required field.');
  });



  //Test case showcasing how to use toHaveAccessibleDescription()
  //Note: Works for testing error messages that are assocaited through aria-describedby
  test('Playwright matcher - toHaveAccessibleDescription()', async () => {
     await page.goto('https://accessibility.deque.com/contact-us-ga');
    
    const emailField = page.locator('input[name="firstname"]');

    await page.locator('input[type="submit"]').click();

    await expect(emailField).toHaveAccessibleDescription('Please complete this required field. (First Name). Press Tab to go to the input field to fix this error.');
  });

});