/**
 * Safely parse backend response structure
 * @param {Object} response - The backend response
 * @returns {Object} - The parsed response
 */
export const parseBackendResponse = (response) => {
    // Safely extract the data structure
    const data = response?.data || {};
    const toolUsed = data.tool_used;
    const result = data.result || {};
    
    return {
        toolUsed,
        result,
        fallbackText: response?.response || result?.response || "Sorry, I couldn't process that request."
    };
};

/**
 * Create message object based on backend response
 * @param {Object} response - The backend response
 * @param {string} baseId - The base message id
 * @returns {Object} - The message object
 */
export const createBotMessage = (response, baseId) => {
    const { toolUsed, result, fallbackText } = parseBackendResponse(response);
    
    const baseMessage = {
        id: baseId,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Message type mapping
    const messageTypes = {
        outline: () => ({
            ...baseMessage,
            type: 'draft_layout',
            draftContent: result.html_content
        }),
        proofread: () => ({
            ...baseMessage, 
            type: 'suggestions',
            suggestions: result.corrections
        }),
        refine: () => ({
            ...baseMessage,
            type: 'draft_layout',
            draftContent: result.html_content
        })
    };

    return messageTypes[toolUsed]?.() || {
        ...baseMessage,
        type: 'text',
        text: fallbackText
    };
};

/**
 * Create user message object
 * @param {string} messageText - The user message text
 * @returns {Object} - The message object
 */
export const createUserMessage = (messageText) => {
    return {
        id: Date.now().toString(),
        text: messageText,
        sender: 'user',
        type: 'text',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
};

/**
 * Create error message object
 * @param {string} errorText - The error message text
 * @returns {Object} - The message object
 */
export const createErrorMessage = (errorText = "I'm experiencing some technical difficulties. Please try again.") => {
    return {
        id: (Date.now() + 1).toString(),
        type: 'text',
        text: errorText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
};

/**
 * Create "need content" message when draft is empty
 * @param {string} actionType - The action type
 * @returns {Object} - The message object
 */
export const createNeedContentMessage = (actionType) => {
    const messages = {
        refine: "Please add some content to your draft first, then I can help refine it for you! ✨",
        proofread: "Please add some content to your draft first, then I can help proofread it for you! 🔍"
    };
    
    return {
        id: Date.now().toString(),
        text: messages[actionType] || "Please add some content to your draft first!",
        sender: 'bot',
        type: 'text',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
}; 