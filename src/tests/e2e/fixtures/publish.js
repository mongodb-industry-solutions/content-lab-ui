/**
 * POST /api/drafts/publish (src/app/api/drafts/publish/route.js) proxies the backend's response body
 * verbatim. handlePublishDraft (src/hooks/useDraftManager.js) passes that parsed JSON straight into
 * `window.open(result, '_blank')`, so the real contract is a bare URL string, not an object.
 */
export const PUBLISHED_ARTICLE_URL = 'https://ist-media.test/articles/mock-article-123';
