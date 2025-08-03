"use client";

/**
 * Topic card component for the suggestions component
 * Simplified version with image, category badge, keywords, title and source link only
 */

import React, { useState } from 'react';
import { H3, Link, Body } from '@leafygreen-ui/typography';
import Badge from '@leafygreen-ui/badge';
import Button from '@leafygreen-ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getBadgeVariant, getRelativeTime } from '@/utils/generalUtils';
import { navigateToDraft } from '@/utils/draftUtils';
import styles from './TopicCard.module.css';

export default function TopicCard({ topicCard, index = 0 }) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  // topic data with fallbacks
  const {
    topic,
    keywords = [],
    label,
    url = "https://mongodb.com",
    analyzed_at
  } = topicCard || {};

  const handleSourceClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDraft = async () => {
    if (isNavigating) return; // Prevent multiple clicks
        
    setIsNavigating(true);
        
    try {
      await navigateToDraft(topicCard, router);
    } catch (error) {
      router.push('/drafts');
    } finally {
      setIsNavigating(false);
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
          <div className={styles.topRow}>
            <Badge variant={getBadgeVariant(label)} className={styles.categoryBadge}>
              {label}
            </Badge>
            {analyzed_at && (
              <Body baseFontSize="13">
                {getRelativeTime(analyzed_at)}
              </Body>
            )}
          </div>
          <H3 className={styles.topicTitle}>
            {topic}
          </H3>
        </div>

        <div className={styles.keywordsSection}>
          <div className={styles.keywordsList}>
            {keywords.slice(0, 3).map((keyword, idx) => (
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
          <Button 
            onClick={handleDraft}
            disabled={isNavigating}
            size="small"
          >
            {isNavigating ? 'Loading...' : 'Start Drafting'}
          </Button>
        </div>
      </div>
    </div>
  );
}