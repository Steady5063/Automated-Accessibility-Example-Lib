# React Testing Library Automated Accessibility Testing


<p align="center">
<img src="https://kyan-2015.s3.eu-west-1.amazonaws.com/production-2018/uploads/news_entry/image/492/og_size_react-testing-library.jpg" height="70px" width="100px" alt="" />
</p>

This React testing project houses a simple integration for accessibility testing in your component tests

## Using Axe-core and React Testing Library

One of the easiest and most effective ways in which developers can add quick accessibility testing with react testing library is the use of the axe-core engine. 

It is a simple library of test cases that generically check your page content for accessibility issues. It allows for massive amounts of customization and the ability to seamlessly test your content for accessibility issues. 

View file, <b>inaccesiblecomp.spec.js</b> for more examples and use cases

```js

  test("Accessibility check",async () => {
   const {container} = render(<InaccessibleComp />);
   const results = await axe.run(container)
   console.log(results.violations)
   expect(results.violations.length).toBe(0);
  });

```
