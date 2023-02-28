  /*
  * This spec is an example of simple regression tests you can write to ensure accessible functionality of your content
  * Note: This does not replace the manual testing or validation of teams, but simply ensures the content created is functionality accessible. 
  */
  describe('Accessibility Regression - Homepage', () => {

    beforeEach(() => {
      cy.visit('./test.html');
      cy.wait(150);
    })
  
    /*
    * A11y Regression Test: Checking for disabled state
    * Purpose: To ensure disabled state is semantically being added on click
    */
    it('A11y - is proper disabled state of offer button', () => {
        cy.get('.disButton').invoke('attr', 'disabled').should('exist');

        cy.waitFor(1000);
        cy.get('.disInput').type('I love accessibility');
        cy.get('.disButton').invoke('attr', 'disabled').should('not.exist');
    });

   /*
    * A11y Regression Test: Checking for ARIA state 
    * Purpose: To ensure the state of the aria attribute being used is funtioning properly
    * Notes: This can be used for other aria states (Pressed, selected, etc)
    */
   it('A11y - FAQ proper expanded state', () => {
      cy.get('#toggle').invoke('attr', 'aria-expanded').should('eq', 'false');

      cy.get('#toggle').trigger('click');
      cy.wait(150);
      cy.get('#toggle').invoke('attr', 'aria-expanded').should('eq', 'true');

      cy.get('#toggle').trigger('click');
      cy.wait(150);
      cy.get('#toggle').invoke('attr', 'aria-expanded').should('eq', 'false');
  });

  /*
  * A11y Regression Test: Checking for Focus Indicator on actionable element 
  * Purpose: To ensure that each actionable item that can have focus has focus 
  * Notes: This is using the cypress-plugin-tab package to tab to each element: https://github.com/kuceb/cypress-plugin-tab
  */
  it('A11y - Focus indicator on menu items', () => {
    cy.get('#focusButton1').focus().invoke('css', 'outline')
    .then((bgcolor) => {
      expect(bgcolor).to.eq('rgb(255, 0, 0) solid 2.4px')
    });
    cy.wait(150);
    cy.get('#focusButton1').tab().invoke('css', 'outline')
    .then((bgcolor) => {
      expect(bgcolor).to.eq('rgb(255, 0, 0) solid 2.4px')
    });
    cy.wait(150);
    cy.get('#focusButton2').tab().invoke('css', 'outline')
    .then((bgcolor) => {
      expect(bgcolor).to.eq('rgb(255, 0, 0) solid 2.4px')
    });

 
  });
  
  /*
  * A11y Regression Test: Focus order of component
  * Purpose: To ensure that the focus order is properly set for keyboard users 
  */
  it('A11y - Focus order on modal', () => {
    cy.waitFor(1000); 
    cy.get('#modalButton').trigger('click');
    cy.focused().should('have.attr','id').and('eq', 'modalTitle');

    cy.waitFor(500);
    cy.get('#modalClose').trigger('click');
    cy.focused().should('have.attr','id').and('eq', 'modalButton');
  })  
 
  /*
  * A11y Regression Test: Link Purpose
  * Purpose: To ensure links have separate labels to differentiate them 
  
  it('A11y - Link Purpose', () => {
    cy.waitFor(2000); 
  })
  */
  

  })
