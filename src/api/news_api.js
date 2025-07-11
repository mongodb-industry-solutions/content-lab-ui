const mainBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

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
      throw new Error('Failed to get news. Please try again.');
    }
  }