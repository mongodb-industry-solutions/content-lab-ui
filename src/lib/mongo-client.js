/**
 * Fetch reddit posts from the MongoDB Atlas database (server-side)
 * @returns {Promise<Array>} - A promise that resolves to the reddit posts
 */
export async function fetchRedditPosts() {
  try {
    const response = await fetch('/api/redditPosts');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const redditPosts = await response.json();
    return redditPosts;
  } catch (error) {
    console.error('Error fetching reddit posts on server:', error);
    return [];
  }
}
  
/**
 * Fetch user profile from the MongoDB Atlas database (server-side)
 * @param {string} userId - The ID of the user to fetch
 * @returns {Promise<Object>} - A promise that resolves to the user profile
 */
export async function fetchUserProfile(userId) {
  try {
    const response = await fetch(`/api/userProfiles?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userProfile = await response.json();
    return userProfile;
  } catch (error) {
    console.error('Error fetching user profile on server:', error);
    return null;
  }
}

/**
 * Fetch news from the MongoDB Atlas database (server-side)
 * @returns {Promise<Array>} - A promise that resolves to the news
 */
export async function fetchNews() {
  try {
    const response = await fetch('/api/news');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const news = await response.json();
    return news;
  } catch (error) {
    console.error('Error fetching news on server:', error);
    return [];
  }
}

/**
 * Fetch suggested topics from the MongoDB Atlas database (server-side)
 * Used for initial load and label filtering only
 * @param {string} label - The filter label (optional, defaults to 'all')
 * @returns {Promise<Array>} - A promise that resolves to the topics
 */
export async function fetchSuggestedTopics(label = 'all') {
  try {
    const response = await fetch('/api/suggestedTopics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ label }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const topics = await response.json();
    return topics;
  } catch (error) {
    console.error('Error fetching suggested topics on server:', error);
    return [];
  }
}

/**
 * Fetch query-based topics from the MongoDB Atlas database (server-side)
 * Used for search functionality
 * @param {string} query - The search query
 * @param {string} label - The filter label (for future implementation)
 * @returns {Promise<Array>} - A promise that resolves to the topics
 */
export async function fetchQueryTopics(query, label = 'all') {
  try {
    const response = await fetch('/api/queryTopics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, label }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const topics = await response.json();
    return topics;
  } catch (error) {
    console.error('Error fetching query topics on server:', error);
    return [];
  }
}

/**
 * Send a chat message and get AI response (currently simulated)
 * @param {Object} chatData - The chat data object
 * @param {string} chatData.message - The user message
 * @param {Array} chatData.conversation - Previous conversation history
 * @param {Object} chatData.topicCard - Current topic context
 * @param {string} chatData.userId - User ID
 * @param {Object} chatData.userProfile - User profile data
 * @param {boolean} streaming - Whether to simulate streaming response
 * @returns {Promise<Object>} - A promise that resolves to the AI response
 */
export async function sendChatMessage(chatData, streaming = false) {
  try {
    // TODO: Replace this simulation with actual API call to /api/chat
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, streaming ? 500 : 1500));
    
    // Simulate different responses based on message content
    let responseText = "Thanks for your message! I'm here to help you with your content creation.";
    
    if (chatData.message.toLowerCase().includes('draft layout')) {
      responseText = "I'll help you create a comprehensive draft layout. Let me structure this with an introduction, main sections, and conclusion that aligns with your topic and writing style.\n\nHere's a suggested structure:\n\n1. **Introduction** - Hook the reader with a compelling opening\n2. **Main Content** - Develop your key points with supporting evidence\n3. **Conclusion** - Summarize and provide a clear call to action\n\nWould you like me to elaborate on any of these sections?";
    } else if (chatData.message.toLowerCase().includes('proofread')) {
      responseText = "I'd be happy to help proofread your content! Please share the text you'd like me to review, and I'll check for:\n\n• Grammar and spelling errors\n• Clarity and flow improvements\n• Tone consistency\n• Structural suggestions\n\nFeel free to paste your content and I'll provide detailed feedback.";
    } else if (chatData.message.toLowerCase().includes('refine')) {
      responseText = "I'll help refine your content to match your writing style and topic requirements. Based on your profile, I can adjust:\n\n✨ **Tone and Voice** - Ensuring consistency with your brand\n✨ **Structure** - Optimizing flow and readability\n✨ **Messaging** - Strengthening key points for better impact\n\nPlease share the content you'd like me to refine!";
    }
    
    return {
      response: responseText,
      success: true
    };
    
    /* 
    // FUTURE: Actual streaming API implementation
    if (streaming) {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        fullText += chunk;
        
        // You would call an onChunk callback here to update the message in real-time
        // onChunk(fullText);
      }
      
      return { response: fullText, success: true };
    } else {
      // Regular non-streaming request
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    }
    */
    
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw new Error('Failed to get AI response. Please try again.');
  }
}