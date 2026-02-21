exports.config = {
    runner: 'local',
    specs: [
        './**.spec.js'
    ],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--disable-gpu', '--no-sandbox', '--silent']
        }
    }],
    logLevels: {
    webdriver: 'silent',
    devtools: 'silent'
},
 mochaOpts: {
        ui: 'bdd',
        timeout: 40000 // e.g., 60 seconds for a test suite/spec
    },
    services: ['chromedriver'],
    framework: 'mocha',
    reporters: ['spec'],
};
