/**
 * Safely parse backend response structure
 * Handles inconsistent response formats from the backend
 */
export const parseBackendResponse = (response) => {
    console.log('Raw backend response:', response);
    
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
 * Maps different tool types to appropriate message structures
 */
export const createBotMessage = (response, baseId) => {
    const { toolUsed, result, fallbackText } = parseBackendResponse(response);
    
    const baseMessage = {
        id: baseId,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Message type mapping - easy to extend with new types
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