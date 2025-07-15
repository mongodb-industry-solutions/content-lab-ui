import { fetchDraftByTopicId } from '@/api/drafts_api';

/**
 * Check if there's an existing draft for a given topic ID
 * @param {string} topicId - The topic ObjectId from suggestions collection
 * @param {string} userId - The user ID
 * @returns {Promise<string|null>} - Returns draft ID if found, null otherwise
 */
export async function findExistingDraft(topicId, userId) {
    try {
        if (!userId || !topicId) {
            return null;
        }

        const existingDraft = await fetchDraftByTopicId(topicId, userId);
        return existingDraft ? existingDraft._id : null;
    } catch (error) {
        return null;
    }
}

/**
 * Navigate to the appropriate draft page (new or existing)
 * @param {Object} topicCard - The topic card data
 * @param {Object} router - Next.js router instance
 */
export async function navigateToDraft(topicCard, router) {
    try {
        // Store topic and get user id
        localStorage.setItem('topicCard', JSON.stringify(topicCard));  
        const userProfile = localStorage.getItem('userProfile');
        const userId = userProfile ? JSON.parse(userProfile)._id : null;

        if (userId && topicCard._id) {
            const existingDraftId = await findExistingDraft(topicCard._id, userId);

            if (existingDraftId) {
                router.push(`/drafts/${existingDraftId}`);
                return;
            }
        }

        router.push('/drafts');
    } catch (error) {
        router.push('/drafts');
    }
} 