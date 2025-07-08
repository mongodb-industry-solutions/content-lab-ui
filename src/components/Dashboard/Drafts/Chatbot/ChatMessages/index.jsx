'use client';

import { useEffect, useRef } from 'react';
import { Body } from '@leafygreen-ui/typography';
import MessageBubble from '@/components/Dashboard/Drafts/Chatbot/MessageBubble';
import QuickActions from '@/components/Dashboard/Drafts/Chatbot/QuickActions';
import styles from './ChatMessages.module.css';

export default function ChatMessages({ messages, isTyping, onQuickAction, completedMessages, markCompleted }) {
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'end'
            });
        }
    };

    // Scroll to bottom when messages change or typing status changes
    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Empty state when no messages - show quick actions
    if (!messages || messages.length === 0) {
        return (
            <div className={styles.chatMessages}>
                <div className={styles.emptyState}>
                    <Body className={styles.emptyText}>
                        Start a conversation with the AI Assistant
                    </Body>
                    
                    <QuickActions onActionSelect={onQuickAction} />
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
                        type={message.sender}
                        completedMessages={completedMessages}
                        markCompleted={markCompleted}
                    />
                ))}
                
                {/* Typing indicator placeholder */}
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
