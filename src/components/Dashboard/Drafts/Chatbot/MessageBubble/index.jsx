'use client';

import { useState } from 'react';
import { Body, Disclaimer } from '@leafygreen-ui/typography';
import Icon from '@leafygreen-ui/icon';
import Typewriter from '@/components/Dashboard/Drafts/Chatbot/Typewriter';
import styles from './MessageBubble.module.css';

export default function MessageBubble({ message, type, completedMessages, markCompleted }) {
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
        <div className={`${styles.messageWrapper} ${styles[type]}`}>
            {type === 'bot' && (
                <div className={styles.botAvatar}>
                    <Icon glyph="Sparkle" size="small" />
                </div>
            )}
            
            <div className={styles.messageContent}>
                <div className={`${styles.messageBubble} ${styles[type]}`}>
                    <Body className={styles.messageText}>
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
                        className={`${styles.copyButton} ${styles[type]}`}
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
                    <Disclaimer className={`${styles.timestamp} ${styles[type]}`}>
                        {timestamp}
                    </Disclaimer>
                )}
            </div>
        </div>
    );
}
