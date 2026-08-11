import { defineConfig, devices } from '@playwright/test';
import { EnvironmentHelper, DEFAULT_APP, DEFAULT_ENV } from './tests/e2e/utils/environment-helper.js';

const appName = process.env.APP_NAME || DEFAULT_APP;
const envName = process.env.ENV_NAME || DEFAULT_ENV;
const frontendUrl = EnvironmentHelper.getFrontendUrl(appName, envName);

const isCi = Boolean(process.env.CI);
const isLocal = envName === 'local';

// Derived from frontendUrl (rather than hardcoded) so a BASE_URL override also controls which port the
// locally-managed dev/start server boots on - otherwise overriding the URL without also overriding the
// server's own port would just point Playwright at a server that never comes up on the expected port.
const { port, protocol } = new URL(frontendUrl);
const serverPort = port || (protocol === 'https:' ? '443' : '80');

/**
 * Playwright config for the Content Lab E2E suite.
 *
 * The suite is frontend-only and fully mocked (see tests/e2e/utils/mocks.js): every `/api/**` call the
 * app makes is intercepted with `page.route`, so no MongoDB, Python backend, or AI gateway is ever
 * required, in any environment.
 *
 * Only `local` gets a managed web server. `staging` is an already-running corp deployment, and
 * pointing a `webServer` at it would try to boot a second copy. In CI the local server is the
 * production build (`npm run start`), which is what the demo actually ships; locally it is
 * `npm run dev`, and an already-running dev server is reused rather than replaced.
 */
export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.js',
  globalSetup: './tests/e2e/utils/global-setup.js',
  fullyParallel: true,
  forbidOnly: isCi,
  retries: isCi ? 2 : 0,
  workers: isCi ? 2 : undefined,
  timeout: 30_000,
  // A bit more generous than Playwright's 5s default: several workers share one `next dev` server
  // locally, and each route it hasn't compiled yet (on-demand compilation) can take a few seconds the
  // first time any test visits it. The production build used in CI has no such compile step, so this
  // costs nothing there - assertions still resolve as soon as their condition is actually met.
  expect: { timeout: 10_000 },
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['json', { outputFile: 'test-results/results.json' }],
    [isCi ? 'github' : 'list'],
  ],
  metadata: { app: appName, environment: envName },
  use: {
    baseURL: frontendUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      // Drafts (src/hooks/useMobile.js, called with a 1400px breakpoint from
      // src/components/Dashboard/Drafts/index.jsx) switches to a single-panel mobile layout below
      // 1400px width. A wider-than-default viewport keeps every spec on the desktop layout.
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: isLocal
    ? {
        command: isCi ? 'npm run start' : 'npm run dev',
        url: frontendUrl,
        reuseExistingServer: !isCi,
        timeout: 180_000,
        env: { PORT: serverPort },
      }
    : undefined,
  outputDir: 'test-results/',
});
