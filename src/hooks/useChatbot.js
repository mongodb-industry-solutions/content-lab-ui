import { useState, useCallback } from 'react';
import { sendChatMessage } from '@/api/chat_api';
import { createBotMessage, createUserMessage, createErrorMessage, createNeedContentMessage } from '@/utils/chatUtils';

/**
 * Custom hook for managing chatbot state and message handling
 * @param {Function} getDraftContent - Function to get current draft content
 * @param {Function} applyDraftLayout - Function to apply draft layout to editor
 * @param {Function} applySuggestion - Function to apply suggestions to editor
 * @returns {Object} - Chatbot state and handlers
 */
export function useChatbot(getDraftContent, applyDraftLayout, applySuggestion, userProfile, topicCard) {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [completedMessages, setCompletedMessages] = useState({});

    // Mark a message as completed (typewriter finished)
    const markCompleted = useCallback((messageId) => {
        setCompletedMessages(prev => ({
            ...prev,
            [messageId]: true
        }));
    }, []);

    // Handle sending a new message (from input or quick actions)
    const handleSendMessage = useCallback(async (messageText, promptType = null) => {
        if (!messageText?.trim()) return;

        // Add user message
        const userMessage = createUserMessage(messageText);
        if (!userMessage) return; // Handle invalid message creation
        
        setMessages(prev => [...prev, userMessage]);

        // Send message to AI
        setIsTyping(true);
        
        try {
            const draftContent = getDraftContent();
            
            const chatData = {
                message: messageText,
                draftContent: draftContent,
                promptType: promptType,
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
    }, [getDraftContent]);

    // Handle quick actions with prompt types
    const handleQuickAction = useCallback((actionText) => {
        // Check if action needs draft content
        if ((actionText.id === 'refine' || actionText.id === 'proofread')) {
            const draftContent = getDraftContent();
            if (!draftContent?.trim()) {
                // Add a simple message instead of sending to AI
                const infoMessage = createNeedContentMessage(actionText.id);
                setMessages(prev => [...prev, infoMessage]);
                return;
            }
        }
        
        handleSendMessage(actionText.message, actionText.id);
    }, [handleSendMessage, getDraftContent]);

    return {
        // State
        messages, 
        isTyping, 
        completedMessages,
        
        // Actions
        markCompleted, 
        handleSendMessage, 
        handleQuickAction
    };
} 