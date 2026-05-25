const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');
const {axeTextReport} = require('axe-reporting-utils');
test.describe('Watch example site', () => {
  let page, browser; 

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async ({ browser }) => {
    await browser.close();
  });

  //Simple axe test that runs only the standard rulesetm using the text report from axe-reporting-utils
  test('Axe Scan - No customization', async () => {
    await page.goto('https://nuro.co/');

    const results = await new AxeBuilder({ page }).analyze();
    axeTextReport(results, './accessibility-reports/nuro-report.txt');

    expect(results.violations.length).toBe(0);
  });

  //Axe test that runs custom configurations
  test('Axe Scan - Custom Rules Configuration', async () => {
    const axeconfig = {
      rules: [
        {
          id: 'html-has-lang',
          enabled: false
        }
      ],
    };
    await page.goto('https://nuro.co/');

    const results = await new AxeBuilder({ page, axeconfig }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    
    expect(results.violations.length).toBe(0);
  });
});