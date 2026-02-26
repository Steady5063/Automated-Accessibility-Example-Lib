describe('Accessibility Selector Examples - Normal, IL Government Site', () => {
    
    beforeEach(async () => {
        await browser.url('https://www.normalil.gov/');
    });
    
    // Use aria selector to find elements by their accessible name containing "Opens in a new window"
    it('should ensure all social links have "opens in new window" within the label', async () => {
        const fbLink = await $('aria/Facebook opens in new window');
        const instaLink = await $('aria/Instagram opens in new window');
        
        expect(fbLink).toHaveText("Facebook opens in new window");
        expect(instaLink).toHaveText("Facebook opens in new window");
    });
    
    // Find a specific heading text and ensure its role is heading
    it('proper heading structure', async () => {
            const mainHeading = await $('aria/News & Events').getTagName()

            expect(mainHeading).toBe("h1");
    });
    

    // Find close button by accessible label, and close it. If the label is wrong, the test will fail
    it('close button accessibility', async () => {
            const closeButton = await $('aria/close greeting');

            await expect(closeButton).toBePresent()

            await closeButton.click();

            await expect(closeButton).not.toBePresent()

    });
});