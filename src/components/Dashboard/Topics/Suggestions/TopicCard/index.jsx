"use client";

/**
 * Topic card component for the suggestions component
 * Simplified version with image, category badge, keywords, title and source link only
 */

import React from 'react';
import { H3, Link } from '@leafygreen-ui/typography';
import Badge from '@leafygreen-ui/badge';
import Image from 'next/image';
import { getBadgeVariant } from '@/utils/generalUtils';
import styles from './TopicCard.module.css';

export default function TopicCard({ topicCard, index = 0 }) {
    // topic data with fallbacks
    const {
        topic,
        keywords = [],
        label,
        url = "https://mongodb.com"
    } = topicCard || {};

    const handleSourceClick = () => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className={styles.topicCard}>
            {/* Image Section */}
            <div className={styles.imageSection}>
                <Image 
                    src={`/categories/${label === 'general' ? 'technology' : label}_${index % 4 + 1}.png`}
                    alt={topic}
                    width={400}
                    height={250}
                    priority
                    className={styles.topicImage}
                />
            </div>

            {/* Content Section */}
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
                    <div className={styles.keywordsList}>
                        {keywords.slice(0, 4).map((keyword, idx) => (
                            <span key={idx} className={styles.keyword}>
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className={styles.footerSection}>
                    <Link 
                        onClick={handleSourceClick}
                        baseFontSize="13"
                        arrowAppearance="hover"
                    >
                        View Source
                    </Link>
                </div>
            </div>
        </div>
    );
}