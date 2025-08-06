/**
 * User profile and chatbot related constants
 */

/**
 * User profile mapping with avatar and descriptions
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
