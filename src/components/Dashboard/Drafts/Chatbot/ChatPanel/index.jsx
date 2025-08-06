'use client';

/**
 * Chat panel component for the chatbot component
 * Contains the chat panel with the writing tools (draft, refine, proofread)
 */

import React from 'react';
import { Body } from '@leafygreen-ui/typography';
import Button from '@leafygreen-ui/button';
import styles from './ChatPanel.module.css';
import Icon from '@leafygreen-ui/icon';
import { WRITING_TOOLS } from '@/constants/users';
import DemoGuideCue from '@/components/shared/DemoGuideCue';

export default function ChatPanel({ onActionSelect }) {
    const handleActionClick = (action) => {
        if (onActionSelect) {
            onActionSelect(action);
        }
    };

    return (
        <div className={styles.chatPanel}>
            <DemoGuideCue title="Writing Tools Workflow">
                Start with Draft to outline ideas.
                <br/>
                Then use Refine or Proofread to improve your content.
                <br/>
                <br/>
                <strong>Note:</strong> These tools help you write, but your creativity matters most.
            </DemoGuideCue>

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