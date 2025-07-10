const mainBackendUrl = process.env.BACKEND_URL || "http://localhost:8000";

/**
 * Fetch news from the main backend
 * @returns {Promise<Array>} - A promise that resolves to the news
 */
export async function fetchNews() {
    try {
      const response = await fetch(`${mainBackendUrl}/api/news`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
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