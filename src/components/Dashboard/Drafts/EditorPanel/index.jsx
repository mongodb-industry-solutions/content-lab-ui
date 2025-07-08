'use client';

import Card from '@leafygreen-ui/card';
import Sidebar from './Sidebar';
import RichTextEditor from './RichTextEditor';
import styles from './EditorPanel.module.css';

export default function EditorPanel() {
    return (
        <Card className={styles.editorPanel}>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>
                <div className={styles.textEditor}>
                    <RichTextEditor />
                </div>
            </div>
        </Card>
    );
} 