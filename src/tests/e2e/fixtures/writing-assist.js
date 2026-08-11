/**
 * POST /api/writing/assist (src/app/api/writing/assist/route.js), consumed by sendChatMessage
 * (src/api/chat_api.js). The shape matches what createBotMessage (src/utils/chatUtils.js) expects:
 * `data.tool_used` picks the message type and `data.result.html_content` becomes the DraftBubble's
 * applied HTML for both the 'outline' tool (used by the "Draft" quick action) and the 'refine' tool
 * (used by "Refine"). One entry per expected chatbot round-trip so a test can assert the editor's
 * content actually changes after each "Apply Draft" click.
 */
export const DRAFT_LAYOUT_HTML = [
  '<h1>Wellness and fitness trends</h1><p>Opening hook, three key sections, and a call to action.</p>',
  '<h1>Wellness and fitness trends</h1><p>Refined opening hook with tightened sections and a sharper call to action.</p>',
  '<h1>Wellness and fitness trends</h1><p>Second refinement pass with clearer transitions throughout the article.</p>',
];

export function buildDraftLayoutFixture(htmlContent) {
  return { data: { tool_used: 'outline', result: { html_content: htmlContent } } };
}

export function buildRefineFixture(htmlContent) {
  return { data: { tool_used: 'refine', result: { html_content: htmlContent } } };
}
