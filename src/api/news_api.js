// IMPORTANT: Use /api as base URL (Next.js proxy pattern)
// This points to Next.js API routes, NOT the backend directly
const API_BASE_URL = '/api';

/**
 * Fetch news from the main backend
 * @returns {Promise<Array>} - A promise that resolves to the news
 */
export async function fetchNews() {
    try {
      const response = await fetch(`${API_BASE_URL}/content/news`, {
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