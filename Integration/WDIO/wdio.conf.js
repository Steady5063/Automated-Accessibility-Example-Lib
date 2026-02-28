exports.config = {
    runner: 'local',
    specs: [
        './tests/**.spec.js'
    ],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--disable-gpu', '--no-sandbox', '--headless',]
        }
    }],
    logLevels: {
    webdriver: 'silent',
    devtools: 'silent'
},
 logLevel: 'debug',
 mochaOpts: {
        ui: 'bdd',
        timeout: 40000 // e.g., 60 seconds for a test suite/spec
    },
    services: ['chromedriver'],
    framework: 'mocha',
   reporters: [
    ['spec', {
        addConsoleLogs: true,
    }],
]
};
