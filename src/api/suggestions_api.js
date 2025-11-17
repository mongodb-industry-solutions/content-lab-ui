// IMPORTANT: Use /api as base URL (Next.js proxy pattern)
// This points to Next.js API routes, NOT the backend directly
const API_BASE_URL = '/api';

/**
 * Fetch suggested topics from the main backend
 * Used for initial load and label filtering only
 * @param {string} label - The filter label (optional, defaults to 'general')
 * @returns {Promise<Array>} - A promise that resolves to the topics
 */
export async function fetchSuggestedTopics(label = 'general') {
    try {
      const params = new URLSearchParams();
      
      if (label && label !== 'general') {
        params.append('label', label);
      }
      
      const url = `${API_BASE_URL}/content/suggestions${params.toString() ? '?' + params.toString() : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.suggestions;
    } catch (error) {
      throw new Error('Failed to get suggested topics. Please try again.');
    }
  }