const pa11y = require('pa11y');


describe("Town of Normal Website",  () => {

  beforeEach(() =>{
    jest.setTimeout(20000);
  })
  /*
  * Test: Standard test case setup using Pa11y to audit a page for accessibility issues. 
  * Test Engine: Runs HTML code sniff by default
  */
  test("is accessible", async () => {
    await pa11y('https://www.normalil.gov/').then((a11yResults) => {
        expect(a11yResults.issues.length).toBe(0)
    });
  })

  /*
  * Test: Test case that includes the axe rules set on top of HTML code sniff
  * Test Engine: Axe and HTMLCS
  */
  test("is accessible w/ axe rules", async () => {
    await pa11y('https://www.normalil.gov/', {
      runners: [
        `axe`,
        `htmlcs`
      ],
    }).then((a11yResults) => {
        expect(a11yResults.issues.length).toBe(0)
    });
  });

    /*
  * Test: Test case that  only runs the axe-core ruleset
  * Test Engine: Axe-core
  */
    test("is accessible w/ htmlCS", async () => {
      await pa11y('https://www.normalil.gov/', {
        runners: [
          `axe`
        ],
      }).then((a11yResults) => {
          expect(a11yResults.issues.length).toBe(0)
      });
    });

});
