# IBM Equal Access Accessibility Checker


<p align="center">
<img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fgithub.com%2Fibma&psig=AOvVaw2D7q_fDtLugDX747maz0IX&ust=1739590847102000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCuyIafwosDFQAAAAAdAAAAABAE" height="70px" width="100px" alt="" />
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