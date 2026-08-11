import { HEALTH_TOPIC } from './suggestions.js';

/**
 * POST /api/services/analyze (src/app/api/services/analyze/route.js), consumed by analyzeQuery
 * (src/api/search_api.js) when a user submits a search or clicks a recommended query card. Reuses
 * HEALTH_TOPIC so "Wellness and fitness trends" (the recommended query card text, see
 * QUERIES_PER_CATEGORY.health in src/constants/categories.js) returns a matching result.
 */
export function buildAnalyzeFixture() {
  return { suggestions: [HEALTH_TOPIC] };
}
