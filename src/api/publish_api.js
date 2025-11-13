// IMPORTANT: Use /api as base URL (Next.js proxy pattern)
// This points to Next.js API routes, NOT the backend directly
const API_BASE_URL = '/api';

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
        const response = await fetch(`${API_BASE_URL}/drafts/publish`, {
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
