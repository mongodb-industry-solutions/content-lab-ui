/**
 * POST /api/services/research (src/app/api/services/research/route.js), consumed by researchTopic
 * (src/api/research_api.js) and rendered by the EditorPanel Sidebar's KeyPoints component, which fires
 * this request as soon as the drafts page mounts with a topic.
 */
export function buildResearchFixture() {
  return {
    keyPoints: [{ title: 'Key point one', url: 'https://wellness-example.test/key-points/one' }],
  };
}
