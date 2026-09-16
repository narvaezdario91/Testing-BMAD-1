import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import * as dotenv from 'dotenv';

dotenv.config();

const testDir = defineBddConfig({
  features: 'tests/features/**/*.feature',
  steps: ['tests/steps/**/*.ts', 'tests/fixtures/**/*.ts'],
  outputDir: '.features-gen',
  quotes: 'backtick',
  disableWarnings: {
    importTestFrom: true,
  },
});

export default defineConfig({
  testDir,
  outputDir: '_bmad-output/test-artifacts/test-results',
  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: '_bmad-output/test-artifacts/playwright-report', open: 'never' }],
    ['junit', { outputFile: '_bmad-output/test-artifacts/junit-results.xml' }],
    ['json', { outputFile: '_bmad-output/test-artifacts/results.json' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://demo.playwright.dev',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
