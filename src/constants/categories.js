/**
 * Content categories constants
 * Used across the application for topic categorization, filtering, and display
 */

/**
 * Supported content categories for topics and news
 * @exports CONTENT_CATEGORIES
 */
export const CONTENT_CATEGORIES = [
    'general', 
    'technology', 
    'health', 
    'sports', 
    'politics', 
    'science', 
    'business', 
    'entertainment'
];

/**
 * Category display names mapping
 * @exports CATEGORY_DISPLAY_NAMES
 */
export const CATEGORY_DISPLAY_NAMES = {
    general: 'All',
    technology: 'Technology',
    health: 'Health',
    sports: 'Sports',
    politics: 'Politics',
    science: 'Science',
    business: 'Business',
    entertainment: 'Entertainment'
};

/**
 * Recommended search queries per category for SearchResults
 * @exports QUERIES_PER_CATEGORY
 */
export const QUERIES_PER_CATEGORY = {
    general: [
        "Trending topics today",
        "Popular viral content",
        "Breaking news stories"
    ],
    technology: [
        "Latest tech innovations",
        "AI and machine learning trends",
        "Cybersecurity updates"
    ],
    health: [
        "Mental health awareness",
        "Latest medical breakthroughs",
        "Wellness and fitness trends"
    ],
    sports: [
        "Major league updates",
        "Olympic news and records",
        "Player transfers and trades"
    ],
    politics: [
        "Election campaigns",
        "Policy changes and reforms",
        "International relations"
    ],
    science: [
        "Climate change research",
        "Space exploration updates",
        "Scientific discoveries"
    ],
    business: [
        "Market trends and analysis",
        "Startup funding news",
        "Economic policy impact"
    ],
    entertainment: [
        "Celebrity news and updates",
        "Movie and TV show releases",
        "Music industry trends"
    ]
};
