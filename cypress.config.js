const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "9fnznf",
  e2e: {
    baseUrl: "http://qamid.tmweb.ru",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1440,
    viewportHeight: 900,
    video: true,
    setupNodeEvents(on, config) {
      return config;
    },
  },
  retries: {
    runMode: 1,
    openMode: 0,
  },
  defaultCommandTimeout: 10000,
});
