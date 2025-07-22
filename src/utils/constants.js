// constants.js
/**
 * This file contains constants used throughout the application.
 * @exports USER_MAP
 */
export const USER_MAP = {
    "6862a8988c0f7bf43af995a7": {
        name: "Helly R.",
        avatar: 1,
        shortDescription: "Emoji-packed Gen Z hot-take pro"
    },
    "6862a8988c0f7bf43af995a8": {
        name: "Mark S.",
        avatar: 2,
        shortDescription: "Polished academic expert"
    },
    "6862a8988c0f7bf43af995a9": {
        name: "Ms. Casey",
        avatar: 3,
        shortDescription: "Friendly data-driven storyteller"
    }
};

/**
 * Chatbot greeting message based on user profile
 * @exports CHATBOT_GREETING_MESSAGE
 */
export const CHATBOT_GREETING_MESSAGE = {
    "6862a8988c0f7bf43af995a7": "👋 Hey Helly R.! I'm your Writing Assistant—ready to slay listicles with iced-coffee vibes, TikTok lingo, and meme magic. What's up?",
    "6862a8988c0f7bf43af995a8": "👋 Good day, Mark S.! I'm your Writing Assistant—here to craft polished, citation-rich analysis for your next piece. How can I assist?",
    "6862a8988c0f7bf43af995a9": "👋 Hello Ms. Casey! I'm your Writing Assistant—your data-driven sidekick blending clear explanations, anecdotes, and stats. What's the writing challenge?"
};

/**
 * Fallback news for when the news API is down
 * @exports fallbackNews
 */
export const fallbackNews = [
    {
        _id: "fallback_1",
        url: "https://www.mongodb.com",
        title: "Sample Technology News - Data Innovations Drive Modern Business",
        description: "Explore the latest technological advancements that are reshaping industries and creating new opportunities for growth.",
        author: "Tech Analyst",
        source: "Tech Daily",
        published_at: new Date(),
        country: "United States",
        category: "technology",
        News_metrics: {
        Total_visits: 15000,
        Total_retention: 85,
        total_Comments: 247,
        Total_shares: 1200
        }
    },
    {
        _id: "fallback_2",
        url: "https://www.mongodb.com",
        title: "Breaking Business Update - Market Trends Shape Future Strategies",
        description: "Leading companies adapt to changing market conditions with innovative business models and strategic partnerships.",
        author: "Business Reporter",
        source: "Market Watch",
        published_at: new Date(),
        country: "United Kingdom",
        category: "business",
        News_metrics: {
        Total_visits: 22000,
        Total_retention: 78,
        total_Comments: 189,
        Total_shares: 890
        }
    },
    {
        _id: "fallback_3",
        url: "https://www.mongodb.com",
        title: "Health & Science Breakthrough - Research Advances Medical Treatment",
        description: "New scientific discoveries offer promising solutions for improving healthcare outcomes and patient care worldwide.",
        author: "Medical Correspondent",
        source: "Health Journal",
        published_at: new Date(),
        country: "Canada",
        category: "health",
        News_metrics: {
        Total_visits: 18500,
        Total_retention: 92,
        total_Comments: 156,
        Total_shares: 675
        }
    },
    {
        _id: "fallback_4",
        url: "https://www.mongodb.com",
        title: "Sports Championship Update - Athletes Excel in International Competition",
        description: "Outstanding performances and record-breaking achievements highlight this season's most exciting sporting events.",
        author: "Sports Editor",
        source: "Sports Central",
        published_at: new Date(),
        country: "Australia",
        category: "sports",
        News_metrics: {
        Total_visits: 31000,
        Total_retention: 76,
        total_Comments: 423,
        Total_shares: 1850
        }
    }
]

/**
 * Fallback viral posts for when the reddit API is down
 * @exports fallbackViralPosts
 */
export const fallbackViralPosts = [
    {
        _id: "fallback_viral_1",
        title: "Just built my first AI-powered app using MongoDB Atlas Vector Search - the semantic search capabilities are mind-blowing! 🚀",
        author: "techbuilder92",
        subreddit: "programming",
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        reddit_metrics: {
            subscribers: 45200,
            score: 3847,
            num_comments: 523
        }
    },
    {
        _id: "fallback_viral_2", 
        title: "TIL that MongoDB can store and search vector embeddings natively - no need for separate vector databases anymore",
        author: "dataengineer_life",
        subreddit: "todayilearned",
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        reddit_metrics: {
            subscribers: 28900,
            score: 2156,
            num_comments: 342
        }
    },
    {
        _id: "fallback_viral_3",
        title: "The future of content creation is here - AI that actually understands context and meaning, not just keywords",
        author: "contentcreator2024",
        subreddit: "MachineLearning",
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        reddit_metrics: {
            subscribers: 67500,
            score: 4923,
            num_comments: 789
        }
    },
    {
        _id: "fallback_viral_4",
        title: "Spent 3 hours researching a topic yesterday. Today I found the same info in 30 seconds with vector search. Game changer.",
        author: "researchninja",
        subreddit: "productivity",
        created_at: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        reddit_metrics: {
            subscribers: 34100,
            score: 2789,
            num_comments: 234
        }
    },
    {
        _id: "fallback_viral_5",
        title: "Database technology has come so far - from basic SQL to semantic vector search in the same platform 🤯",
        author: "dbadmin_pro",
        subreddit: "Database",
        created_at: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
        reddit_metrics: {
            subscribers: 19800,
            score: 1567,
            num_comments: 156
        }
    },
    {
        _id: "fallback_viral_6",
        title: "Why is no one talking about how MongoDB Atlas just revolutionized content discovery?",
        author: "techtrends_observer",
        subreddit: "technology",
        created_at: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        reddit_metrics: {
            subscribers: 89300,
            score: 6234,
            num_comments: 892
        }
    },
    {
        _id: "fallback_viral_7",
        title: "Finally, a platform that understands 'productivity tips' includes 'workflow optimization' without me having to specify it",
        author: "lifehacker_pro",
        subreddit: "LifeProTips",
        created_at: new Date(Date.now() - 14 * 60 * 60 * 1000), // 14 hours ago
        reddit_metrics: {
            subscribers: 56700,
            score: 4156,
            num_comments: 678
        }
    },
    {
        _id: "fallback_viral_8",
        title: "Real-time content trends powered by vector embeddings - this is what the future of journalism looks like",
        author: "journo_future",
        subreddit: "journalism",
        created_at: new Date(Date.now() - 16 * 60 * 60 * 1000), // 16 hours ago
        reddit_metrics: {
            subscribers: 23400,
            score: 1834,
            num_comments: 267
        }
    }
]

/**
 * InfoWizard content for Suggestions component
 * Explains data sources and AI-powered search capabilities
 * @exports SUGGESTIONS_INFO_WIZARD
 */
export const SUGGESTIONS_INFO_WIZARD = [
    {
        heading: "How It Works",
        content: [
            {
                heading: "AI-Powered Topic Discovery",
                body: "Our system uses semantic search and vector embeddings to understand your query intent beyond keywords. Search results include contextually related topics, not just exact matches."
            },
            {
                heading: "Data Sources",
                body: [
                    "News websites and publications",
                    "Social media trending content",
                    "Reddit discussions and viral posts"
                ]
            },
            {
                heading: "Search Architecture",
                body: "The diagram below shows how your search queries are processed through our AI models to deliver relevant topic suggestions."
            },
            {
                image: {
                    src: "/diagrams/search_microservice.svg",
                    alt: "Search Microservice Architecture Diagram"
                }
            },
            {
                heading: "Real-Time Processing",
                body: "Topics are continuously updated from live data sources, ensuring you always see current trends and emerging conversations relevant to your content strategy."
            }
        ]
    }
];

/**
 * InfoWizard content for Chatbot Writing Assistant
 * Explains AI-powered writing tools and capabilities
 * @exports CHATBOT_INFO_WIZARD
 */
export const CHATBOT_INFO_WIZARD = [
    {
        heading: "Writing Assistant",
        content: [
            {
                heading: "AI-Powered Writing Help",
                body: "The chatbot provides real-time writing assistance, content suggestions, and editing support. It reads your current draft to offer contextually relevant help."
            },
            {
                heading: "Available Tools",
                body: [
                    "Draft layout and structure suggestions",
                    "Content refinement and style improvements",
                    "Proofreading and grammar corrections",
                    "Research integration and fact-checking"
                ]
            },
            {
                heading: "Chatbot Architecture",
                body: "The diagram below illustrates how the writing assistant processes your requests and integrates with your draft content."
            },
            {
                image: {
                    src: "/diagrams/chatbot_microservice.svg",
                    alt: "Chatbot Microservice Architecture Diagram"
                }
            },
            {
                heading: "How to Use",
                body: "Type natural language requests like 'help me improve this section' or use the quick action buttons (Draft, Refine, Proofread) for instant assistance with your current content."
            }
        ]
    }
];