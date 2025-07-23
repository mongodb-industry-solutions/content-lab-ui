const chatBackendUrl = process.env.NEXT_PUBLIC_CHAT_BACKEND_URL || "http://localhost:8001";

/**
 * Send a chat message and get AI response
 * @param {Object} chatData - The chat data object
 * @param {string} chatData.message - The user message
 * @param {string} chatData.draftContent - Current draft content
 * @param {string} chatData.promptType - Type of prompt (refine, proofread, draft_layout, or null)
 * @param {Object} chatData.userProfile - User profile data
 * @param {Object} chatData.topicCard - Topic card data
 * @returns {Promise<Object>} - A promise that resolves to the AI response
 */
export async function sendChatMessage(chatData) {
  try {
    const response = await fetch(`${chatBackendUrl}/api/writing/assist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          draftContent: chatData.draftContent,
          promptType: chatData.promptType,
          profile: chatData.userProfile,
          message: chatData.message,
          topicDetails: chatData.topicCard
        }
      ),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
    
    
  } catch (error) {
    throw new Error('Failed to get AI response. Please try again.');
  }
}