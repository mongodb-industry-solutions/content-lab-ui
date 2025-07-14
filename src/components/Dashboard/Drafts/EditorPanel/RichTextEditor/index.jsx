'use client';

/**
 * Rich text editor component for the editor panel
 * Contains the tiptap toolbar and the editor content
 */

import React, { forwardRef, useImperativeHandle } from 'react';
import { EditorContent } from '@tiptap/react';
import { useTiptapEditor } from '@/hooks/useTiptapEditor';
import TiptapToolbar from '@/components/external/TiptapToolbar';
import { Body } from '@leafygreen-ui/typography';
import styles from './RichTextEditor.module.css';

const RichTextEditor = forwardRef((props, ref) => {
    const {
        editor,
        content,
        isMounted,
        wordCount,
        charCount,
        editorMethods
    } = useTiptapEditor();

    useImperativeHandle(ref, () => editorMethods, [editorMethods]);

    if (!isMounted || !editor) {
        return (
            <div className={styles.richTextEditor}>
                <div className={styles.loadingState}>
                    <Body>Loading editor...</Body>
                </div>
            </div>
        );
    }

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