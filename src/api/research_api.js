// IMPORTANT: Use /api as base URL (Next.js proxy pattern)
// This points to Next.js API routes, NOT the backend directly
const API_BASE_URL = '/api';

/**
 * Research a topic and get key points for content creation
 * @param {string} topic - The topic to research
 * @returns {Promise<Object>} - A promise that resolves to the topic research results with key points
 */
export async function researchTopic(topic) {
    try {
      const response = await fetch(`${API_BASE_URL}/services/research`, {
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