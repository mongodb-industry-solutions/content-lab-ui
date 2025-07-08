'use client';

import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import TiptapToolbar from '@/components/external/TiptapToolbar';
import styles from './RichTextEditor.module.css';

export default function RichTextEditor() {
    const [content, setContent] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false, 
            }),
            Heading.configure({
                levels: [1, 2, 3],
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: 'tiptap-bullet-list',
                },
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: 'tiptap-ordered-list',
                },
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
    });

    if (!editor) {
        return null;
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
} 