/**
 * POST /api/writing/assist (src/app/api/writing/assist/route.js), consumed by sendChatMessage
 * (src/api/chat_api.js). The shape matches what createBotMessage (src/utils/chatUtils.js) expects:
 * `data.tool_used` picks the message type and `data.result.html_content` becomes the DraftBubble's
 * applied HTML for both the 'outline' tool (used by the "Draft" quick action) and the 'refine' tool
 * (used by "Refine"). One entry per expected chatbot round-trip so a test can assert the editor's
 * content actually changes after each "Apply Draft" click.
 */
/**
 * REGRESSION FIXTURE - do not "tidy" the indentation away.
 *
 * Each payload is pretty-printed the way a model that is thinking of its reply as a markdown
 * document indents it: four spaces on every line, with a blank line between blocks. That shape is
 * what markdown-it's *indented code* block rule (which runs before its html_block rule) turns into a
 * <pre><code> block, so the old `editor.commands.setContent(html)` path handed the editor the literal
 * text "<h1>...</h1>" instead of a heading node.
 *
 * Two details are load-bearing:
 *  - the indent must not be on the first line only: normalizeAssistantContent trims the payload,
 *    which removes a purely leading indent and would hide the bug again;
 *  - the blank line between the blocks is what stops markdown-it's html_block rule (which runs until
 *    a blank line) from swallowing the indented lines as raw HTML.
 * A flush-left payload - what this fixture used to be - slips through html_block untouched and
 * proves nothing.
 */
export const DRAFT_LAYOUT_HTML = [
  '    <h1>Wellness and fitness trends</h1>\n\n    <p>Opening hook, three key sections, and a call to action.</p>',
  '    <h1>Wellness and fitness trends</h1>\n\n    <p>Refined opening hook with tightened sections and a sharper call to action.</p>',
  '    <h1>Wellness and fitness trends</h1>\n\n    <p>Second refinement pass with clearer transitions throughout the article.</p>',
];

export function buildDraftLayoutFixture(htmlContent) {
  return { data: { tool_used: 'outline', result: { html_content: htmlContent } } };
}

export function buildRefineFixture(htmlContent) {
  return { data: { tool_used: 'refine', result: { html_content: htmlContent } } };
}
