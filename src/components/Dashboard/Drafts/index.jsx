'use client';

/**
 * Drafts component for the dashboard
 * Contains the editor panel and the chatbot
 * Acts as main source of truth for every component used in this page
 * Delegates the logic to other components via external hooks and utils (refs, hooks, etc.)
 */

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import EditorPanel from './EditorPanel';
import Chatbot from './Chatbot';
import { GradientBackground } from '@/components/external/GradientBackground';
import IconButton from '@leafygreen-ui/icon-button';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import Banner from '@leafygreen-ui/banner';
import { useNotification } from '@/hooks/useNotification';
import { useDraftManager } from '@/hooks/useDraftManager';
import { createEditorUtils } from '@/utils/editorUtils';
import styles from './Drafts.module.css';

export default function Drafts({ draftId: initialDraftId = null }) {
    const router = useRouter();
    const editorRef = useRef(null);
    
    // Custom hooks for drafts
    const { notification, showNotification, clearNotification } = useNotification();
    const {
        draftId,
        isSaving,
        isLoading,
        userProfile,
        topicCard,
        metadata,
        handleMetadataChange,
        handleSaveDraft
    } = useDraftManager(initialDraftId, showNotification, editorRef);

    // Editor utilities
    const { getDraftContent, applyDraftLayout, applySuggestion } = createEditorUtils(editorRef);

    const handleBackClick = () => {
        router.push('/topics');
    };

    const handlePublishDraft = () => {
        // Do something else here
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

            {/* Notification Banner */}
            {notification && (
                <div className={styles.notificationContainer}>
                    <Banner
                        variant={notification.type}
                        dismissible
                        onClose={clearNotification}
                    >
                        {notification.message}
                    </Banner>
                </div>
            )}

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
                        rightGlyph={<Icon glyph="Save" />}
                        size="default"
                        variant="primary"
                        onClick={handleSaveDraft}
                        disabled={isSaving || isLoading}
                    >
                        {isLoading ? 'Loading...' : isSaving ? 'Saving...' : (draftId ? 'Update Draft' : 'Save Draft')}
                    </Button>
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
                    <EditorPanel 
                        ref={editorRef} 
                        metadata={metadata}
                        onMetadataChange={handleMetadataChange}
                        userProfile={userProfile}
                        topicCard={topicCard}
                    />
                </div>
                <div className={styles.chatbotSection}>
                    <Chatbot 
                        getDraftContent={getDraftContent}
                        applyDraftLayout={applyDraftLayout}
                        applySuggestion={applySuggestion}
                        userProfile={userProfile}
                        topicCard={topicCard}
                    />
                </div>
            </div>
        </div>
    );
}