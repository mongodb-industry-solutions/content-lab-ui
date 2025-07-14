'use client';

/**
 * Chat panel component for the chatbot component
 * Contains the chat panel with the writing tools (draft, refine, proofread)
 */

import { Body } from '@leafygreen-ui/typography';
import Button from '@leafygreen-ui/button';
import styles from './ChatPanel.module.css';
import Icon from '@leafygreen-ui/icon';

// Define actions outside component to prevent recreation on every render
const WRITING_TOOLS = [
    {
        id: 'draft_layout',
        text: 'Draft',
        message: 'Help me create a draft layout for the current topic with key sections and structure.',
        icon: 'Edit'
    },
    {
        id: 'refine',
        text: 'Refine',
        message: 'Help me refine this document content to match my writing style and topic requirements.',
        icon: 'Sparkle'
    },
    {
        id: 'proofread',
        text: 'Proofread',
        message: 'Please proofread my content and suggest improvements for clarity, grammar, and flow.',
        icon: 'MagnifyingGlass'
    }
];

export default function ChatPanel({ onActionSelect }) {
    const handleActionClick = (action) => {
        if (onActionSelect) {
            onActionSelect(action);
        }
    };

    return (
        <div className={styles.chatPanel}>
            <Body className={styles.panelTitle}>
                Writing Tools
            </Body>
            
            <div className={styles.toolsList}>
                {WRITING_TOOLS.map((action) => (
                    <Button
                        key={action.id}
                        onClick={() => handleActionClick(action)}
                        variant="default"
                        size="small"
                        className={styles.toolButton}
                        leftGlyph={<Icon glyph={action.icon} />}
                    >
                        {action.text}
                    </Button>
                ))}
            </div>
        </div>
    );
} 