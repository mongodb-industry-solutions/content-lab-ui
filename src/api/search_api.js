// IMPORTANT: Use /api as base URL (Next.js proxy pattern)
// This points to Next.js API routes, NOT the backend directly
const API_BASE_URL = '/api';

/**
 * Search for query-based topics from the main backend
 * Used for search functionality
 * @param {string} query - The search query
 * @param {string} label - The filter label (for future implementation)
 * @returns {Promise<Array>} - A promise that resolves to the topics
 */
export async function analyzeQuery(query, label = 'general') {
    try {
      const response = await fetch(`${API_BASE_URL}/services/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: query.trim(),
          limit: 4,
          label: label !== 'general' ? label : undefined
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.suggestions;
    } catch (error) {
      throw new Error('Failed to get query topics. Please try again.');
    }
  }