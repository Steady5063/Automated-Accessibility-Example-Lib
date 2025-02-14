# IBM Equal Access Accessibility Checker


<p align="center">
<img src="https://store-images.s-microsoft.com/image/apps.52349.8f791e1c-0956-48ac-ab7c-1abcf495cca0.1ec69e78-76af-4500-84e7-352b024211c7.86330390-708c-403a-9375-eb79620ba9bb" height="70px" width="100px" alt="" />
</p>

This IBM Accessibility Checker example houses the use of the accessibility checker and how it works and functions in UI testing project. In this example we use playwright and run ACE against the contents of the page. 

## Using ACE In UI Test Cases

Accessibility checker allows for use of the Accessibility checker engine to run against your content. 

View file, <b>ace.spec.js</b> for more examples of integration and how to use multiple different rulesets behind the scenes

```js

  test("General Ace Run", async () => {
    await page.goto('https://www.normalil.gov/8/Departments');
    const html = await page.content();
    let results = await aChecker.getCompliance(html, "A11yNormalReport").then((results) => {
        return results;
    });
    await aChecker.close();
  }, 10000)


```

View file, <b>aceconfig.js</b> for more example configuration object. In this projects configuration we are running standard rules and outputting the results in HTML format. 
