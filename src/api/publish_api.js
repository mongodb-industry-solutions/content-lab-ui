const mainBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

/**
 * Publish a draft to the main backend (to then publish to ist.media)
 * @param {string} userId - The user id
 * @param {string} title - The draft title 
 * @param {string} category - The draft category
 * @param {string} content - The draft content
 * @param {string} keywords - The draft keywords        
 * @param {string} topicId - The topic id
 * @returns {Promise<Object>} - A promise that resolves to the published draft
 * */
export async function publishDraft(userId, title, category, content, keywords = null, topicId = null) {
    try {
        const response = await fetch(`${mainBackendUrl}/api/drafts/${draftId}/publish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                userId, 
                title, 
                category, 
                content,
                keywords,
                topicId
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error('Failed to publish draft. Please try again.');
    }
}
