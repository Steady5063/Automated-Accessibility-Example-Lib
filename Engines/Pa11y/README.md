# Cypress Automated Accessibility Testing


<p align="center">
<img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/30/posts/34538/image/pa11y.png" height="70px" width="100px" alt="" />
</p>

This Pa11y example project houses two different ways to use the Pa11y testing engine. 

## Using Pa11y In UI Test Cases

Pa11y allows for use of HTML Code Sniff and Axe-core rules within your UI test cases. 

View file, <b>pa11y.spec.js</b> for more examples of integration and how to use multiple different rulesets behind the scenes

```js

  test("is accessible", async () => {
    await pa11y('https://www.normalil.gov/').then((a11yResults) => {
        expect(a11yResults.issues.length).toBe(0)
    });
  })


```

## Using the Pa11y CLI

Within the 'package.json' there are multiple test commands that run Pa11y within the CLI and send back reporting out put

``` js

   "pa11y-axe" : "pa11y  https://www.normalil.gov/ --runner axe ",
   "pa11y-htmlcs" : "pa11y https://www.normalil.gov/ > pa11yreport.html --runner htmlcs --runner axe --reporter html"

```
