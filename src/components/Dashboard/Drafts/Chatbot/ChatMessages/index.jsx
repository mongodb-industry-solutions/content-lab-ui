'use client';

import { useEffect, useRef } from 'react';
import { Body } from '@leafygreen-ui/typography';
import MessageBubble from '@/components/Dashboard/Drafts/Chatbot/MessageBubble';
import QuickActions from '@/components/Dashboard/Drafts/Chatbot/QuickActions';
import styles from './ChatMessages.module.css';

export default function ChatMessages({ 
    messages, 
    isTyping, 
    onQuickAction, 
    completedMessages, 
    markCompleted,
    applyDraftLayout,
    applySuggestion 
}) {
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

    // Check if we should show quick actions
    const shouldShowQuickActions = () => {
        if (isTyping) return false; // Don't show while typing
        
        // Show if last message is from bot and typewriter is completed
        const lastMessage = messages[messages.length - 1];
        return lastMessage?.sender === 'bot' && completedMessages[lastMessage.id] === true;
    };

    // Empty state when no messages - show conversation starter text and quick actions
    if (!messages || messages.length === 0) {
        return (
            <div className={styles.chatMessages}>
                <div className={styles.emptyState}>
                    <Body className={styles.emptyText}>
                        Start a conversation with the AI Assistant
                    </Body>
                    
                    <div className={styles.quickActionsWrapper}>
                        <QuickActions onActionSelect={onQuickAction} />
                    </div>
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
                
                {/* Show quick actions after bot responses */}
                {shouldShowQuickActions() && (
                    <div className={styles.quickActionsWrapper}>
                        <QuickActions onActionSelect={onQuickAction} />
                    </div>
                )}
                
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
