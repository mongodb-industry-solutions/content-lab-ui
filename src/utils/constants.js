// constants.js
/**
 * This file contains constants used throughout the application.
 * @exports USER_MAP
 */
export const USER_MAP = {
    "6862a8988c0f7bf43af995a7": {
        name: "Helly R.",
        avatar: 1
    },
    "6862a8988c0f7bf43af995a8": {
        name: "Mark S.",
        avatar: 2
    },
    "6862a8988c0f7bf43af995a9": {
        name: "Ms. Casey",
        avatar: 3
    }
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
 * InfoWizard content for Landing page
 * Explains the app's capabilities and MongoDB-powered features
 * @exports LANDING_INFO_WIZARD
 */
export const LANDING_INFO_WIZARD = [
    {
        heading: "Content Creation Revolution",
        content: [
            {
                heading: "End the Research Struggle",
                body: "Stop wasting hours searching through endless articles, social media feeds, and news sources. The Content Lab eliminates the research bottleneck that slows down content creators and writers worldwide."
            },
            {
                heading: "MongoDB Atlas Vector Search Power",
                body: "Built on MongoDB Atlas Vector Search, our platform performs semantic searches across millions of documents in milliseconds. This isn't just keyword matching – it's true understanding of context and meaning, powered by MongoDB's cutting-edge vector database technology."
            },
            {
                heading: "Why Content Creators Choose Us",
                body: [
                    "Reduce research time from hours to minutes",
                    "Access trending topics before they peak",
                    "Get AI-curated content suggestions instantly", 
                    "Never miss viral opportunities again",
                    "Focus on creating, not searching"
                ]
            },
            {
                heading: "MongoDB Atlas Advantage",
                body: "MongoDB Atlas Vector Search enables us to understand the semantic meaning behind your queries. When you search for 'productivity tips', we don't just find exact matches – we discover related concepts like 'workflow optimization', 'time management', and 'efficiency hacks' through vector embeddings."
            }
        ]
    },
    {
        heading: "The Technology Behind the Magic",
        content: [
            {
                heading: "Vector Embeddings at Scale",
                body: "Every piece of content in our database is converted into high-dimensional vector embeddings using advanced machine learning models. MongoDB Atlas stores these vectors efficiently and performs similarity searches at lightning speed."
            },
            {
                heading: "Real-Time Data Pipeline",
                body: "Our MongoDB-powered pipeline continuously ingests content from news sources, social media, and trending platforms. Atlas Change Streams ensure your searches always include the latest information, updated in real-time."
            },
            {
                heading: "Intelligent Content Ranking",
                body: [
                    "Semantic similarity scoring using vector distance",
                    "Trending momentum analysis with time-series data",
                    "Authority scoring based on source credibility",
                    "Personalization through user behavior vectors",
                    "Multi-dimensional relevance optimization"
                ]
            },
            {
                heading: "MongoDB Atlas Benefits",
                body: "Atlas Vector Search combines the flexibility of MongoDB's document model with powerful vector search capabilities. This means we can store rich metadata alongside vectors, enabling complex queries that traditional vector databases simply can't handle."
            },
            {
                heading: "Why MongoDB Over Alternatives",
                body: "While other platforms use separate vector databases that require complex data synchronization, MongoDB Atlas keeps everything in one place. This unified approach means faster queries, better data consistency, and reduced infrastructure complexity – benefits that translate directly to a better user experience."
            }
        ]
    }
];

/**
 * InfoWizard content for Suggestions component
 * Explains data sources and AI-powered search capabilities
 * @exports SUGGESTIONS_INFO_WIZARD
 */
export const SUGGESTIONS_INFO_WIZARD = [
    {
        heading: "Data Sources & Collection",
        content: [
            {
                heading: "Web Scraping at Scale",
                body: "Our advanced web scraping infrastructure continuously monitors thousands of news websites, blogs, and online publications. We extract trending topics, viral content, and emerging conversations in real-time to keep our suggestions fresh and relevant."
            },
            {
                heading: "Social Media Intelligence",
                body: "We tap into major social media platforms to identify viral content, trending hashtags, and emerging conversations. Our algorithms analyze engagement patterns, shareability metrics, and momentum indicators to surface topics before they peak."
            },
            {
                heading: "Multi-Source Aggregation",
                body: [
                    "Major news outlets and publications",
                    "Reddit discussions and trending posts",
                    "Twitter/X trending topics and viral tweets",
                    "Industry blogs and thought leadership content",
                    "YouTube trending videos and popular channels",
                    "TikTok viral content and hashtag trends"
                ]
            },
            {
                heading: "Real-Time Processing",
                body: "Our data pipeline processes millions of content pieces daily, extracting key topics, themes, and trending signals. This ensures you're always seeing the most current and relevant suggestions for your content strategy."
            }
        ]
    },
    {
        heading: "AI-Powered Search Technology",
        content: [
            {
                heading: "Generative AI Understanding",
                body: "When you perform a search query, our generative AI models analyze your intent beyond just keywords. The system understands context, related concepts, and semantic relationships to find topics that truly match what you're looking for."
            },
            {
                heading: "Semantic Search Capabilities",
                body: "Our semantic search goes far beyond keyword matching. If you search for 'sustainable living', we'll find related topics like 'eco-friendly lifestyle', 'zero waste tips', 'renewable energy', and 'environmental consciousness' – all contextually relevant to your query."
            },
            {
                heading: "Intelligent Query Processing",
                body: [
                    "Natural language understanding of search intent",
                    "Concept expansion and related topic discovery",
                    "Trend momentum analysis and viral prediction",
                    "Content freshness and relevance scoring",
                    "Personalized recommendations based on search history"
                ]
            },
            {
                heading: "Vector Search Technology",
                body: "Every topic suggestion is powered by high-dimensional vector embeddings that capture semantic meaning. This allows us to find conceptually similar content even when the exact words don't match your search terms."
            },
            {
                heading: "Continuous Learning",
                body: "Our AI models continuously learn from user interactions, search patterns, and content performance to improve suggestion quality. The more the platform is used, the better it becomes at predicting what content will resonate."
            }
        ]
    }
];

/**
 * InfoWizard content for KeyPoints component
 * Explains real-time research and contextual resources
 * @exports KEYPOINTS_INFO_WIZARD
 */
export const KEYPOINTS_INFO_WIZARD = [
    {
        heading: "Real-Time Research",
        content: [
            {
                heading: "Live Topic Analysis",
                body: "Our AI research assistant continuously scans the web for the most current and relevant information about your selected topic. This ensures you always have access to the latest insights, trends, and developments."
            },
            {
                heading: "Smart Source Selection",
                body: [
                    "Authoritative news outlets and publications",
                    "Academic papers and research studies", 
                    "Industry reports and expert analysis",
                    "Recent social media discussions and trends",
                    "Government and institutional data"
                ]
            },
            {
                heading: "Quality Assurance",
                body: "Each key point is verified for credibility and relevance before being presented to you. We prioritize sources with high authority scores and recent publication dates."
            }
        ]
    },
    {
        heading: "How It Works",
        content: [
            {
                heading: "Intelligent Crawling",
                body: "When you select a topic, our system immediately begins searching across multiple data sources including news APIs, academic databases, and social media platforms to gather comprehensive information."
            },
            {
                heading: "Contextual Filtering",
                body: "The AI analyzes each piece of information for relevance to your specific topic and writing goals. It filters out outdated, irrelevant, or low-quality content automatically."
            },
            {
                heading: "Dynamic Updates", 
                body: "Key points are refreshed in real-time as new information becomes available. This means you're always working with the most current data and insights for your writing."
            },
            {
                heading: "Source Verification",
                body: "Every key point includes a direct link to its source, allowing you to verify information and dive deeper into topics that interest you most."
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
        heading: "AI Writing Assistant",
        content: [
            {
                heading: "Intelligent Writing Support",
                body: "Your AI writing assistant provides real-time help with content creation, editing, and optimization. It understands context and adapts to your writing style and goals."
            },
            {
                heading: "Dynamic Tool Suggestions",
                body: [
                    "Content generation and brainstorming",
                    "Grammar and style improvements", 
                    "Tone and voice adjustments",
                    "Research integration and fact-checking",
                    "Structure and flow optimization"
                ]
            },
            {
                heading: "Context-Aware Assistance",
                body: "The assistant analyzes your current draft content to provide relevant suggestions and tools. As you write, it adapts its recommendations to match your specific needs and writing context."
            }
        ]
    },
    {
        heading: "How to Use",
        content: [
            {
                heading: "Natural Conversations",
                body: "Simply type your questions or requests in natural language. Ask for help with specific sections, request content suggestions, or get feedback on your writing."
            },
            {
                heading: "Smart Tool Panel",
                body: "The right panel displays writing tools that are relevant to your current draft content. These tools update dynamically as you work on different sections or topics."
            },
            {
                heading: "Iterative Collaboration", 
                body: "Work collaboratively with the AI by building on its suggestions. You can refine, expand, or modify any generated content to perfectly match your vision and requirements."
            },
            {
                heading: "Draft Integration",
                body: "Suggestions and generated content can be easily integrated into your draft. The assistant helps maintain consistency in tone, style, and messaging throughout your document."
            }
        ]
    }
];