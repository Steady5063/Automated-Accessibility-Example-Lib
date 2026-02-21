const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

describe('Accessibility Testing Normal Website', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  // Basic full page accessibility scan
  test('is accessible homepage', async () => {
    await page.goto('https://www.normalil.gov/');
    
    const results = await new AxePuppeteer(page).analyze();
    expect(results.violations).toHaveLength(0);
  });


  // Excluding certain elements from testing
  test('is accessible homepage excluding footer widgets', async () => {
    await page.goto('https://www.normalil.gov/');
    
    const results = await new AxePuppeteer(page).exclude('footer .social-media')
      .exclude('.advertisement').analyze();
    
    expect(results.violations).toHaveLength(0);
  });

  // Testing with specific rules only
  test('is accessible colors on homepage', async () => {
    await page.goto('https://www.normalil.gov/');
    
    const results = await new AxePuppeteer(page)
      .options({
        runOnly: ['color-contrast']
      })
      .analyze();
    
    expect(results.violations).toHaveLength(0);
  });



  //  Testing mobile viewport accessibility
  test('is accessible on mobile viewport of homepage', async () => {
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('https://www.normalil.gov/');
    
    const results = await new AxePuppeteer(page).analyze();
    
    expect(results.violations).toHaveLength(0);
  });


});