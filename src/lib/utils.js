/**
 * Convert a UTC timestamp into a short relative time string (e.g., 3h, 5d)
 * @param {string} utcString - The UTC timestamp to convert
 * @returns {string} The relative time string
 */
export const getRelativeTime = (utcString) => {
  if (!utcString) return '';
  const diffMs = Date.now() - new Date(utcString).getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return `${diffSec}s`;
  if (diffMin < 60) return `${diffMin}m`;
  if (diffHr < 24) return `${diffHr}h`;
  return `${diffDay}d`;
};

/**
 * Convert a UTC timestamp into a human readable date string
 * @param {string} utcString - The UTC timestamp to convert
 * @returns {string} The human readable date string
 */
export const getHumanReadableDate = (utcString) => {
  if (!utcString) return '';
  return new Date(utcString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format a number with appropriate suffix (K, M, B)
 * @param {number} num - The number to format
 * @returns {string} The formatted number with suffix
 */
export const formatNumber = (num) => {
  if (!num) return '0';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

/**
 * Debounce function to prevent rapid successive function calls
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} The debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Check if two request objects are identical to prevent duplicate API calls
 * Handles both suggested topics (label-only) and query topics (query-based) requests
 * @param {Object} requestA - First request object
 * @param {Object} requestB - Second request object
 * @returns {boolean} True if requests are identical
 */
export const areRequestsEqual = (requestA, requestB) => {
  // Check if both requests have the same type (based on presence of query)
  const aHasQuery = requestA.query && requestA.query.trim() !== '';
  const bHasQuery = requestB.query && requestB.query.trim() !== '';
  
  // Different request types (one has query, other doesn't)
  if (aHasQuery !== bHasQuery) {
    return false;
  }
  
  // Both are query-based requests
  if (aHasQuery && bHasQuery) {
    return requestA.query === requestB.query && requestA.label === requestB.label;
  }
  
  // Both are suggested topics requests (label-only)
  return requestA.label === requestB.label;
};