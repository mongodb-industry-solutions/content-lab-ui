// IMPORTANT: Use /api as base URL (Next.js proxy pattern)
// This points to Next.js API routes, NOT the backend directly
const API_BASE_URL = '/api';

/**
 * Fetch user profile from the main backend
 * @param {string} userId - The ID of the user to fetch
 * @returns {Promise<Object>} - A promise that resolves to the user profile
 */
export async function fetchUserProfile(userId) {
    try {
      const params = new URLSearchParams();
      params.append('userId', userId);
      
      const response = await fetch(`${API_BASE_URL}/content/profile?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const userProfile = await response.json();
      return userProfile;
    } catch (error) {
      throw new Error('Failed to get user profile. Please try again.');
    }
  }