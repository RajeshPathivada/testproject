
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  reporter: [['html', { open: 'never' }]],
  // reporter: [['html', { open: 'always' }]],
  testDir: './tests',
  retries: 0,
  timeout: 50000,
  expect:{

    timeout: 30000,
  },
  retries: 0,
  
  
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    
    trace: 'on',
    browserName: 'chromium',
    screenshot: 'off',
    video: 'off',
    headless: false,
    // storageState: 'auth.json',
  
  
  },

});