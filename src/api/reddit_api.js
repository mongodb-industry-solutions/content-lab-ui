  const mainBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

/**
 * Fetch reddit posts from the main backend
 * @returns {Promise<Array>} - A promise that resolves to the reddit posts
 */
export async function fetchRedditPosts() {
    try {
      const response = await fetch(`${mainBackendUrl}/api/content/reddit`, {
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