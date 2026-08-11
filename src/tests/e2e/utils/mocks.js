import { buildProfileFixture } from '../fixtures/profile.js';
import { newsFixture } from '../fixtures/news.js';
import { redditFixture } from '../fixtures/reddit.js';
import { buildSuggestionsFixture } from '../fixtures/suggestions.js';
import { buildAnalyzeFixture } from '../fixtures/analyze.js';
import { buildResearchFixture } from '../fixtures/research.js';
import { NOT_FOUND_RESPONSE } from '../fixtures/draft-by-topic.js';
import { buildCreateDraftResponse } from '../fixtures/drafts.js';
import { PUBLISHED_ARTICLE_URL } from '../fixtures/publish.js';
import { buildDraftLayoutFixture, buildRefineFixture, DRAFT_LAYOUT_HTML } from '../fixtures/writing-assist.js';

/**
 * Installs one catch-all handler for every `/api/**` route this frontend calls (see src/api/*.js and
 * their matching src/app/api/**\/route.js proxies), so a test never depends on a real search/chat
 * backend or MongoDB. Dispatch is by pathname/method rather than several overlapping glob patterns,
 * which keeps precedence unambiguous.
 *
 * Call this once in `beforeEach`. A test that needs a scenario-specific response (e.g. a populated
 * drafts list) can register a narrower `page.route()` afterward - Playwright checks the
 * most-recently-added matching handler first, so the override wins without touching this function.
 *
 * Any `/api/**` call this dispatcher does not recognize gets a 501 naming the route, rather than
 * silently falling through to a real network call - a gap in the fixture should fail loudly.
 *
 * @param {import('@playwright/test').Page} page
 * @param {Object} [options]
 * @param {{id: string, name: string}} options.user - Selected demo user, used for the profile fixture.
 * @param {Array} [options.drafts] - Response for GET /api/drafts (the Saved page's draft list).
 * @param {Object} [options.draftById] - Map of draftId -> draft object, for GET /api/drafts/:draftId.
 */
export async function installApiMocks(page, { user, drafts = [], draftById = {} } = {}) {
  let writingAssistCallCount = 0;

  await page.route('**/api/**', async (route) => {
    const request = route.request();
    const { pathname, searchParams } = new URL(request.url());
    const method = request.method();

    if (pathname === '/api/content/profile') {
      return route.fulfill({ json: buildProfileFixture(user) });
    }
    if (pathname === '/api/content/news') {
      return route.fulfill({ json: newsFixture });
    }
    if (pathname === '/api/content/reddit') {
      return route.fulfill({ json: redditFixture });
    }
    if (pathname === '/api/content/suggestions') {
      return route.fulfill({ json: buildSuggestionsFixture(searchParams.get('label') || 'general') });
    }
    if (pathname === '/api/services/analyze') {
      return route.fulfill({ json: buildAnalyzeFixture() });
    }
    if (pathname === '/api/services/research') {
      return route.fulfill({ json: buildResearchFixture() });
    }
    if (pathname.startsWith('/api/drafts/by-topic/')) {
      return route.fulfill({ status: 404, json: NOT_FOUND_RESPONSE });
    }
    if (pathname === '/api/drafts/publish') {
      return route.fulfill({ json: PUBLISHED_ARTICLE_URL });
    }
    if (pathname === '/api/writing/assist') {
      const { promptType } = request.postDataJSON() || {};
      const html = DRAFT_LAYOUT_HTML[Math.min(writingAssistCallCount, DRAFT_LAYOUT_HTML.length - 1)];
      writingAssistCallCount += 1;
      const fixture = promptType === 'refine' ? buildRefineFixture(html) : buildDraftLayoutFixture(html);
      return route.fulfill({ json: fixture });
    }
    if (pathname === '/api/drafts' && method === 'GET') {
      return route.fulfill({ json: drafts });
    }
    if (pathname === '/api/drafts' && method === 'POST') {
      return route.fulfill({ json: buildCreateDraftResponse() });
    }

    const draftByIdMatch = pathname.match(/^\/api\/drafts\/([^/]+)$/);
    if (draftByIdMatch && method === 'GET') {
      const draft = draftById[draftByIdMatch[1]];
      return draft
        ? route.fulfill({ json: draft })
        : route.fulfill({ status: 404, json: { detail: 'Draft not found' } });
    }
    if (draftByIdMatch && method === 'PUT') {
      return route.fulfill({ json: { _id: draftByIdMatch[1], ...request.postDataJSON() } });
    }

    return route.fulfill({ status: 501, json: { detail: `Unmocked route in tests: ${method} ${pathname}` } });
  });
}

/**
 * Waits for a `window.open` popup triggered by `action` and returns the URL it was headed to, without
 * ever letting that navigation complete. Reading `popup.url()` after the fact is not reliable for this:
 * once a request to a non-resolving domain fails, Chromium commits the frame to
 * `chrome-error://chromewebdata/` and `url()` reflects that instead of the original target. Registering
 * the abort at the browser-context level - before the popup even exists - intercepts the navigation's
 * first request and lets us read the intended URL off it directly.
 *
 * Scoped to the `.test` TLD only (every fixture's popup target uses it, and it is IANA-reserved to
 * never resolve on a real network), so this never touches the app's own localhost traffic, which stays
 * on the page-level `/api/**` mocks from `installApiMocks`.
 *
 * Per the "external site is not ours to test" rule, callers should only assert on the returned URL.
 *
 * @param {import('@playwright/test').Page} page
 * @param {() => Promise<void>} action
 * @returns {Promise<string>}
 */
export async function getBlockedPopupUrl(page, action) {
  const context = page.context();
  let targetUrl;

  await context.route(
    (url) => url.hostname.endsWith('.test'),
    async (route) => {
      targetUrl = route.request().url();
      await route.abort();
    }
  );

  const popupPromise = page.waitForEvent('popup');
  await action();
  await popupPromise;

  return targetUrl;
}
