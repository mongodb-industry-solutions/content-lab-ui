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
 * Shared writing tools configuration for chatbot commands
 * @exports WRITING_TOOLS
 */
export const WRITING_TOOLS = [
    {
        id: 'draft_layout',
        text: 'Draft',
        command: '/draft',
        message: 'Help me create a draft layout for the current topic with key sections and structure.',
        icon: 'Edit'
    },
    {
        id: 'refine',
        text: 'Refine',
        command: '/refine',
        message: 'Help me refine this document content to match my writing style and topic requirements.',
        icon: 'Sparkle'
    },
    {
        id: 'proofread',
        text: 'Proofread',
        command: '/proofread',
        message: 'Please proofread my content and suggest improvements for clarity, grammar, and flow.',
        icon: 'MagnifyingGlass'
    }
];

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
        heading: "Instructions and Talk Track",
        content: [
            {
                heading: "How to Use Topic Suggestions",
                body: "The Topic Suggestions feature helps content creators discover trending and relevant topics for their next articles. Simply enter keywords related to your content area, and our AI-powered system will provide contextually relevant suggestions from multiple data sources."
            },
            {
                heading: "Demo Flow",
                body: [
                    "Start by typing a topic or keyword in the search bar",
                    "Browse through AI-generated suggestions from news, social media, and trending discussions"
                ]
            },
            {
                heading: "Key Benefits",
                body: "This feature saves content creators hours of research time by automatically surfacing trending topics. The AI understands semantic relationships, so you'll discover relevant topics you might have missed with traditional keyword searches."
            },
            {
                heading: "Best Practices",
                body: "For optimal results, try different variations of your core topics."
            }
        ]
    },
    {
        heading: "Behind the Scenes",
        content: [
            {
                heading: "AI-Powered Topic Discovery",
                body: "Our advanced system leverages semantic search technology and vector embeddings to understand the true intent behind your queries. Unlike traditional keyword matching, our AI analyzes the contextual meaning of your search terms and identifies conceptually related topics that might not share exact keywords but are semantically relevant to your content goals."
            },
            {
                heading: "Data Sources Integration",
                body: [
                    "Real-time news feeds from major publications and industry sources",
                    "Social media trending content and viral discussions",
                    "Reddit communities with high engagement and active discussions"
                ]
            },
            {
                heading: "Search Architecture",
                body: "The diagram below illustrates our sophisticated search microservice architecture, showing how your queries are processed through multiple AI models, enriched with real-time data, and delivered as contextually relevant topic suggestions."
            },
            {
                image: {
                    src: "/diagrams/search_microservice.svg",
                    alt: "Search Microservice Architecture Diagram showing data flow from user query through AI processing to topic suggestions"
                }
            },
            {
                heading: "Real-Time Processing Pipeline",
                body: "Our system continuously ingests and processes content from various sources using advanced natural language processing. Vector embeddings are generated for all content, enabling semantic similarity matching. The pipeline updates topic relevance scores in real-time based on trending patterns and user interaction data."
            }
        ]
    },
    {
        heading: "Why MongoDB?",
        content: [
            {
                heading: "Vector Search Capabilities",
                body: "MongoDB Atlas Vector Search enables us to store and query high-dimensional vector embeddings natively within our database. This eliminates the need for separate vector databases and allows for complex semantic searches that understand content meaning rather than just keyword matches."
            },
            {
                heading: "Flexible Document Structure",
                body: "MongoDB's document-based architecture perfectly accommodates the varied structure of content from different sources - news articles, social media posts, and forum discussions all have different schemas. This flexibility allows us to store rich metadata alongside vector embeddings without complex joins or rigid table structures."
            },
            {
                heading: "Real-Time Analytics",
                body: "With MongoDB's aggregation pipeline and real-time capabilities, we can process engagement metrics, calculate trending scores, and update topic relevance in real-time. The database handles both the vector similarity searches and traditional analytical queries within the same platform."
            },
            {
                heading: "Scalability and Performance",
                body: "MongoDB Atlas automatically scales to handle varying loads of content ingestion and user queries. The platform's distributed architecture ensures consistent performance whether we're processing hundreds or millions of content pieces, making it ideal for real-time content discovery applications."
            },
            {
                heading: "Developer Experience",
                body: "The native vector search functionality, combined with MongoDB's familiar query syntax, allows our development team to build sophisticated AI-powered features without learning new database paradigms. This accelerates development and reduces complexity in our technology stack."
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
        heading: "Instructions and Talk Track",
        content: [
            {
                heading: "How to Use the Writing Assistant",
                body: "The AI Writing Assistant is your intelligent companion for content creation. It analyzes your current draft in real-time and provides contextually aware suggestions to improve your writing. Whether you need help structuring content, refining your style, or proofreading for errors, the assistant adapts to your specific needs and writing goals."
            },
            {
                heading: "Demo Workflow",
                body: [
                    "Click one of the writing tool buttons (Draft, Refine, Proofread) to activate a specific mode",
                    "Add context about what kind of help you need in the input field",
                    "The assistant analyzes your current draft content and provides targeted suggestions",
                    "Review the AI-generated recommendations and apply them to improve your content",
                    "Continue the conversation to refine suggestions or ask for additional help",
                    "Use the integrated tools to iteratively improve your content quality"
                ]
            },
            {
                heading: "Writing Command System",
                body: "The assistant uses an intuitive command system with visual chips. When you click a writing tool button, a colored command chip appears showing the active mode. You can then add specific context to personalize the assistance. This system ensures you get precisely the type of help you need for each section of your content."
            },
            {
                heading: "Best Practices for Demos",
                body: "Start with a partially written draft to showcase the assistant's contextual awareness. Demonstrate how the different tools (Draft, Refine, Proofread) provide distinct types of assistance. Show how adding specific context to commands generates more targeted and useful suggestions."
            }
        ]
    },
    {
        heading: "Behind the Scenes",
        content: [
            {
                heading: "AI-Powered Writing Intelligence",
                body: "Our writing assistant leverages advanced natural language processing models that understand not just grammar and syntax, but also context, tone, and writing style. The system analyzes your existing content to provide suggestions that maintain consistency with your voice while improving clarity, engagement, and overall quality."
            },
            {
                heading: "Content Analysis Pipeline",
                body: [
                    "Real-time draft content parsing and structure analysis",
                    "Writing style and tone detection algorithms",
                    "Context-aware suggestion generation using large language models",
                    "Grammar and readability optimization engines",
                    "Personalized recommendations based on user writing patterns",
                    "Integration with topic research"
                ]
            },
            {
                heading: "Chatbot Architecture",
                body: "The diagram below illustrates our sophisticated chatbot microservice architecture, demonstrating how user requests are processed through multiple AI models, integrated with draft content analysis, and delivered as actionable writing improvements."
            },
            {
                image: {
                    src: "/diagrams/chatbot_microservice.svg",
                    alt: "Chatbot Microservice Architecture Diagram showing the flow from user input through AI processing to writing suggestions"
                }
            },
            {
                heading: "Smart Command Processing",
                body: "The writing assistant features an intelligent command system that recognizes different types of writing assistance needs. Whether you're requesting structural help with drafting, stylistic improvements through refinement, or technical corrections via proofreading, the system adapts its processing approach to deliver the most relevant assistance for each specific request type."
            }
        ]
    },
    {
        heading: "Why MongoDB?",
        content: [
            {
                heading: "Document-Based Content Storage",
                body: "MongoDB's flexible document structure is ideal for storing complex content drafts with rich metadata, revision histories, and nested writing elements. Unlike relational databases, MongoDB naturally handles the varied structure of different content types - from blog posts to technical documentation - without rigid schema constraints."
            },
            {
                heading: "Performance at Scale",
                body: "MongoDB Atlas handles the computational demands of real-time AI processing while maintaining fast response times for writing assistance. The platform scales automatically to support multiple drafts per user."
            },
            {
                heading: "Integration Capabilities",
                body: "MongoDB's rich ecosystem allows seamless integration with various AI services, content management systems, and writing tools. This enables our writing assistant to pull from external knowledge bases and integrate with style guides, all within a unified data architecture."
            }
        ]
    }
];