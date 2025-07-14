const mainBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

/**
 * Fetch suggested topics from the main backend
 * Used for initial load and label filtering only
 * @param {string} label - The filter label (optional, defaults to 'all')
 * @returns {Promise<Array>} - A promise that resolves to the topics
 */
export async function fetchSuggestedTopics(label = 'all') {
    try {
      const params = new URLSearchParams();
      
      if (label && label !== 'all') {
        params.append('label', label);
      }
      
      const url = `${mainBackendUrl}/api/content/suggestions${params.toString() ? '?' + params.toString() : ''}`;
      
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