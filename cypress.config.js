const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        watchForFileChanges: false,
        reporter: 'cypress-mochawesome-reporter',
        reporterOptions: {
            reportDir: 'cypress/reports/mochawesome-report', 
            overwrite: true, 
            html: true, 
            json: true, 
        },
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
        },
    },
});