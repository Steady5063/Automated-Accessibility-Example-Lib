# Accessibility Testing with @axe-core/puppeteer

<div align="center">
  <img src="https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png" alt="Puppeteer Logo" width="200">
  <br>
  <p><em>Automated accessibility testing using Puppeteer and axe-core</em></p>
</div>

## Overview

This project demonstrates automated accessibility testing using `@axe-core/puppeteer`

## Using @axe-core/puppeteer

### Basic Usage

The `@axe-core/puppeteer` library integrates seamlessly with Puppeteer to provide automated accessibility testing. Here's how to set it up:

```javascript
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

const browser = await puppeteer.launch();
const page = await browser.newPage();

  test('is accessible homepage', async () => {
    await page.goto('https://www.normalil.gov/');
    
    const results = await new AxePuppeteer(page).analyze();
    expect(results.violations).toHaveLength(0);
  });
```

