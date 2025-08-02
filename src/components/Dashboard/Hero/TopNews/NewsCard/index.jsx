"use client";

/**
 * News card component for the integrated headline
 * Contains the news card with the image, title, description, source, author, published date, country, metrics and cta
 */

import React from 'react';
import { H3, Body, Link as LeafyLink, Disclaimer } from '@leafygreen-ui/typography';
import Badge from '@leafygreen-ui/badge';
import styles from './NewsCard.module.css';
import Image from 'next/image';
import { getHumanReadableDate, getBadgeVariant } from '@/utils/generalUtils';

export default function NewsCard({ article, currentIndex }) {
  const { 
    url = "https://www.mongodb.com", 
    title = "Title", 
    description = "Description",
    author = "Author",
    source = "Source", 
    published_at = new Date(),
    category = "Category"
  } = article;

  const humanReadableDate = getHumanReadableDate(published_at);

  const handleViewOriginal = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={styles.newsCard}>
      <div className={styles.imageContainer}>
        <Image 
          src={`/categories/${category === 'general' ? 'technology' : category}_${currentIndex % 4 + 1}.png`} 
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          className={styles.newsImage}
          priority
        />
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.badgeContainer}>
          <Badge className={styles.badge} variant={getBadgeVariant(category)}>
            {category}
          </Badge>
          <Disclaimer className={`${styles.author} ${styles.lineClamp}`}>by {author}</Disclaimer>
        </div>

        <H3 className={`${styles.headline} ${styles.lineClamp}`}>
          {title}
        </H3>

        <Body className={`${styles.description} ${styles.lineClamp}`}>
          {description}
        </Body>
        
        <div className={styles.bottomRow}>
          <LeafyLink
            onClick={handleViewOriginal}
            baseFontSize="13"
            arrowAppearance="hover"
            className={styles.sourceLink}
          >
            {source}
          </LeafyLink>
          <Disclaimer className={`${styles.publishDate} ${styles.lineClamp}`}>{humanReadableDate}</Disclaimer>
        </div>
      </div>
    </div>
  );
}
