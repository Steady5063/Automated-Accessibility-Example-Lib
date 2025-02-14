
const { chromium } = require('playwright');
const aChecker = require("accessibility-checker");

describe("Town of Normal Website - Testing ACE Library", () => {

let browser, context, page = null;

  beforeAll(async () =>{
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
  });


  afterAll(async () =>{
    await browser.close();
  })

  /*
  * Test: Standard test case setup using ACE checker to audit a page for accessibility issues. 
  * Test Engine: Runs all issues out of the box, no customization, no fail
  */
  test("General Ace Run", async () => {
    await page.goto('https://www.normalil.gov/8/Departments');
    const html = await page.content();
    let results = await aChecker.getCompliance(html, "A11yNormalReport").then((results) => {
        return results;
    });
    await aChecker.close();
  }, 10000)

  /*
  * Test: Standard test case setup check only for violations
  * Test Engine: Runs all issues out of the box, checking only for violations
  */
  test("General Ace Run - checking for total violations", async () => {
    await page.goto('https://www.normalil.gov/8/Departments');
    const html = await page.content();
    let results = await aChecker.getCompliance(html, "A11yNormalViolations").then((results) => {
        return results.report.summary.counts.violation;
    })
    await aChecker.close();
    expect(results).toBe(0);
  }, 10000)

});
