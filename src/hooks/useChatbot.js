import { useState, useCallback } from 'react';
import { sendChatMessage } from '@/api/chat_api';
import { createBotMessage, createUserMessage, createErrorMessage, createNeedContentMessage } from '@/utils/chatUtils';
import { WRITING_TOOLS } from '@/constants/users';

/**
 * Custom hook for managing chatbot state and message handling
 * @param {Function} getDraftContent - Function to get current draft content
 * @param {Object} userProfile - User profile for personalized responses
 * @param {Object} topicCard - Topic card for context
 * @returns {Object} - Chatbot state and handlers
 */
export function useChatbot(getDraftContent, userProfile, topicCard) {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [completedMessages, setCompletedMessages] = useState({});
    const [activeCommand, setActiveCommand] = useState(null);

    // Mark a message as completed (typewriter finished)
    const markCompleted = useCallback((messageId) => {
        setCompletedMessages(prev => ({
            ...prev,
            [messageId]: true
        }));
    }, []);

    // Clear active command
    const clearActiveCommand = useCallback(() => {
        setActiveCommand(null);
    }, []);

    // Handle sending a new message
    const handleSendMessage = useCallback(async (messageText, promptType = null) => {
        if (!messageText?.trim()) return;

        let finalMessage = messageText;
        let finalPromptType = promptType;

        if (activeCommand) {
            const userContext = messageText.replace(activeCommand.command, '').trim();
            
            // If user only typed command with no context, use default message
            if (!userContext || messageText.trim() === activeCommand.command) {
                finalMessage = activeCommand.message;
            } else {
                finalMessage = userContext;
            }
            
            finalPromptType = activeCommand.id;
            setActiveCommand(null);
        }

        // Add user message
        const userMessage = createUserMessage(finalMessage);
        if (!userMessage) return;
        
        setMessages(prev => [...prev, userMessage]);

        // Send message to AI
        setIsTyping(true);
        
        try {
            const draftContent = getDraftContent();
            
            const chatData = {
                message: finalMessage,
                draftContent: draftContent,
                promptType: finalPromptType,
                userProfile: userProfile,
                topicCard: topicCard
            };

            const aiResponse = await sendChatMessage(chatData);
            
            const botMessage = createBotMessage(aiResponse, (Date.now() + 1).toString());
            if (botMessage) {
                setMessages(prev => [...prev, botMessage]);
            }
            
        } catch (error) {
            const errorMessage = createErrorMessage();
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    }, [getDraftContent, activeCommand]);

    // Handle quick actions
    const handleQuickAction = useCallback((actionTool) => {
        // Check if action needs draft content for certain commands
        if ((actionTool.id === 'refine' || actionTool.id === 'proofread')) {
            const draftContent = getDraftContent();
            if (!draftContent?.trim()) {
                // Add a simple message instead of setting command
                const infoMessage = createNeedContentMessage(actionTool.id);
                setMessages(prev => [...prev, infoMessage]);
                return;
            }
        }
        
        // Find the corresponding tool with command property and set active command
        const toolWithCommand = WRITING_TOOLS.find(tool => tool.id === actionTool.id);
        if (toolWithCommand) {
            setActiveCommand(toolWithCommand);
        }
    }, [getDraftContent]);

    return {
        // State
        messages, 
        isTyping, 
        completedMessages,
        activeCommand,
        
        // Actions
        markCompleted, 
        handleSendMessage, 
        handleQuickAction,
        clearActiveCommand
    };
} 