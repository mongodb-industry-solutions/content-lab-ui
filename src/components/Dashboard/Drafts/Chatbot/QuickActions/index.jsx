'use client';

import { Body } from '@leafygreen-ui/typography';
import styles from './QuickActions.module.css';

export default function QuickActions({ onActionSelect }) {
    const quickActions = [
        {
            id: 'draft-layout',
            text: 'Create a draft layout for this topic',
            message: 'Help me create a draft layout for the current topic with key sections and structure.'
        },
        {
            id: 'proofread-content',
            text: 'Proofread and suggest improvements',
            message: 'Please proofread my content and suggest improvements for clarity, grammar, and flow.'
        },
        {
            id: 'refine-style',
            text: 'Refine content based on writing style',
            message: 'Help me refine this document content to match my writing style and topic requirements.'
        }
    ];

    const handleActionClick = (action) => {
        if (onActionSelect) {
            onActionSelect(action.message);
        }
    };

    return (
        <div className={styles.quickActions}>
            <Body className={styles.quickActionsTitle}>
                Quick Actions
            </Body>
            
            <div className={styles.actionsList}>
                {quickActions.map((action) => (
                    <button
                        key={action.id}
                        onClick={() => handleActionClick(action)}
                        className={styles.actionButton}
                    >
                        <Body className={styles.actionText}>
                            {action.text}
                        </Body>
                    </button>
                ))}
            </div>
        </div>
    );
}
