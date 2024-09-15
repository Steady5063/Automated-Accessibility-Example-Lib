import React from 'react';
import InaccessibleComp from '../inaccessibleComp';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import * as axe from 'axe-core';
import "babel-polyfill";

/*
* Example integration with axe-core that works within a set of tests on a simple component
* Note: This test case demonstrates how to add an accessibility test case to a set of tests. 
*/

describe('Inaccessible Component', () => {

  test("Funtionality - Component has loaded", () => {
    render(<InaccessibleComp />);
    expect(screen.getByRole("heading")).toHaveTextContent("Contact Us");
  });

  test("Functionality - List number", () => {
    render(<InaccessibleComp />);
    expect(screen.getByTestId("footList")).not.toEqual(null);
    expect(screen.getByTestId("footList").childElementCount).toBe(4);
  });

  /*
  * Using RTL, we can call the {container} object to get raw HTML to test for A11y issues
  */

  test("Accessibility check",async () => {
   const {container} = render(<InaccessibleComp />);
   const results = await axe.run(container)
   console.log(results.violations)
   expect(results.violations.length).toBe(0);
  });

});
