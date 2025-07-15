'use client';

/**
 * Chatbot component for the drafts component
 * Contains the chatbot input, messages and panel
 * Delegates the logic to the useChatbot hook
 * Tbh most complex small component in the whole project 
 */

import Card from '@leafygreen-ui/card';
import { useChatbot } from '@/hooks/useChatbot';
import styles from './Chatbot.module.css';
import ChatbotInput from '@/components/Dashboard/Drafts/Chatbot/ChatbotInput';
import ChatHeader from '@/components/Dashboard/Drafts/Chatbot/ChatHeader';
import ChatMessages from '@/components/Dashboard/Drafts/Chatbot/ChatMessages';
import ChatPanel from '@/components/Dashboard/Drafts/Chatbot/ChatPanel';

export default function Chatbot({ 
    getDraftContent, 
    applyDraftLayout, 
    applySuggestion,
    userProfile,
    topicCard
}) {
    // Use custom hook for all chatbot logic
    const {
        messages,
        isTyping,
        completedMessages,
        markCompleted,
        handleSendMessage,
        handleQuickAction
    } = useChatbot(getDraftContent, userProfile, topicCard);

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
                        userProfile={userProfile}
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