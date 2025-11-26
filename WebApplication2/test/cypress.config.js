const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    baseUrl: "https://localhost:7208",
    env: {
      apiUrl: "https://localhost:7208"
    },
    setupNodeEvents(on, config) {
      // Você pode adicionar listeners/plugins aqui se precisar no futuro.
      return config;
    }
  }
});


