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

const HTML_ENTITIES = { lt: '<', gt: '>', quot: '"', '#39': "'", amp: '&' };

/**
 * Normalise the assistant's draft payload before it reaches app state.
 *
 * The backend returns `result.html_content` as free-form model output. It can be absent, it is
 * sometimes wrapped in a single ```html fence (the model thinking of its reply as a markdown
 * document), and it is occasionally HTML-escaped rather than raw. A fence or escaped entities are
 * fatal for anything that renders the value as HTML, so both are unwrapped here - at the boundary
 * where the payload enters state - rather than in each consumer (the chat bubble preview and the
 * editor both read `message.draftContent`).
 *
 * @param {unknown} raw - The raw html_content value
 * @returns {string} - HTML ready to be parsed by the editor
 */
export const normalizeAssistantContent = (raw) => {
    if (typeof raw !== 'string') return '';

    let text = raw.trim();

    // Strip one wrapping markdown code fence.
    const fenced = text.match(/^```[^\n]*\n([\s\S]*?)\n?```$/);
    if (fenced) text = fenced[1].trim();

    // Decode entities only when the payload has no real tags at all but does contain escaped tag
    // sequences - i.e. it is unambiguously an escaped HTML document. HTML that merely contains a
    // code sample (&lt;h1&gt; inside a <pre>) keeps its entities. Single pass, so &amp;lt; does not
    // double-decode.
    const isFullyEscaped = !/<\/?[a-z][^>]*>/i.test(text) && /&lt;\/?[a-z][\s\S]*?&gt;/i.test(text);
    if (isFullyEscaped) {
        text = text.replace(/&(lt|gt|quot|#39|amp);/g, (match, name) => HTML_ENTITIES[name]);
    }

    return text;
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

    // The outline and refine tools both hand back a full draft layout
    const draftLayoutMessage = () => ({
        ...baseMessage,
        type: 'draft_layout',
        draftContent: normalizeAssistantContent(result.html_content)
    });

    // Message type mapping
    const messageTypes = {
        outline: draftLayoutMessage,
        proofread: () => ({
            ...baseMessage,
            type: 'suggestions',
            suggestions: result.corrections
        }),
        refine: draftLayoutMessage
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