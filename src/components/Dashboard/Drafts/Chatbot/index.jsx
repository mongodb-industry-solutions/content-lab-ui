'use client';

import { useState, useCallback } from 'react';
import Card from '@leafygreen-ui/card';
import { sendChatMessage } from '@/api/chat_api';
import { createBotMessage, createUserMessage, createErrorMessage, createNeedContentMessage } from '@/lib/chatUtils';
import styles from './Chatbot.module.css';
import ChatbotInput from '@/components/Dashboard/Drafts/Chatbot/ChatbotInput';
import ChatHeader from '@/components/Dashboard/Drafts/Chatbot/ChatHeader';
import ChatMessages from '@/components/Dashboard/Drafts/Chatbot/ChatMessages';
import ChatPanel from '@/components/Dashboard/Drafts/Chatbot/ChatPanel';

export default function Chatbot({ 
    getDraftContent, 
    applyDraftLayout, 
    applySuggestion 
}) {
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
            const userProfile = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null;
            const topicCard = localStorage.getItem('topicCard') ? JSON.parse(localStorage.getItem('topicCard')) : null;
            
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
            console.error('Chat error:', error);
            
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

    return (
        <Card className={styles.copilot}>
            <div className={styles.copilotContent}>
                <ChatHeader />
                
                <div className={styles.messagesSection}>
                    <ChatMessages 
                        messages={messages} 
                        isTyping={isTyping} 
                        completedMessages={completedMessages}
                        markCompleted={markCompleted}
                        applyDraftLayout={applyDraftLayout}
                        applySuggestion={applySuggestion}
                    />
                </div>
                
                <div className={styles.panelSection}>
                    <ChatPanel 
                        onActionSelect={handleQuickAction}
                    />
                </div>
                
                <div className={styles.chatbotSection}>
                    <ChatbotInput onSendMessage={handleSendMessage} />
                </div>
            </div>
        </Card>
    );
} 