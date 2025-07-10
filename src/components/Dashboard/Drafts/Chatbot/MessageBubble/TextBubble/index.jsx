'use client';

import { useState } from 'react';
import { Body, Disclaimer } from '@leafygreen-ui/typography';
import Icon from '@leafygreen-ui/icon';
import Typewriter from '@/components/Dashboard/Drafts/Chatbot/Typewriter';
import mainStyles from '../MessageBubble.module.css';

export default function TextBubble({ message, type, completedMessages, markCompleted }) {
    const { text, timestamp, id } = message;
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyToClipboard = async () => {
        try {
            const textToCopy = text;
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
            
            // Reset the copied state after 2 seconds
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className={`${mainStyles.messageWrapper} ${mainStyles[type]}`}>
            {type === 'bot' && (
                <div className={mainStyles.botAvatar}>
                    <Icon glyph="Sparkle" size="small" />
                </div>
            )}
            
            <div className={mainStyles.messageContent}>
                <div className={`${mainStyles.messageBubble} ${mainStyles[type]}`}>
                    <Body className={mainStyles.messageText}>
                        {type === 'bot' ? (
                            <Typewriter
                                text={text}
                                messageId={id}
                                completedMessages={completedMessages}
                                markCompleted={markCompleted}
                            />
                        ) : (
                            text
                        )}
                    </Body>
                    
                    <button 
                        className={`${mainStyles.copyButton} ${mainStyles[type]}`}
                        onClick={handleCopyToClipboard}
                        title={isCopied ? 'Copied!' : 'Copy to clipboard'}
                    >
                        <Icon 
                            glyph={isCopied ? "Checkmark" : "Copy"} 
                            size="small" 
                        />
                    </button>
                </div>
                
                {timestamp && (
                    <Disclaimer className={`${mainStyles.timestamp} ${mainStyles[type]}`}>
                        {timestamp}
                    </Disclaimer>
                )}
            </div>
        </div>
    );
} 