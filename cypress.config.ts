import {defineConfig} from 'cypress';
import {configurePlugin} from 'cypress-mongodb';

export default defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on) {
      configurePlugin(on);
    },
    env: {
      mongodb: {
        uri: 'mongodb://localhost:27017',
        database: 'lncd-crypto-tracker-development',
        collection: 'user',
      },
    },
    baseUrl: 'http://localhost:4001',
    supportFile: 'cypress/support/index.{js,jsx,ts,tsx}', // Path to file to load before spec files load. This file is compiled and bundled. (Pass false to disable)
    testIsolation: true, // Ensure a clean browser context between tests. Tests should always be able to be run independently from one another and still pass.
    experimentalRunAllSpecs: true, // Enables the "Run All Specs" UI feature, allowing the execution of multiple specs sequentially.
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // A String or Array of glob patterns of the test files to load.
  },
});
