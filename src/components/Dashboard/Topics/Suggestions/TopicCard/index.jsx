"use client";

import React from 'react';
import { H3, Body, Disclaimer } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import Badge from '@leafygreen-ui/badge';
import Button from '@leafygreen-ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './TopicCard.module.css';

export default function TopicCard({ topicCard, index = 0 }) {
    const router = useRouter();
    
    // topic data with fallbacks
    const {
        topic,
        keywords,
        description,
        label,
        url = "https://mongodb.com"
    } = topicCard || {};

    const handleDraft = () => {
        // Send the topic in local storage
        localStorage.setItem('topicCard', JSON.stringify(topicCard));
        router.push('/drafts');
    };

    const handleSourceClick = () => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <Card className={styles.topicCard}>
            {/* Image Section - 40% */}
            <div className={styles.imageSection}>
                <Image 
                    src={`/categories/${label}_${index % 4 + 1}.png`}
                    alt={topic}
                    width={400}
                    height={250}
                    priority
                    className={styles.topicImage}
                />
            </div>

            {/* Content Section - 60% */}
            <div className={styles.contentSection}>
                {/* Header with Category Badge and Title */}
                <div className={styles.headerSection}>
                    <Badge variant="green" className={styles.categoryBadge}>
                        {label}
                    </Badge>
                    <H3 className={styles.topicTitle}>
                        {topic}
                    </H3>
                </div>

                {/* Keywords Section */}
                <div className={styles.keywordsSection}>
                    {keywords.slice(0, 4).map((keyword, idx) => (
                        <Badge 
                            key={idx} 
                            variant="lightgray" 
                            className={styles.keywordBadge}
                        >
                            {keyword}
                        </Badge>
                    ))}
                </div>

                {/* Description */}
                <Body className={styles.description}>
                    {description}
                </Body>

                {/* Footer with Source and Actions */}
                <div className={styles.footerSection}>
                    <Disclaimer 
                        className={styles.sourceLink}
                        onClick={handleSourceClick}
                    >
                        View Source
                    </Disclaimer>
                    
                    <div className={styles.actionButtons}>
                        <Button 
                            size="default" 
                            variant="default"
                            className={styles.draftButton}
                            onClick={handleDraft}
                        >
                            Start Drafting
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}