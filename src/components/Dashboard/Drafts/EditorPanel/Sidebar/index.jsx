'use client';

/**
 * Sidebar component for the editor panel
 * Contains the metadata section and the key points section
 */

import React from 'react';
import TextInput from '@leafygreen-ui/text-input';
import { H3, Body } from '@leafygreen-ui/typography';
import Badge from '@leafygreen-ui/badge';
import KeyPoints from './KeyPoints';
import styles from './Sidebar.module.css';

export default function Sidebar({ topicCard, metadata, onMetadataChange, isMobile = false }) {

  const handleInputChange = (field, value) => {
      if (onMetadataChange) {
          onMetadataChange(field, value);
      }
  };

  return (
    <div className={`${styles.sidebar} ${isMobile ? styles.mobileSidebar : ''}`}>
      {/* Metadata Section */}
      <div className={styles.metadataSection}>
          <H3 className={styles.sectionTitle}>Article Information</H3>
          <div className={styles.inputGroup}>
            <Body baseFontSize={13} className={styles.metadataLabel}>Article Title</Body>
            <TextInput
              value={metadata?.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              sizeVariant="small"
              aria-labelledby="Enter article title..."
            />
          </div>

          <div className={styles.inputGroup}>
            <Body baseFontSize={13} className={styles.metadataLabel}>Category/Topic Tag</Body>
            <TextInput
              value={metadata?.category || ''}
              onChange={(e) => handleInputChange('category', e.target.value)}
              sizeVariant="small"
              aria-labelledby="Enter category/topic tag..."
            />
          </div>

          <div className={styles.inputGroup}>
            <Body baseFontSize={13} className={styles.metadataLabel}>Keywords</Body>
            <div className={styles.keywordsBadges}>
                {(metadata.keywords || []).map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="green"
                  >
                    {keyword}
                  </Badge>
                ))}
            </div>
          </div>
      </div>

      {/* Key Points Section */}
      <KeyPoints topicCard={topicCard} />
    </div>
  );
} 