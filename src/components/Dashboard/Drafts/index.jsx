'use client';

import EditorPanel from './EditorPanel';
import Chatbot from './Chatbot';
import { GradientBackground } from '@/components/external/GradientBackground';
import  IconButton from '@leafygreen-ui/icon-button';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import { useRouter } from 'next/navigation';
import styles from './Drafts.module.css';

export default function Drafts() {
    const router = useRouter();

    const handleBackClick = () => {
        router.push('/topics');
    };

    const handlePublishDraft = () => {
        // TODO: Implement publish draft functionality
        console.log('Publishing draft...');
    };

    return (
        <div className={styles.draftsContainer}>
            <GradientBackground 
                gradientFrom="#ffffff"
                gradientTo="#00ED64"
                gradientSize="100% 100%"
                gradientPosition="50% 10%"
                gradientStop="35%"
            />

            {/* Header with Back and Publish buttons */}
            <div className={styles.headerContainer}>
                <div className={styles.backButtonContainer}>
                    <IconButton
                        aria-label="Back to Topics"
                        onClick={handleBackClick}
                        className={styles.backButton}
                    >
                        <Icon glyph="ChevronLeft" />
                    </IconButton>
                </div>
                
                <div className={styles.publishButtonContainer}>
                    <Button
                        rightGlyph={<Icon glyph="Upload" />}
                        size="default"
                        variant="primary"
                        onClick={handlePublishDraft}
                    >
                        Publish Draft
                    </Button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className={styles.contentGrid}>
                <div className={styles.editorSection}>
                    <EditorPanel />
                </div>
                <div className={styles.chatbotSection}>
                    <Chatbot />
                </div>
            </div>
        </div>
    );
}