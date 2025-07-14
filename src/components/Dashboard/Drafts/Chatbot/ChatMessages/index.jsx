'use client';

/**
 * Chat messages component for the chatbot component
 * Contains the chat messages and the typing indicator
 */

import { useEffect, useRef, useCallback } from 'react';
import { Body } from '@leafygreen-ui/typography';
import MessageBubble from '@/components/Dashboard/Drafts/Chatbot/MessageBubble';
import styles from './ChatMessages.module.css';

export default function ChatMessages({ 
    messages, 
    isTyping, 
    completedMessages, 
    markCompleted,
    applyDraftLayout,
    applySuggestion 
}) {
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = useCallback(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'end'
            });
        }
    }, []);

    // Scroll for user messages immediately
    useEffect(() => {
        if (!messages || messages.length === 0) return;
        
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.sender === 'user') {
            // User messages don't have typewriter effect, scroll immediately
            scrollToBottom();
        }
    }, [messages, scrollToBottom]);

    // Scroll when typing indicator changes
    useEffect(() => {
        if (isTyping) {
            // Scroll when typing indicator appears
            scrollToBottom();
        }
    }, [isTyping, scrollToBottom]);

    // Scroll when bot message typewriter completes
    useEffect(() => {
        if (!messages || messages.length === 0) return;
        
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.sender === 'bot' && completedMessages[lastMessage.id]) {
            // Bot message typewriter finished, now scroll
            scrollToBottom();
        }
    }, [completedMessages, messages, scrollToBottom]);

    // Early return for empty state
    if (!messages || messages.length === 0) {
        return (
            <div className={styles.chatMessages}>
                <div className={styles.emptyState}>
                    <Body className={styles.emptyText}>
                        Start a conversation with the AI Assistant
                    </Body>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.chatMessages} ref={messagesContainerRef}>
            <div className={styles.messagesList}>
                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        completedMessages={completedMessages}
                        markCompleted={markCompleted}
                        applyDraftLayout={applyDraftLayout}
                        applySuggestion={applySuggestion}
                    />
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                    <div className={styles.typingWrapper}>
                        <div className={styles.typingIndicator}>
                            <div className={styles.typingDots}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}
