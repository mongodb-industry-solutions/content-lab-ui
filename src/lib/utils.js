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