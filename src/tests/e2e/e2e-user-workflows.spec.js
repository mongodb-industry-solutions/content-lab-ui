/**
 * Content Lab end-to-end user workflows. Frontend-only and fully mocked (see utils/mocks.js): every
 * `/api/**` route this app calls is intercepted with `page.route`, so the suite needs no MongoDB, no
 * Python search/chat backend, and no AI gateway - it is deterministic and free to run anywhere.
 *
 * Login (src/components/Layout/Layout.jsx) always shows on a fresh load regardless of route ("Always
 * show login on page load/reload"), so every scenario below re-selects a demo user first even where
 * the test-definitions' preconditions only say "navigate to <page>" - that precondition assumes an
 * already-authenticated session, which this app never has.
 */
import { test, expect } from '@playwright/test';
import { EnvironmentHelper, DEFAULT_APP, DEFAULT_ENV } from './utils/environment-helper.js';
import { installApiMocks, getBlockedPopupUrl } from './utils/mocks.js';
import { USERS } from './fixtures/users.js';
import { newsFixture } from './fixtures/news.js';
import { redditFixture } from './fixtures/reddit.js';
import { HEALTH_TOPIC } from './fixtures/suggestions.js';
import { buildSavedDraftFixture } from './fixtures/drafts.js';
import { PUBLISHED_ARTICLE_URL } from './fixtures/publish.js';

let frontendUrl;

// The Tiptap/ProseMirror editor (src/components/Dashboard/Drafts/EditorPanel/RichTextEditor) is the
// only contenteditable element on the drafts page - the sidebar's title/category fields are plain
// inputs - so this attribute selector is unique without relying on a CSS module class name.
const editorContent = (page) => page.locator('[contenteditable="true"]');

/**
 * The Login screen's user cards (src/components/Layout/Login/User/index.jsx) are plain divs with an
 * onClick handler, not a button or link, so there is no accessible role to select them by; this clicks
 * the user's name text directly instead.
 */
async function loginAsUser(page, user) {
  await page.getByText(user.name, { exact: true }).click();
  await expect(page.getByRole('link', { name: 'Discover Trending Stories' })).toBeVisible();
}

async function goToTopics(page) {
  await page.getByRole('link', { name: 'Topics', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Discover Trending Topics' })).toBeVisible();
}

/**
 * Dismisses every DemoGuideCue tooltip on the drafts page (src/components/shared/DemoGuideCue) - they
 * open automatically on mount ("Formatting Tools", "Key Points", "Writing Tools Workflow") and, being
 * positioned right over the Writing Tools buttons, intercept pointer events until closed.
 */
async function dismissGuideCues(page) {
  const gotIt = page.getByRole('button', { name: 'Got it', exact: true });
  while (await gotIt.count() > 0) {
    await gotIt.first().click();
  }
}

/** Runs a Writing Tools quick action end to end: pick the tool, send, and apply the reply. */
async function runWritingTool(page, toolName) {
  await page.getByRole('button', { name: toolName, exact: true }).click();
  await page.getByRole('button', { name: 'Send message' }).click();

  const applyButtons = page.getByRole('button', { name: 'Apply Draft' });
  await expect(applyButtons.last()).toBeVisible();
  await applyButtons.last().click();
}

/** Best-effort teardown so one test's storage never leaks into the next. */
async function clearBrowserState(page, context) {
  try {
    await Promise.all(
      context
        .pages()
        .filter((p) => p !== page && !p.isClosed())
        .map((p) => p.close())
    );
    await context.clearPermissions();
    if (!page.isClosed()) {
      await page
        .evaluate(() => {
          localStorage.clear();
          sessionStorage.clear();
        })
        .catch(() => {});
    }
  } catch (error) {
    console.warn('Cleanup error in afterEach:', error.message);
  }
}

test.describe('Content Lab - E2E User Workflows', () => {
  test.beforeAll(() => {
    const appName = process.env.APP_NAME || DEFAULT_APP;
    const envName = process.env.ENV_NAME || DEFAULT_ENV;
    frontendUrl = EnvironmentHelper.getFrontendUrl(appName, envName);
  });

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.goto(frontendUrl);
    await page.waitForLoadState('networkidle');
  });

  test.afterEach(async ({ page, context }) => {
    await clearBrowserState(page, context);
  });

  test('TLC-CL-01: Discover trends', async ({ page }) => {
    await installApiMocks(page, { user: USERS.helly });

    // Arrange
    await expect(page.getByRole('heading', { name: 'Welcome to The Content Lab' })).toBeVisible();
    await expect(page.getByText(USERS.helly.name, { exact: true })).toBeVisible();

    // Act
    await loginAsUser(page, USERS.helly);

    // Dashboard, news, and viral content all rendered (with images) after login.
    // Assert
    await expect(page.getByRole('heading', { name: 'Turn trends into timely content' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Trending News & Insights' })).toBeVisible();
    await expect(page.getByRole('heading', { name: newsFixture[0].title })).toBeVisible();
    await expect(page.getByRole('img', { name: newsFixture[0].title })).toBeVisible();
    await expect(page.getByRole('heading', { name: "See What's Going Viral Right Now" })).toBeVisible();
    // The Marquee (src/components/Dashboard/Hero/ViralPosts/Marquee) duplicates its children for a
    // seamless scroll loop, so every post's avatar image legitimately appears twice.
    await expect(page.getByRole('img', { name: redditFixture[0].subreddit }).first()).toBeVisible();

    // Act
    await page.getByRole('link', { name: 'Discover Trending Stories' }).click();

    // Assert
    await expect(page).toHaveURL(/\/topics$/);
    await expect(page.getByRole('heading', { name: 'Discover Trending Topics' })).toBeVisible();
  });

  test('TLC-CL-02: Trending topics', async ({ page }) => {
    let analyzeRequestBody;
    await installApiMocks(page, { user: USERS.helly });
    // Registered after installApiMocks, so this more specific handler wins for this one route while
    // still letting us assert on the outgoing request shape.
    await page.route('**/api/services/analyze', async (route) => {
      analyzeRequestBody = route.request().postDataJSON();
      await route.fulfill({ json: { suggestions: [HEALTH_TOPIC] } });
    });

    await loginAsUser(page, USERS.helly);

    // Arrange
    await goToTopics(page);
    await expect(page.getByRole('heading', { name: 'Featured Content' })).toBeVisible();

    // Open the info wizard.
    // Act
    await page.getByRole('button', { name: 'Info', exact: true }).click();

    // LeafyGreen's Modal keeps a second, permanently-mounted dialog-role node around for its
    // enter/exit transition, so asserting on the tab content inside it avoids a strict-mode violation
    // on a bare getByRole('dialog').
    // Assert
    const infoWizardTab = page.getByRole('tab', { name: 'Why MongoDB?' });
    await expect(infoWizardTab).toBeVisible();

    // Act
    await page.getByRole('button', { name: 'Close modal' }).click();

    // Assert
    await expect(infoWizardTab).toBeHidden();

    // Select an industry.
    // Act
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Health', exact: true }).click();

    // Assert
    const queryCard = page.getByText('Wellness and fitness trends', { exact: true });
    await expect(queryCard).toBeVisible();

    // Pick a suggested option.
    // Act
    await queryCard.click();

    // Results loaded.
    // Assert
    await expect(page.getByRole('heading', { name: 'Search Results' })).toBeVisible();
    await expect(page.getByRole('heading', { name: HEALTH_TOPIC.topic })).toBeVisible();
    expect(analyzeRequestBody).toMatchObject({ query: 'Wellness and fitness trends', label: 'health' });

    // View Source opens the topic's source in a new tab.
    // Act
    const popupUrl = await getBlockedPopupUrl(page, () => page.getByText('View Source', { exact: true }).click());

    // Assert
    expect(popupUrl).toBe(HEALTH_TOPIC.url);

    // Pick the result and start drafting.
    // Act
    await page.getByRole('button', { name: 'Start Drafting' }).click();

    // A generous timeout absorbs `next dev`'s on-demand compile of /drafts the first time any test
    // visits it; the production build used in CI has no such compile step.
    // Assert
    await expect(page).toHaveURL(/\/drafts$/, { timeout: 15_000 });
    await expect(page.getByRole('heading', { name: 'Writing Assistant' })).toBeVisible();
  });

  test('TLC-CL-03: Draft content', async ({ page }) => {
    test.setTimeout(60_000);

    let publishRequestBody;
    await installApiMocks(page, { user: USERS.helly });
    await page.route('**/api/drafts/publish', async (route) => {
      publishRequestBody = route.request().postDataJSON();
      await route.fulfill({ json: PUBLISHED_ARTICLE_URL });
    });

    // The editor only renders once a topic has been picked (see EditorPanel's `if (!topicCard) return
    // null`), so reach /drafts the same way a real user would: through Topics.
    // Arrange
    await loginAsUser(page, USERS.helly);
    await goToTopics(page);
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Health', exact: true }).click();
    await page.getByText('Wellness and fitness trends', { exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Search Results' })).toBeVisible();
    await page.getByRole('button', { name: 'Start Drafting' }).click();
    await expect(page).toHaveURL(/\/drafts$/, { timeout: 15_000 });
    await expect(page.getByRole('heading', { name: 'Writing Assistant' })).toBeVisible();
    await expect(page.getByText('0 words • 0 characters')).toBeVisible();
    await dismissGuideCues(page);

    // Draft, send, wait for the reply, apply it.
    // Act
    await runWritingTool(page, 'Draft');

    // The draft has been applied to the free text box.
    // Assert
    await expect(editorContent(page)).toContainText('Opening hook, three key sections');

    // Refine, send, wait for the reply, apply it.
    // Act
    await runWritingTool(page, 'Refine');

    // Assert
    await expect(editorContent(page)).toContainText('Refined opening hook with tightened sections');

    // Refine again, send, wait for the reply, apply it.
    // Act
    await runWritingTool(page, 'Refine');

    // Assert
    await expect(editorContent(page)).toContainText('Second refinement pass with clearer transitions');

    // Act
    await page.getByRole('button', { name: 'Save Draft' }).click();

    // Confirmation toast. Scoped with a text filter because Next.js's own route announcer
    // (`#__next-route-announcer__`) is also permanently in the DOM with role="alert".
    // Assert
    await expect(page.getByRole('alert').filter({ hasText: 'saved successfully' })).toBeVisible();

    // Publish opens the live article in a new tab.
    // Act
    const popupUrl = await getBlockedPopupUrl(page, () => page.getByRole('button', { name: 'Publish Draft' }).click());

    // Assert
    expect(popupUrl).toBe(PUBLISHED_ARTICLE_URL);
    expect(publishRequestBody).toMatchObject({ topicId: HEALTH_TOPIC._id, title: HEALTH_TOPIC.topic });
  });

  test('TLC-CL-04: Saved drafts', async ({ page }) => {
    const draft = buildSavedDraftFixture();
    await installApiMocks(page, {
      user: USERS.helly,
      drafts: [draft],
      draftById: { [draft._id]: draft },
    });

    await loginAsUser(page, USERS.helly);

    // Arrange
    await expect(page.getByRole('link', { name: 'My Drafts' })).toBeVisible();

    // Act
    await page.getByRole('link', { name: 'My Drafts' }).click();

    // The previously saved draft is listed.
    // Assert
    await expect(page.getByRole('heading', { name: 'Your Saved Drafts' })).toBeVisible();
    await expect(page.getByRole('heading', { name: draft.title })).toBeVisible();

    // `exact` matters here: Next.js's dev-mode floating dev tools button is named "Open Next.js Dev
    // Tools", which a substring match on "Open" would also pick up.
    // Act
    await page.getByRole('button', { name: 'Open', exact: true }).click();

    // A generous timeout absorbs `next dev`'s on-demand compile the first time any test visits this
    // route; the production build used in CI has no such compile step.
    // Assert
    await expect(page).toHaveURL(new RegExp(`/drafts/${draft._id}$`), { timeout: 15_000 });
    await expect(page.getByRole('alert').filter({ hasText: 'loaded successfully' })).toBeVisible();
  });
});
