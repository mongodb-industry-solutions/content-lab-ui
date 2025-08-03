/**
 * Fallback data constants
 * Used when APIs are down or unavailable
 */

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
];

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
];
