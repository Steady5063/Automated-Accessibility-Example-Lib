# Playwright Automated Accessibility Testing


<p align="center">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO90ZE23-8lq4Hn3OvJSYgfEKzk5auU77Pig&s" height="70px" width="100px" alt="" />
</p>

This Playwright testing project houses two different spec files that demonstrate the different ways to test for accessibility in your UI test cases.

## Using Axe-core/Playwright

The package `@axe-core/playwright` package is an integration supported by Deque Systems. It is a very clean integration with full flexibility to write you accessibility tests the way you want. 


View file, <b>axecore-playwright.spec.cy.js</b> for more examples and use cases

```js

  //Simple axe test that runs only the standard ruleset
  test('Axe Scan - No customization', async () => {
    await page.goto('https://nuro.co/');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.length).toBe(0);
  });

```

## Using axe-playwright

The other testing library that utilizes axe-core is `axe-playwright`, a community driven implementation. This implementation works a bit differently than the Deque supported library. 

The library is setup to make accessibility very simple in just a few steps. You simply need to add a function of `injectAxe(page)` in your setup steps, and then simply call `checkA11y(page)` to get your accessibility matcher and results!


View file View file, <b>axe-playwright.spec.cy.js</b> for more examples and use cases

```js

  //Injecting axe into the page object before every test case
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    await injectAxe(page)
  });

  //Simple axe test that runs only the standard ruleset
  test('Axe Playwright Simple Scan - No customization', async () => {
    await page.goto('https://nuro.co/');
    await checkA11y(page)
  });

```
