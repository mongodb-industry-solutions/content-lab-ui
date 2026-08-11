/**
 * GET /api/content/suggestions?label=... (src/app/api/content/suggestions/route.js), consumed by
 * fetchSuggestedTopics (src/api/suggestions_api.js). The Topics component fans this call out once per
 * entry in CONTENT_CATEGORIES (src/constants/categories.js) on mount, so the mock has to answer every
 * label, not just 'health'. `.test` is the IANA-reserved TLD for testing - it never resolves on a real
 * network, so "View Source" popups stay hermetic even if a test doesn't explicitly block them.
 */
export const HEALTH_TOPIC = {
  _id: 'topic_health_wellness',
  topic: 'Wellness and fitness trends reshape daily routines',
  label: 'health',
  keywords: ['wellness', 'fitness', 'mindfulness'],
  url: 'https://wellness-example.test/articles/wellness-fitness-trends',
  description: 'A look at how wellness and fitness trends are reshaping daily routines for busy professionals.',
};

function genericTopicFor(label) {
  return {
    _id: `topic_${label}_trending`,
    topic: `Trending ${label} stories worth covering this week`,
    label,
    keywords: [label, 'trending'],
    url: `https://${label}-example.test/articles/trending`,
    description: `A roundup of what is trending in ${label} right now.`,
  };
}

export function buildSuggestionsFixture(label) {
  const topic = label === 'health' ? HEALTH_TOPIC : genericTopicFor(label);
  return { suggestions: [topic] };
}
