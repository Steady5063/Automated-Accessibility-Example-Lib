# Accessibility Regression Test Examples

This is the regression testing example suite. This showcases how you can test the content you create, and ensure the accessibility functionality remains in place to ensure it is accessible with any new updates in the future. 

## A Word of Caution

Regression testing DOES NOT replace testing with assistive technology and having real users test your content. This is meant to be done AFTER the content has been tested to ensure that your code is working properly for assistive technology, and its stays the way in the future. 


## Regression Test Examples

### Expand Collapse

The file 'expandandcollapse.spec.js' showcases how to test for the proper aria-expanded state on press of the keyboard. 

```js

  test('should change aria-expanded to true on key press', async ({ page }) => {
    await accordionButton.focus();
    
    await page.keyboard.press('Enter');
    
    await expect(accordionButton).toHaveAttribute('aria-expanded', 'true');
  });

```


