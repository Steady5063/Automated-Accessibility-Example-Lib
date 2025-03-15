import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './axe-tests',
  reporter: 'html',
});