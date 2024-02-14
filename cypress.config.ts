import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {},
  },
  env: {
    CLIENT_URL: 'http://localhost:4200',
    SERVER_URL: 'http://localhost:3000',
  },
});
