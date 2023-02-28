describe('Use of Cypress Axe - Homepage', () => {

  beforeEach(() => {
    cy.visit('https://www.carvana.com/sell-my-car');
    cy.injectAxe();
  })

  /*
  * Example basic usage of cypress checkA11y. In its simplelest form this can be used and added as a test 
  * case per page. This also includes the usage of a custom terminal log message. 
  */
  it('is an accessible homepage', () => {
    cy.checkA11y(null, null, terminalLog);
  })

  /*
  * Example usage of CSS selector to test for accessibiltiy issues ONLY on one part of the page or component on the page
  
  */

  it('is accessible carousel', () => {
   cy.waitFor(2000);
   cy.checkA11y(".AllReviewsAndCarousel-sc-13pni0b-3");
  })


  /*
  * Example usage of axe configuration to test only for a specific criticality. 
  * More documentation on customization can be found here: https://github.com/component-driven/cypress-axe#basic-usage
  */

  it('is accessible for critical, serious issues', () => {
    let axeImpacts = {includedImpacts: ['critical', 'serious']};
    cy.waitFor(2000);
    cy.checkA11y(null, axeImpacts)
  })



})

// Custom terminal logger that displays the issues in table format. Created by cypress-axe team! 
function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  )

  cy.task('table', violationData)
}