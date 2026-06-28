import { test, expect } from '@playwright/test';
import { Analyzer, exportTextReport, formatConsoleReport } from 'semantica11y';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const reportDirectory = path.join(__dirname, '..', 'accessibility-reports');
const reportPath = path.join(reportDirectory, 'semantica11y-normalil-report.txt');

/** 
 * Simple test case to run semantica11y against the Normal, IL 
 * government site and generate a report.
 */
test('semantica11y against the Normal, IL government site', async ({ page }) => {
  const response = await page.goto('https://www.normalil.gov/8/Departments',
     { waitUntil: 'domcontentloaded' });
  expect(response?.ok()).toBeTruthy();

  //Initialize the analyzer and analyze the page content
  const analyzer = new Analyzer();
  const results = await analyzer.analyzeHTML(await page.content(), page.url());

  await mkdir(reportDirectory, { recursive: true });
  await exportTextReport(results, reportPath);

  // Log the results to the console
  console.log(formatConsoleReport(results));

  // Assert that there are no errors or warnings in the accessibility report
  expect(results.summary.errors).toBe(0);
  expect(results.summary.warnings).toBe(0);
});
