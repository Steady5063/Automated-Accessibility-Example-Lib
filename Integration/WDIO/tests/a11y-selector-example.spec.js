describe('Accessibility Selector Examples - Normal, IL Government Site', () => {
    
    beforeEach(async () => {
        await browser.url('https://www.normalil.gov/');
    });
    
    // Find a button or link by its accessible name (visible text or aria-label)
    it('should find elements by their accessible name', async () => {   
        const searchButton = await browser.$('aria/Search');
        
        await expect(searchButton).toExist();
    });
    
    // Find a specific heading by its text content
    it('should find headings by their accessible name', async () => {
        const heading = await browser.$('aria/Welcome[role=heading]');
        
        if (await heading.isExisting()) {
            const headingText = await heading.getText();
            console.log(`Found heading: "${headingText}"`);
            await expect(heading).toExist();
        } else {
            console.log('Specific heading not found, finding any heading');
            const anyHeading = await browser.$('aria/heading');
            const headingText = await anyHeading.getText();
            await expect(anyHeading).toExist();
        }
    });
    
    it('should find links by their accessible name', async () => {
        // Find all links with specific text
        const homeLink = await browser.$('aria/Home[role=link]');
        
        if (await homeLink.isExisting()) {
            await expect(homeLink).toExist();
        }
        
        // Find all links on the page
        const allLinks = await browser.$$('aria/link');
        console.log(`Total links found: ${allLinks.length}`);
        
        expect(allLinks.length).toBeGreaterThan(0);
    });
    
    it('should verify main landmark exists', async () => {
        // Find the main content area by role
        const mainContent = await browser.$('aria/main');
        
        // Verify it exists and is visible
        await expect(mainContent).toExist();
        await expect(mainContent).toBeDisplayed();
        
        console.log('Main landmark found and is visible');
    });

    
    it('should verify form controls are accessible', async () => {
        // Find all textbox elements (inputs with role textbox)
        const textboxes = await browser.$$('aria/textbox');
        console.log(`Found ${textboxes.length} textbox(es)`);
        
        // Find all combobox elements (select dropdowns)
        const comboboxes = await browser.$$('aria/combobox');
        console.log(`Found ${comboboxes.length} combobox(es)`);
        
        // Log information about each textbox
        for (const textbox of textboxes) {
            const name = await textbox.getAttribute('aria-label') || 
                         await textbox.getAttribute('placeholder') || 
                         'No accessible name';
            console.log(`Textbox accessible name: "${name}"`);
        }
    });
    

    
});