/**
 * GET /api/content/profile?userId=... (src/app/api/content/profile/route.js), consumed by
 * fetchUserProfile (src/api/profile_api.js) and stashed in localStorage as `userProfile`.
 * The app only ever reads `_id` back out of it (chatbot greeting lookup, draft ownership), so that is
 * the one field this fixture guarantees; `name` is included because it is harmless and realistic.
 */
export function buildProfileFixture(user) {
  return { _id: user.id, name: user.name };
}
