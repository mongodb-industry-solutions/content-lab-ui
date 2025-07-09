'use client';

import { useState } from 'react';
import Card from '@leafygreen-ui/card';
import { sendChatMessage } from '@/api/chat_api';
import styles from './Chatbot.module.css';
import ChatbotInput from '@/components/Dashboard/Drafts/Chatbot/ChatbotInput';
import ChatHeader from '@/components/Dashboard/Drafts/Chatbot/ChatHeader';
import ChatMessages from '@/components/Dashboard/Drafts/Chatbot/ChatMessages';

export default function Chatbot({ topicCard }) {
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

    // Handle sending a new message (from input or quick actions)
    const handleSendMessage = async (messageText) => {
        if (!messageText.trim()) return;

        // Add user message
        const userMessage = {
            id: Date.now().toString(),
            text: messageText,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);

        // Send message to AI
        setIsTyping(true);
        
        try {
            const chatData = {
                message: messageText,
                conversation: messages,
                topicCard: topicCard,
                userId: localStorage.getItem('selectedUser') ? JSON.parse(localStorage.getItem('selectedUser')).id : null,
                userProfile: localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null
            };

            const aiResponse = await sendChatMessage(chatData);
            
            const botMessage = {
                id: (Date.now() + 1).toString(),
                text: aiResponse.response || "Sorry, I couldn't process that request.",
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            setMessages(prev => [...prev, botMessage]);
            
        } catch (error) {
            console.error('Chat error:', error);
            
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                text: "I'm experiencing some technical difficulties. Please try again.",
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <Card className={styles.copilot}>
            <div className={styles.copilotContent}>
                <ChatHeader />
                
                <div className={styles.messagesSection}>
                    <ChatMessages 
                        messages={messages} 
                        isTyping={isTyping} 
                        onQuickAction={handleSendMessage}
                        completedMessages={completedMessages}
                        markCompleted={markCompleted}
                    />
                </div>
                
                <div className={styles.chatbotSection}>
                    <ChatbotInput onSendMessage={handleSendMessage} />
                </div>
            </div>
        </Card>
    );
} 