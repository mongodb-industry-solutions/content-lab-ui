'use client';

/**
 * Mobile-specific Drafts component
 * Handles three-panel mobile navigation: Sidebar → Editor → Chatbot
 * One panel visible at a time for optimal mobile experience
 */

import { useState } from 'react';
import IconButton from '@leafygreen-ui/icon-button';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import Banner from '@leafygreen-ui/banner';
import { SegmentedControl, SegmentedControlOption } from '@leafygreen-ui/segmented-control';
import EditorPanel from '../EditorPanel';
import Chatbot from '../Chatbot';
import Sidebar from '../EditorPanel/Sidebar';
import styles from './MobileDrafts.module.css';

export default function MobileDrafts({
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
    // Mobile view state: 'sidebar', 'editor', 'chat'
    const [currentView, setCurrentView] = useState('editor');

    const handleViewChange = (value) => {
        setCurrentView(value);
    };

    // All three panels stay mounted and are toggled with CSS rather than conditionally rendered, so
    // switching tabs doesn't unmount/remount EditorPanel and lose its Tiptap content (matches how
    // DesktopDrafts already keeps Editor and Chat mounted side by side).
    const panelStyle = (view) => ({ display: currentView === view ? undefined : 'none' });

    return (
        <div className={styles.mobileDraftsContainer}>
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

            {/* Mobile Header */}
            <div className={styles.mobileHeader}>
                <div className={styles.headerLeft}>
                    <IconButton
                        aria-label="Back to Topics"
                        onClick={handleBackClick}
                        className={styles.backButton}
                    >
                        <Icon glyph="ChevronLeft" />
                    </IconButton>
                </div>

                <div className={styles.headerCenter}>
                    <SegmentedControl
                        name="mobile-view"
                        value={currentView}
                        onChange={handleViewChange}
                        size="small"
                    >
                        <SegmentedControlOption value="sidebar" glyph={<Icon glyph="Menu" />}>
                            Sidebar
                        </SegmentedControlOption>
                        <SegmentedControlOption value="editor" glyph={<Icon glyph="Edit" />}>
                            Editor
                        </SegmentedControlOption>
                        <SegmentedControlOption value="chat" glyph={<Icon glyph="Person" />}>
                            Chat
                        </SegmentedControlOption>
                    </SegmentedControl>
                </div>

                <div className={styles.headerRight}>
                    {/* Empty for now, can add actions later */}
                </div>
            </div>

            {/* Mobile Action Bar - Show on all views */}
            <div className={styles.mobileActionBar}>
                <Button
                    size="small"
                    variant="primaryOutline"
                    onClick={handleSaveDraft}
                    disabled={isSaving || isLoading}
                    className={styles.actionButton}
                >
                    {isLoading ? 'Loading...' : isSaving ? 'Saving...' : (draftId ? 'Update' : 'Save')}
                </Button>
                <Button
                    size="small"
                    variant="primary"
                    onClick={handlePublishDraft}
                    className={styles.actionButton}
                >
                    Publish
                </Button>
            </div>

            {/* Main Content */}
            <div className={styles.mobileContent}>
                {topicCard && (
                    <>
                        <div style={panelStyle('sidebar')}>
                            <Sidebar
                                metadata={metadata}
                                onMetadataChange={handleMetadataChange}
                                topicCard={topicCard}
                                isMobile={true}
                            />
                        </div>
                        <div style={panelStyle('editor')}>
                            <EditorPanel
                                ref={editorRef}
                                metadata={metadata}
                                onMetadataChange={handleMetadataChange}
                                topicCard={topicCard}
                                isMobile={true}
                            />
                        </div>
                        <div style={panelStyle('chat')}>
                            <Chatbot
                                getDraftContent={getDraftContent}
                                applyDraftLayout={applyDraftLayout}
                                applySuggestion={applySuggestion}
                                userProfile={userProfile}
                                topicCard={topicCard}
                                isMobile={true}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}