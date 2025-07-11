'use client';

import { useState } from 'react';
import { MongoDBLogoMark } from '@leafygreen-ui/logo';
import { Subtitle } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import InfoWizard from '@/components/external/InfoWizard';
import { CHATBOT_INFO_WIZARD } from '@/lib/constants';
import styles from './ChatHeader.module.css';

export default function ChatHeader() {
    const [openHelpModal, setOpenHelpModal] = useState(false);

    return (
        <Card className={styles.chatHeader}>
            <div className={styles.headerContent}>
                <div className={styles.titleGroup}>
                    <MongoDBLogoMark 
                        color="black" 
                        height={20} 
                        className={styles.logoIcon}
                    />
                    <Subtitle className={styles.title}>
                        Writing Assistant
                    </Subtitle>
                </div>
                <InfoWizard 
                    open={openHelpModal}
                    setOpen={setOpenHelpModal}
                    tooltipText="Learn about writing assistant"
                    iconGlyph="Wizard"
                    sections={CHATBOT_INFO_WIZARD}
                    className={styles.infoWizard}
                />
            </div>
        </Card>
    );
}
