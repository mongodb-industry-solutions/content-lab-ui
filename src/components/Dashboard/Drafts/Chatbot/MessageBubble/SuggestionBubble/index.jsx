'use client';

/**
 * Suggestion bubble component for the chatbot component
 * Contains the suggestion bubble and the apply button (for quick fixes)
 */

import { useState } from 'react';
import { Body, Disclaimer } from '@leafygreen-ui/typography';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import Typewriter from '@/components/Dashboard/Drafts/Chatbot/Typewriter';
import mainStyles from '../MessageBubble.module.css';
import styles from './SuggestionBubble.module.css';

export default function SuggestionBubble({ message, onApply, completedMessages, markCompleted }) {
    const { suggestions, timestamp, id } = message;
    const [appliedSuggestions, setAppliedSuggestions] = useState(new Set());

    const handleApplySuggestion = (suggestion, index) => {
        onApply(suggestion.original, suggestion.corrected);
        
        setAppliedSuggestions(prev => new Set([...prev, index]));
        
        // Reset applied state after 3 seconds
        setTimeout(() => {
            setAppliedSuggestions(prev => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
            });
        }, 3000);
    };

    return (
        <div className={`${mainStyles.messageWrapper} ${mainStyles.bot}`}>
            <div className={mainStyles.botAvatar}>
                <Icon glyph="Sparkle" size="small" />
            </div>
            
            <div className={mainStyles.messageContent}>
                <div className={`${mainStyles.messageBubble} ${mainStyles.bot} ${styles.suggestionsBubble}`}>
                    <Body className={mainStyles.messageText}>
                        <Typewriter
                            text={`✨ I found ${suggestions?.length || 0} improvements:`}
                            messageId={id}
                            completedMessages={completedMessages}
                            markCompleted={markCompleted}
                        />
                    </Body>
                    
                    <div className={styles.suggestionsContainer}>
                        {suggestions?.map((suggestion, index) => (
                            <div key={index} className={styles.suggestionCard}>
                                <div className={styles.suggestionText}>
                                    <div className={styles.originalText}>
                                        "{suggestion.original}"
                                    </div>
                                    <div className={styles.arrow}>→</div>
                                    <div className={styles.replacementText}>
                                        "{suggestion.corrected}"
                                    </div>
                                </div>
                                
                                <div className={styles.suggestionAction}>
                                    <Button
                                        variant="default"
                                        size="xsmall"
                                        rightGlyph={<Icon glyph="Checkmark" />}
                                        onClick={() => handleApplySuggestion(suggestion, index)}
                                        disabled={appliedSuggestions.has(index)}
                                    >
                                        {appliedSuggestions.has(index) ? 'Applied!' : 'Apply'}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {timestamp && (
                    <Disclaimer className={`${mainStyles.timestamp} ${mainStyles.bot}`}>
                        {timestamp}
                    </Disclaimer>
                )}
            </div>
        </div>
    );
} 