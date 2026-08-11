/**
 * Pre-warms every route this suite visits before the parallel test workers start.
 *
 * `next dev` compiles each route on demand, the first time it is requested - with several workers
 * hitting a freshly-booted, shared dev server at once, that first compile can take longer than a
 * single test's action timeout. Requesting each route once, sequentially, up front absorbs that cost
 * here instead of inside a test. The production build used in CI has no on-demand compile step, so
 * this is a no-op cost there (each fetch just returns immediately).
 */
export default async function globalSetup(config) {
  const { baseURL } = config.projects[0].use;
  if (!baseURL) return;

  const routes = ['/', '/topics', '/drafts', '/drafts/prewarm', '/saved'];

  for (const route of routes) {
    try {
      await fetch(new URL(route, baseURL));
    } catch {
      // Best-effort only - a real failure here still surfaces as a normal test failure later.
    }
  }
}
