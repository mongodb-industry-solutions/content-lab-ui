"use client";

/**
 * Topic card component for the suggestions component
 */

import React, { useState } from 'react';
import { H3, Body, Link } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import Badge from '@leafygreen-ui/badge';
import Button from '@leafygreen-ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { navigateToDraft } from '@/utils/draftUtils';
import { getBadgeVariant } from '@/utils/generalUtils';
import styles from './TopicCard.module.css';

export default function TopicCard({ topicCard, index = 0 }) {
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);
    
    // topic data with fallbacks
    const {
        topic,
        keywords,
        description,
        label,
        url = "https://mongodb.com"
    } = topicCard || {};

    const handleDraft = async () => {
        if (isNavigating) return; // Prevent multiple clicks
        
        setIsNavigating(true);
        
        try {
            await navigateToDraft(topicCard, router);
        } catch (error) {
            // Fallback to new draft on error
            router.push('/drafts');
        } finally {
            setIsNavigating(false);
        }
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
                <div className={styles.headerSection}>
                    <Badge variant={getBadgeVariant(label)} className={styles.categoryBadge}>
                        {label}
                    </Badge>
                    <H3 className={styles.topicTitle}>
                        {topic}
                    </H3>
                </div>

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

                <Body className={styles.description}>
                    {description}
                </Body>

                {/* Footer */}
                <div className={styles.footerSection}>
                    <Link 
                        onClick={handleSourceClick}
                        baseFontSize="13"
                        arrowAppearance="hover"
                    >
                        View Source
                    </Link>
                    
                    <div className={styles.actionButtons}>
                        <Button 
                            size="default" 
                            variant="primary"
                            onClick={handleDraft}
                            disabled={isNavigating}
                        >
                            {isNavigating ? 'Loading...' : 'Start Drafting'}
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}