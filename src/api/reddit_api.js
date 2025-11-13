// IMPORTANT: Use /api as base URL (Next.js proxy pattern)
// This points to Next.js API routes, NOT the backend directly
const API_BASE_URL = '/api';

/**
 * Fetch reddit posts from the main backend
 * @returns {Promise<Array>} - A promise that resolves to the reddit posts
 */
export async function fetchRedditPosts() {
    try {
      const response = await fetch(`${API_BASE_URL}/content/reddit`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const redditPosts = await response.json();
      return redditPosts;
    } catch (error) {
      throw new Error('Failed to get reddit posts. Please try again.');
    }
  }