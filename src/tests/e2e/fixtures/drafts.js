/**
 * Drafts CRUD fixtures for src/app/api/drafts/** and src/app/api/drafts/[draftId]/**, consumed by
 * saveDraft/updateDraft/fetchDraftById/fetchUserDrafts (src/api/drafts_api.js).
 */

export function buildSavedDraftFixture(overrides = {}) {
  return {
    _id: 'draft_saved_1',
    title: 'Wellness and fitness trends reshape daily routines',
    category: 'health',
    content: '<h1>Wellness and fitness trends reshape daily routines</h1><p>Draft content preview.</p>',
    keywords: ['wellness', 'fitness'],
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    ...overrides,
  };
}

// handleSaveDraft (src/hooks/useDraftManager.js) only reads `._id` off the create response before
// treating the draft as persisted.
export function buildCreateDraftResponse(overrides = {}) {
  return { _id: 'draft_new_1', ...overrides };
}
