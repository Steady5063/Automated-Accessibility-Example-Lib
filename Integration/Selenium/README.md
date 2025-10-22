# Accessibility Testing with Selenium JS

<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Selenium_logo.svg/1280px-Selenium_logo.svg.png" alt="Selenium Logo" width="200">
  <br>
  <p><em>Automated accessibility testing using Selenium and axe-core</em></p>
</div>

## Overview

This project demonstrates automated accessibility testing using `@axe-core/webdriverjs`

## Using @axe-core/webdriverjs

### Basic Usage

The `@axe-core/webdriverjs` library integrates seamlessly with any selenium based UI testing project to provide automated accessibility testing. Here's how to set it up:

```javascript

const { Builder } = require('selenium-webdriver');
const AxeBuilder = require('@axe-core/webdriverjs');

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    axeDriver = await new AxeBuilder(driver);
  });

```

Then to run it in a test case: 

```javascript

  test('Basic accessibility scan', async () => {
    await driver.get('https://www.example.com');
    
    const results = await axeDriver.analyze();
    
    expect(results.violations.length).toEqual(0);
  }, 30000);

```
