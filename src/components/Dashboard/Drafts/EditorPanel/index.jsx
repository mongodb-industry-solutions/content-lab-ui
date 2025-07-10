'use client';

import { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import Card from '@leafygreen-ui/card';
import Sidebar from './Sidebar';
import RichTextEditor from './RichTextEditor';
import styles from './EditorPanel.module.css';

const EditorPanel = forwardRef((props, ref) => {
    const [topicCard, setTopicCard] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
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

    useEffect(() => {
        const topicCard = JSON.parse(localStorage.getItem('topicCard'));
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        setTopicCard(topicCard);
        setUserProfile(userProfile);
    }, []);

    if (!topicCard || !userProfile) {
        return null;
    }

    return (
        <Card className={styles.editorPanel}>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <Sidebar topicCard={topicCard} userProfile={userProfile}/>
                </div>
                <div className={styles.textEditor}>
                    <RichTextEditor ref={editorRef} />
                </div>
            </div>
        </Card>
    );
});

EditorPanel.displayName = 'EditorPanel';

export default EditorPanel; 