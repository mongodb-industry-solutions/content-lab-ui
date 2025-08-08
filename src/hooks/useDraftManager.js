import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveDraft, updateDraft, fetchDraftById } from '@/api/drafts_api';
import { publishDraft } from '@/api/publish_api';

/**
 * Custom hook for managing draft operations
 * @param {string} initialDraftId - Initial draft ID if editing existing draft
 * @param {Function} showNotification - Function to show notifications
 * @param {Object} editorRef - Ref to the editor component
 * @returns {Object} - Draft state and operations
 */
export function useDraftManager(initialDraftId, showNotification, editorRef) {
    const router = useRouter();
    const [draftId, setDraftId] = useState(initialDraftId);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [topicCard, setTopicCard] = useState(null);
    const [metadata, setMetadata] = useState({ title: '', category: '' });

    // Get user profile and topic and set metadata
    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('userProfile') || 'null');
        const topicCard = JSON.parse(localStorage.getItem('topicCard') || 'null');
        
        if (profile) setUserProfile(profile);
        if (topicCard) {
            setTopicCard(topicCard);
            if (!initialDraftId) {
                setMetadata({ title: topicCard.topic || '', category: topicCard.label || '', keywords: topicCard.keywords || [] });
            }
        }
    }, [initialDraftId]);

    // Load existing draft or create new one
    useEffect(() => {
        if (!initialDraftId || !userProfile?._id) return;

        const loadDraft = async () => {
            setIsLoading(true);
            showNotification('info', 'Loading draft...');
            try {
                const draft = await fetchDraftById(initialDraftId, userProfile._id);
                setMetadata({ title: draft.title || '', category: draft.category || '', keywords: draft.keywords || [] });
                
                if (editorRef.current && draft.content) {
                    editorRef.current.setDraftContent(draft.content);
                }
                
                showNotification('success', 'Draft loaded successfully!');
            } catch (error) {
                showNotification('danger', 'Failed to load draft. Redirecting to new draft...');
                setTimeout(() => router.push('/drafts'), 2000);
            } finally {
                setIsLoading(false);
            }
        };

        loadDraft();
    }, [initialDraftId, userProfile?._id]);

    const handleMetadataChange = (field, value) => {
        setMetadata(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveDraft = async () => {
        const content = editorRef.current?.getDraftContent() || '';
        
        if (!userProfile?._id) return showNotification('danger', 'No user profile found. Please log in again.');
        if (!content.trim()) return showNotification('danger', 'Please add some content before saving.');
        if (!metadata.title.trim()) return showNotification('danger', 'Please add a title before saving.');

        setIsSaving(true);
        try {
            const topicId = topicCard?._id || null;
            const keywords = topicCard?.keywords || null;

            const result = draftId 
                ? await updateDraft(draftId, userProfile._id, metadata.title, metadata.category, content, keywords, topicId)
                : await saveDraft(userProfile._id, metadata.title, metadata.category, content, keywords, topicId);
            
            if (!draftId) setDraftId(result._id);
            showNotification('success', draftId ? 'Draft updated successfully!' : 'Draft saved successfully!');
        } catch (error) {
            showNotification('danger', 'Failed to save draft. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handlePublishDraft = async () => {
        const content = editorRef.current?.getDraftText() || '';
        
        if (!userProfile?._id) return showNotification('danger', 'No user profile found. Please log in again.');
        if (!content.trim()) return showNotification('danger', 'Please add some content before publishing.');
        if (!metadata.title.trim()) return showNotification('danger', 'Please add a title before publishing.');

        setIsSaving(true);
        try {
            const topicId = topicCard?._id || null;
            const keywords = topicCard?.keywords || null;
            const result = await publishDraft(userProfile._id, metadata.title, metadata.category, content, keywords, topicId);
            showNotification('success', 'Draft published successfully!');
        
            if (result) {
                window.open(result, '_blank');
            }
        } catch (error) {
            showNotification('danger', 'Failed to publish draft. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

        return {
        // State
        draftId, 
        isSaving, 
        isLoading,
        userProfile, 
        topicCard,
        metadata,

        // Actions
        handleMetadataChange, 
        handleSaveDraft,
        handlePublishDraft
    };
} 