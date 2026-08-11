/**
 * Mirrors the id/name pairs in src/constants/users.js (USER_MAP). Kept as plain data here, rather than
 * importing the real constant, so this fixture only has to stay in sync when a demo user is added or
 * renamed - the same convention the central repo's leafy-wallet spec uses for its DEMO_USERS list.
 */
export const USERS = {
  helly: { id: '6862a8988c0f7bf43af995a7', name: 'Helly R.' },
  mark: { id: '6862a8988c0f7bf43af995a8', name: 'Mark S.' },
  casey: { id: '6862a8988c0f7bf43af995a9', name: 'Ms. Casey' },
};
