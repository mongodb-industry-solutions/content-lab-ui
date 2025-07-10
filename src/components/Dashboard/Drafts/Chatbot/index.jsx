'use client';

import { useState } from 'react';
import Card from '@leafygreen-ui/card';
import { sendChatMessage } from '@/api/chat_api';
import styles from './Chatbot.module.css';
import ChatbotInput from '@/components/Dashboard/Drafts/Chatbot/ChatbotInput';
import ChatHeader from '@/components/Dashboard/Drafts/Chatbot/ChatHeader';
import ChatMessages from '@/components/Dashboard/Drafts/Chatbot/ChatMessages';

export default function Chatbot({ 
    getDraftContent, 
    applyDraftLayout, 
    applySuggestion 
}) {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [completedMessages, setCompletedMessages] = useState({});

    // Mark a message as completed (typewriter finished)
    const markCompleted = (messageId) => {
        setCompletedMessages(prev => ({
            ...prev,
            [messageId]: true
        }));
    };

    // Create message object based on response type
    const createBotMessage = (response, baseId) => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        console.log(response);

        if (response.data.tool_used === 'outline') {
            return {
                id: baseId,
                type: 'draft_layout',
                draftContent: response.data.result.html_content,
                sender: 'bot',
                timestamp
            };
        }
        
        if (response.data.tool_used === 'proofread' || response.data.tool_used === 'refine') {
            return {
                id: baseId,
                type: 'suggestions',
                suggestions: response.data.result,
                sender: 'bot',
                timestamp
            };
        }
        
        // Default text message
        return {
            id: baseId,
            type: 'text',
            text: response.response || response.data.result.response || "Sorry, I couldn't process that request.",
            sender: 'bot',
            timestamp
        };
    };

    // Handle sending a new message (from input or quick actions)
    const handleSendMessage = async (messageText, promptType = null) => {
        if (!messageText.trim()) return;

        // Add user message
        const userMessage = {
            id: Date.now().toString(),
            text: messageText,
            sender: 'user',
            type: 'text',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

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
            setMessages(prev => [...prev, botMessage]);
            
        } catch (error) {
            console.error('Chat error:', error);
            
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                type: 'text',
                text: "I'm experiencing some technical difficulties. Please try again.",
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    // Handle quick actions with prompt types
    const handleQuickAction = (actionText) => {        
        console.log(actionText.id);
        handleSendMessage(actionText.message, actionText.id);
    };

    return (
        <Card className={styles.copilot}>
            <div className={styles.copilotContent}>
                <ChatHeader />
                
                <div className={styles.messagesSection}>
                    <ChatMessages 
                        messages={messages} 
                        isTyping={isTyping} 
                        onQuickAction={handleQuickAction}
                        completedMessages={completedMessages}
                        markCompleted={markCompleted}
                        applyDraftLayout={applyDraftLayout}
                        applySuggestion={applySuggestion}
                    />
                </div>
                
                <div className={styles.chatbotSection}>
                    <ChatbotInput onSendMessage={handleSendMessage} />
                </div>
            </div>
        </Card>
    );
} 