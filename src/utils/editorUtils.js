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