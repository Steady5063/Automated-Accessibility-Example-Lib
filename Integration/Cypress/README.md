# Cypress Automated Accessibility Testing


<p align="center">
<img src="https://www.cypress.io/images/layouts/navbar-brand.svg" height="70px" width="100px" alt="" />
</p>

This Cypress testing project houses two different spec files that demonstrate the different ways to test for accessibility in your UI test cases.

## Using Cypress-Axe

One of the easiest and most effective ways in which developers can add quick accessibility testing with cypress is the use of cypress axe. 

It is a simple library of test cases that generically check your page content for accessibility issues. It allows for massive amounts of customization and the ability to seamlessly test your content for accessibility issues. 

View file, <b>axe_spec.cy.js</b> for more examples and use cases

```js

  beforeEach(() => {
    cy.visit('https://www.mylink.com');
    cy.injectAxe();
  })
  it('is an accessible homepage', () => {
    cy.checkA11y();
  })

```

## Writing Accessibility Regression Tests

Automated libraries such as cypress axe do wonders for generically testing your page, however we can go above and beyond testing page content and specifically test for accessible functionality in our test cases.

For example, lets say we have an ARIA state we need to test to ensure it is properly getting set each time. We can simply test each scenario to ensure it is functioning properly. This saves both time and effort in manual review and/or if bugs are found with assistive technology. 

```js

    it('A11y - FAQ proper expanded state', () => {
        cy.get('.myButton').first().invoke('attr', 'aria-expanded').should('eq', 'false');

        cy.get('.myButton').first().trigger('click');
        cy.waitFor(1000);
        cy.get('.myButton').first().invoke('attr', 'aria-expanded').should('eq', 'true');

        cy.get('.myButton').first().trigger('click');
        cy.waitFor(1000);
        cy.get('.myButton').first().invoke('attr', 'aria-expanded').should('eq', 'false');
    })
 
```

View file, <b>a11y_regression.cy.js</b> for example test cases.
