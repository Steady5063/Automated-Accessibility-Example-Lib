const { test, expect } = require('@playwright/test');
import { injectAxe, checkA11y, getViolations, reportViolations } from 'axe-playwright'

test.describe('Watch example site', () => {
  let page, browser; 


  //Injecting axe into the page object before every test case
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    await injectAxe(page)
  });

  test.afterAll(async ({ browser }) => {
    await browser.close();
  });

  //Simple axe test that runs only the standard ruleset
  test('Axe Playwright Simple Scan - No customization', async () => {
    await page.goto('https://nuro.co/');
    await checkA11y(page)
  });

  //Axe test that runs the getViolations function()
  test('Axe Playwright - Get violations scan', async () => {
    await page.goto('https://nuro.co/');
  
    const axeresults = getViolations(page);
    expect(axeresults.length).toBe(0);
  });

  //Axe test that runs the logging report functionality
  test('Axe Playwright - Console logging', async () => {
    await page.goto('https://nuro.co/');
    await checkA11y(page, null, {
      detailedReport: true,
    });

  });



});