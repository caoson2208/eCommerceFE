import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      email: 'caongocson910@gmail.com',
      password: 'testtest'
    },
    baseUrl: 'http://localhost:3000',
    experimentalWebKitSupport: true,
    viewportWidth: 1440,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    chromeWebSecurity: false
  }
})
