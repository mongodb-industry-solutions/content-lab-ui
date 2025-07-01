"use client";

import React from 'react';
import { H3, Overline, Body, Subtitle, Disclaimer } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import Button from '@leafygreen-ui/button';
import Badge from '@leafygreen-ui/badge';
import styles from './NewsCard.module.css';
import Image from 'next/image';
import { getHumanReadableDate, formatNumber } from '@/lib/utils';

export default function NewsCard({ article, image }) {
  const { 
    url, 
    title, 
    description,
    author,
    source, 
    published_at,
    country,
    News_metrics = {},
    category
  } = article;

  const {
    Total_visits,
    Total_retention, 
    total_Comments,
    Total_shares
  } = News_metrics;

  const humanReadableDate = getHumanReadableDate(published_at);
  const formattedTotalVisits = formatNumber(Total_visits);
  const formattedTotalShares = formatNumber(Total_shares);
  const formattedTotalComments = formatNumber(total_Comments);

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
            src={image} 
            alt={title}
            width={500}
            height={300}
            className={styles.newsImage}
          />
        </div>
        
        {/* Right Side - Content */}
        <div className={styles.contentContainer}>
          {/* Header Section */}
          <div className={styles.headerSection}>
            <div className={styles.badgeContainer}>
              <Badge variant="green" className={styles.categoryBadge}>
                {category}
              </Badge>
              
              <Badge variant="blue" className={styles.countryBadge}>
                {country}
              </Badge>
            </div>
            
            {/* Main Headline */}
            <H3 className={styles.headline}>
              {title}
            </H3>
          </div>

          {/* Description */}
          <Body className={styles.description}>
            {description}
          </Body>
          
          {/* Metadata Section */}
          <div className={styles.metadataSection}>
            <div className={styles.sourceInfo}>
              <Overline className={styles.source}>{source}</Overline>
              <Body className={styles.author}>by {author}</Body>
              <Disclaimer className={styles.publishDate}>
                {humanReadableDate}
              </Disclaimer>
            </div>
          </div>

          {/* Metrics Section */}
          <div className={styles.metricsSection}>
            <Subtitle className={styles.metricsTitle}>Engagement Metrics</Subtitle>
            <div className={styles.metricsGrid}>
              <div className={styles.metricItem}>
                <Body className={styles.metricValue}>{formattedTotalVisits}</Body>
                <Disclaimer className={styles.metricLabel}>Visits</Disclaimer>
              </div>
          
              <div className={styles.metricItem}>
                <Body className={styles.metricValue}>{formattedTotalShares}</Body>
                <Disclaimer className={styles.metricLabel}>Shares</Disclaimer>
              </div>
            
              <div className={styles.metricItem}>
                <Body className={styles.metricValue}>{formattedTotalComments}</Body>
                <Disclaimer className={styles.metricLabel}>Comments</Disclaimer>
              </div>
            
              <div className={styles.metricItem}>
                <Body className={styles.metricValue}>{Total_retention}%</Body>
                <Disclaimer className={styles.metricLabel}>Retention</Disclaimer>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={styles.ctaSection}>
            <Button 
              size="default" 
              variant="outline"
              className={styles.viewOriginalCta}
              onClick={handleViewOriginal}
              disabled={!url}
            >
              View Original Article
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}