import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './a11y-tests/axe-tests',
  reporter: 'html',
});