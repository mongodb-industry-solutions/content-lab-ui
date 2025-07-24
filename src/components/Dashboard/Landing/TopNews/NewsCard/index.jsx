"use client";

/**
 * News card component for the top news component
 * Contains the news card with the image, title, description, source, author, published date, country, metrics and cta
 */

import React from 'react';
import { H3, Overline, Body, Subtitle, Disclaimer, Link as LeafyLink } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import Badge from '@leafygreen-ui/badge';
import styles from './NewsCard.module.css';
import Image from 'next/image';
import { getHumanReadableDate, formatNumber, getBadgeVariant } from '@/utils/generalUtils';

export default function NewsCard({ article, currentIndex }) {
  const { 
    url = "https://www.mongodb.com", 
    title = "Title", 
    description = "Description",
    author = "Author",
    source = "Source", 
    published_at = new Date(),
    country = "Country",
    News_metrics = {},
    category = "Category"
  } = article;

  const {
    Total_visits = 0, 
    total_Comments = 0,
    Total_shares = 0
  } = News_metrics;

  const humanReadableDate = getHumanReadableDate(published_at);
  const formattedTotalVisits = formatNumber(Total_visits || 0);
  const formattedTotalShares = formatNumber(Total_shares || 0);
  const formattedTotalComments = formatNumber(total_Comments || 0);

  const handleViewOriginal = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className={styles.newsCard}>
      <div className={styles.cardContent}>
        {/* Left Side - Image */}
        <div className={styles.imageContainer}>
          <Image 
            src={`/categories/${category === 'general' ? 'technology' : category}_${currentIndex % 4 + 1}.png`} 
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 400px"
            className={styles.newsImage}
            priority
          />
        </div>
        
        {/* Right Side - Content */}
        <div className={styles.contentContainer}>
          {/* Header Section */}
          <div className={styles.badgeContainer}>
            <Badge variant={getBadgeVariant(category)}>
              {category}
            </Badge>
            
            <Badge variant="blue">
              {country}
            </Badge>
          </div>

          {/* Main Headline */}
          <H3 className={styles.headline}>
            {title}
          </H3>

          {/* Description */}
          <Body className={styles.description}>
            {description}
          </Body>
          
          {/* Metadata Section */}
          <div className={styles.metadataSection}>
              <Overline>{source}</Overline>
              <Body className={styles.author}>by {author}</Body>
            <Disclaimer>{humanReadableDate}</Disclaimer>
          </div>

          {/* Metrics Section */}
          <div className={styles.metricsSection}>
            <Subtitle>Engagement Metrics</Subtitle>
            <div className={styles.metricsGrid}>
              <div className={styles.metricItem}>
                <Body className={styles.metricValue}>{formattedTotalVisits}</Body>
                <Disclaimer>Visits</Disclaimer>
              </div>
          
              <div className={styles.metricItem}>
                <Body className={styles.metricValue}>{formattedTotalShares}</Body>
                <Disclaimer>Shares</Disclaimer>
              </div>
            
              <div className={styles.metricItem}>
                <Body className={styles.metricValue}>{formattedTotalComments}</Body>
                <Disclaimer>Comments</Disclaimer>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <LeafyLink
              onClick={handleViewOriginal}
              baseFontSize="13"
              arrowAppearance="hover"
          >
              View Source
          </LeafyLink>
        </div>
      </div>
    </Card>
  );
}