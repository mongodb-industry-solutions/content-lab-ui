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
 * Generate chart data for metrics visualization
 * Simulates data points from 7 days before publish date with growth trend
 * @param {number} baseValue - The final value at publish date
 * @param {Date} publishDate - The publish date to work backwards from
 * @returns {Array} Array of data points with key (date) and data (value)
 */
export const generateMetricsData = (baseValue, publishDate) => {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(publishDate);
    date.setDate(date.getDate() - i);
    // Simulate growth towards publish date with some randomization
    const variation = Math.random() * 0.3 + 0.7; // 70-100% of proportional value
    const proportionalValue = baseValue * (7 - i) / 7; // Linear growth
    data.push({
      key: date,
      data: Math.floor(proportionalValue * variation)
    });
  }
  return data;
};

/**
 * Create chart dataset for article metrics (visits, shares, comments)
 * @param {Object} article - Article object with News_metrics and published_at
 * @returns {Array} Array of series data for the chart
 */
export const createMetricsChartData = (article) => {
  const { News_metrics, published_at } = article;
  const { Total_visits = 0, total_Comments = 0, Total_shares = 0 } = News_metrics;
  const publishDate = new Date(published_at);

  return [
    {
      key: 'Visits',
      data: generateMetricsData(Total_visits, publishDate)
    },
    {
      key: 'Shares', 
      data: generateMetricsData(Total_shares, publishDate)
    },
    {
      key: 'Comments',
      data: generateMetricsData(total_Comments, publishDate)
    }
  ];
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
 * Get badge variant color based on category
 * @param {string} category - The category name
 * @returns {string} The badge variant color
 */
export const getBadgeVariant = (category) => {
  const variants = {
    'general': 'green',
    'technology': 'yellow',
    'health': 'green',
    'sports': 'yellow',
    'politics': 'blue',
    'science': 'green',
    'business': 'blue', 
    'entertainment': 'blue'
  };
  return variants[category?.toLowerCase()] || 'gray';
};

/**
 * Group topics by category
 * @param {Array} topics - Array of topic objects
 * @returns {Object} Object with categories as keys and arrays of topics as values
 */
export const groupTopicsByCategory = (topics) => {
  if (!Array.isArray(topics) || topics.length === 0) {
    return {};
  }

  return topics.reduce((acc, topic) => {
    const category = topic.label || 'general';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(topic);
    return acc;
  }, {});
};

/**
 * Get category display name with proper capitalization
 * @param {string} category - The category name
 * @returns {string} The formatted category display name
 */
export const getCategoryDisplayName = (category) => {
  if (!category) return 'General';
  if (category === 'general') return 'General';
  return category.charAt(0).toUpperCase() + category.slice(1);
};