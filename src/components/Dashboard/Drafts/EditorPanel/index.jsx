'use client';

/**
 * Editor panel component for the drafts component
 * Contains the sidebar and the rich text editor (Tiptap)
 */

import { forwardRef, useImperativeHandle, useRef } from 'react';
import Card from '@leafygreen-ui/card';
import Sidebar from './Sidebar';
import RichTextEditor from './RichTextEditor';
import styles from './EditorPanel.module.css';

const EditorPanel = forwardRef(({ metadata, onMetadataChange, topicCard, isMobile = false }, ref) => {
    const editorRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getDraftContent: () => {
            return editorRef.current?.getDraftContent() || '';
        },
        setDraftContent: (newContent) => {
            editorRef.current?.setDraftContent(newContent);
        },
        replaceText: (original, replacement) => {
            editorRef.current?.replaceText(original, replacement);
        }
    }));

    if (!topicCard) {
        return null;
    }

    return (
        <Card className={`${styles.editorPanel} ${isMobile ? styles.mobileEditor : ''}`}>
            <div className={styles.container}>
                {!isMobile && (
                    <div className={styles.sidebar}>
                        <Sidebar 
                            topicCard={topicCard} 
                            metadata={metadata}
                            onMetadataChange={onMetadataChange}
                            isMobile={false}
                        />
                    </div>
                )}
                <div className={styles.textEditor}>
                    <RichTextEditor ref={editorRef} />
                </div>
            </div>
        </Card>
    );
});

EditorPanel.displayName = 'EditorPanel';

export default EditorPanel; 