'use client';

import { useState } from 'react';
import { Body, Disclaimer } from '@leafygreen-ui/typography';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import Typewriter from '@/components/Dashboard/Drafts/Chatbot/Typewriter';
import mainStyles from '../MessageBubble.module.css';
import styles from './DraftBubble.module.css';

export default function DraftBubble({ message, onApply, completedMessages, markCompleted }) {
    const { draftContent, timestamp, id } = message;
    const [isApplied, setIsApplied] = useState(false);

    const handleApplyDraft = () => {
        onApply(draftContent);
        setIsApplied(true);
        
        // Reset applied state after 3 seconds
        setTimeout(() => {
            setIsApplied(false);
        }, 3000);
    };

    return (
        <div className={`${mainStyles.messageWrapper} ${mainStyles.bot}`}>
            <div className={mainStyles.botAvatar}>
                <Icon glyph="Edit" size="small" />
            </div>
            
            <div className={mainStyles.messageContent}>
                <div className={`${mainStyles.messageBubble} ${mainStyles.bot} ${styles.draftBubble}`}>
                    <Body className={mainStyles.messageText}>
                        <Typewriter
                            text="📝 Here's a complete draft for your topic:"
                            messageId={id}
                            completedMessages={completedMessages}
                            markCompleted={markCompleted}
                        />
                    </Body>
                    
                    <div className={styles.draftPreview}>
                        <pre className={styles.draftContent}>
                            {draftContent}
                        </pre>
                    </div>
                    
                    <div className={styles.actionButtons}>
                        <Button
                            variant="primary"
                            size="small"
                            rightGlyph={<Icon glyph="Upload" />}
                            onClick={handleApplyDraft}
                            disabled={isApplied}
                        >
                            {isApplied ? 'Applied!' : 'Apply Draft'}
                        </Button>
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