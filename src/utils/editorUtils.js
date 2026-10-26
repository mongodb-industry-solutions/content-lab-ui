import { DOMParser as ProseMirrorDOMParser } from '@tiptap/pm/model';

/**
 * Replaces an editor's whole document from an HTML string.
 *
 * Deliberately does NOT call editor.commands.setContent. The Markdown extension (tiptap-markdown,
 * registered in src/utils/tiptapExtensions.js) overrides that command so that every *string*
 * argument is first rendered by markdown-it, whose indented-code rule runs before its html_block
 * rule - so an indented HTML payload reaches the editor as literal markup inside a code block.
 * Parsing with the editor's own schema and dispatching the transaction skips that override.
 *
 * It also fixes a second defect at the same seam: setContent defaults emitUpdate to false and marks
 * the transaction `preventUpdate`, so onUpdate never fires and the "N words • N characters" status
 * bar stays stale. This dispatches an untagged transaction, so TipTap emits `update`.
 *
 * @param {Object} editor - TipTap editor instance
 * @param {string} html - HTML to parse into the editor's schema
 * @returns {boolean} - True when a transaction was dispatched
 */
export function setEditorHtml(editor, html) {
    if (!editor || editor.isDestroyed) return false;

    // A DOMParser document is inert - scripts never run and resources are never fetched - and the
    // schema parse below drops every node and mark the editor does not declare, so this needs no
    // dangerouslySetInnerHTML and no separate sanitiser.
    const dom = new window.DOMParser().parseFromString(html ?? '', 'text/html');
    const doc = ProseMirrorDOMParser.fromSchema(editor.schema).parse(dom.body);

    const { state, view } = editor;
    view.dispatch(state.tr.replaceWith(0, state.doc.content.size, doc.content));

    return true;
}

/**
 * Creates editor interaction functions for the chatbot
 * @param {Object} editorRef - Reference to the editor component
 * @returns {Object} - Editor interaction functions
 */
export function createEditorUtils(editorRef) {
    const getDraftContent = () => {
        return editorRef.current?.getDraftContent() || '';
    };

    const applyDraftLayout = (newContent) => {
        editorRef.current?.setDraftContent(newContent);
    };

    const applySuggestion = (original, replacement) => {
        editorRef.current?.replaceText(original, replacement);
    };

    return {
        getDraftContent,
        applyDraftLayout,
        applySuggestion
    };
} 