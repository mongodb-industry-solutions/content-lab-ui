'use client';

/**
 * Chat header component for the chatbot component
 * Contains the chatbot logo and the info wizard
 */

import { useState } from 'react';
import { H3 } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import Image from 'next/image';
import InfoWizard from '@/components/external/InfoWizard';
import { CHATBOT_INFO_WIZARD } from '@/utils/constants';
import styles from './ChatHeader.module.css';

export default function ChatHeader() {
    const [openHelpModal, setOpenHelpModal] = useState(false);

    return (
        <Card className={styles.chatHeader}>
            <div className={styles.headerContent}>
                <div className={styles.titleGroup}>
                    <Image 
                        src="/mongodb/Bot.svg" 
                        alt="Chatbot Logo" 
                        width={40}
                        height={40}
                    />
                    <H3 className={styles.title}>Writing Assistant</H3>
                </div>
                
                <InfoWizard 
                    open={openHelpModal}
                    setOpen={setOpenHelpModal}
                    tooltipText="Learn about writing assistant"
                    iconGlyph="Wizard"
                    sections={CHATBOT_INFO_WIZARD}
                />
            </div>
        </Card>
    );
}
