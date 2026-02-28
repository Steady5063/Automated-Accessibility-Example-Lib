# Accessibility Testing with @axe-core/webdriverio

<div align="center">
  <img src="https://fleekitsolutions.com/wp-content/uploads/2023/09/webdriverio.png" alt="WDIO Logo" width="200">
  <br>
  <p><em>Automated accessibility testing using WDIO and axe-core and Accessibility selectors</em></p>
</div>

## Overview

This project demonstrates automated accessibility testing using `@axe-core/webdriverio`

## Using @axe-core/webdriverio

### Basic Usage

The `@axe-core/webdriverio` library integrates seamlessly with Puppeteer to provide automated accessibility testing. Here's how to set it up:

```javascript
    beforeEach(async () => {
        await browser.url('https://www.normalil.gov/');
        axe = new AxeBuilder({ client: browser });
    });
    
    // Basic full page accessibility scan
    it('should have no accessibility violations on homepage', async () => {
        const results = await axe.analyze();

        expect(results.violations).toHaveLength(0);
    });
```

## Accessibility Selectors

WDIO comes with accessibility selectors you can use to further write regression tests to ensure your application remains accessible 


```javascript
    // Use aria selector to find elements by their accessible name containing "Opens in a new window"
    it('should ensure all social links have "opens in new window" within the label', async () => {
        const fbLink = await $('aria/Facebook opens in new window');
        const instaLink = await $('aria/Instagram opens in new window');
        
        expect(fbLink).toHaveText("Facebook opens in new window");
        expect(instaLink).toHaveText("Facebook opens in new window");
    });
    
```
