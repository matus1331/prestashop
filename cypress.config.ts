import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 10000,
  video: false,
  projectId: "cys3da",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: false,
  },
});
