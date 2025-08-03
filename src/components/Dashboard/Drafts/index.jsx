'use client';

/**
 * Drafts component for the dashboard
 * Contains the editor panel and the chatbot
 * Acts as main source of truth for every component used in this page
 * Delegates the logic to other components via external hooks and utils (refs, hooks, etc.)
 */

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import MobileDrafts from './MobileDrafts';
import DesktopDrafts from './DesktopDrafts';
import { useNotification } from '@/hooks/useNotification';
import { useDraftManager } from '@/hooks/useDraftManager';
import { useMobile } from '@/hooks/useMobile';
import { createEditorUtils } from '@/utils/editorUtils';

export default function Drafts({ draftId: initialDraftId = null }) {
    const router = useRouter();
    const editorRef = useRef(null);
    const isMobile = useMobile(1400);
    
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
    };

        // Shared props for both mobile and desktop components
    const sharedProps = {
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
    };

    // Conditional rendering based on device type
    return isMobile ? (
        <MobileDrafts {...sharedProps} />
    ) : (
        <DesktopDrafts {...sharedProps} />
    );
}