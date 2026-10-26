import { useState, useEffect } from 'react';
import { useEditor } from '@tiptap/react';
import { EDITOR_EXTENSIONS } from '@/utils/tiptapExtensions';
import { setEditorHtml } from '@/utils/editorUtils';

/**
 * Custom hook for managing TipTap editor with all its configuration and state
 * @returns {Object} - Editor instance, state, and imperative methods
 */
export function useTiptapEditor() {
    const [content, setContent] = useState('');
    const [isMounted, setIsMounted] = useState(false);

    const editor = useEditor({
        extensions: EDITOR_EXTENSIONS,
        content: '',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setContent(html);
        },
        immediatelyRender: false,
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Calculate word count
    const wordCount = content.replace(/<[^>]*>/g, '').trim() === '' ? 0 : 
        content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
    const charCount = content.replace(/<[^>]*>/g, '').length;

    // Imperative methods that can be exposed via forwardRef
    const editorMethods = {
        getDraftContent: () => {
            return editor?.getHTML() || '';
        },
        getDraftText: () => {
            return editor?.storage?.markdown?.getMarkdown() || '';
        },
        setDraftContent: (newContent) => {
            setEditorHtml(editor, newContent);
        },
        replaceText: (original, replacement) => {
            if (editor) {
                const currentContent = editor.getHTML();
                const newContent = currentContent.replace(original, replacement);
                editor.commands.setContent(newContent);
            }
        }
    };

    return {
        // Editor instance
        editor,
        
        // State
        content,
        isMounted,
        wordCount,
        charCount,
        
        // Imperative methods
        editorMethods
    };
} 