# Semantica11y Accessibility Testing

<p align="center">
<img src="https://media.licdn.com/dms/image/v2/D5622AQGesCZdmU6big/feedshare-shrink_800/B56Z5fRmg6KcAc-/0/1779714910497?e=2147483647&v=beta&t=WrvuX6KsIjAy6aVgzPf3C9K27W5CL3CiR4ngtqHKvJc" height="100px" width="140px" alt="" />
</p>

This Semantica11y example project houses the use of the Semantica11y accessibility engine and how it works inside a UI testing project. In this example we use Playwright and run Semantica11y against the contents of the Normal, IL government site.

## Using Semantica11y In UI Test Cases

Semantica11y allows you to scan page HTML for semantic HTML and ARIA issues, then create a text report from the results.

View file, <b>tests/example.spec.js</b> for more examples of integration and how to create a text report from the semantic data object.

```js

  test('runs semantica11y against the Normal, IL government site', async ({ page }) => {
    const response = await page.goto('https://www.normalil.gov/8/Departments', { waitUntil: 'domcontentloaded' });
    expect(response?.ok()).toBeTruthy();

    const analyzer = new Analyzer();
    const results = await analyzer.analyzeHTML(await page.content(), page.url());

    await exportTextReport(results, reportPath);

    expect(results.summary.errors).toBe(0);
    expect(results.summary.warnings).toBe(0);
  });

```

## Semantica11y Text Report

Within the test file, Semantica11y creates a text report and stores it in the accessibility reports folder.

```js

  await exportTextReport(results, reportPath);

```

The report output is written to <b>accessibility-reports/semantica11y-normalil-report.txt</b>.
