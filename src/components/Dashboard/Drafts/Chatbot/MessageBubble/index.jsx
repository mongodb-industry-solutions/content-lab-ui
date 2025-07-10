'use client';

import TextBubble from './TextBubble';
import DraftBubble from './DraftBubble';
import SuggestionBubble from './SuggestionBubble';

export default function MessageBubble({ 
    message, 
    completedMessages, 
    markCompleted,
    applyDraftLayout,
    applySuggestion 
}) {
    const messageType = message.type || 'text';

    if (messageType === 'draft_layout') {
        return (
            <DraftBubble 
                message={message}
                onApply={applyDraftLayout}
                completedMessages={completedMessages}
                markCompleted={markCompleted}
            />
        );
    }

    if (messageType === 'suggestions') {
        return (
            <SuggestionBubble 
                message={message}
                onApply={applySuggestion}
                completedMessages={completedMessages}
                markCompleted={markCompleted}
            />
        );
    }

    // Default to text message bubble
    return (
        <TextBubble 
            message={message}
            type={message.sender}
            completedMessages={completedMessages}
            markCompleted={markCompleted}
        />
    );
}
