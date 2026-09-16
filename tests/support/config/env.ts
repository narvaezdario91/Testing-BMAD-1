import * as dotenv from 'dotenv';

dotenv.config();

export const Config = {
  env: process.env.TEST_ENV || 'local',
  baseUrl: process.env.BASE_URL || 'https://demo.playwright.dev',
  apiUrl: process.env.API_URL || 'https://demo.playwright.dev/api',
  headless: process.env.HEADLESS !== 'false',
  timeouts: {
    action: 15_000,
    navigation: 30_000,
    assertion: 10_000,
  },
} as const;
