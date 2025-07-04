"use client";

import React from 'react';
import { H3, Body, Disclaimer } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import Badge from '@leafygreen-ui/badge';
import Button from '@leafygreen-ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './TopicCard.module.css';

// Mock images
const mockImages = [
  '/mock_1.webp',
  '/mock_2.webp', 
  '/mock_3.webp',
  '/mock_4.webp'
];

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

    // Get mock image based on index
    const imageIndex = index % mockImages.length;
    const imageSrc = mockImages[imageIndex];

    const handleDraft = () => {
        // Future: redirect to /draft
        // TODO: Implement draft functionality
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
                    src={imageSrc}
                    alt={topic}
                    width={400}
                    height={250}
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
                            size="xsmall" 
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