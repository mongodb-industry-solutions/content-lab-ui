/**
 * Fetch reddit posts from the MongoDB Atlas database (server-side)
 * @returns {Promise<Array>} - A promise that resolves to the reddit posts
 */
export async function fetchRedditPosts() {
  try {
    const response = await fetch('/api/redditPosts');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const redditPosts = await response.json();
    return redditPosts;
  } catch (error) {
    console.error('Error fetching reddit posts on server:', error);
    return [];
  }
}
  
/**
 * Fetch user profile from the MongoDB Atlas database (server-side)
 * @param {string} userId - The ID of the user to fetch
 * @returns {Promise<Object>} - A promise that resolves to the user profile
 */
export async function fetchUserProfile(userId) {
  try {
    const response = await fetch(`/api/userProfiles?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userProfile = await response.json();
    return userProfile;
  } catch (error) {
    console.error('Error fetching user profile on server:', error);
    return null;
  }
}

/**
 * Fetch news from the MongoDB Atlas database (server-side)
 * @returns {Promise<Array>} - A promise that resolves to the news
 */
export async function fetchNews() {
  try {
    const response = await fetch('/api/news');
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

/**
 * Fetch topics from the MongoDB Atlas database (server-side)
 * @param {Object} params - The search parameters
 * @param {string} params.query - The search query (optional)
 * @param {string} params.label - The filter label (optional, defaults to 'all')
 * @returns {Promise<Array>} - A promise that resolves to the topics
 */
export async function fetchTopics({ query = '', label = 'all' } = {}) {
  try {
    const response = await fetch('/api/suggestedTopics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, label }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const topics = await response.json();
    return topics;
  } catch (error) {
    console.error('Error fetching topics on server:', error);
    return [];
  }
}