import { useState, useEffect } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';

/**
 * Custom hook for managing TipTap editor with all its configuration and state
 * @returns {Object} - Editor instance, state, and imperative methods
 */
export function useTiptapEditor() {
    const [content, setContent] = useState('');
    const [isMounted, setIsMounted] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false, 
            }),
            Heading.configure({
                levels: [1, 2, 3],
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'tiptap-link',
                },
            }),
            Underline,
            Placeholder.configure({
                placeholder: 'Start writing your article here...',
            }),
        ],
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
            return editor?.getText() || '';
        },
        setDraftContent: (newContent) => {
            if (editor) {
                editor.commands.setContent(newContent);
            }
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