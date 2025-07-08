'use client';

import { useEffect, useState } from 'react';
import Card from '@leafygreen-ui/card';
import Sidebar from './Sidebar';
import RichTextEditor from './RichTextEditor';
import styles from './EditorPanel.module.css';

export default function EditorPanel() {
    const [topicCard, setTopicCard] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

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
                    <RichTextEditor />
                </div>
            </div>
        </Card>
    );
} 