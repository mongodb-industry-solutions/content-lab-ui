const mainBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

/**
 * Search for query-based topics from the main backend
 * Used for search functionality
 * @param {string} query - The search query
 * @param {string} label - The filter label (for future implementation)
 * @returns {Promise<Array>} - A promise that resolves to the topics
 */
export async function analyzeQuery(query, label = 'all') {
    try {
      const response = await fetch(`${mainBackendUrl}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: query.trim(),
          limit: 10
          // label: label !== 'all' ? label : undefined
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.suggestions;
    } catch (error) {
      console.error('Error fetching query topics on server:', error);
      return [];
    }
  }