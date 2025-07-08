'use client';

import EditorPanel from './EditorPanel';
import Chatbot from './Chatbot';
import { GradientBackground } from '@/components/external/GradientBackground';
import  IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { useRouter } from 'next/navigation';
import styles from './Drafts.module.css';

export default function Drafts() {
    const router = useRouter();

    const handleBackClick = () => {
        router.push('/topics');
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

            {/* Back Button */}
            <div className={styles.backButtonContainer}>
                <IconButton
                    aria-label="Back to Topics"
                    onClick={handleBackClick}
                    className={styles.backButton}
                >
                    <Icon glyph="ChevronLeft" />
                </IconButton>
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