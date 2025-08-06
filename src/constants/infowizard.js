/**
 * InfoWizard content constants
 * Used for educational modals and help content
 */

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
