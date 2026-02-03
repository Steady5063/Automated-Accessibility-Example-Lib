import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './a11y-tests/pw-a11y-features',
  reporter: 'html',
});