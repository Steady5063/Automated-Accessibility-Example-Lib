const { Builder } = require('selenium-webdriver');
const AxeBuilder = require('@axe-core/webdriverjs');

describe('Axe Accessibility Tests', () => {
  let driver, axeDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    axeDriver = await new AxeBuilder(driver);
  });

  afterAll(async () => {
    await driver.quit();
  });

  // General use of axe webdriverjs
  test('Basic accessibility scan, should have no issues', async () => {
    await driver.get('https://www.normalil.gov/');
    await driver.sleep(1000);
    
    // Inject and run axe
    const results = await axeDriver.analyze();

    expect(results.violations.length).toEqual(0);
  }, 30000);

  //Scaning a specific section/component
  test('Accessibility scan a specific page region for accessibility issues', async () => {
    await driver.get('https://www.normalil.gov/');
    await driver.sleep(1000);
    
    // Run axe on a specific context with WCAG 2AA standard
    const results = await axeDriver.exclude('nav').options({runOnly: {
        type: 'tag',
        values: ['wcag2aa']
      }}).analyze();

    expect(results.violations.length).toEqual(0);
   }, 30000);

});