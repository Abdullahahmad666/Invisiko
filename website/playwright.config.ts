import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 3100);

/**
 * One smoke path across every page (§13 Testing). Runs against a production build.
 * Uses the installed Microsoft Edge by default so no browser download is needed;
 * set E2E_CHANNEL=chromium after `npx playwright install chromium` to use Playwright's own.
 */
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel: process.env.E2E_CHANNEL ?? "msedge",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Edge"], channel: process.env.E2E_CHANNEL ?? "msedge" } },
    {
      name: "mobile",
      use: {
        channel: process.env.E2E_CHANNEL ?? "msedge",
        viewport: { width: 360, height: 780 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2,
      },
    },
  ],
  webServer: {
    command: `npm run start -- --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
