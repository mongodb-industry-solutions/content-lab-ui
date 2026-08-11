import { fallbackViralPosts } from '../../../constants/fallbacks.js';

/**
 * GET /api/content/reddit (src/app/api/content/reddit/route.js), consumed by fetchRedditPosts
 * (src/api/reddit_api.js). Reuses the app's own fallback data - see news.js for why.
 */
export const redditFixture = fallbackViralPosts;
