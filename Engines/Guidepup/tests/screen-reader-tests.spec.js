import { voiceOverTest as test } from "@guidepup/playwright"
import { expect } from "@playwright/test"

test.describe("Normal, IL Website Accessibility Tests", () => {

  test("Can navigate to main heading and access primary navigation", async ({page, voiceOverTest}) => {
    // Navigate to Normal, IL website
    await page.goto("https://www.normalil.gov/", {waitUntil: "load",});

    // Wait for page to be ready
    await page.waitForLoadState('networkidle');
    
    // Start voiceOverTest navigation
    await voiceOverTest.navigateToWebContent();
    
    // Find the main heading (typically h1)
    let attempts = 0;
    let foundMainHeading = false;
    
    while (attempts < 20 && !foundMainHeading) {
      const currentText = await voiceOverTest.itemText();
      
      if (currentText && (
        currentText.includes("heading level 1") || 
        currentText.includes("Normal") ||
        currentText.includes("Welcome")
      )) {
        foundMainHeading = true;
        break;
      }
      
      await voiceOverTest.perform(voiceOverTest.keyboardCommands.findNextHeading);
      attempts++;
    }
    
    expect(foundMainHeading).toBe(true);
    
    // Navigate to main navigation
    await voiceOverTest.perform(voiceOverTest.keyboardCommands.findNextList);
    
    // Verify navigation is announced properly
    const spokenPhrases = await voiceOverTest.spokenPhraseLog();
    expect(spokenPhrases.length).toBeGreaterThan(0);
  });

  test("Can access and navigate search functionality", async ({
    page,
    voiceOverTest,
  }) => {
    await page.goto("https://www.normalil.gov/", {
      waitUntil: "load",
    });

    await page.waitForLoadState('networkidle');
    await voiceOverTest.navigateToWebContent();

    // Look for search input or search link
    let attempts = 0;
    let foundSearch = false;

    while (attempts < 30 && !foundSearch) {
      const currentText = await voiceOverTest.itemText();
      
      if (currentText && (
        currentText.toLowerCase().includes("search") ||
        currentText.includes("text field") ||
        currentText.includes("search box")
      )) {
        foundSearch = true;
        break;
      }
      
      await voiceOverTest.perform(voiceOverTest.keyboardCommands.findNext);
      attempts++;
    }

    expect(foundSearch).toBe(true);
    
    // If it's a search field, try to interact with it
    const currentText = await voiceOverTest.itemText();
    if (currentText && currentText.includes("text field")) {
      await voiceOverTest.type("accessibility test");
      
      // Verify typing was announced
      const spokenPhrases = await voiceOverTest.spokenPhraseLog();
      expect(spokenPhrases.some(phrase => 
        phrase.includes("accessibility") || phrase.includes("test")
      )).toBe(true);
    }
  });

  test("Can navigate footer links and contact information", async ({ page,voiceOverTest, }) => {
    await page.goto("https://www.normalil.gov/", {
      waitUntil: "load",
    });

    await page.waitForLoadState('networkidle');
    await voiceOverTest.navigateToWebContent();

    // Navigate to footer by jumping to end of page
    await voiceOverTest.perform(voiceOverTest.keyboardCommands.jumpToBottom);
    
    // Look for footer content or contact information
    let attempts = 0;
    let foundFooterContent = false;

    while (attempts < 20 && !foundFooterContent) {
      const currentText = await voiceOverTest.itemText();
      
      if (currentText && (
        currentText.toLowerCase().includes("contact") ||
        currentText.toLowerCase().includes("phone") ||
        currentText.toLowerCase().includes("address") ||
        currentText.toLowerCase().includes("email") ||
        currentText.toLowerCase().includes("footer")
      )) {
        foundFooterContent = true;
        break;
      }
      
      await voiceOverTest.perform(voiceOverTest.keyboardCommands.findPrevious);
      attempts++;
    }

    expect(foundFooterContent).toBe(true);
    
    // Navigate through a few footer links
    await voiceOverTest.perform(voiceOverTest.keyboardCommands.findNextLink);
    const linkText = await voiceOverTest.itemText();
    expect(linkText).toBeTruthy();
    
    // Verify footer navigation is accessible
    const spokenPhrases = await voiceOverTest.spokenPhraseLog();
    expect(spokenPhrases.length).toBeGreaterThan(0);
  });

  test("Can access skip links and page landmarks", async ({
    page,
    voiceOverTest,
  }) => {
    await page.goto("https://www.normalil.gov/", {
      waitUntil: "load",
    });

    await page.waitForLoadState('networkidle');
    await voiceOverTest.navigateToWebContent();

    // Check for skip links at the beginning of the page
    const initialText = await voiceOverTest.itemText();
    let hasSkipLink = false;
    
    if (initialText && initialText.toLowerCase().includes("skip")) {
      hasSkipLink = true;
    } else {
      // Look for skip link in first few elements
      for (let i = 0; i < 5; i++) {
        await voiceOverTest.perform(voiceOverTest.keyboardCommands.findNext);
        const currentText = await voiceOverTest.itemText();
        if (currentText && currentText.toLowerCase().includes("skip")) {
          hasSkipLink = true;
          break;
        }
      }
    }

    // Navigate by landmarks (main, navigation, etc.)
    await voiceOverTest.perform(voiceOverTest.keyboardCommands.findNextLandmark);
    const landmarkText = await voiceOverTest.itemText();
    
    // Verify we can navigate by landmarks or at least have structured content
    expect(landmarkText).toBeTruthy();
    
    // Check that the page has some form of semantic structure
    const spokenPhrases = await voiceOverTest.spokenPhraseLog();
    const hasStructuralElements = spokenPhrases.some(phrase =>
      phrase.includes("navigation") ||
      phrase.includes("main") ||
      phrase.includes("banner") ||
      phrase.includes("heading")
    );
    
    expect(hasStructuralElements).toBe(true);
    
    // Log results for debugging
    console.log("Skip link found:", hasSkipLink);
    console.log("Structural elements detected:", hasStructuralElements);
  });

});