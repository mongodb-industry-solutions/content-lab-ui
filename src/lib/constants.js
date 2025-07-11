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
 * InfoWizard content for Landing page
 * Explains the app's capabilities and MongoDB-powered features
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