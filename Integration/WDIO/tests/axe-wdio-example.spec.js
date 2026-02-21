const { default: AxeBuilder } = require('@axe-core/webdriverio');

describe('Accessibility Testing with Axe - Normal, IL Government Site', () => {

    let axeBuilder;
    
    beforeEach(async () => {
        await browser.url('https://www.normalil.gov/');
    
        axe = new AxeBuilder({ client: browser });
    });
    
    it('should have no accessibility violations on homepage', async () => {
        const results = await axe.analyze();
        
        expect(results.violations).toHaveLength(0);
    });
    
    it('should have no accessibility violations on a specific element', async () => {
        await browser.url('https://www.normalil.gov/');
        
        const results = await axe.include('#bodyWrapper').analyze();
        
        expect(results.violations).toHaveLength(0);
    });
    
    it('should check for specific accessibility rules', async () => {
        await browser.url('https://www.normalil.gov/');
        
        const results = await axe.withTags(['wcag2a', 'wcag2aa']).analyze();
        
        expect(results.violations).toHaveLength(0);
    });
    
});