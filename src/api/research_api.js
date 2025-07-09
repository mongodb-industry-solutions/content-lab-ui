const mainBackendUrl = process.env.BACKEND_URL || "http://localhost:8000";

/**
 * Research a topic and get key points for content creation
 * @param {string} topic - The topic to research
 * @returns {Promise<Object>} - A promise that resolves to the topic research results with key points
 */
export async function researchTopic(topic) {
    try {
      const response = await fetch(`${mainBackendUrl}/api/research`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          topic: topic.trim()
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.keyPoints;
    } catch (error) {
      throw new Error('Failed to research topic. Please try again.');
    }
  } 