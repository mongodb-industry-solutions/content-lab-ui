'use client';

/**
 * Desktop-specific Drafts component
 * Original desktop layout with sidebar and chatbot side-by-side
 */

import EditorPanel from '../EditorPanel';
import Chatbot from '../Chatbot';
import IconButton from '@leafygreen-ui/icon-button';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import Banner from '@leafygreen-ui/banner';
import styles from './DesktopDrafts.module.css';

export default function DesktopDrafts({
    // Props from parent Drafts component
    notification,
    clearNotification,
    handleBackClick,
    handleSaveDraft,
    handlePublishDraft,
    isSaving,
    isLoading,
    draftId,
    editorRef,
    metadata,
    handleMetadataChange,
    topicCard,
    getDraftContent,
    applyDraftLayout,
    applySuggestion,
    userProfile
}) {
    return (
        <div className={styles.draftsContainer}>
            {/* Full page grid background */}
            <div className={styles.pageBackground} />

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
                        variant="primaryOutline"
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
                        topicCard={topicCard}
                        isMobile={false}
                    />
                </div>
                <div className={styles.chatbotSection}>
                    <Chatbot 
                        getDraftContent={getDraftContent}
                        applyDraftLayout={applyDraftLayout}
                        applySuggestion={applySuggestion}
                        userProfile={userProfile}
                        topicCard={topicCard}
                        isMobile={false}
                    />
                </div>
            </div>
        </div>
    );
}
