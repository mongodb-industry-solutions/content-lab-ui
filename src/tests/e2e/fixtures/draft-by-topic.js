/**
 * GET /api/drafts/by-topic/[topicId]?userId=... (src/app/api/drafts/by-topic/[topicId]/route.js).
 * fetchDraftByTopicId (src/api/drafts_api.js) treats any non-2xx response as "no existing draft for
 * this topic," which is what navigateToDraft (src/utils/draftUtils.js) uses to decide whether
 * "Start Drafting" should open a fresh draft or resume an existing one. A 404 exercises the "fresh
 * draft" path used throughout these tests.
 */
export const NOT_FOUND_RESPONSE = { detail: 'Draft not found' };
