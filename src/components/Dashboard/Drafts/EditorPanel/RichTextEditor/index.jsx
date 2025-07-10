'use client';

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import TiptapToolbar from '@/components/external/TiptapToolbar';
import { Body } from '@leafygreen-ui/typography';
import styles from './RichTextEditor.module.css';

const RichTextEditor = forwardRef((props, ref) => {
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

    useImperativeHandle(ref, () => ({
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
    }));

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Don't render until component is mounted (prevents SSR issues)
    if (!isMounted || !editor) {
        return (
            <div className={styles.richTextEditor}>
                <div className={styles.loadingState}>
                    <Body>Loading editor...</Body>
                </div>
            </div>
        );
    }

    // Calculate word count
    const wordCount = content.replace(/<[^>]*>/g, '').trim() === '' ? 0 : 
        content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
    const charCount = content.replace(/<[^>]*>/g, '').length;

    return (
        <div className={styles.richTextEditor}>
            {/* Tiptap Toolbar */}
            <div className={styles.toolbarSection}>
                <TiptapToolbar editor={editor} />
            </div>

            {/* Editor Section */}
            <div className={styles.editorSection}>
                <EditorContent 
                    editor={editor} 
                    className={styles.editorContent}
                />
            </div>

            {/* Status Bar */}
            <div className={styles.statusBar}>
                <span>Ready</span>
                <div className={styles.wordCount}>
                    {wordCount} words • {charCount} characters
                </div>
            </div>
        </div>
    );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor; 