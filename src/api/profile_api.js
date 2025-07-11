const mainBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

/**
 * Fetch user profile from the main backend
 * @param {string} userId - The ID of the user to fetch
 * @returns {Promise<Object>} - A promise that resolves to the user profile
 */
export async function fetchUserProfile(userId) {
    try {
      const params = new URLSearchParams();
      params.append('userId', userId);
      
      const response = await fetch(`${mainBackendUrl}/api/profile?${params.toString()}`, {
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
      console.error('Error fetching user profile on server:', error);
      return null;
    }
  }