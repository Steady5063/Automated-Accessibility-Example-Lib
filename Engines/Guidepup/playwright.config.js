
const { screenReaderConfig } = require("@guidepup/playwright");
const { devices } = require("@playwright/test");

const config = {
  ...screenReaderConfig,
  reportSlowTests: null,
  timeout: 3 * 60 * 1000,
  retries: 2,
  projects: [
    {
      name: "webkit-voiceover",
      use: { 
        ...devices["Desktop Safari"], 
        headless: false,
        video: 'retain-on-failure'
      },
    },
  ],
  // Generate HTML report
  reporter: [['html', { outputFolder: 'test-results/html' }]],
};

module.exports = config;