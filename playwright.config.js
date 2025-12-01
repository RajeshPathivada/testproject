
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',

  reporter: 'html',
  retries: 0,
  timeout: 50000,
  expect:{

    timeout: 30000,
  },
  retries: 0,
  
  
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    
    trace: 'off',
    browserName: 'chromium',
    screenshot: 'off',
    video: 'off',
    headless: false,
  
  
  },

});