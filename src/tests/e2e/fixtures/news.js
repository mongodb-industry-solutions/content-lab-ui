import { fallbackNews } from '../../../constants/fallbacks.js';

/**
 * GET /api/content/news (src/app/api/content/news/route.js), consumed by fetchNews
 * (src/api/news_api.js). Reuses the app's own fallback data instead of duplicating the shape: it is
 * already exactly what TopNews/NewsCard render when the real search backend is unavailable, and it
 * has the 4 items NewsCard's rotation (`currentIndex % 4`) expects.
 */
export const newsFixture = fallbackNews;
