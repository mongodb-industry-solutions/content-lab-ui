const mainBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

/**
 * Save a draft to the main backend
 * @param {string} userId - The user id
 * @param {string} title - The draft title
 * @param {string} category - The draft category
 * @param {string} content - The draft content
 * @param {string} keywords - The draft keywords
 * @param {string} topicId - The topic id
 * @returns {Promise<Object>} - A promise that resolves to the draft
 */
export async function saveDraft(userId, title, category, content, keywords = null, topicId = null) {
    try {
        const response = await fetch(`${mainBackendUrl}/api/drafts`, {
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
        throw new Error('Failed to save draft. Please try again.');
    }
}

/** 
 * Update a draft in the main backend
 * @param {string} draftId - The draft id
 * @param {string} userId - The user id
 * @param {string} title - The draft title
 * @param {string} category - The draft category
 * @param {string} content - The draft content
 * @param {string} keywords - The draft keywords
 * @param {string} topicId - The topic id
 * @returns {Promise<Object>} - A promise that resolves to the draft
 */
export async function updateDraft(draftId, userId, title, category, content, keywords = null, topicId = null) {
    try {
        const response = await fetch(`${mainBackendUrl}/api/drafts/${draftId}`, {
            method: 'PUT',
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
        throw new Error('Failed to update draft. Please try again.');
    }
}

/**
 * Fetch a single draft by ID
 * @param {string} draftId - The draft id
 * @param {string} userId - The user id for access validation
 * @returns {Promise<Object>} - A promise that resolves to the draft
 */
export async function fetchDraftById(draftId, userId) {
    try {
        const response = await fetch(`${mainBackendUrl}/api/drafts/${draftId}?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Draft not found or access denied');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch draft. Please try again.');
    }
}

/**
 * Get an existing draft by topic ID
 * @param {string} topicId - The topic id
 * @param {string} userId - The user id
 * @returns {Promise<Object|null>} - Returns draft if found, null otherwise
 */
export async function fetchDraftByTopicId(topicId, userId) {
    try {
        const response = await fetch(`${mainBackendUrl}/api/drafts/by-topic/${topicId}?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        return null;
    }
}

/**
 * Fetch all drafts for a specific user
 * @param {string} userId - The user id
 * @returns {Promise<Array>} - Returns array of all user's drafts
 */
export async function fetchUserDrafts(userId) {
    try {
        const response = await fetch(`${mainBackendUrl}/api/drafts?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error('Failed to fetch drafts. Please try again.');
    }
}

