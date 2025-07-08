'use client';

import { MongoDBLogoMark } from '@leafygreen-ui/logo';
import { Subtitle } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import styles from './ChatHeader.module.css';

export default function ChatHeader() {
    return (
        <Card className={styles.chatHeader}>
            <div className={styles.headerContent}>
                <MongoDBLogoMark 
                    color="black" 
                    height={20} 
                    className={styles.logoIcon}
                />
                <Subtitle className={styles.title}>
                    AI Assistant
                </Subtitle>
            </div>
        </Card>
    );
}
